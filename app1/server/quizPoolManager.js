/**
 * Created by vdmc34 on 2017/1/23.
 */

const fs = require('fs');
const Promise = require('bluebird');
const _ = require('underscore');
const common = require('./common');

const resources = {
    "quizCollectionTable" : "quizCollection.json"
};

let quizCollectionTable = [];

function loadQuizCollectionTableFromFile(){
    quizCollectionTable = JSON.parse(fs.readFileSync(resources.quizCollectionTable));
}

function getQuizCollectionTable(){
    return quizCollectionTable;
}

function saveQuizCollectionTable() {
    common.saveTable(JSON.stringify(quizCollectionTable), resources.quizCollectionTable);
}

function showQuizCollectionTable(){
    common.showTable(getQuizCollectionTable());
}

function verifyNewQuiz(newQuiz){
    return true;
}

/**
 * @return {boolean}
 */
function addQuizToPool(newQuiz){
    if(! verifyNewQuiz(newQuiz)){
        return false;
    }
    getQuizCollectionTable().push(newQuiz);
    return true;
}

function deleteQuizFromPool(id){
    quizCollectionTable = quizCollectionTable.filter(item => item.id != id);
}

/**
 * @return {boolean}
 */
function modifyQuiz(item){
    if( ! verifyNewQuiz(item)){
        return false;
    }
    let it = _.find(quizCollectionTable, (it) => it.id == item.id);
    let index = _.indexOf(quizCollectionTable, it);
    if( -1 != index){
        quizCollectionTable[index] = item;
    }
}

function checkQuizExist(quizId){
    let tmp = _.find(quizCollectionTable, (it) => it.id == quizId);
    return (undefined != tmp);
}

function testAddQuiz(){
    let newId = common.getValidIdOfTable(getQuizCollectionTable());
    const newQuiz = {
        "id": newId,
        "type": "radio",
        "question": "what are the correct options ?",
        "options": [
            "1 is correct answer",
            "2 is correct answer",
            "3 is correct answer",
            "4 is correct answer",
            "5 is correct answer"
        ],
        "answer": [
            "2 is correct answer"
        ],
        "attribute": {
            "institution": [
                1,
                2
            ]
        }
    };

    if(!addQuizToPool(newQuiz)){
        console.error("unable to add newQuiz");
    }
}

function testDelQuiz(){
    deleteQuizFromPool(2);
}

function testModifyQuiz(){
    const quiz = {
        "id": 3,
        "type": "radio",
        "question": "what are the correct options ?",
        "options": [
            "11 is correct answer",
            "22 is correct answer",
            "33 is correct answer",
            "44 is correct answer",
            "55 is correct answer"
        ],
        "answer": [
            "22 is correct answer"
        ],
        "attribute": {
            "institution": [
                1,
                2
            ]
        }
    };
    modifyQuiz(quiz);
}

/*loadQuizCollectionTableFromFile();
testAddQuiz();
showQuizCollectionTable();
testDelQuiz();
showQuizCollectionTable();
testModifyQuiz();
showQuizCollectionTable();
saveQuizCollectionTable();*/

module.exports.loadQuizCollectionTableFromFile = loadQuizCollectionTableFromFile;
module.exports.getQuizCollectionTable = getQuizCollectionTable;
module.exports.saveQuizCollectionTable = saveQuizCollectionTable;
module.exports.showQuizCollectionTable = showQuizCollectionTable;
module.exports.addQuizToPool = addQuizToPool;
module.exports.modifyQuiz = modifyQuiz;
module.exports.deleteQuizFromPool = deleteQuizFromPool;
module.exports.checkQuizExist = checkQuizExist;