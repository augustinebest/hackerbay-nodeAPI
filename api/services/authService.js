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
}

export default new AuthService;