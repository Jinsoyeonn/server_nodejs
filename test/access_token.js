(async () => {
    const RestClient = require('../dist/bootpay').RestClient
    RestClient.setConfig(
        '59bfc738e13f337dbd6ca48a',
        'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0=',
        'development'
    )

    // RestClient.setConfig(
    //     '65fbb57800be04001b0635c7',
    //     'oBByqBtRMsAyNJwrGmSZ5IjgUjnidAG+0sAzYhnEjgA=',
    //     'production'
    // )

    let response = await RestClient.getAccessToken()
    console.log(response)
})()
