import { Router, Request, Response } from "express";
import Database from "../util/Database.js";

const days: string[] = ["monday", "tuesday", "wednesday", "thursday", "friday"]

const route = Router();

route.get('/getClassroomSchedule', function (req: Request, res: Response) {
    const db = new Database();

    if (typeof(req.query.facility) != "string") {
        res.send("Provide a facility")
        return;
    }

    const result = []

    for (let day of days) {
        let schedule = db.select(`
            SELECT class_subject as subject, 
                class_code as code, 
                class_title as title, 
                class_desc as description, 
                classes.class_number as classNo, 
                classes.section_number as sectionNo, 
                start_time as start, 
                end_time as end, 
                class_duration as duration
            FROM classes
            WHERE ` + day + ` = 1 AND 
            facility_id = ? 
            ORDER BY start_time`, req.query.facility)
        result.push({
            day: day,
            schedule: schedule
        })
    }

    res.json(result)

});

export default route;