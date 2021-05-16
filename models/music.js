var mongoose=require("mongoose")

var musicSchema = new mongoose.Schema({
	title:String,
	artist:String,
	image:String,
	//genre:String,
	description:String,
	//lyrics:String,
	//likes:Number	
	reviews:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Review"
	}],
	author:{
		//username:String,
		
			type:mongoose.Schema.Types.ObjectId,
			ref:"User"
		
	}
})

var Music = mongoose.model("Music",musicSchema);

module.exports=Music;