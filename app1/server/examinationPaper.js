/**
 * Created by vdmc34 on 2017/1/25.
 */

const fs = require('fs');
const _ = require('underscore');
const quizPoolManager = require('./quizPoolManager');
const common = require('./common');


const resources = {
    "examinationPaperFolder" : "./examinationPaperPool",
    "examinationPaperIndexTable" : "./examinationPaperPool/examinationPaperIndexTable.json"
};

const paperStatusEnum = {
    PREPARING : 1,
    READY : 2
};

/*const lockStatusEnum = {
    LOCKED : 1,
    UNLOCKED : 2
};*/

let paperIndexTable = [];

function loadPaperIndexTable(){
    paperIndexTable = JSON.parse(fs.readFileSync(resources.examinationPaperIndexTable));
}

function getPaperIndexTable(){
    return paperIndexTable;
}

function showPaperIndexTable(){
    common.showTable(getPaperIndexTable());
}

function generatePaper(paperName, owner){
    let newId = common.getValidIdOfTable(getPaperIndexTable());
    console.info(" newId : " + newId);
    let paper = {
        id : newId,
        name : paperName,
        prepareStatus : paperStatusEnum.PREPARING,
        owner : 1,
        quizs : [

        ]
    };
    paperIndexTable.push(paper);
}

function addQuizToPaper(paperId, quizId){
    let it = _.find(paperIndexTable, (it) => it.id == paperId)
    let index = _.indexOf(paperIndexTable, it);
    if( -1 != index && quizPoolManager.checkQuizExist(quizId)){
        let quizList = paperIndexTable[index].quizs;
        if( undefined == _.find(quizList, (it) => it == quizId)){
            paperIndexTable[index].quizs.push(quizId);
        }
    }
}

function delQuizFromPaper(paperId, quizId){
    let it = _.find(paperIndexTable, (it) => it.id == paperId)
    let index = _.indexOf(paperIndexTable, it);
    if( -1 != index && quizPoolManager.checkQuizExist(quizId)){
        let quizList = paperIndexTable[index].quizs;
        paperIndexTable[index].quizs = quizList.filter(item => item != quizId);
    }
}

function finishPreparePaper(paperId){
    let it = _.find(paperIndexTable, (it) => it.id == paperId)
    let index = _.indexOf(paperIndexTable, it);
    if( -1 != index){
        paperIndexTable[index].prepareStatus = paperStatusEnum.READY;
    }
}

function savePaper(){
    common.saveTable(JSON.stringify(paperIndexTable), resources.examinationPaperIndexTable);
}

quizPoolManager.loadQuizCollectionTableFromFile();
loadPaperIndexTable();
showPaperIndexTable();
generatePaper("examination 1");
addQuizToPaper(1, 1);
addQuizToPaper(1, 2);
addQuizToPaper(1, 3);
addQuizToPaper(1, 4);
addQuizToPaper(1, 5);
addQuizToPaper(1, 6);
addQuizToPaper(1, 7);
showPaperIndexTable();
generatePaper("examination 2");
addQuizToPaper(2, 6);
addQuizToPaper(2, 7);
addQuizToPaper(2, 8);
addQuizToPaper(2, 9);
addQuizToPaper(2, 10);
addQuizToPaper(2, 11);
addQuizToPaper(2, 12);
addQuizToPaper(2, 13);
addQuizToPaper(2, 14);
showPaperIndexTable();
delQuizFromPaper(2, 13);
showPaperIndexTable();
finishPreparePaper(1);
finishPreparePaper(2);
savePaper();