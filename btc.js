const http = new easyHTTP;

// Get Data

http.get('https://api.coindesk.com/v1/bpi/historical/close.json ', function(err, data) {
    if(err) {
        console.log(err);
    } else {
        const dataload = JSON.parse(data);
        const prices = dataload.bpi;
        const results = Object.keys(prices).map((key) => [(key), prices[key]]);
        let mean = 0;
        const meanday = results.length;
        let variance = 0;
        let sd = 0;
        const btctable = document.getElementById('btctable');
        let tablefill = `<table>
        <tr><th>Date</th><th>USD price</th><th>${meanday} Day Mean</th><th>1 SD</th></tr>`;
        // calculate mean
        for (let i=0; i<results.length; i++){
            mean += results[i][1];
        };
        mean = mean / meanday;
        // calculate 1 Standard Deviation
        for (let i=0; i<results.length; i++){
            variance += Math.pow(results[i][1] - mean, 2);
        };
        variance = variance / meanday;
        sd = Math.sqrt(variance);
        let x = meanday - 1;
        tablefill += `<tr><td>${results[x][0]}</td><td>${results[x][1]}</td><td>${mean.toFixed(2)}</td><td>${sd.toFixed(2)}</td></tr>`;
        tablefill += `</table>`;
        btctable.innerHTML = tablefill;
        /*
        console.log(results[30][0]);
        console.log(mean);
        console.log(variance);
        console.log(sd);
        */
    }
});