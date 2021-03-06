import mongoose from "mongoose";

export function connectDB() {
  mongoose.connect(process.env.MONGODB || "mongodb://localhost:27017/fakeapi",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    }
  );
}

const db = mongoose.connection;
db.on("error", console.error.bind(console, "FAKEAPI> mongoDB connection error: "));
db.once("open", function() {
  console.log(`FAKEAPI> mongoDB connected: ${mongoose.connections[0].host}:${mongoose.connections[0].port}`);
});
