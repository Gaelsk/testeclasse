const bcrypt = require('bcryptjs')
const User = require('../models/User');

module.exports =  async user => {
    const password = await bcrypt.hash(user.password, 10);
    const newUser = await new User({...user, password}).save();
    return newUser
}