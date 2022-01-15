const jwt = require("jsonwebtoken")

const config = {
    JWT_SECRET : 'p4sta.w1th-b0logn3s3-s@uce',
    JWT_ALGO : 'RS256'
}

console.log(config)

const payload = {
    user: {
        id: "6167ed52cd25ac7c44461b67",
    },
}

const accessToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: 36000 });
const refreshToken = jwt.sign(payload, config.JWT_SECRET, { expiresIn: 36000 * 24 * 14 });

console.log(accessToken);
console.log(refreshToken);

jwt.verify(accessToken, config.JWT_SECRET, function(err, decoded) {
    console.log(decoded);

    console.log(Math.floor(+ new Date() / 1000))
    if (err) {
        console.log(err);
    }
});

const decoded = jwt.decode(accessToken);
console.log(decoded);
