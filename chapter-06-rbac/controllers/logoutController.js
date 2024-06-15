const path = require('path');
const fsPromises = require('fs').promises;
const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const handleLogout = async (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
    const refreshToken = cookies.jwt;
    const foundUser = userDB.users.find(person => person.refreshToken === refreshToken);
    const otherUser = userDB.users.filter(person => person.refreshToken !== refreshToken);
    if (!foundUser) return res.sendStatus(204); // Forbidden
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    delete foundUser.refreshToken;
    userDB.setUsers([...otherUser, foundUser]);

    await fsPromises.writeFile(
        path.join(__dirname, '..', 'model', 'users.json'),
        JSON.stringify(userDB.users)
    )
    res.json({ status: true, message: 'Logged out successfully' });
}   

module.exports = { handleLogout }