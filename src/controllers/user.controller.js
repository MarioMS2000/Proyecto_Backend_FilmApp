
const getProfile = (req, res) => {
  const user = req.user
  res.render("pages/users", {message: "", user});
}

module.exports = {getProfile};
