const cheerio = require('cheerio');

class Scraper
{


    run(html) {
        let rows = [];

        const $ = cheerio.load(html);
       
        $('table.albo tbody tr').each(function() {
            let children = $(this).children();
            if( children.length == 10 ) { //the table that we need has 10 cells
                rows.push({
                    'nprog': $(children[0]).text().trim(),
                    'dataInizio': $(children[1]).text().trim(),
                    'dataFine': $(children[2]).text().trim(),
                    'ente': $(children[3]).text().trim(),
                    'natura': $(children[4]).text().trim(),
                    'ufficio': $(children[5]).text().trim(),
                    'nAtto': $(children[6]).text().trim(),
                    'dataAtto': $(children[7]).text().trim(),
                    'oggetto': $(children[8]).text().trim(),
                    'doc': $(children[9]).find('a').attr('href')
                });
            }
        });
    
        return rows;
    }
}

module.exports = Scraper;