var express = require('express');
var app = express();
var mongoose = require('mongoose');
var mongodb = require('mongodb');
var Meeting = require('./models/meeting_list');
var Item = require('./models/item_list');
var connect = require('connect');
var bodyParser = require('body-parser');
let port = 3000;



var db = mongoose.connection;
db.on('error', console.error);
db.once('open', function(){
		    // CONNECTED TO MONGODB SERVER
		    console.log("Connected to mongod server");
      });

mongoose.connect('mongodb://localhost/react-project');

app.set('views', __dirname + '/views');
app.set('view engine', 'jsx');
app.engine('jsx', require('express-react-views').createEngine());



app.use('/',
		express.static(__dirname+'/../public')
		);



//app.use(bodyParser);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

////////////////////////////////////////////////


app.get('/attendance/location/n1', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		latitude: 36.374057,
		longitude: 127.365722
	})) 
})

app.get('/attendance/location/sparcs', function (req, res) {
	res.setHeader('Content-Type', 'application/json');
	res.send(JSON.stringify({
		latitude: 36.374261,
		longitude: 127.360387
	})) 
})




////////////////////////////////////////////////////////

app.post('/call_meeting_board',function(req,res){
			Meeting.find(function(err, meetings){
				if(err) return res.status(500).send({error: 'database failure'});
				console.log(meetings);
				res.json(meetings);
				})}
		
		);

app.get('/find_meeting/:did',function(req,res){

			console.log(req.params);
			var sss = JSON.stringify(req.params);
			console.log(sss);
			var obj_id= sss.split('\"')[3];
			console.log(obj_id);
			Meeting.findOne({"_id":obj_id},function(err, meeting){
				if(err) return res.status(500).send({error: 'database failure'});
				console.log(meeting);
				res.json(meeting);
				})}
		
		);




app.post('/register',
		function(req,res){
			console.log(req.body['presentor']);
			console.log(req.body['meeting_name']);
			console.log(req.body['meeting_date']);
			console.log(req.body['items']);

			var meeting = new Meeting();
			meeting.presentor = req.body['presentor'];
			meeting.meeting_name = req.body['meeting_name'];
			meeting.meeting_date = req.body['meeting_date'];
			//var item_list = JSON.parse(req.body['items']);

			var item_list = req.body['items'];
			for (var i = 0; i < item_list.length; i++){
				var item = new Item();
				var given_item = item_list[i];
				console.log(given_item);
				console.log(given_item['item_title']);
				item.item_title = given_item['item_title'];
				item.item_content = given_item['item_content'];
				meeting.items.push(item);
			}
			meeting.save(function(err,auc)
				{if(err){
					console.error(err);
					res.json({'response': 0});
					return;
				}
				else{
					console.log("save_success");
				}
			});

				
		});

var server = app.listen(3000, function(){
	console.log("It works ")
});


