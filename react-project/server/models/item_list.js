var mongoose = require("mongoose");
var Schema = mongoose.Schema;
 
var itemSchema = new Schema({
					item_title: String,
					item_content: String
							    
					});
 
module.exports = mongoose.model('item',itemSchema);
