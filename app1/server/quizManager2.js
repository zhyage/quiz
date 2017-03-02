/**
 * Created by vdmc34 on 2017/2/3.
 */

const mongoClient = require('mongodb').MongoClient;
const Promise = require('bluebird');
const _ = require('underscore');

const resources = {
    quizCollectionPool : "quizCollectionPool",
    dbUrl : "mongodb://localhost:27017/quizPool"
};

function insertDocuments(db, collections, item, callback) {
    // Get the documents collection
    let collection = db.collection(collections);
    // Insert some documents
    collection.insertOne(item, function(err, result) {
        if(err){
            callback(false, "error to insert item into DB" );
            return;
        }
        callback(true, "insert item into DB success");
    });
}


function verifyNewQuiz(newQuiz, callback){
    callback(true, "OK");
}


function addQuiz(newQuiz, callback){
    verifyNewQuiz(newQuiz, function(res, message){
        if(!res){
            callback(false, "error to verify new quiz");
        }
    });

    mongoClient.connect(resources.dbUrl, function(err, db) {
        if(err){
            callback(false, "Connected to db failed");
        }
        insertDocuments(db, resources.quizCollectionPool, newQuiz, function(err, message){
            if(err){
                callback(false, "insert item to DB failed");
            }
            db.close();
        });
    });

}

function delQuiz(id){

}

function modifyQuiz(item){

}

function testAddQuiz(){
    const newQuiz = {
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

    addQuiz(newQuiz, function(res, msg){
        console.info("addQuiz result : " + res + " reason " + msg);
    });

}


testAddQuiz();