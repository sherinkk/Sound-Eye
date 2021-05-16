var mongoose=require("mongoose")

var reviewSchema = new mongoose.Schema({
	
	content:String,
	rating:Number,
	author:{
		username:String,
		id:{
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		}
	}
})


var Review = mongoose.model("Review",reviewSchema);

module.exports=Review;