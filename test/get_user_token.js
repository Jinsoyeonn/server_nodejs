(async () => {
    const RestClient = require('../dist/bootpay').RestClient
    RestClient.setConfig(
        '65fbb57800be04001b0635c7',
        'oBByqBtRMsAyNJwrGmSZ5IjgUjnidAG+0sAzYhnEjgA=',
        'development'
    )
    const token = await RestClient.getAccessToken()
    if (token.status === 200) {
        let result
        try {
            result = await RestClient.requestUserToken({
                userId: 'gosomi'
            })
        } catch (e) {
            return console.log(e)
        }
        console.log(result)
    }
})()