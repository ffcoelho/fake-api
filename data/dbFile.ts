import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';
import { FileDocModel } from "../model/file.model";

const fileSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true
  },
  fileName: {
    type: String
  },
  fileType: {
    type: String
  },
  fileSize: {
    type: String
  },
  key: {
    type: String
  },
  expires: {
    type: Number
  }
},
{
  collection: "files"
});

fileSchema.methods.generateId = async function() {
  const file = this;
  file.id = uuidv4().replace(/-/g, '');
  await file.save();
}

fileSchema.statics.findById = async (id: string) => {
  const file = await UploadedFile.findOne({id}) as FileDocModel;
  if (!file) {
    throw new Error();
  } else {
    return file;
  }
}

fileSchema.statics.deleteById = async (id: string) => {
  await UploadedFile.deleteOne({id}, err => {
    if (err) { console.log(err); }
  })
}

const UploadedFile: mongoose.Model<FileDocModel, {}> = mongoose.model("UploadedFile", fileSchema);

module.exports = UploadedFile;
