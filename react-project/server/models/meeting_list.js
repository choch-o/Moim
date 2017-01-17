var mongoose = require("mongoose");
var Schema = mongoose.Schema;
 
var meetingSchema = new Schema({
				
				presentor: String,
				meeting_name: String,
				meeting_date: Date,
				items: []
				    
					});
 
module.exports = mongoose.model('meeting',meetingSchema);
