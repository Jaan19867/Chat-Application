const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports.register = async (req, res, next) => {
try{
    const { username, email, password } = req.body;

    // Check if the username already exists
    const usernameCheck = await User.findOne({ username });
    if (usernameCheck) {
      return res.json({ message: "Username Already Exists", status: false });
    }
  
    // Check if the email already exists
    const emailCheck = await User.findOne({ email });
    if (emailCheck) {
      return res.json({ message: "Email Already Exists", status: false });
    }
  
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
  
    // Create a new user
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
  
    // Delete the password field from the user object before sending the response
    delete user.password;
  
    return res.json({ status: true, user });
} catch(ex){
    next(ex);
}
};




module.exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
  
      // Check if the username already exists
      const user = await User.findOne({ username });
  
      if (!user) {
        return res.json({ message: "Incorrect Username or password", status: false });
      }
  
      const isPasswordValid = await bcrypt.compare(password, user.password);
  
      if (!isPasswordValid) {
        return res.json({ message: "Incorrect Username or password", status: false });
      }
  
      // If username and password are correct, remove the password field from the user object
      delete user.password;
  
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };