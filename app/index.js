const fetcher = new (require('./lib/fetcher'));
const scraper = new (require('./lib/scraper'));
const fs = require('fs');


let data = [];
const minYear = 2014;
const maxYear = 2018;
const minCategory = 0;
const maxCategory = 29;

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
async function runByCategory(cat) {
    let promises = [];
    for(let year = minYear; year <= maxYear; year++) {
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
    for(let cat = minCategory; cat <= maxCategory; cat++) {
	    await runByCategory(cat);
    }
    saveToFile(JSON.stringify(data));
}

mainProcess();