const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password)
        return res.status(400).json({ status: false, error_message: `Username & Password are required.` });

    // check for duplicate username
    const duplicate = await User.find({username}).exec();
    if (duplicate.length) return res.status(400).send({ status: false, error_message: `User with username: ${username} already exists` }); // conflicat status code 409

    try {
        const hasedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ username, 'password': hasedPassword });
        
        res.status(201).send({ status: true, message: `New user ${newUser.username} created.` });
    } catch (err) {
        res.status(500).send({ status: false, error_message: error });
    }
}

module.exports = { handleNewUser }
