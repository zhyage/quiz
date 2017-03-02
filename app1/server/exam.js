/**
 * Created by vdmc34 on 2017/1/25.
 */

const fs = require('fs');
const _ = require('underscore');
const quizPoolManager = require('./quizPoolManager');


const resource = {
    "examDataFolder" : "./examData",
    "examIndexTable" : "examIndexTable.json"
};

const examStatusEnum = {
    PREPARING : 1,
    READY : 2,
    STARTED : 3,
    STOPPED : 4
};

let examTable = [
        {
            "id" : 1,
            "status" : examStatusEnum.PREPARING
        }
    ]


function generateExam(){

}

function addQuizToExam(){

}

function delQuizFromExam(){

}

function finishQuizPrepare(){

}

function delExam(){

}

function startExam(){

}

function stopExam(){

}

function attendExam(){

}

function updateExamStatus(){

}