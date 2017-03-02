/**
 * Created by vdmc34 on 2017/1/24.
 */
/**
 * Created by vdmc34 on 2017/1/23.
 */

/*
const Promise = require('bluebird');*/
const fs = require('fs');
const _ = require('underscore');

/*const resources = {
    "accountTable" : "userAccount.json",
    "institutionTable" : "institution.json",
    "quizCollectionTable" : "quizCollection.json"
};*/

/*let accountTable = [];
let institutionTable = [];
let quizCollectionTable = [];*/



/*function LoadResources(){
    accountTable = JSON.parse(fs.readFileSync(resources.accountTable));
    institutionTable = JSON.parse(fs.readFileSync(resources.institutionTable));
    quizCollectionTable = JSON.parse(fs.readFileSync(resources.quizCollectionTable));
}

function GetAccountTable(){
    return accountTable;
}

function GetInstitutionTable(){
    return institutionTable;
}

function GetQuizCollectionTable(){
    return quizCollectionTable;
}



function ShowAccountTable() {
    return ShowTable(accountTable);
}

function ShowInstitutionTable(){
    return ShowTable(institutionTable);
}

function ShowQuizCollectionTable(){
    return ShowTable(quizCollectionTable);
}*/

function saveTable(stringTable, file){
    fs.writeFile(file, stringTable, (err) => {
        if(err){
            console.error("error to save ", file, " the reason is ", err );
            return false;
        }
        return true;
    });
}

function showTable(jsonTable){
    const tableString = JSON.stringify(jsonTable);
    console.info(tableString);
    return tableString;
}

/*function SaveAccountTable() {
    SaveTable(JSON.stringify(accountTable), resources.accountTable);
}

function SaveInstitutionTable(){
    SaveTable(JSON.stringify(institutionTable), resources.institutionTable);
}

function SaveQuizCollectionTable() {
    SaveTable(JSON.stringify(quizCollectionTable), resources.quizCollectionTable);
}*/

/**
 * @return {number}
 */
function getValidIdOfTable(table){
    let tableLength = table.length;
    if (0 == tableLength){
        return 1;
    }
    let ele = table[tableLength - 1];
    if (_.has(ele, "id")){
        return ele.id + 1;
    }else{
        throw new Error("not valid table ele : " +  ele);
    }
}

/*function DeleteEleFromTable(table, id){
    table = table.filter(item => item.id == id);
    console.info("after del table : " + table);
}*/

/*module.exports.LoadResources = LoadResources;
module.exports.GetAccountTable = GetAccountTable;
module.exports.GetInstitutionTable = GetInstitutionTable;
module.exports.GetQuizCollectionTable = GetQuizCollectionTable;
module.exports.ShowAccountTable = ShowAccountTable;
module.exports.ShowInstitutionTable = ShowInstitutionTable;
module.exports.ShowQuizCollectionTable = ShowQuizCollectionTable;
module.exports.SaveAccountTable = SaveAccountTable;
module.exports.SaveInstitutionTable = SaveInstitutionTable;
module.exports.SaveQuizCollectionTable = SaveQuizCollectionTable;*/
module.exports.getValidIdOfTable = getValidIdOfTable;
module.exports.saveTable = saveTable;
module.exports.showTable = showTable;
/*
module.exports.DeleteEleFromTable = DeleteEleFromTable;*/
