exports.saveCB = function (err, next) {
  if (err) {
    console.log(err);
    return next(err);
  }
};

exports.createError = function (errFor, msg) {
  const error = [
    {
      param: errFor,
      msg: msg,
    },
  ];
  return error;
};
