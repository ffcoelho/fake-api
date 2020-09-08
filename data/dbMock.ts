import mongoose from "mongoose";
import { MockDocModel } from "../model/mock.model";

const mockSchema = new mongoose.Schema({
  type: {
    type: String,
    unique: true
  },
  data: [{}]
},
{
  collection: "mocks"
});

mockSchema.statics.findByType = async (type: string) => {
  const mock = await Mock.findOne({type}) as MockDocModel;
  if (!mock) {
    throw new Error();
  } else {
    return mock;
  }
}

const Mock: mongoose.Model<MockDocModel, {}> = mongoose.model("Mock", mockSchema);

module.exports = Mock;
