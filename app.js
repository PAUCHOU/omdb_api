var express = require("express");
var request = require("request");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var app = express();
var moviesSaved = [{id: 1}]
var count = 1;

app.set("view engine", "ejs")
app.use(bodyParser.urlencoded());
app.use(methodOverride("_method"));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/search', function (req, res) {
    var query = req.query.searchTerm;
    var url = "http://www.omdbapi.com/?s=" + query;
    request(url, function (error, response, body) {
        if (!error) {
            var data = JSON.parse(body);
            res.render("results.ejs", {movieList: data.Search || []});
        }
    });
});

app.get('/movie', function (req, res) {
    var query = req.query.movieId;
    console.log(query);
    var url = "http://www.omdbapi.com/?i=" + query;
    request(url, function (error, response, body) {
        if (!error) {
            var data = JSON.parse(body);
            res.render("info.ejs", {movieInfo: data || []});
        }
    });
});

app.post("/saved", function(req, res){
	count += 1;
	console.log(req.body);
	var movie = req.body.movie;
	movie.id = count;
	movies.push(movie)
	res.render"/movie")
})

app.listen(3000);
