function success(data = null, message = "OK") {
  return { ok: true, message, data };
}

function error(message = "Error", details = null) {
  return { ok: false, message, details };
}

module.exports = {
  success,
  error,
};
