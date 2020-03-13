import jwt from 'jsonwebtoken';
const secret = process.env.AuthSecret;

class AuthService {
    generateJWTtoken(payload) {
        return new Promise((resolve, reject) => {
            jwt.sign(payload, secret, { expiresIn: '24hr' }, (err, token) => {
                if(err) reject(err);
                else resolve(token);
            })
        })
    }
    verifyUser(req, res, next) {
        try {
            const token = req.body.token || req.params.token || req.headers.authorization;
            const decoded = jwt.verify(token, secret);
            req.userData = decoded;
            next();
        } catch(error) {
            res.json({message: 'Authentication failed!'})
        }
    }
}

export default new AuthService;