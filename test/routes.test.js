const app = require('../app')
const chai = require('chai')
const expect = chai.expect

chai.use(require('chai-http'))

describe('coffees Resources', function () {
  describe('POST /', function () {
    it('should create a coffee', function (done) {
      const coffee = { name: 'Chelbessa', region: 'Ethiopia' }
      chai.request(app)
        .post('/coffees')
        .send(coffee)
        .end((err, res) => {
          expect(res.status).to.equal(201)
          expect(res.body.data).to.be.an('object')
          expect(res.body.data.id).to.be.ok
          expect(res.body.data.name).to.equal(coffee.name)
          expect(res.body.data.region).to.equal(coffee.region)
          done()
        })
    })

    it('should return an error if name is missing', function (done) {
      const coffee = { region: 'Ethiopia' }
      chai.request(app)
        .post('/coffees')
        .send(coffee)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })

    it('should return an error if region is missing', function (done) {
      const coffee = { name: 'Chelbessa' }
      chai.request(app)
        .post('/coffees')
        .send(coffee)
        .end((err, res) => {
          expect(res.status).to.equal(400)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('GET /', function () {
    it('should retrieve a list of all the coffees', function (done) {
      chai.request(app)
        .get('/coffees')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const coffee = res.body.data[0]
          expect(coffee).to.be.an('object')
          expect(coffee.id).to.be.ok
          done()
        })
    })
  })

  describe('GET /:id', function () {
    it('should retrieve the single coffee specified', function (done) {
      chai.request(app)
        .get('/coffees')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const coffee = res.body.data[0]
          chai.request(app)
            .get(`/coffees/${coffee.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')

              expect(res.body.data.id).to.equal(coffee.id)
              done()
            })
        })
    })

    it('should return an error if the id does not match a coffee', function (done) {
      chai.request(app)
        .get('/coffees/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })

  describe('PUT /:id', function () {
    it('should update an existing coffee when all information is provided', function (done) {
      chai.request(app)
        .get('/coffees')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const coffee = res.body.data[0]
          const newInfo = { name: 'Karumandi', region: 'Kenya' }
          chai.request(app)
            .put(`/coffees/${coffee.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(200)
              expect(res.body.data).to.be.an('object')
              expect(res.body.data.id).to.be.ok
              expect(res.body.data.name).to.equal(newInfo.name)
              expect(res.body.data.region).to.equal(newInfo.region)
              done()
            })
        })

    })

    it('should return an error if name is missing', function (done) {
      chai.request(app)
        .get('/coffees')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const coffee = res.body.data[0]
          const newInfo = { region: 'Kenya' }
          chai.request(app)
            .put(`/coffees/${coffee.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })

    it('should return an error if region is missing', function (done) {
      chai.request(app)
        .get('/coffees')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const coffee = res.body.data[0]
          const newInfo = { name: 'Karumandi' }
          chai.request(app)
            .put(`/coffees/${coffee.id}`)
            .send(newInfo)
            .end((err, res) => {
              expect(res.status).to.equal(400)
              expect(res.body.error).to.be.an('object')
              expect(res.body.error.message).to.be.ok
              done()
            })
        })
    })
  })

  describe('DELETE /:id', function () {
    it('should remove the specified coffee', function (done) {
      chai.request(app)
        .get('/coffees')
        .end((err, res) => {
          expect(res.status).to.equal(200)
          expect(res.body.data).to.be.an('array')

          const coffee = res.body.data[0]
          chai.request(app)
            .delete(`/coffees/${coffee.id}`)
            .end((err, res) => {
              expect(res.status).to.equal(204)
              chai.request(app)
                .get(`/coffees/${coffee.id}`)
                .end((err, res) => {
                  expect(res.status).to.equal(404)
                  done()
                })
            })
        })
    })

    it('should return an error if the id is not found', function (done) {
      chai.request(app)
        .delete('/coffees/999')
        .end((err, res) => {
          expect(res.status).to.equal(404)
          expect(res.body.error).to.be.an('object')
          expect(res.body.error.message).to.be.ok
          done()
        })
    })
  })
})
