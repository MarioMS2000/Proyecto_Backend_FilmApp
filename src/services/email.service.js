const emailService = {
  send(message) {
    return { sent: false, message };
  },
};

module.exports = emailService;
