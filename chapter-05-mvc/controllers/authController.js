const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleLogin = async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) res.status(400).send({ status: false, error_message: `Username & Password are required` });
    const user = userDB.users.find(person => person.username == username);
    if (!user) return res.status(400).json({ status: true, error_message: 'Invalid username or password' });
    try {
        const match = await bcrypt.compare(password, user.password);
        if (match) {
            return res.status(200).json({ status: true, message: 'Login successful' });
        } else {
            return res.status(400).json({ status: false, error_message: 'Invalid username or password' });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, error_message: error });
    }
}

module.exports = { handleLogin }