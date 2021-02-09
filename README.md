# hassio

## TODO

 * [x] Create example for getting history data
 * [ ] Clearify if proxy is really needed for history data  
 * [ ] Create default logout 

### Example of GET history data
```
fetch("http://192.168.0.58:8123/api/history/period/2021-02-08T14:00:00.130Z?end_time=2021-02-08T17:00:00.130Z&minimal_response&filter_entity_id=sensor.temperature", {
  "headers": {
    "accept": "*/*",
    "accept-language": "de-DE,de;q=0.9,en-US;q=0.8,en;q=0.7",
    "authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiIwMDdjMzY2ZjEyMjg0MTY0YjU2NzdhN2MxZWY5MWM5YyIsImlhdCI6MTYxMjgwMjM1MCwiZXhwIjoxNjEyODA0MTUwfQ.T6mMim8DS57gf_2BF0xjKrkNnjrIGTlJ4SE8IDgxlxc",
    "sec-gpc": "1"
  },
  "referrer": "http://192.168.0.58:8123/history",
  "referrerPolicy": "same-origin",
  "body": null,
  "method": "GET",
  "mode": "cors",
  "credentials": "include"
});
```