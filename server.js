import express from 'express';
const bodyParser = require('body-parser');
const mongoose = require('mongoose'); 
const mongoDB1 = process.env.SECRET1; // admin
const mongoDB = process.env.SECRET2; // visitor
mongoose.connect(mongoDB); // change this if need db admin
mongoose.Promise = global.Promise;
const db = mongoose.connection;
const Schema = mongoose.Schema;
const articleSchema = new Schema( {

  subject: {
    type: String,
    min: [1, 'Too short '],
    max: 100
  },
  
  paragraphs: [],
  
  updated: { 
    type: Date, 
    default: Date.now 
  },
  
  linkURLS: []
  
});
const articleModel = mongoose.model('articleModel', articleSchema ); // for articles

const app = express();
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static('public'));

app.get('/', (request, response) => {
  console.log("get received. Sending index.");
  response.sendFile(`${__dirname}/views/index.html`);
});

// request to check articles:
app.post("/checkArticles", (request, response) => {
  console.log("post to check articles received: ", response.body);
  const received = response.body;
  var resultsFromDb;
  
  
    console.log("fetching data");
    articleModel.find((err, results) => {
      if (err) console.log(err);
      resultsFromDb = results;
    }); // finder ends       
    setTimeout(() => {  // timed so that there is time to add the data
      const sending = JSON.stringify(resultsFromDb);
      console.log("responding with data ");
      response.writeHead(200, {'Content-Type': 'text/plain'});
      response.end(sending);      
    }, 250); //timer
}); 

const listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}. 🚢`);
});
