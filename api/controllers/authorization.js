import authService from '../services/authService';

class LoginController {
    login(req, res) {
        const payload = {
            username: req.body.username,
            password: req.body.password
        }
        authService.generateJWTtoken(payload).then(token => {
            res.json({status: true, user: payload.username, token})
        }).catch(err => {
            res.json(err);
        })

    }
}

export default new LoginController();