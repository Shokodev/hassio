const moment = require('moment');
const axios = require('axios');

//TODO Should be without proxy possible => Adding cors orgigins to Homeassistant 
const proxy = "https://sharker.andreas-vogt.ch/rd"

class HistoryDataManager {

    constructor() {
        this.parser = new Map();
        // Add Librarys to parser 
        this.parser.set("apex", this.apex);
        this.dateparser = moment.locale('de-ch');
    }

    /**
     * To Fetch the history data 
     * @param {*Date in ISO String} from 
     * @param {*Date in ISO String} to 
     * @param {*Entity ID as String from hass} entity_id
     * @param {*Pass in options to parse data into chart data per Lib (OPTIONAL)} options 
     */
    async getHistoryData(from, to, entity_id, options = {}, callback) {
        const { access_token, hassUrl } = this.getAccessData();
        const url = `${hassUrl}/api/history/period/${from}?end_time=${to}&minimal_response&filter_entity_id=${entity_id}`;
        const result = await axios.post(proxy, {
            url: url,
            access_token: access_token,
        });
        let data = options ? this.parser.get(options.chartLibrary)(result.data[0]) : result.data[0];
        callback(data);
    }

    getAccessData() {
        try {
            return JSON.parse(localStorage.getItem('auth'));
        } catch (e) {
            console.error(e);
        }
    }

    apex(rawData) {
        let error = null;
        let data = [];
        let meta;
        try {
            meta = rawData[rawData.length - 1]
            rawData.pop();
            rawData.shift();
            rawData.forEach(element => {
                data.push([new Date(element.last_changed).getTime(), element.state]);
            });
        } catch (err) {
            error = `This item may has no historical data or couldn't be loaded!`
            console.error(error);
        }
        return {
            name: error ? "" : meta.attributes.friendly_name,
            unit: error ? "" : meta.attributes.unit_of_measurement,
            data: data,
            error: error
        }
    }
}
export default HistoryDataManager;