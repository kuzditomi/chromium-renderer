import express from 'express';
import http from 'http';
import { screenshotService } from './services/screenshotService';
import { ScreenshotController } from './controllers/screenshotController';

const app = express();
const port = 8081;
let server: http.Server | null = null;

async function startApp() {
    try {
        const screenshotController = new ScreenshotController();
        
        app.use(express.json());
        app.use('/', screenshotController.router);
        
        server = app.listen(port, () => {
            console.log(`[server]: Server is running at http://localhost:${port}`);
        });

    } catch (e) {
        console.log('[app] start error', e);
    }
}

function stopApp() {
    server?.close();
    console.log(`[server]: Server stoped.`);
}

process.on('SIGINT', function () {
    console.log('[app] sigint received')
    stopApp();
});

process.on('SIGTERM', function () {
    console.log('[app] sigterm received')
    stopApp();
});

startApp();