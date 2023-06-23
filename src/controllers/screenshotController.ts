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

        const image = Buffer.from(screenshot, 'base64');

        response.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': image.length
        });
        response.end(image);
    }
}