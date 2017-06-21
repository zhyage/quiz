/**
 * Created by vdmc34 on 2017/2/27.
 */
const mongoClient = require('mongodb').MongoClient;
//const Promise = require('bluebird');
const _ = require('underscore');
const mongoose = require('mongoose');
const examinationPaperModel = require('./examinationPaperModel');
const quizModel = require('./quizModel');
const examinationModel = require('./examinationModel');

mongoose.Promise = Promise;

createExamination = function (name) {

    let newExamination = new examinationModel.examination({
        examinationName: name,
        examinationStatus: examinationModel.examinationStatusEnum.DISABLE,
    });

    return newExamination.save(function(err){
        if(err){
            console.error("save examination error : " + err);
        }
    });
}

addPaperToExamination = function (id, paperId) {
    examinationPaperModel.examinationPaper.findById(paperId, function (errOfFetchPaper, findPaper) {
        if (errOfFetchPaper || null == findPaper) {
            console.error("no such paper exist");
            return false;
        }
    });

    examinationModel.examination.findById(id, function (erroOfFetchExamination, findExamination) {
        if(erroOfFetchExamination || null == findExamination){
            console.error("no such examination exist");
            return false;
        }
    })

}

delExamination = function (id) {
    examinationModel.examination.findByIdAndRemove(id, function(err) {
        if (err) {
            console.warn("remove error, no such examination");
        }
    });
}

setQuizOrderAttr = function (id, order) {
    examinationModel.examination.findById(id, function (errOfFetchExamination, findExamination) {
        if (errOfFetchExamination || null == findExamination) {
            console.error("no such examination exist");
            return false;
        }
        findExamination.disorderQuizs = order;
        return findExamination.save(function(err){
            if(err){
                console.error("save examination error : " + err);
            }
        });
    })
}

setQuizDisorder = function (id) {
    setQuizOrderAttr(id, examinationModel.disorderStatusEnum.DISORDER);
}

setQuizOrder = function (id) {
    setQuizOrderAttr(id, examinationModel.disorderStatusEnum.ORDER);
}

setAnswerOrderAttr = function (id, order) {
    examinationModel.examination.findById(id, function (errOfFetchExamination, findExamination) {
        if (errOfFetchExamination || null == findExamination) {
            console.error("no such examination exist");
            return false;
        }
        findExamination.disorderAnswers = order;
        return findExamination.save(function(err){
            if(err){
                console.error("save examination error : " + err);
            }
        });
    })
}

setAnswerDisorder = function (id) {
    setAnswerOrderAttr(id, examinationModel.disorderStatusEnum.DISORDER);
}

setAnswerOrder = function (id) {
    setAnswerOrderAttr(id, examinationModel.disorderStatusEnum.ORDER);
}

setExaminationStatus = function (id, status) {
    examinationModel.examination.findById(id, function (errOfFetchExamination, findExamination) {
        if (errOfFetchExamination || null == findExamination) {
            console.error("no such examination exist");
            return false;
        }
        findExamination.examinationStatus = status;
        return findExamination.save(function(err){
            if(err){
                console.error("save examination error : " + err);
            }
        });
    })
}

setExaminationStarting = function (id) {
    setExaminationStatus(id, examinationModel.examinationStatusEnum.ENABLE);
}

setExaminationEnd = function (id) {
    setExaminationStatus(id, examinationModel.examinationStatusEnum.DISABLE);
}


generateAttenderAndQuizList = function (id, userName, userId) {
    examinationModel.examination.findById(id, function (errOfFetchExamination, findExamination) {
        if (errOfFetchExamination || null == findExamination) {
            console.error("no such examination exist");
            return false;
        }
        /* TODO: check attender permission */
        let attender =
            {
                'name': userName,
                'id': userId
            };


    });
}

createExamination("first examination");

/*createExamination("first examination", '58b3d162e4d4c91f8874e6c9');
setQuizOrder('58b425d86ade3e387cfc6af9');
setAnswerOrder('58b425d86ade3e387cfc6af9');
setExaminationStarting('58b425d86ade3e387cfc6af9');*/
