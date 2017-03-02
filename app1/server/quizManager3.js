/**
 * Created by vdmc34 on 2017/2/4.
 */
const mongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');
const _ = require('underscore');
const mongoose = require('mongoose');
const quizModel = require('./quizModel');

let addNewQuiz = function(quizType, quiz, quizOptions, answer){
    let newQuiz = new quizModel.Quiz({
        questionType: quizType,
        question: quiz,
        options: quizOptions,
        answer: answer
    });

    if(!newQuiz.verifyQuiz()){
        console.error("verify new quiz error");
        return;
    }

    newQuiz.save(function(err){
        if(err){
            console.error("save quiz error : " + err);
        }
    });
};

let modifyQuiz = function(id, quizType, quiz, quizOptions, answer){
    quizModel.Quiz.findById(id, function(err, findQuiz) {
        if (err || null == findQuiz) {
            console.warn("no such quiz exist");
            return false;
        }
        findQuiz.questionType = quizType;
        findQuiz.question = quiz;
        findQuiz.options = quizOptions;
        findQuiz.answer = answer;

        if(!findQuiz.verifyQuiz()){
            console.error("verify quiz error");
            return false;
        }

        findQuiz.save(function(err){
            if(err){
                console.error("save quiz error : " + err);
            }
        });
    });
};

let delQuiz = function(id){
    quizModel.Quiz.findByIdAndRemove(id, function(err) {
        if (err) {
            console.warn("remove error, no such quiz");
        }
    });
};

addNewQuiz(quizModel.questionTypeEnum.SINGLE, "which is correct?", ['A', 'B', 'C', 'D'], ['A']);
addNewQuiz(quizModel.questionTypeEnum.MULTIPLE, "which are correct?", ['A', 'B', 'C', 'D'], ['A', 'D']);
addNewQuiz(quizModel.questionTypeEnum.SINGLE, "which is wrong?", ['A', 'B', 'C', 'D', 'E'], ['E']);
modifyQuiz("58959cc3b81be16c80838512", quizModel.questionTypeEnum.SINGLE, "which is correct?", ['A', 'B', 'C', 'D'], ['B']);
delQuiz("58959cc3b81be16c80838514");



