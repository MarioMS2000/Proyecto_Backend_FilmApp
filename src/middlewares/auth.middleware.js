const jwt = require('jsonwebtoken')

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET

const isAuth = (req, res, next) => {
  const token = req.cookies?.accessToken || req.headers.authorization?.split(" ")[1]

  if (!token) {
    return res.status(401).json({message: "Unauthorized"})
  }

  jwt.verify(token, accessTokenSecret, (err, user) => {
    if (err) {
      return res.status(403).json({message: "Forbidden"})
    }

    req.user = user
    return next()
  })
}



module.exports = {
  isAuth
}
