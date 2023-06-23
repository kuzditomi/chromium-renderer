
import webdriver from 'selenium-webdriver';
import fs from 'fs';

const GRID_HOST = 'http://localhost:4444/wd/hub';

// Setup Input capabilities
const capabilities = {
    browserName: 'chrome',
    network: true,
    visual: true,
    console: true,
    video: true
}

// setup and build selenium driver object
const driver = new webdriver.Builder()
    .usingServer(GRID_HOST)
    .withCapabilities(capabilities)
    .build();

async function takeScreenshot(name: string) {
    const screenshot = await driver.takeScreenshot();
    fs.writeFile(`screenshots/${name}.png`, screenshot, 'base64', function (error) {
        if (error != null)
            console.log('Error occured while saving screenshot' + error);
    });
}

export async function createSnapshot() {
    try {
        // navigate to a url, search for a text and get title of page
        await driver.get('https://www.google.com/ncr');
        await takeScreenshot('homepage');
    } finally {
        await driver.quit();
    }
}