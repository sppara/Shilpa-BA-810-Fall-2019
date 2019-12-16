const mongoose = require("mongoose"),
    Student = require('../app/models/students'),
    Course = require('../app/models/courses');

//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index.js');
let should = chai.should();

chai.use(chaiHttp);


it('it should GET the index.html file', (done) => {
    chai.request(server)
        .get('/index.html')
        .end((err, res) => {
            res.should.have.status(200);
            res.should.be.html;
            done();
        });
});

it('it should return 404', (done) => {
    chai.request(server).get('/index2.html')
        .end((err, res) => {
            res.should.have.status(404);
            done();
        });
});

describe('Student', () => {
    beforeEach((done) => {
        Student.remove({}, (err) => {
            done();
        });
    });

    it('it should POST a student', (done) => {
        var student = {
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "woo@hoo.com",
            "password": "pass"
        }
        chai.request(server)
            .post('/api/students')
            .send(student)
            .end((err, res) => {
                res.should.have.status(201);
                res.body.should.have.property('firstName');
                res.body.firstName.should.be.a('string');
                res.body.firstName.should.equal('Jane');
                done();
            });
    });

    it('it should not POST a student without email field', (done) => {
        var student = {
            "firstName": "Jane",
            "lastName": "Doe",
            "password": "pass"
        }
        chai.request(server)
            .post('/api/students')
            .send(student)
            .end((err, res) => {
                res.should.have.status(500);
                done();
            });
    });

    it('it should GET all the students', (done) => {
        var student = new Student({
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "JaneDoe@hoo.com",
            "password": "pass"
        });
        student.save((err, student) => {
            chai.request(server)
                .get('/api/students')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(1);
                    done();
                });

        });
    });

    it('it should GET a student by the given id', (done) => {
        var student = new Student({
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "JaneDoe@hoo.com",
            "password": "pass"
        });

        student.save((err, student) => {
            chai.request(server)
                .get('/api/students/' + student._id)
                .send(student)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('firstName');
                    res.body.should.have.property('lastName');
                    res.body.should.have.property('email');
                    res.body.should.have.property('password');
                    res.body.should.have.property('_id').eql(student._id.toString());
                    done();
                });
        });

    });

    it('it should UPDATE a student', (done) => {

        var student = new Student({
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "yoo@hoo.com",
            "password": "pass"
        });

        student.save((err, student) => {
            chai.request(server)
                .put('/api/students/' + student._id)
                .send({
                    "_id": student._id,
                    "firstName": "Joey",
                    "lastName": "Doe",
                    "email": "yoo@hoo.edu",
                    "password": "pass"
                }).end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('email').eql('yoo@hoo.edu');
                    res.body.should.have.property('firstName').eql('Joey');
                    done();
                });
        });
    });

    it('it should DELETE a student given the id', (done) => {
        var student = new Student({
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "five@hoo.com",
            "password": "pass"
        });
        student.save((err, student) => {
            chai.request(server)
                .delete('/api/students/' + student.id)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

    // Create and save student ID 
    var STUDENT_ID;

    describe('Course', () => {
        beforeEach((done) => {
            Course.remove({}, (err) => {
                done();
            });
        });

        var student = new Student({
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "JaneDoe@hoo.com",
            "password": "pass"
        });
        
        student.save((err, student) => {
            STUDENT_ID = student._id;
        });

        //Insert tests here
        it('it should POST a course', (done) => {
            var course = {
                "studentId": STUDENT_ID,
                "course": "This is my Course"
            }
            chai.request(server)
                .post('/api/courses')
                .send(course)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have.property('course');
                    res.body.course.should.be.a('string');
                    res.body.course.should.equal('This is my Course');
                    done();
                });
        });

    });



});