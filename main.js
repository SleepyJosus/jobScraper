const puppeteer = require('puppeteer');
const $ = require('cheerio');
<<<<<<< HEAD
=======
const fs = require('fs');
// CHANGE THIS LINE TO CHANGE WHAT INDEED PAGE TO SCRAPE
const url = 'https://www.indeed.com/jobs?q=Filter&l=Austin%2C+TX&ts=1567286113421&pts=1567277980887&rq=1&fromage=last&newcount=340';
>>>>>>> 52b4d2b520d12596cf49e2f0ff540383594052a7

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(url);
    const result = await page.evaluate(() => {
<<<<<<< HEAD
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
=======
        function cleanString(str) {
            str = str.split('');
            if(str[1] == 'n') str.splice(0, 2);
            str = str.join('').toString().trim();
            return str;
        }
        let titleArr = [];
        for(let i = 0; i < document.querySelectorAll('.title a').length; i++) {
            let job = {
                title: cleanString(document.querySelectorAll('.title a')[i].textContent),
                company: cleanString(document.querySelectorAll('.company')[i].textContent),
                desc: cleanString(document.querySelectorAll('.summary')[i].textContent),
                location: cleanString(document.querySelectorAll('.location')[i].textContent),
                ratings: cleanString(document.querySelectorAll('.slNoUnderline')[i] == undefined ? 'N/A': document.querySelectorAll('.slNoUnderline')[i].textContent),
                link: 'https://www.indeed.com' + document.querySelectorAll('.title a')[i].getAttribute('href'),
            }
            titleArr.push(job);
        }
>>>>>>> 52b4d2b520d12596cf49e2f0ff540383594052a7
        return titleArr;
    })
    fs.writeFile('jobs.json', JSON.stringify(result), 'utf8', (err) => {
        if(err) console.error(err);
    })
})()