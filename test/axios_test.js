
(async () => {
    const RestClient = require('../dist/bootpay').RestClient
    RestClient.setConfig(
        '65fbb57800be04001b0635c7',
        'oBByqBtRMsAyNJwrGmSZ5IjgUjnidAG+0sAzYhnEjgA=',
        'development'
    )
    let response = await RestClient.getAccessToken()
    // console.log(response)
    const axios = require('axios')
    try {
        response = await axios.post("https://dev-api.bootpay.co.kr/request/token.json", {
            application_id: '59bfc738e13f337dbd6ca48a',
            private_key: 'pDc0NwlkEX3aSaHTp/PPL/i8vn5E/CqRChgyEp/gHD0='
        })
        console.log(response)
    } catch(e) {
        console.log(e.response.data)
    }
})()