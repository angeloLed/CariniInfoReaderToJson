const fetcher = new (require('./lib/fetcher'));
const scraper = new (require('./lib/scraper'));
const fs = require('fs');


let data = [];
let year = '2018';
let cat = 0;

async function callFetch(year, cat) {
    const uri = 'https://www.comune.carini.pa.it/albo.asp?cat=' + cat + '&year=' + year
    console.log(uri);
    return await fetcher.fetch(uri);
}

function pageScraping(res) {
    return scraper.run(res);
}

function saveToFile(content) {
    fs.writeFile('./app/output/output' + (new Date().toISOString()) +'.json', content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
    }); 
}

// RUN
async function runCat(cat) {
    let promises = [];
    for(let year = 2014; year <= 2018; year++) {
	    promises.push(callFetch(year,cat));
    }

    return Promise.all(promises)
    .then(results => {
        results.forEach( async (html) => {
            let rows = await pageScraping(html);
            rows.splice(0, 1);
            data = data.concat(rows);
        });
    })
    .catch(error => console.log(error));
}

async function mainProcess() {
    for(let cat = 0; cat <= 29; cat++) {
	    await runCat(cat);
    }
    saveToFile(JSON.stringify(data));
}

mainProcess();