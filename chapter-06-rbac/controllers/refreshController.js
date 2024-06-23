const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../model/User');

const handleRefreshToken = (req, res) => {
    const cookies = req.cookies;

    if (!cookies?.jwt) return res.sendStatus(401); // Unauthorized
    const refreshToken = cookies.jwt;
    const foundUser = User.find({ refreshToken }).exec();
    if (!foundUser) return res.sendStatus(403); // Forbidden

    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            const accessToken = jwt.sign(
                { username: decoded.username },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '30s' } // 30 seconds for now on production you can increase it.
            )

            res.json({ status: true, accessToken });
        }
    )
}

module.exports = { handleRefreshToken }