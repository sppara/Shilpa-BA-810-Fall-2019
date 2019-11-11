// Test for the right status codes


// Test for the right data

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");

// Require the connection
require('./connection')

// Require the widget database schema
const widgetSchema = require('./SchemaWidgets')

const widgets = mongoose.model('Widget', widgetSchema)


//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let mainServer = require('./index');
let should = chai.should();


chai.use(chaiHttp);
//Our parent block
describe('Widgets', () => {
    beforeEach((done) => { //Before each test we empty the database
        widgets.deleteMany({}, (err) => {
            done();
        });
    });
    /*
      * TEST /widgets GET	Get all widgets
      */
    describe('/GET widgets', () => {
        it('it should GET all the widgets', (done) => {
            chai.request(mainServer)
                .get('/widgets')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.data.should.be.a('array');
                    res.body.data.length.should.be.eql(0);
                    done();
                });
        });
    });

    /*
          * TEST /widgets	POST a widget
        */

    describe('/POST widget', () => {
        it('it should not POST a widget without woo field', (done) => {
            let widget = {
                foo: "Hi!"
            }
            chai.request(mainServer)
                .post('/widgets')
                .send(widget)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.errors.should.have.property('woo');
                    done();
                });
        });

        it('it should not POST a widget if woo is not a number', (done) => {
            let widget = {
                foo: "Hi!",
                woo: "Akeem"
            }
            chai.request(mainServer)
                .post('/widgets')
                .send(widget)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.errors.woo.should.have.property('type').eql('required number');
                    done();
                });
        });

        it('it should POST a widget ', (done) => {
            let widget = {
                foo: "Alfred",
                woo: 21,
            }
            chai.request(mainServer)
                .post('/widgets')
                .send(widget)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('status').eql('success');
                    res.body.data.should.be.a('object');
                    res.body.data.should.have.property('foo').eql('Alfred');
                    res.body.data.should.have.property('woo').eql(21);
                    done();
                });
        });

    });
});