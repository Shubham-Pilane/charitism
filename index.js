const express = require('express');
const {connection} = require('./db');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to Charitism !!');
});

const {userRoute} = require("./routes/userRoute");
const {todoRoute} = require("./routes/todoRoute")


app.use('/user', userRoute);
app.use('/todos', todoRoute);


const port = process.env.PORT || 8000; 

app.listen(port, async () => {
  try {
    await connection;
    console.log('Connected to Database !!');
  } catch (error) {
    console.log(error);
  }
  console.log(`Server is live on port ${port}`);
});

