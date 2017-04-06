import Submission from './models/submission';

const submission1 = {
    cuid: 's25',
    teamName: 'Team',
    teamID: '58a2140af3c57bd14d9f0301',
    contestID: 'cikqgkv4q01ck7453ualdn3hn',
    problemName: 'Hat Problem',
    problemNumber: 1,
    correct: true,
    hadStdError: false,
    feedback: 'None',
    expectedOutputFileName: 'name.txt',
    actualOutputFileName: 'name1.txt',
};

const submission2 = {
    cuid: 's26',
    teamName: 'Another Team',
    teamID: '58a2140af3c57bd14d9f0302',
    contestID: 'cikqgkv4q01ck7453ualdn3hn',
    problemName: 'Problem 5',
    problemNumber: 5,
    correct: true,
    hadStdError: false,
    feedback: 'None',
    expectedOutputFileName: 'name.txt',
    actualOutputFileName: 'name2.txt',
};

const submission3 = {
    cuid: 's27',
    teamName: 'Losing Team',
    teamID: '58a2140af3c57bd14d9f0303',
    contestID: 'cikqgkv4q01ck7453ualdn3hn',
    problemName: 'Problem 2',
    problemNumber: 2,
    correct: true,
    hadStdError: false,
    feedback: 'None',
    expectedOutputFileName: 'name.txt',
    actualOutputFileName: 'name3.txt',
};

export default function () {
    Submission.count().exec((err, count) => {
        if (count > 0) {
            return;
        }

        Submission.create([submission1, submission2, submission3], (error) => {
            if (!error) {
        // console.log('ready to go....');
            }
            console.log(error);
        });
    });
}
