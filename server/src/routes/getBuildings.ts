import { Router, Response } from "express";
import Database from "../util/Database.js";

const route = Router();

route.get('/getBuildings', function (res: Response) {
    const db = new Database();
    const results = db.select("SELECT building_num as buildingNum, building_name as buildingName, building_abbriev as abbriev, address, lat, lng FROM buildings ORDER BY building_num")
    res.json(results)
});

export default route;