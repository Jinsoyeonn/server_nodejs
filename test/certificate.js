(async () => {
    const RestClient = require('../dist/bootpay').RestClient
    RestClient.setConfig(
        '65fbb57800be04001b0635c7',
        'oBByqBtRMsAyNJwrGmSZ5IjgUjnidAG+0sAzYhnEjgA=',
        'development'
    )
    let token = await RestClient.getAccessToken()
    if (token.status === 200) {
        let response
        try {
            response = await RestClient.certificate('1234')
        } catch (e) {
            return console.log(e)
        }
        console.log(response)
    }
})()