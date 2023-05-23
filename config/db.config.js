const mongoose = require("mongoose");
const MongoMemoryServer = require("mongodb-memory-server").MongoMemoryServer;

module.exports.connectDB = async () => {

    const mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();

    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: "posts"
    }).then(() => {
        console.log("MongoDB Connected");
    }).catch((err) => {
        console.log(err);
    });
}