const path = require('path');
/* const fsPromises = require('fs').promises;
const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
} */

const User = require('../model/User');

const handleLogout = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
    const refreshToken = cookies.jwt;
    const foundUser = User.find({ refreshToken }).exec();

    if (!foundUser) return res.sendStatus(204); // Forbidden
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    delete foundUser.refreshToken;
    await foundUser.save();

    res.json({ status: true, message: 'Logged out successfully' });
}

module.exports = { handleLogout }