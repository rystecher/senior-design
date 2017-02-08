import Contest from './models/contest';

// const testCase = new Schema({
//     input: { type: 'String', required: true },
//     output: { type: 'String', required: true },
// })
//
// const problems = {
//     name: { type: 'String'},
//     fileName: 'c1p1',
//     sampleCases: [testCase],
//     testCases: [testCase],
// };

const teams = [{
        name: 'Team One', score: 0, memberList: []
    }, {
        name: 'Team Two', score: 15, memberList: [],
    }, {
        name: 'Team Three', score: 30, memberList: [],
    }, {
        name: 'Team Four', score: 0, memberList: [],
    }, {
        name: 'Team Five', score: 20, memberList: [],
    }
];

export default function () {
    Contest.count().exec((err, count) => {
        if (count > 0) {
            return;
        }

        const contest1 = new Contest({ name: 'Bucknell Spring 2017', slug: 'bucknell-spring-2017', cuid: 'cikqgkv4q01ck7453ualdn3hh'});
        const contest2 = new Contest({ name: 'Bucknell Spring 2018', slug: 'bucknell-spring-2018', cuid: 'cikqgkv4q01ck7453ualdn3hj', teams: teams});

        Contest.create([contest1, contest2], (error) => {
            if (!error) {
                // console.log('ready to go....');
            }
        });
    });
}
