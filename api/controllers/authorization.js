import authService from '../services/authService';

class LoginController {
    login(req, res) {
        const payload = {
            username: req.body.username,
            password: req.body.password
        }
        if(!req.body.username || !req.body.password) res.status(401).send({err: 'login credentials is required!'})
        else {
            authService.generateJWTtoken(payload).then(token => {
                res.status(200).send({status: true, user: payload.username, token})
            }).catch(err => {
                res.json(err);
                req.status = 500;
            })
        }

    }
}

export default new LoginController();