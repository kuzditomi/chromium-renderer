import webdriver, { WebDriver } from 'selenium-webdriver';

const GRID_HOST = 'http://localhost:4444/wd/hub';

const CAPABILITIES = {
    browserName: 'chrome',
    network: true,
    visual: true,
    console: true,
    video: true
}

class ScreenshotService {
    constructor() {
    }

    async createScreenshot(url: string) {
        const driver = new webdriver.Builder()
            .usingServer(GRID_HOST)
            .withCapabilities(CAPABILITIES)
            .build();

        try {
            await driver.get(url);
            const screenshot = await driver.takeScreenshot();
            await driver.quit();

            return screenshot;
        } catch (e) {
            console.log('[screenshot service]: capture failed', e);
            await driver.quit();

            throw e;
        }
    }
}

export const screenshotService = new ScreenshotService();


