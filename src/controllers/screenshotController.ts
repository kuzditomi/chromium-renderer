import express from "express";
import { screenshotService } from "../services/screenshotService";

export class ScreenshotController {
    public readonly path = '/screenshots';
    public router = express.Router();

    constructor() {
        this.router.get(this.path, this.getScreenshot);
    }

    async getScreenshot(_request: express.Request, response: express.Response) {
        const screenshot = await screenshotService.createSnapshot();
        response.send(screenshot);
    }
}