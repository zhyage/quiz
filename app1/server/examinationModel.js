/**
 * Created by vdmc34 on 2017/2/27.
 */
const mongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');
const _ = require('underscore');
const mongoose = require('mongoose');
const quizModel = require('./quizModel');
const examinationPaperModel = require('./examinationPaperModel');

const examinationStatusEnum = {
    DISABLE : 1,
    ENABLE : 2
};

const disorderStatusEnum = {
    ORDER: 1,
    DISORDER: 2
};

let conn = mongoose.createConnection("mongodb://localhost:27017/examinationPool");

conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', function(){
    console.info("connect to DB success");
})

let Schema = mongoose.Schema;

let examinationSchema = new Schema ({
    examinationName: {type: String, required: true},
    examinationStatus: {type: Number, required: true},
    paper: {type: examinationPaperModel.examinationPaperSchema, required:true},
    disorderQuizs: {type: Number, required: true, default: disorderStatusEnum.DISORDER},
    disorderAnswers: {type: Number, required: true, default: disorderStatusEnum.DISORDER},
    attends: [],
    created_at: Date,
    updated_at: Date
});

let examination = conn.model('examination', examinationSchema);

module.exports.examination = examination;
module.exports.examinationSchema = examinationSchema;
module.exports.examinationStatusEnum = examinationStatusEnum;
module.exports.disorderStatusEnum = disorderStatusEnum;