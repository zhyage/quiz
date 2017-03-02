/**
 * Created by vdmc34 on 2017/2/4.
 */
const mongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');
const _ = require('underscore');
const mongoose = require('mongoose');
const quizModel = require('./quizModel');

const paperStatusEnum = {
    PREPARING : 1,
    READY : 2
};

let conn = mongoose.createConnection("mongodb://localhost:27017/examinationPaperPool");

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function(){
    console.info("connect to DB success");
})

let Schema = mongoose.Schema;

let examinationPaperSchema = new Schema ({
    paperName: {type: String, required: true},
    prepareStatus: {type: Number, required: true},
    quizs: [ {quiz: {type: quizModel.quizSchema}} ],
    created_at: Date,
    updated_at: Date
});

examinationPaperSchema.methods.verifyPaper = function(){
    console.info("paperName : " + this.paperName);
    console.info("prepareStatus : " + this.prepareStatus);
    console.info("quizs : " + this.quizs);
    return true;
};

let examinationPaper = conn.model('examinationPaper', examinationPaperSchema);

module.exports.examinationPaper = examinationPaper;
module.exports.examinationPaperSchema = examinationPaperSchema;
module.exports.paperStatusEnum = paperStatusEnum;