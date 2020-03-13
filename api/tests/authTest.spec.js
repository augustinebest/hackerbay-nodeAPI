import request from 'supertest';
import should from 'should';
import app from '../app';

describe('Authentication test', () => {
    it('Login a user and create a jwt token', (done) => {
        request(app)
            .post('/api/login')
            .set("Connection", "keep alive")
            .set("Content-Type", "application/json")
            .send({ username: "hackerBayTest", password: "0000" })
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.have.property('token');
                res.body.should.have.property('user', "hackerBayTest");
            })
        done();
    })
})