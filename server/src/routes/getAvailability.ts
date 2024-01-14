import { Router, Request, Response } from "express";
import Database from "../util/Database.js";
import getAvailabilityType from "../../../types/getAvailabilityType.js"

function isStringNumericalInteger(value: any) {
    return typeof value === "string" && /^[\-+]?[1-9]{1}\d+$|^[\-+]?0$/.test(value);
}

const route = Router();

const allowedDays: string[] = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

route.get('/getAvailability', function (req: Request, res: Response) {
    const db = new Database();

    if ((typeof req.query.day === 'string' && !allowedDays.includes(req.query.day)) || (typeof req.query.time === 'string' && (req.query.time.length !== 4 || (req.query.time && !isStringNumericalInteger(req.query.time.replace(/^0+/, '')))))) {
        res.send("Time (\"HHMM\", 24hr) and day (lowercase) must be in correct format.");
        return;
    }

    let time: string;
    let day: string;

    if (typeof req.query.day != 'string' || typeof req.query.time != 'string') {
        let date = new Date()
        time = date.getHours() + ":" + (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes())
        if (date.getDay() != 0 && date.getDay() != 6) {
            day = allowedDays.at(date.getDay())!
        } else {
            /* 
                This is not defaulting to Sunday. This is a filter for the CurrentClasses query,
                which will result in no classes being selected for CurrentClasses view (which is what we want).
            */
            day = "0"
        }
    } else {
        time = req.query.time.substring(0,2) + ":" + req.query.time.substring(2,5)
        day = req.query.day
    }

    const buildingNums = db.select("SELECT building_num FROM buildings ORDER BY building_num");

    let result: getAvailabilityType[] = [];

    for (let res of buildingNums) {
        let params = {
            time: time,
            buildingNum: res.building_num
        }

        let classrooms: any[] = [];

        // Flag returns false if no classrooms available, true if at least one classroom available.
        let flag: boolean = false;

        let classroomAvailability = db.select(`
        WITH CurrentClasses AS (
            SELECT facility_id, current_subject, current_code, current_start, current_end
            FROM classrooms
            LEFT JOIN 
            (
                SELECT facility_id, class_subject as current_subject, class_code as current_code, start_time as current_start, end_time as current_end
                FROM classes
                WHERE
                    strftime('%s', start_time) <= strftime('%s', $time ) AND
                    strftime('%s', $time ) <= strftime('%s', end_time) AND 
                    ` + day + ` = 1
                GROUP BY -- removes time blocks that hold "multiple" sections.
                    facility_id
                ORDER BY
                    facility_id
            ) USING (facility_id)
            WHERE building_num = $buildingNum
            ORDER BY building_num
        ),
        ClassAvailability AS (
            SELECT 
                CurrentClasses.facility_id, 
                current_subject, 
                current_code, 
                current_start, 
                current_end, 
                class_subject, 
                class_code, 
                start_time, 
                end_time
            FROM CurrentClasses
            LEFT JOIN
                classes
            ON
                CurrentClasses.facility_id = classes.facility_id AND
                ((current_subject IS NULL AND strftime('%s', $time) <= strftime('%s', start_time)) OR (strftime('%s', current_end) <= strftime('%s', start_time))) AND 
                ` + day + ` = 1
        )
        
        SELECT
            facility_id,
            current_subject,
            current_code,
            current_start,
            current_end,
            class_subject as next_subject,
            class_code as next_code,
            start_time as next_start,
            end_time as next_end,
            CASE
                WHEN current_subject IS NULL THEN
                    MIN(strftime('%s', start_time) - strftime('%s', $time)) / 60
                ELSE
                    MIN(strftime('%s', start_time) - strftime('%s', current_end)) / 60
            END minutes_until_next_full_class,
            CASE
                WHEN current_subject IS NULL THEN
                    1
                ELSE
                    0
            END available
            FROM ClassAvailability
            GROUP BY
                facility_id
        `, params)

        if (typeof(req.query.order) === "string" && req.query.order === "available") {
            for (let classroomInfo of classroomAvailability) {
                if (classroomInfo.available) {
                    classrooms.push({
                        facilityId: classroomInfo.facility_id,
                        available: true,
                        nextClassAt: classroomInfo.next_start
                    })
                    flag = true
                }
            }
            for (let classroomInfo of classroomAvailability) {
                if (!classroomInfo.available) {
                    classrooms.push({
                        facilityId: classroomInfo.facility_id,
                        available: false,
                        classEndsAt: classroomInfo.current_end,
                        nextClassAt: classroomInfo.next_start
                    })
                }
            }
        } else {
            for (let classroomInfo of classroomAvailability) {
                if (!classroomInfo.available) {
                    classrooms.push({
                        facilityId: classroomInfo.facility_id,
                        available: false,
                        classEndsAt: classroomInfo.current_end,
                        nextClassAt: classroomInfo.next_start
                    })
                } else {
                    classrooms.push({
                        facilityId: classroomInfo.facility_id,
                        available: true,
                        nextClassAt: classroomInfo.next_start
                    })
                    flag = true
                }
            }
        }

        result.push({
            buildingNum: res.building_num,
            available: flag,
            classrooms: classrooms
        })
    }

    res.json(result)
});

export default route;