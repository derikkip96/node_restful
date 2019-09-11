let jwt = require('jsonwebtoken');
let config = require('./../config/sckey');

const validateAccessToken = (req, res) => {
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
	if (!token){
        return handleError(res, 401, 'Token no provided');
    } 
	let id;
	jwt.verify(token,config.secret, function(err, decoded) {
		if (err) return handleError(res, 500, 'Failed to authenticate');
		id = decoded.id;
	});

	return id;
};

/* return an id or empty string */
const getUserId = (req, res) => {
	let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
      }
	if (!token) return '';
	jwt.verify(token, config.key, function(err, decoded) {
		if (err) return '';
		id = decoded.id;
	});

	return id;
};

/* return an id or empty string */
const decodeUserId = (token) => {

	if (!token) return '';
	jwt.verify(token, config.key, function (err, decoded) {
		if (err) return '';
		id = decoded.id;
	});

	return id;
};


module.exports = {
	validateAccessToken: validateAccessToken,
	getUserId: getUserId,
	decodeUserId:decodeUserId,
};