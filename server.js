var express = require("express");
var http = require("http");
var mysql = require("mysql");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));

var dateFormat = require("dateformat");
var now = new Date();

app.set('view engine', 'ejs');

app.use('/js', express.static(__dirname + '/node_modules/bootstrap/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/tether/dist/js'));
app.use('/js', express.static(__dirname + '/node_modules/jquery/dist'));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));

const con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "db_latihan_node_js"
});

const siteTitle = "SMNode-1.0 Application";
const baseUrl = "http://localhost:3000/";

// retrieve data

app.get('/', function(req, res){


	con.query("SELECT * FROM mahasiswa ORDER BY nama DESC", function(err, results){
		res.render('pages/index', {
			siteTitle: siteTitle,
			pageTitle: "CRUD SIMPLE",
			items: results,
		});
	});


});

// load view of page add data
app.get('/mahasiswa/add', function(req, res){


	con.query("SELECT * FROM mahasiswa ORDER BY nama DESC", function(err, results){
		res.render('pages/add-mahasiswa.ejs', {
			siteTitle: siteTitle,
			pageTitle: "CRUD SIMPLE",
			items: results,
		});
	});


});

// progress add data
app.post('/mahasiswa/add/progress', function(req, res){

		var query = "INSERT INTO `mahasiswa` (`nama`, `umur`, `alamat`) VALUES (";
		query += "'"+req.body.nama+"',";
		query += "'"+req.body.umur+"',";
		query += "'"+req.body.alamat+"')";

		con.query(query, function(err, result){
			if (err) {
				console.log(err);
			}else{
				res.redirect(baseUrl);	
			}
		});
});



// edit data
app.get('/mahasiswa/edit/:id', function(req, res){

		con.query("SELECT * FROM mahasiswa WHERE id = '"+req.params.id+"'", function(err, result){
			res.render('pages/edit-mahasiswa.ejs', {
				siteTitle: siteTitle,
				pageTitle: "EDIT DATA " + result[0].nama,
				item: result,
			});
		});
});


var server = app.listen(3000, function(){
	console.log("Server started 3000....");
});


