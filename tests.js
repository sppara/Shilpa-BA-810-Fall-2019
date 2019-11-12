// Test for the right status codes


// Test for the right data

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

// Require the connection
require('./connection')

// Require the gadget database schema
const gadgetSchema = require('./SchemaGadgets')

const gadgets = mongoose.model('Gadget', gadgetSchema)


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let mainServer = require('./index');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Gadgets', () => {
    beforeEach((done) => { //Before each test we empty the database
        gadgets.deleteMany({}, (err) => {
            done();
        });
    });
    /*
      * TEST /gadgets GET	Get all gadgets
      */
    describe('/GET gadgets', () => {
        it('it should GET all the gadgets', (done) => {
            chai.request(mainServer)
                .get('/gadgets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
          * TEST /gadgets	POST a gadget
        */

    describe('/POST gadget', () => {
        it('it should not POST a gadget without Hoo field', (done) => {
            let gadget = {
                Yoo: "Hi!"
            }
            chai.request(mainServer)
                .post('/gadgets')
                .send(gadget)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.errors.should.have.property('Hoo');
                    done();
                });
        });

        it('it should not POST a gadget if Hoo is not a number', (done) => {
            let gadget = {
                Yoo: "Siddu",
                Hoo: "Priya"
            }
            chai.request(mainServer)
                .post('/gadgets')
                .send(gadget)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.errors.Hoo.should.have.property('type').eql('required number');
                    done();
                });
        });

        it('it should POST a gadget ', (done) => {
            let gadget = {
                Yoo: "Priya",
                Hoo: 19,
            }
            chai.request(mainServer)
                .post('/gadgets')
                .send(gadget)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('Yoo').eql('Priya');
                    res.body.data.should.have.property('Hoo').eql(19);
                    done();
                });
        });

    });
});