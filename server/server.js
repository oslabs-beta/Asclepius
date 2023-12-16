const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
app.set('port', 3000);

app.use(cors({
    origin: '*'
}));
app.use('/', express.static(path.join(__dirname, '../client')))

app.get('/', function (req, res){
    res.sendFile(path.resolve(__dirname, '../client/index.html'))
});

// app.get('/', function (req, res) {
//     res.send(path.resolve(__dirname, '../client/src/app.jsx'));
// })
app.listen(app.get('port'),function(){
   console.log('express server listening on port ' + app.get('port'))
    });
