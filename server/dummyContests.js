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

const dummyTeams = [{
  cuid:"ciz4jidmb0000wsllr2jfmbut",
  name:"Team",
  _id:"58a2140af3c57bd14d9f0300",
  score:15,
}, {
  cuid:"ciz4jidmy0001wsllu94hzt4x",
  name:"Another team",
  _id:"58a2140af3c57bd14d9f0301",
  score:20,
}, {
  cuid:"ciz4jidn40002wsll1e0buk8f",
  name:"Losing team",
  _id:"58a2140af3c57bd14d9f0302",
  score:12,
}];

export default function () {
  Contest.count().exec((err, count) => {
    if (count > 0) {
      return;
    }

    const contest1 = new Contest({ name: 'Bucknell Spring 2015', slug: 'bucknell-spring-2015', cuid: 'cikqgkv4q01ck7453ualdn3hl', teams: dummyTeams});
    const contest2 = new Contest({ name: 'Bucknell Spring 2019', slug: 'bucknell-spring-2019', cuid: 'cikqgkv4q01ck7453ualdn3hn', teams: dummyTeams});

    Contest.create([contest1, contest2], (error) => {
      if (!error) {
        // console.log('ready to go....');
      }
    });
  });
}
