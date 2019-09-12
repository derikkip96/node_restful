const jwt = require('jsonwebtoken');
const config = require('../config/sckey')

module.exports = (req, res, next) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const decodedToken = jwt.verify(token, config.secret);
		const userId = decodedToken.id;
		if (req.body.id && req.body.id !== userId) {
			return handleError(res, 500, 'Invalid user ID');
		} else {
			next();
		}
	} catch {
		res.status(401).json({
			 message: 'Invalid request'
		});
	}
};
module.exports.getUserId = (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	if (!token) {
		return handleError(res, 500, 'No token provided!');
	}
	jwt.verify(token, config.key, function (err, decoded) {
		if (err) {
			return handleError(res, 500, 'Invalid user ID');
		}
		id = decoded.id;
	});
	return id;
};

const handleError = function handleError(res, code, message) {
	console.log("Error............" + message)
	res.status(code).json({
		errors: [{
			success: false,
			msg: message,
		}, ],
	});
};
