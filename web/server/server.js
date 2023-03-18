// const app = require("./server/app");
const { disconnectDb, connectDb } = require("./mongo/mongo");

// const port = process.env.PORT || 5000;
connectDb()
  .then(() => {
    // app.listen(port, () => {
    //   console.log(`Server started on ${port}`);
    // });
  })
  .catch((err) => {
    console.log(err.message);
  });
