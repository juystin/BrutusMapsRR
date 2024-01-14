import { Router, Request, Response } from "express";
import Database from "../util/Database.js";
import getBuildingsType from "../../../types/getBuildingsType.js"

const route = Router();

route.get('/getBuildings', function (req: Request, res: Response) {
    const db = new Database();
    if (typeof(req.query.order) === "string" && req.query.order === "lat") {
        const results: getBuildingsType[] = db.select("SELECT DISTINCT buildings.building_num as buildingNum, buildings.building_name as buildingName, building_abbriev as abbriev, address, lat, lng FROM classrooms LEFT JOIN buildings ON classrooms.building_num = buildings.building_num ORDER BY lat DESC")
        res.json(results)
        return
    }
    const results: getBuildingsType = db.select("SELECT DISTINCT buildings.building_num as buildingNum, buildings.building_name as buildingName, building_abbriev as abbriev, address, lat, lng FROM classrooms LEFT JOIN buildings ON classrooms.building_num = buildings.building_num ORDER BY buildings.building_name ASC")
    res.json(results)
});

export default route;