// validate cardno/cvv/otp
const validate = (entity, maxlength) => {
  if (typeof entity === 'string') {
    if (entity.length > entity.trim().length) return false;
    if (!(!isNaN(parseInt(entity)) && isFinite(entity))) return false;
  } else {
    entity = entity.toString();
  }
  if (entity.length != maxlength) return false;
  return true;
};

// validate amount
const validateAmount = (amount) => {
  if (typeof amount === 'string') {
    if (amount.length > amount.trim().length) return false;
    if (!(!isNaN(parseInt(amount)) && isFinite(amount))) return false;
    amount = parseInt(amount);
  }
  if (amount != 500) return false;
  return true;
};

// validating input data from payments page
const validatePaymentData = (req, res, next) => {
  const { cardno, cvv, amount, otp } = req.body;
  const { id } = req.params;

  if (
    !id ||
    !validate(cardno, 16) ||
    !validate(cvv, 3) ||
    !validateAmount(amount) ||
    !validate(otp, 6)
  ) {
    return res.status(422).json({
      error: 'Something went wrong',
    });
  }
  next();
};

module.exports = { validatePaymentData };
