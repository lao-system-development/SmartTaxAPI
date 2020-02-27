
var soap = require('soap');
const config = require('../config/dotenvconfig');
const axios = require('axios')
module.exports = {
    checkPayment

}

let xmls = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:asy="http://www.asycuda.org">\
                    <soapenv:Header/>\
                    <soapenv:Body>\
                    <asy:getPaymentAmount>\
                            <officeCode>"R5C10"</officeCode>\
                            <declarantCode>"990000821"</declarantCode>\
                            <companyCode>"990000821"</companyCode>\
                            <declarationsToBePaid>\
                                <amountToBePaid></amountToBePaid>\
                                <registrationYear>"2020"</registrationYear>\
                                <registrationSerial>"I"</registrationSerial>\
                                <registrationNumber>"1"</registrationNumber>\
                            </declarationsToBePaid>\
                                                </asy: getPaymentAmount >\
                    </soapenv:Body>\
                    </soapenv:Envelope>';




async function checkPayment(req, res, next) {
    var soapWSDL = 'http://103.13.88.93:8081/asywspay/WSDeclarationPayment?wsdl';
    soap.createClient(soapWSDL, {}, (err, client) => {
        if (err) {
            console.error("An error has occurred creating SOAP client: ", err);
        } else {
            client.setSecurity(new soap.BasicAuthSecurity(config.tax_user, config.tax_password));
            var description = client.describe();
            console.log("Client description:", description);
            var method = client['checkPayment'];
            method({ officeCode: 'R5C10', declarantCode: '990000821' }, {}, (err, result, envelope, soapHeader) => {

                return res.send(envelope)
            })
        }
    })

}

