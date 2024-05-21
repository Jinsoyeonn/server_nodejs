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
            response = await RestClient.reserveSubscribeBilling({
                billingKey: '5f97b8a40f606f03e8ab32a0',
                itemName: '테스트',
                price: 1000,
                orderId: (new Date()).getTime(),
                userInfo: {
                    username: '테스트',
                    phone: '01000000000'
                },
                feedbackUrl: 'https://dev-api.bootpay.co.kr/callback',
                feedbackContentType: 'json',
                schedulerType: 'oneshot',
                executeAt: ((new Date()).getTime() / 1000) + 5
            })
        } catch (e) {
            return console.log(e)
        }
        console.log(response)
    }
})()