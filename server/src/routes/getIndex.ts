import { Router, Request, Response } from "express";
import path from "path";

const __dirname = path.resolve()

const route = Router();

route.get('/', function (_req: Request, res: Response) {
    res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'));
});

export default route;