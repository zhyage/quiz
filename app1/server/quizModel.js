/**
 * Created by vdmc34 on 2017/2/4.
 */
const mongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');
const _ = require('underscore');
const mongoose = require('mongoose');

const questionTypeEnum = {
    SINGLE : 1,
    MULTIPLE : 2
};
let options = { promiseLibrary: require('bluebird')};
let conn = mongoose.createConnection("mongodb://localhost:27017/quizPool", options);

conn.on('error', console.error.bind(console, 'connection error:'));

conn.once('open', function(){
    console.info("connect to DB success");
})

let Schema = mongoose.Schema;

let quizSchema = new Schema ({
    questionType: {type: Number, required: true},
    question: {type: String, required: true},
    options: [{type: String}],
    answer: [{type: String}],
    institution: [{type: Number}],
    created_at: Date,
    updated_at: Date
});

quizSchema.methods.verifyQuiz = function(){
    console.info("questionType : " + this.questionType);
    console.info("question : " + this.question);
    console.info("options : " + this.options);
    console.info("answer : " + this.answer);
    console.info("length of options : " + this.options.length);
    console.info("length of answer : " + this.answer.length);
    return true;
};

let Quiz = conn.model('Quiz', quizSchema);

module.exports.Quiz = Quiz;
module.exports.quizSchema = quizSchema;
module.exports.questionTypeEnum = questionTypeEnum;