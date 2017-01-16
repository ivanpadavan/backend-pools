const mongoose = require('mongoose');
const relationship = require("mongoose-relationship")
const autopopulate = require("mongoose-autopopulate")

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://redsool:unix999@ds064188.mlab.com:64188/redsool');



const answerSchema = mongoose.Schema({
    text: String,
    question: {type: mongoose.Schema.Types.ObjectId, ref: 'Question', childPath:'answers' }
});

const questionSchema = mongoose.Schema({
    text: String,
    type: String,
    answers: [{type: mongoose.Schema.Types.ObjectId, ref: 'Answer', autopopulate: true }],
    pool: {type: mongoose.Schema.Types.ObjectId, ref: 'Pool', childPath:'questions'}
});

const poolSchema = mongoose.Schema({
    text: String,
    description: String,
    questions: [{type: mongoose.Schema.Types.ObjectId, ref: 'Question', autopopulate: true }],
    devices: [{type: mongoose.Schema.Types.ObjectId, ref: 'Device', childPath: 'pool'}]
});

const deviceSchema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    token: String,
    pool: { type: mongoose.Schema.Types.ObjectId, ref: 'Pool'}
});

const resultSchema = mongoose.Schema({
    date: { type: Date, default: Date.now },
    device: { type: mongoose.Schema.Types.ObjectId, ref: 'Device'},
    answers: {type: mongoose.Schema.Types.ObjectId, ref: 'Answer'}
});


answerSchema.plugin(autopopulate);
questionSchema.plugin(autopopulate);
poolSchema.plugin(autopopulate);


answerSchema.plugin(relationship, {relationshipPathName:'question', triggerMiddleware: true});
questionSchema.plugin(relationship, {relationshipPathName:'pool', triggerMiddleware: true});
poolSchema.plugin(relationship, {relationshipPathName:'devices', triggerMiddleware: true});


const Answer = mongoose.model('Answer', answerSchema);
const Question = mongoose.model('Question', questionSchema);
const Pool = mongoose.model('Pool', poolSchema);
const Device = mongoose.model('Device', deviceSchema);
const Result = mongoose.model('Result', resultSchema);


module.exports = {Answer, Question, Pool, Device, Result}