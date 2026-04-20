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

  /* const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
      res.status(400).json({message: "Email and password required"})
    }
  } */

  const showRegister = (req, res) => {
    res.render("pages/register");
  }
  
  const showLogin = (req, res) => {
    res.render("pages/login");
  }

const authController = {
  register,
  login,
  showRegister,
  showLogin,
};

module.exports = {
  register,
  // login,
  showRegister,
  showLogin
}
