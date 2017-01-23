import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const problemSchema = new Schema({
  title: { type: 'String', required: true },
  content: { type: 'String', required: true }
});

export default mongoose.model('Problem', problemSchema);
