import { Router, Request, Response } from "express";
import Database from "../util/Database.js";

const route = Router();

route.get('/getBuildings', function (req: Request, res: Response) {
    const db = new Database();
    if (typeof(req.query.order) === "string" && req.query.order === "lat") {
        const results = db.select("SELECT building_num as buildingNum, building_name as buildingName, building_abbriev as abbriev, address, lat, lng FROM buildings ORDER BY lat DESC")
        res.json(results)
        return
    }
    const results = db.select("SELECT building_num as buildingNum, building_name as buildingName, building_abbriev as abbriev, address, lat, lng FROM buildings ORDER BY building_num")
    res.json(results)
});

export default route;