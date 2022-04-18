const puppeteer = require("puppeteer");
const {username, password} = require("./credentials");

(async ()=>{

    const browser = await puppeteer.launch( {"headless": false, args: ['--start-maximized'] } );

    const context = browser.defaultBrowserContext(); 
 
    const page = await browser.newPage();
    await page.setViewport({width:0, height:0});
    await page.goto("https://tinder.com/");
    await context.overridePermissions("https://tinder.com/", ["geolocation"]);

    await page.setGeolocation({latitude: 50.450001, longitude: 30.523333});

    await page.waitForTimeout(3000);
    await page.waitForXPath('(/html/body/div[1]/div/div[2]/div/div/div[1]/div[2]/button/span)');
    const [cookie] = await page.$x('(/html/body/div[1]/div/div[2]/div/div/div[1]/div[2]/button/span)');
    cookie.click();

    await page.waitForTimeout(3000);
    await page.waitForXPath('(/html/body/div[1]/div/div[1]/div/main/div[1]/div/div/div/div/div[3]/div/div[2]/button/span)');
    const [accCreate] = await page.$x('(/html/body/div[1]/div/div[1]/div/main/div[1]/div/div/div/div/div[3]/div/div[2]/button/span)');
    accCreate.click();
    
    await page.waitForTimeout(3000);
    const [another] = await page.$x("/html/body/div[2]/div/div/div[1]/div/div/div[3]/span/button[contains(., 'Другие варианты')]");
    if (another) {
        await another.click();
    }

    await page.waitForTimeout(3000);
    await page.waitForXPath('(/html/body/div[2]/div/div/div[1]/div/div/div[3]/span/div[2]/button)');
    const [fbLogin] = await page.$x('(/html/body/div[2]/div/div/div[1]/div/div/div[3]/span/div[2]/button)');
    fbLogin.click();

 
    const newPagePromise = new Promise(x =>
        browser.once("targetcreated", target => x(target.page()))
        );

    const fbPopup = await newPagePromise;

    await fbPopup.waitForSelector("#email");

    await fbPopup.click("#email");
    await fbPopup.keyboard.type(username);
    await fbPopup.click("#pass");
    await fbPopup.keyboard.type(password);

    await fbPopup.waitForSelector("#loginbutton");
    await fbPopup.click("#loginbutton");

    try {
        await page.waitForXPath('(/html/body/div[1]/div/div[1]/div/main/div[1]/div/div/div[1]/div[1]/div/div[3]/div[1]/div[1]/span[1]/div)');
        console.log("Logged into Tinder")
    } catch (error) {
        console.log(error);
        process.exit();
    }
    

    const [like] = await page.$x('(/html/body/div[1]/div/div[1]/div/main/div[1]/div/div/div[1]/div[1]/div/div[4]/div/div[4]/button)');
    const [dislike] = await page.$x('(/html/body/div[1]/div/div[1]/div/main/div[1]/div/div/div[1]/div[1]/div/div[4]/div/div[2]/button)');

    // const date = Math.floor(Date.now() / 1000);

    const randomSwipeLabel = ()=>{
        const random = Math.random()*3;
        if (random > 1) {
            page.screenshot({path: `images/website_${Date.now()}.png`, fullPage: true});
            page.waitForTimeout(2500);
            like.click();
        } else {
            dislike.click();
        }
    }

    setInterval(() => {
    page.click(randomSwipeLabel())
    }, 5000);
   
    
})();


/*
    await page.waitForTimeout(3000);
    if ((await page.$$("([@class='Td(u) Cur(p) Fw($medium) Tt(u)--ml focus-outline-style'])]")) !== null) {
    const [another] = await page.$$("([@class='Td(u) Cur(p) Fw($medium) Tt(u)--ml focus-outline-style'])]");
    another.click();
    await page.waitForTimeout(3000);
    await page.waitForXPath('(/html/body/div[2]/div/div/div[1]/div/div/div[3]/span/div[2]/button/span[2])');
    const [fbLogin] = await page.$x('(/html/body/div[2]/div/div/div[1]/div/div/div[3]/span/div[2]/button/span[2])');
    fbLogin.click();
    } else {
    await page.waitForXPath('(/html/body/div[2]/div/div/div[1]/div/div/div[3]/span/div[2]/button/span[2])');
    const [fbLogin] = await page.$x('(/html/body/div[2]/div/div/div[1]/div/div/div[3]/span/div[2]/button/span[2])');
    fbLogin.click();
}
// /html/body/div[2]/div/div/div[1]/div/div/div[3]/span/button
// /html/body/div[2]/div/div/div[1]/div/div/div[3]/span/button
// #o582438609 > div > div > div.Ta\(c\).H\(100\%\).D\(f\).Fxd\(c\).Pos\(r\) > div > div > div:nth-child(3) > span > button
// #o582438609 > div > div > div.Ta\(c\).H\(100\%\).D\(f\).Fxd\(c\).Pos\(r\) > div > div > div:nth-child(3) > span > button
// #c-879141390 > div > div > div.Ta\(c\).H\(100\%\).D\(f\).Fxd\(c\).Pos\(r\) > div > div > div:nth-child(3) > span > button

// Td(u) Cur(p) Fw($medium) focus-outline-style
// Td(u) Cur(p) Fw($medium) Tt(u)--ml focus-outline-style

// //*[@id="c-879141390"]/div/div/div[1]/div/div/div[3]/span/button
    /*
    await page.waitForTimeout(3000);
    await page.waitForXPath('(//*[@id="c-879141390"]/div/div/div[1]/div/div/div[3]/span/button)');
    const [another] = await page.$x('(//*[@id="c-879141390"]/div/div/div[1]/div/div/div[3]/span/button)');
    another.click();
    /html/body/div[2]/div/div/div[1]/div/div/div[3]/span/button
    
    await page.waitForTimeout(3000);
    if ((await page.$x('(//*[@id="c-879141390"]/div/div/div[1]/div/div/div[3]/span/button)')) !== null) {
    const [another] = await page.$x('(//*[@id="c-879141390"]/div/div/div[1]/div/div/div[3]/span/button)');
    another.click();

    await page.waitForTimeout(3000);
    await page.waitForXPath('(/html/body/div[2]/div/div/div[1]/div/div/div[3]/span/div[2]/button/span[2])');
    const [fbLogin] = await page.$x('(/html/body/div[2]/div/div/div[1]/div/div/div[3]/span/div[2]/button/span[2])');
    fbLogin.click();
     } 

    else {
    await page.waitForXPath('(/html/body/div[2]/div/div/div[1]/div/div/div[3]/span/div[2]/button/span[2])');
    const [fbLogin] = await page.$x('(/html/body/div[2]/div/div/div[1]/div/div/div[3]/span/div[2]/button/span[2])');
    fbLogin.click();
}

if ((await page.$('#buttonToClick')) !== null) {
   await page.click('#buttonToClick');
} else {
   await page.waitForSelector('#otherButton');
   await page.click('#otherButton');

   await page.waitForSelector('#buttonToClick');
   await page.click('#buttonToClick');
}
    await page.waitForTimeout(3000);
    await page.waitForXPath('(/html/body/div[2]/div/div/div[1]/div/div/div[3]/span/div[2]/button/span[2])');
    const [fbLogin] = await page.$x('(/html/body/div[2]/div/div/div[1]/div/div/div[3]/span/div[2]/button/span[2])');
    fbLogin.click();
*/