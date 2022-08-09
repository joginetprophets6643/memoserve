const express = require('express');
const mongoose = require('mongoose');

const bodyParser = require('body-parser');
const cors = require('cors');

const postRoutes = require('./routes/postRouter');
const userRoutes = require('./routes/userRouter')

const multer  = require('multer')
// var upload = multer();
const app = express();
// for parsing application/json
app.use(express.json({ limit: '30mb', extended: true }))
// for parsing application/xwww-
app.use(express.urlencoded({ limit: '30mb', extended: true }))
// for parsing multipart/form-data
// app.use(upload.array()); 

// app.use(express.static('public'));

app.use('/upload', express.static('./upload'));
app.use(cors());
const upload = multer({ dest: 'upload' })
app.use('/posts',upload.single('selectedFile'), postRoutes);
app.use('/user',userRoutes)



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
    