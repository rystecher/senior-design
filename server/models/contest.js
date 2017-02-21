import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const teamProblem = new Schema({
    attempts: [String],
    solved: { type: 'Boolean', default: false, required: true},
});

const teamSchema = new Schema({
    name: { type: 'String', required: true },
    password: { type: 'String'},
    score: { type: 'Number', default: 0, required: true },
    timestamp: { type: 'Date'},
    memberList: [String],
    problem_attempts: [teamProblem]
});

const testCase = new Schema({
    input: [String],
    output: [String],
})

const contestProblem = new Schema({
    name: { type: 'String'},
    fileName: { type: 'String', required: true },
    solved: { type: 'Boolean', default: false, required: true},
    solvedBy: { type: 'String'},
    sampleCases: testCase,
    testCases: testCase,
});

const contestSchema = new Schema({
    adminList: String,
    cuid: { type: 'String', required: true },
    judges: [String],
    name: { type: 'String', required: true },
    password: { type: 'String'},
    problems: [contestProblem],
    scoreboardVisible: { type: 'Boolean', default: true, required: true},
    slug: { type: 'String', required: true },
    start: { type: 'Date'},
    teams: [teamSchema],
});

export const TeamProblem = mongoose.model('teamProblem', teamSchema);
export const Team = mongoose.model('Team', teamSchema);
export default mongoose.model('Contest', contestSchema);
