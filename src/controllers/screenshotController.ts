import express from "express";
import { screenshotService } from "../services/screenshotService";
import { request } from "http";
import { CreateScreenshotRequest } from "../models/createScreenshotRequest";

export class ScreenshotController {
    public readonly path = '/screenshots';
    public router = express.Router();

    constructor() {
        this.router.post(this.path, this.createScreenshot);
    }

    async createScreenshot(request: express.Request, response: express.Response) {
        const data = request.body as CreateScreenshotRequest;

        if (!data.url) {
            response.sendStatus(400);
            return;
        }

        console.log('[controller] creating screenshot from url', data.url);
        const screenshot = await screenshotService.createScreenshot(data.url);
        const image = Buffer.from(screenshot, 'base64');

        response.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': image.length
        });
        
        response.end(image);
    }
}