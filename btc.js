const http = new easyHTTP;

// Get Data

http.get('https://api.coindesk.com/v1/bpi/historical/close.json ', function(err, data) {
    if(err) {
        console.log(err);
    } else {
        let dataload = JSON.parse(data);
        console.log(dataload.bpi);

    }
});