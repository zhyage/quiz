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

let printQuiz = function(quiz){
    console.log("############### begin of quiz ###################");
    console.log(quiz);
    console.log("############### end of quiz ###################");
}


let filterAndActionQuiz = function(pattern, matchFun, actionFun){
    args = arguments;
    quizModel.Quiz.find({}, function(err, quizs){
        if(err){
            console.error("no quizs exists");
            return;
        }
        _.each(quizs, function (quiz) {
            if(matchFun(pattern, quiz)){
                console.info("now call actionFun : " + actionFun.name);
                switch (actionFun.name) {
                    case "printQuiz" :
                        actionFun(quiz);
                        break;
                    case "delQuiz" :
                        actionFun(quiz.id);
                        break;
                    case "modifyQuiz" :
                        if(args.length < 7){
                            console.error("incorrect arguments of function modifyQuiz")
                            return;
                        }
                        actionFun(quiz.id, args[3], args[4], args[5], args[6]);
                        break;
                    default:
                        console.error("no support method");
                        break;
                }
            }
        })
    })
}

addNewQuiz(quizModel.questionTypeEnum.SINGLE, "which is correct?", ['A', 'B', 'C', 'D'], ['A']);
addNewQuiz(quizModel.questionTypeEnum.MULTIPLE, "which are correct?", ['A', 'B', 'C', 'D'], ['A', 'D']);
addNewQuiz(quizModel.questionTypeEnum.SINGLE, "which is wrong?", ['A', 'B', 'C', 'D', 'E'], ['E']);

let patternQuiz = {
    question: "which is correct?"
}

let questionMatchFun = function(pattern, quiz){
    if(pattern.question == quiz.question){
        return true;
    }
    return false;
}



filterAndActionQuiz(patternQuiz, questionMatchFun, printQuiz);
filterAndActionQuiz(patternQuiz, questionMatchFun, modifyQuiz,
    quizModel.questionTypeEnum.SINGLE, "which is correct?", ['A', 'B', 'C', 'D'], ['B']);
//filterAndActionQuiz(patternQuiz, questionMatchFun, printQuiz);
//filterAndActionQuiz(patternQuiz, questionMatchFun, delQuiz);
//filterAndActionQuiz(patternQuiz, questionMatchFun, printQuiz);

//modifyQuiz("58959cc3b81be16c80838512", quizModel.questionTypeEnum.SINGLE, "which is correct?", ['A', 'B', 'C', 'D'], ['B']);
//delQuiz("58959cc3b81be16c80838514");




