import Contest from './models/contest';

//const team_problems = Array(5).fill({ solved: false });

const problems_team = [
  {
    attempts: ["attempt 0"],
    solved: true
  },
  {
    attempts: ["attempt 1"],
    solved: true
  },
];

const probelsm_anotherteam = [
  {
    attempts: ["attempt 1"],
    solved: true
  },
  {
    attempts: ["attempt 2"],
    solved: true
  },
  {
    attempts: ["attempt 3"],
    solved: true
  },
  {
    attempts: ["attempt 4"],
    solved: true
  },
  {
    attempts: ["attempt 5"],
    solved: true
  },
  {
    attempts: ["attempt 6"],
    solved: true
  },
];

const problems_losing = [
  {
  attempts: ["attempt 0"],
  solved: true
},
  {
    attempts: ["attempt 1"],
    solved: true
  },
  {
    attempts: ["attempt 1"],
    solved: true
  },
];

const dummyTeams = [{
    name:"Team",
    _id:"58a2140af3c57bd14d9f0301",
    score:15,
    problem_attempts: problems_team,
}, {
    name:"Another team",
    _id:"58a2140af3c57bd14d9f0302",
    score:20,
    problem_attempts: probelsm_anotherteam,
}, {
    name:"Losing team",
    _id:"58a2140af3c57bd14d9f0303",
    score:12,
    problem_attempts: problems_losing,
}];



const dummyProblems = [{
    name: "Hat Problem",
    fileName: 'the-magic-hat',
    solved: true,
    solvedBy: "Team",
    problemNumber: 1
},
  {
    name: "Problem 2",
    fileName: 'the-magic-hat',
    solved: true,
    solvedBy: "Another team",
    problemNumber: 2
  },
  {
    name: "Problem 5",
    fileName: 'the-magic-hat',
    solved: true,
    solvedBy: "Losing team",
    problemNumber: 5
  }];

export default function () {
    Contest.count().exec((err, count) => {
        if (count > 0) {
            return;
        }

        const contest1 = new Contest({ name: 'Bucknell Spring 2015', slug: 'bucknell-spring-2015', cuid: 'cikqgkv4q01ck7453ualdn3hl'});
        const contest2 = new Contest({
            name: 'Bucknell Spring 2019',
            slug: 'bucknell-spring-2019',
            cuid: 'cikqgkv4q01ck7453ualdn3hn',
            teams: dummyTeams,
            problems: dummyProblems,
        });

        Contest.create([contest1, contest2], (error) => {
            if (!error) {
            // console.log('ready to go....');
            }
            console.log(error);
        });
    });
}
