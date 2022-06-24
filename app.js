const express = require('express');

const morgan = require('morgan');
const cors = require('cors');
const path  = require('path');

const app = express();
//bd
const mongoose    = require('mongoose');
const url = 'mongodb://localhost:27017/usersBd';
const options = {useNewUrlParser:true, useUnifiedTopology:true};


const csvtojson = require('csvtojson');

//middleware morgan

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect(url, options).then(
    () => {console.log('Conectado a MDB')},
    err =>{err}
);
//r
app.get('/', function(req,res){
    res.send('Hola')

});
//middleware for vue
app.use('/api', require('./routes/usersBd'));
const history = require('connect-history-api-fallback');
app.use(history());
app.use(express.static(path.join(__dirname,'public')));


const posts =require('./routes/usersBd')
app.use('/api/posts',posts );

//puerto
app.set('puerto', process.env.PORT || 3000);
app.listen(app.get('puerto'), function(){
    console.log("Escuchando puerto" + app.get('puerto'));
});