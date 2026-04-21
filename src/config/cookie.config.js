const accessTokenCookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 20 * 60 * 1000,
};

module.exports = {
  accessTokenCookieOptions,
};
