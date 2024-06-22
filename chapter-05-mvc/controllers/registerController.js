const userDB = {
    users: require('../model/users.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ status: false, error_message: `Username & Password are required.` });

    // check for duplicate username

    const duplicate = userDB.users.find(person => person.username === username);

    if (duplicate) return res.status(400).send({ status: false, error_message: `User with username:${username} already exists` }); // conflicat status code 409

    try {
        const hasedPassword = await bcrypt.hash(password, 10);
        const newUser = { 
            username,
            "roles": { "User": 3000 }, 
            "password": hasedPassword 
        };
        userDB.setUsers([...userDB.users, newUser]);
        await fsPromises.writeFile(
            path.join(__dirname, '..', 'model', 'users.json'),
            JSON.stringify(userDB.users)
        );
        console.log(userDB.users)
        res.status(201).send({ status: true, message: `New user ${username} created.` });
    } catch (err) {
        res.status(500).send({ status: false, error_message: error });
    }
}

module.exports = { handleNewUser }
