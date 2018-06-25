const rp = require('request-promise-native');

class Fetcher
{
    constructor(url = null) {
        if(url != null) {
            return this.fetch(url);
        }
    }

    fetch(url) {
        return this.makeRequest(url);
    }

    async makeRequest(url) {
        return await rp({
            uri: url,
            resolveWithFullResponse: false
        });
    }

}

module.exports = Fetcher;