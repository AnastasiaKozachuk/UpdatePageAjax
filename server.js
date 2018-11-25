var express = require("express");
var bodyParser = require('body-parser');
var mongoose	=	require('mongoose');
var server = express();
server.listen(8888);
console.log("Listening on port 8888!")

server.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost/Recepts');

var db=	mongoose.connection;

server.use(express.static(__dirname));

db.on('error',function(err){
    console.log('connection	error:',err.message);
});
db.once('open',function callback(){
    console.log("Connected to DB!");
});
var schema=	new	mongoose.Schema({
    author: String,
    country:	String,
    imageLink:	String,
    language:	String,
    link:	String,
    pages:	Number,
    title:	String,
    year:	Number
});

var Recept = mongoose.model('Recept',schema);

server.get('/findAll', function(req, res){
    Recept.find(function (err, allRecepts) {
        if(err){
            res.send("No Recepts in DB");
        }else{
            res.send(allRecepts);
        }
    });
});

server.post('/saveBook', function(req, res){

    var book_info = req.body;

    var newBook = new Recept({
        author: book_info.author,
        country:	book_info.country,
        imageLink:	book_info.imageLink,
        language:	book_info.language,
        link:	book_info.link,
        pages:	book_info.pages,
        title:	book_info.title,
        year:	book_info.year
    });

    newBook.save(function (err, newBk) {
        if (err){
            console.log("Something goes wrong with Book" + newBk.title);
        }

        res.redirect("index.html");
    });

})