import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    cuid: { type: 'String', required: true },
    teamName: { type: 'String', required: true },
    teamID: { type: 'String', required: true },
    contestID: { type: 'String', required: true },
    problemName: { type: 'String', required: true },
    problemNumber: { type: 'Number', required: true },
    correct: { type: 'Boolean', required: true},
    hadStdError: { type: 'Boolean', required: true},
    feedback: String,
    expectedOutput: [String],
    actualOutput: [String],
});

var sub
if (mongoose.models.Submission) {
  console.log('if');
  sub = mongoose.model('Submission');
} else {
  console.log('else');
  sub = mongoose.model('Submission', submissionSchema);
}

export default sub;
//export default mongoose.model('Submission', submissionSchema);
