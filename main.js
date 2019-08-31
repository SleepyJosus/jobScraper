const puppeteer = require('puppeteer');
const $ = require('cheerio');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('https://www.indeed.com/jobs?q=full+stack+developer&l=Austin,+TX&jt=fulltime&explvl=entry_level&sort=date');
    const result = await page.evaluate(() => {
        let nodeArr = [];
        let titleArr = [];
        let query = document.querySelectorAll('div.jobsearch-SerpJobCard')
        for(let i = 0; i < query.length; i++) {
            query[i].childNodes.forEach((node, idx) => {
                if (node.className) {
                    if(node.className === 'title') {
                        let temp = {
                            title: node.childNodes[1].textContent,
                            href: node.childNodes[1].href
                        }
                        titleArr.push(temp);
                        // node.childNodes[1]
                    }
                    let temp = {
                        className: node.className,
                        child: idx 

                    }
                    nodeArr.push(temp);
                }
            })
        }        
        return titleArr;
    })
    console.log(result);
})()