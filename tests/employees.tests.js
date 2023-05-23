const request = require('supertest');
const app = require('../app');
const assert = require('assert');
const http = require('http');
const testServer = http.createServer(app);

request(testServer)
    .get('/api/employees')
    .expect(200)
    .end(function (err, res) {
        if (err) throw err;
        assert.equal(res.body.length, 6);
    });

request(testServer)
    .get('/api/employees?user=true')
    .expect(200)
    .end(function (err, res) {
        if (err) throw err;        
        assert.equal(res.body.length, 4);
        assert.equal(res.body[0].name, 'Sue');
        assert.equal(res.body[1].name, 'Willy');
        assert.equal(res.body[2].name, 'Steve');
        assert.equal(res.body[3].name, 'Martin');
    });


