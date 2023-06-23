import express from "express";
import { screenshotService } from "../services/screenshotService";
import { request } from "http";

export class ScreenshotController {
    public readonly path = '/screenshots';
    public router = express.Router();

    constructor() {
        this.router.get(this.path, this.getScreenshot);
    }

    async getScreenshot(request: express.Request, response: express.Response) {
        const urlToScreenshot = request.query['url'];
        if (!urlToScreenshot) {
            response.sendStatus(400);
            return;
        }

        console.log('[controller] creating screenshot from url', urlToScreenshot);
        const screenshot = await screenshotService.createScreenshot(urlToScreenshot);
        const image = Buffer.from(screenshot, 'base64');

        response.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': image.length
        });
        response.end(image);
    }
}