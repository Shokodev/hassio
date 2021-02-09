const proxy = "https://sharker.andreas-vogt.ch/rd";
const axios = require('axios');

class HistoryData {
    /**
     * To Fetch the history data 
     * @param {*Date in ISO String} from 
     * @param {*Date in ISO String} to 
     * @param {*Entity ID as String from hass} entity_id 
     */
    static getHistoryData(from, to, entity_id) {
        const { access_token, hassUrl } = getAccessData();
        return new Promise((resolve, reject) => {
            const url = `${hassUrl}/api/history/period/${from}?end_time=${to}&minimal_response&filter_entity_id=${entity_id}`;
            axios.post(proxy, {
                    url: url,
                    access_token: access_token,
                })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                })
        });
    }

}
export default HistoryData;

function getAccessData() {
    try {
        return JSON.parse(localStorage.getItem('auth'));
    } catch (e) {
        console.error(e);
    }
}