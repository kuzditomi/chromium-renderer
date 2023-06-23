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
    private driver: WebDriver | null = null;

    constructor() {
    }

    async start() {
        console.log('[screenshot service]: webdriver starting')

        try {
            this.driver = new webdriver.Builder()
                .usingServer(GRID_HOST)
                .withCapabilities(CAPABILITIES)
                .build();
        } catch (e) {
            console.log('[screenshot service]: webdriver failed to start', e);
            throw e;
        }

        console.log('[screenshot service]: webdriver started')
    }

    async createScreenshot(url: string) {
        if (!this.driver) {
            console.error('[screenshot service]: cant create screenshot, webdriver not running.')

            throw Error("webdriver not started.")
        }

        await this.driver.get(url);
        return await this.driver.takeScreenshot();
    }

    stop() {
        console.log('[screenshot service]: webdriver stopping')

        this.driver?.quit();
        this.driver = null;
        
        console.log('[screenshot service]: webdriver stopped.')
    }
}

export const screenshotService = new ScreenshotService();


