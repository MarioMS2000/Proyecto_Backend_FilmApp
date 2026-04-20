const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/sql/User')

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET


  const register = async (req, res) => {
    const { name, email, password, password2, role } = req.body

    if (!email || !name || !password) {
      return res.status(400).json({message: "Email, name and password required"})
    }

    const saferole = role === 'admin' ? 'admin' : 'user'

    if (password != password2) {
      return res.status(400).json({message: "password dosen't match"})
    }

    try {
      const existingUser = await User.findOne({where: { email }})

      if (existingUser) {
        return res.status(409).json({message: "Email already in use"})
      }

      const passwordHash = await bcrypt.hash(password, 10)

      const user = await User.create({
        name: name,
        email,
        password: passwordHash,
        role: saferole
      })

      return res.status(201).json({
        message: "User registered successfully",
         user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
         }

      })

    } catch(err) {
      return res.status(500).json({ message: "Database error"});

    }
  }

  const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({message: "Email and password required"})
    }

    try {
      const user = await User.findOne({where: {email}})

      if (!user) {
        return res.status(401).json({message: "Invalid email or password"})
      }

      const isValidPassword = await bcrypt.compare(password, user.password)

      if (!isValidPassword) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      const accessToken = jwt.sign({
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }, accessTokenSecret, {expiresIn: "20m"})

      res.cookie("accessToken", accessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 20 * 60 * 1000
      })

      return res.status(200).json({accessToken})

    } catch(err) {
      return res.status(500).json({ message: "Database error" });
    }
  }

  const logout = (_req, res) => {
    res.clearCookie("accessToken")
    return res.status(200).json({ message: "Sesion cerrada" })
  }

  const showRegister = (req, res) => {
    res.render("pages/register");
  }
  
  const showLogin = (req, res) => {
    res.render("pages/login");
  }



module.exports = {
  register,
  login,
  logout,
  showRegister,
  showLogin
}
