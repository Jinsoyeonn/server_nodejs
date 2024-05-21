(async () => {
    const RestClient = require('../dist/bootpay').RestClient

    // RestClient.setConfig(
    //     '59bfc738e13f337dbd6ca48a',
    //     'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0=',
    //     'development'
    // )
    RestClient.setConfig(
        '65fbb57800be04001b0635c7',
        'oBByqBtRMsAyNJwrGmSZ5IjgUjnidAG+0sAzYhnEjgA=',
        'production'
    )
    const token = await RestClient.getAccessToken()

    if (token.status === 200) {
        let result
        try {
            result = await RestClient.verify('5f0d42a7d111902931bea5ff')
        } catch (e) {
            return console.log(e)
        }
        console.log(result)
    }
})()