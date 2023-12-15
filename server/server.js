const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.set('port', 8080);

app.use(cors({
    origin: '*'
}));
app.use('/', express.static(path.join(__dirname, '../client')))

app.get('/', function (req, res){
    res.send(path.resolve(__dirname, '../client/index.html'))});


app.listen(app.get('port'),function(){
   console.log('express server listening on port ' + app.get('port'))
    });
