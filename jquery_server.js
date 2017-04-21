const express = require('express');
const app = express();
const path = require("path");


const Things = require('./model/things.js').Things;

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}))

app.use('/public', express.static('public'))
app.set('view engine', 'html')

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/views/jQuery_client.html'));
});


app.post('/',function(req,res){
    let photo =[];
    let name = [];
    let type = req.body.data;
    let data = Things.getThing(type);

    for (var index = 0; index < data.length; index++) {
      let image = {photo : data[index].photo, name : data[index].name}
      photo.push(image.photo);
      name.push(image.name);
    }
    res.json(photo)
    console.log(photo);
    console.log(name);
});


const server = require('http').Server(app);
server.listen(3000, function () {
    console.log('Running on port 3000!');
});
