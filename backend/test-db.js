const mongoose = require("mongoose");

const uri = "mongodb+srv://saumyatiwariwork_db_user:MongoDB%401234%21@cluster0.ehdcd8z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("✅ Connected to MongoDB Atlas");
    return mongoose.connection.close();
  })
  .catch(err => {
    console.error("❌ Connection error:", err.message);
    process.exit(1);
  });
