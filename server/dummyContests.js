import Contest from './models/contest';

const team_problems = [{
    solved: false,
}, {
    solved: false,
}, {
    solved: false,
}, {
    solved: false,
}, {
    solved: false,
}];

const dummyTeams = [{
    name:"Team",
    _id:"58a2140af3c57bd14d9f0300",
    score:15,
    problem_attempts: team_problems,
    timestamp: new Date("2017-02-18T16:00:00Z"),
}, {
    name:"Another team",
    _id:"58a2140af3c57bd14d9f0301",
    score:20,
    problem_attempts: team_problems,
    timestamp: new Date("2017-02-18T16:30:00Z"),
}, {
    name:"Losing team",
    _id:"58a2140af3c57bd14d9f0302",
    score:12,
    problem_attempts: team_problems,
    timestamp: new Date("2017-02-18T16:20:00Z"),
}];

const dummyProblems = [{
    name: "The Magic Hat",
    fileName: 'the-magic-hat',
    solved: true,
    solvedBy: "Cat in the hat",
    testCases: {
        input: [''],
        output: ["1"],
    },
}, {
    name: "The Grape Escape",
    fileName: 'the-grape-escape',
    testCases: {
        input: [''],
        output: ["2"],
    },
}, {
    name: "Three wise mice",
    fileName: 'three-wice-mice',
    solved: true,
    solvedBy: "Despereaux",
    testCases: {
        input: [''],
        output: ["3"],
    },
}, {
    name: "The men who stare at boats",
    fileName: 'the-men-who-stare-at-boats',
    testCases: {
        input: [''],
        output: ["4"],
    },
}, {
    name: "Iron pan",
    fileName: 'iron-pan',
    solved: true,
    solvedBy: "Tony Stark",
    testCases: {
        input: [''],
        output: ["5"],
    },
}];

export default function () {
  Contest.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const contest1 = new Contest({ name: 'Bucknell Spring 2015', slug: 'bucknell-spring-2015', cuid: 'cikqgkv4q01ck7453ualdn3hl', teams: dummyTeams});
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
