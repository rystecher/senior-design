import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const teamProblem = new Schema({
    attempts: [String],
    solved: { type: 'Boolean', default: false, required: true },
});

const Message = new Schema({
    from: String,
    message: String,
});

const teamSchema = new Schema({
    name: { type: 'String', required: true },
    numSolved: { type: 'Number', default: 0, required: true },
    score: { type: 'Number', default: 0, required: true },
    memberList: [String],
    messages: [Message],
    password: { type: 'String' },
    problem_attempts: [teamProblem],
    messagedJudge: { type: 'Boolean', default: false, required: true },
});

const contestProblem = new Schema({
    name: { type: 'String' },
    fileName: { type: 'String', required: true },
    solved: { type: 'Boolean', default: false, required: true },
    solvedBy: { type: 'String'},
});
// fileName used for pdf, input file, and output file
// pdf/fileName.pdf, input/fileName.txt, and output/fileName.txt

const contestSchema = new Schema({
    about: String,
    admin: String,
    broadcastMessages: [Message],
    closed: { type: 'Boolean', default: false, required: true },
    cuid: { type: 'String', required: true },
    judges: [String],
    name: { type: 'String', required: true },
    problems: [contestProblem],
    rules: String,
    scoreboardVisible: { type: 'Boolean', default: true, required: true },
    slug: { type: 'String', required: true },
    start: Number,
    teams: [teamSchema],
});

export const TeamProblem = mongoose.model('teamProblem', teamSchema);
export const Team = mongoose.model('Team', teamSchema);
export default mongoose.model('Contest', contestSchema);
