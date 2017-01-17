const mongoose = require('mongoose');
const relationship = require("mongoose-relationship")


mongoose.connect('mongodb://redsool:unix999@ds064188.mlab.com:64188/redsool');



const poolSchema = mongoose.Schema({
    title: String,
    description: String,
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
    devices: [{type: mongoose.Schema.Types.ObjectId, ref: 'Device', autopopulate: true }]
});

const questionSchema = mongoose.Schema({
    title: String,
    type: String,
    answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer' }],
    pool: { type: mongoose.Schema.Types.ObjectId, ref: 'Pool', childPath: 'questions'}
});

const answerSchema = mongoose.Schema({
    title: String,
    question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question', childPath:'answers' }
});


const deviceSchema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    token: String,
    pool: { type: mongoose.Schema.Types.ObjectId, ref: 'Pool', childPath: 'devices'}
});

const resultSchema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device'},
    answers: {type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}
});


answerSchema.plugin(relationship, {relationshipPathName:'question', triggerMiddleware: true});
questionSchema.plugin(relationship, {relationshipPathName:'pool', triggerMiddleware: true});
deviceSchema.plugin(relationship, {relationshipPathName:'pool', triggerMiddleware: true});


const Answer = mongoose.model('Answer', answerSchema);
const Question = mongoose.model('Question', questionSchema);
const Pool = mongoose.model('Pool', poolSchema);
const Device = mongoose.model('Device', deviceSchema);
const Result = mongoose.model('Result', resultSchema);


module.exports = {Answer, Question, Pool, Device, Result}