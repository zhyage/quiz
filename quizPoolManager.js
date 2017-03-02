/**
 * Created by vdmc34 on 2017/1/23.
 */

var fs = require('fs')
//var Promise = require('bluebird')
var _ = require('underscore')

const resources = {
    "accountTable" : "userAccount.json",
    "institutionTable" : "institution.json",
    "quizCollectionTable" : "quizCollection.json"
}

var accountTable = []
var institutionTable = []
var quizCollectionTable = []

function LoadResources(){
    accountTable = JSON.parse(fs.readFileSync(resources.accountTable));
    institutionTable = JSON.parse(fs.readFileSync(resources.institutionTable));
    quizCollectionTable = JSON.parse(fs.readFileSync(resources.quizCollectionTable));
}

function ShowTable(jsonTable){
    var tableString = JSON.stringify(jsonTable)
    console.info(tableString);
    return tableString;
}

function ShowAccountTable() {
    return ShowTable(accountTable);
}

function ShowInstitutionTable(){
    return ShowTable(institutionTable);
}

function ShowQuizCollectionTable(){
    return ShowTable(quizCollectionTable);
}

LoadResources()
ShowAccountTable()