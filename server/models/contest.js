import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const teamProblem = new Schema({
    number: { type: 'Number', required: true},
    attempFileNames: [String],
    solved: { type: 'Boolean', default: false, required: true},
});

const teamSchema = new Schema({
    name: { type: 'String', required: true },
    password: { type: 'String'},
    score: { type: 'Number', default: 0, required: true },
    timestamp: { type: 'Date'},
    memberList: [String],
    cuid: { type: 'String', required: true },
    problems_attempted: [teamProblem]
});

const testCase = new Schema({
    input: { type: 'String', required: true },
    output: { type: 'String', required: true },
})

const contestProblem = new Schema({
    name: { type: 'String'},
    fileName: { type: 'String', required: true },
    solved: { type: 'Boolean', default: false, required: true},
    solvedBy: { type: 'String'},
    sampleCases: [testCase],
    testCases: [testCase],
});

const contestSchema = new Schema({
    name: { type: 'String', required: true },
    slug: { type: 'String', required: true },
    cuid: { type: 'String', required: true },
    password: { type: 'String'},
    adminList: [String],
    problems: [contestProblem],
    start: { type: 'Date'},
    teams: [teamSchema],
});

export const Team = mongoose.model('Team', teamSchema);
export default mongoose.model('Contest', contestSchema);
