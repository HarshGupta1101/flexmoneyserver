const { validateData,doesUserExist } = require('./userValidation');
const { validatePaymentData } = require('./paymentValidation');

module.exports = { validateData,validatePaymentData,doesUserExist };
