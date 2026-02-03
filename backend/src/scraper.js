import puppeteer from "puppeteer";

async function fetchContent(page,elements,elementsContent){
    for(const element of elements){
        const content=await page.evaluate((el)=>{
            return el.innerText;
        },element);
        elementsContent.push(content);
    }
}

async function scrapEvents(){
    const browser=await puppeteer.launch();
    const page=await browser.newPage();
    await page.goto("https://www.darlingharbour.com/whats-on",{
        waitUntil:"networkidle2"
    });

    const linksElement=await page.$$(".tile .tile__content .tile__readmore");
    const dateElements=await page.$$(".tile .tile__content .date-tile");
    const titleElements=await page.$$(".tile .tile__content .tile__title");
    const descriptionElements=await page.$$(".tile .tile__content .tile__description");

    let eventURLs=[];
    for(const link of linksElement){
        const url=await page.evaluate(el=>el.href,link);
        eventURLs.push(url);
    }
    const dates=[];
    await fetchContent(page,dateElements,dates);
    const titles=[];
    await fetchContent(page,titleElements,titles);
    const descriptions=[];
    await fetchContent(page,descriptionElements,descriptions);
    await browser.close();

    let events=[];
    for(let i=0;i<eventURLs.length;i++){
        events.push({
            title:titles[i],
            date:dates[i],
            eventUrl:eventURLs[i],
            description:descriptions[i],
            sourceWebsite:"https://www.darlingharbour.com/whats-on"
        });
    }
    return events;
}

export default scrapEvents;