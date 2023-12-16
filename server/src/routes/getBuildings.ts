import { Router, Request, Response } from "express";
import Database from "../util/Database.js";

const route = Router();

route.get('/getBuildings', function (_req: Request, res: Response) {
    const db = new Database();
    const results = db.select("SELECT * FROM buildings ORDER BY building_num")
    res.json(results)
});

export default route;