import request from 'supertest';
import should from 'should';
import { expect } from 'chai';
import app from '../app';

let token;
describe('Authentication test: ', () => {
    const payload = { username: "hackerBayInc", password: "1234" };
    const emptyPayload = { username: "", password: "" };
    it('Login a user', (done) => {
        request(app)
            .post('/api/login')
            .set("Connection", "keep alive")
            .set("Content-Type", "application/json")
            .send(payload)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.have.property('token');
                res.body.should.have.property('status');
                res.body.should.have.property('user', "hackerBayInc");
            })
        done();
    })
    afterEach('To ensure everything is cleaned up', (done) => {
        done();
    });
    it('confirming token', (done) => {
        request(app)
            .post('/api/login')
            .set("Connection", "keep alive")
            .set("Content-Type", "application/json")
            .send(payload)
            .end((err, res) => {
                if (err) done(err);
                res.body.should.have.property('status')
                res.body.should.have.property('token')
                expect(res.status).to.equal(200)
                token = res.body.token;
                done();
            })
    })
    it('checking empty fields', (done) => {
        request(app)
            .post('/api/login')
            .set("Connection", 'keep alive')
            .set("Content-Type", "application/json")
            .send(emptyPayload)
            .end((err, res) => {
                if (err) done(err);
                expect(res.body.err).to.equal('login credentials is required!')
                expect(res.status).to.equal(401)
                done();
            })
    })
})

describe('JSON patcher: ', () => {
    const document = { "name": "best", "gender": "male" }, patch = [{ "op": "replace", "path": "/name", "value": "Augustine" }];
    it('confirming successful patch', (done) => {
        request(app)
            .patch('/api/jsonpatcher')
            .set("Authorization", `${token}`)
            .set("Content-Type", "application/json")
            .send({ document, patch })
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200)
                expect(res.body.result).to.have.property('name', 'Augustine');
                done();
            })
    })
})

describe('Generate thumbnail: ', function delayTime() {
    this.timeout(200000);
    it('cconfirm successful image return', (done) => {
        const imageUri = 'https://images.unsplash.com/photo-1558981001-792f6c0d5068?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
        request(app)
            .get(`/api/generateThumbnail?imageUrl=${imageUri}`)
            .set("Connection", "keep alive")
            .set("Authorization", `${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(200)
                expect(res.headers["content-type"]).to.equal("image/jpeg");
                done()
            })
    })

    it('checking invalid/empty image uri', (done) => {
        const imageUri = '';
        request(app)
            .get(`/api/generateThumbnail?imageUrl=${imageUri}`)
            .set("Connection", "keep alive")
            .set("Authorization", `${token}`)
            .end((err, res) => {
                if (err) done(err);
                expect(res.status).to.equal(404)
                done()
            })
    })
})