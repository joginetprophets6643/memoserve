const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/postRouter');
const multer  = require('multer')
var upload = multer();
const app = express();
// for parsing application/json
app.use(bodyParser.json({ limit: '30mb', extended: true }))
// for parsing application/xwww-
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));
app.use(cors());

app.use('/posts', postRoutes);

const CONNECTION_URL = 'mongodb+srv://jugendra6690:Jogi@6643@cluster0.aqa2x.mongodb.net/?retryWrites=true&w=majority';
const connectionParams={
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}
mongoose.connect(CONNECTION_URL,connectionParams)
    .then( () => {
        console.log('Connected to the database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. n${err}`);
    })

    let port = 7000;
    app.listen(port,()=>{
        console.log('Server is running at '+port);
    })