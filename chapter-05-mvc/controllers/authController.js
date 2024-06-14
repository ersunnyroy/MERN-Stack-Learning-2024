const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();



const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) res.status(400).send({ status: false, error_message: `Username & Password are required` });
    const user = userDB.users.find(person => person.username == username);
    if (!user) return res.status(400).json({ status: true, error_message: 'Invalid username or password' });
    try {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            // create JWT
            const accessToken = await jwt.sign(
                { username: user.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' }
            );

            const refreshToken = await jwt.sign(
                { username: user.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );

            // save refresh token with current user 
            const otherUsers = userDB.users.filter(person => person.username !== user.username);
            const currentUser = { ...user, refreshToken };
            console.log('other users',otherUsers);
            userDB.setUsers([...otherUsers, currentUser]);

            await fsPromises.writeFile(
                path.join(__dirname, '..', 'model', 'users.json'),
                JSON.stringify(userDB.users)
            )

            await fsPromises.writeFile(
                path.join(__dirname, '..', 'model', 'users.json'),
                JSON.stringify(userDB.users)
            )

            return res.status(200).json({ status: true, message: 'Login successful', accessToken });
        } else {
            return res.status(400).json({ status: false, error_message: 'Invalid username or password' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error_message: error });
    }
}

module.exports = { handleLogin }