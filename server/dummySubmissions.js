import Submission from './models/submission';

const submission1 = {
  cuid: 's25',
  teamName: 'Another team',
  teamID: '58a2140af3c57bd14d9f0301',
  contestID: 'cikqgkv4q01ck7453ualdn3hn',
  problemName: 'Hat Problem',
  problemNumber: 2,
  correct: true,
  hadStdError: false,
  feedback: 'String',
  expectedOutput: ['String'],
  actualOutput: ['String'],
};

const submission2 = {
  cuid: 's25',
  teamName: 'Another team',
  teamID: '58a2140af3c57bd14d9f0301',
  contestID: 'cikqgkv4q01ck7453ualdn3hn',
  problemName: 'Hat Problem',
  problemNumber: 2,
  correct: true,
  hadStdError: false,
  feedback: 'String',
  expectedOutput: ['String'],
  actualOutput: ['String'],
};

const submission3 = {
  cuid: 's25',
  teamName: 'Another team',
  teamID: '58a2140af3c57bd14d9f0301',
  contestID: 'cikqgkv4q01ck7453ualdn3hn',
  problemName: 'Hat Problem',
  problemNumber: 2,
  correct: true,
  hadStdError: false,
  feedback: 'String',
  expectedOutput: ['String'],
  actualOutput: ['String'],
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
