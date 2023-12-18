import { Router, Request, Response } from "express";
import Database from "../util/Database.js";

const days: string[] = ["monday", "tuesday", "wednesday", "thursday", "friday"]

const route = Router();

// SQLite doesn't allow for booleans to be stored. Change datatype of day to boolean.
function changeDayType(res: any) {
    let class_days: string[] = []
    for (let day of days) {
        if (res[day] == "1") {
            class_days.push(day)
        }
        delete res[day]
    }
    res.days = class_days

    return res
}

function addInstructors(res: any, instructors: any) {
    res.instructors = instructors

    return res
}

route.get('/getSectionInfo', function (req: Request, res: Response) {
    const db = new Database();

    if (typeof(req.query.class_num) != "string" || typeof(req.query.section_num) != "string") {
        res.send("Provide a class_num and a section_num")
        return;
    }

    let result = []

    const classesUnparsed = db.select(`
        SELECT building_num as buildingNum, 
                facility_id as facility, 
                class_subject as subject, 
                class_code as code,
                class_title as title, 
                class_desc as description,
                class_type as type,
                units,
                class_number as classNo, 
                section_number as sectionNo, 
                monday, 
                tuesday, 
                wednesday, 
                thursday, 
                friday, 
                start_time as start, 
                end_time as end, 
                class_duration as duration
                FROM classes 
                WHERE class_number = ? AND section_number = ?`, [req.query.class_num, req.query.section_num])

    const instructors = db.select(`
        SELECT id, name, email
        FROM instructors
        LEFT JOIN faculty
        ON instructors.instructor_id = faculty.id
        WHERE class_number = ? AND section_number = ?`, [req.query.class_num, req.query.section_num])

    for (let classInfo of classesUnparsed) {
        result.push(addInstructors(changeDayType(classInfo), instructors))
    }

    res.json(result)
});

export default route;