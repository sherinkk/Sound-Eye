
var array=[
	{
		title:"photograph",
		artist:"ed sheeran",
		image:"https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTqQ1sWt4C9STszq8j4egfUcy6-c3GC7GZFSc8Gifl4kK5gGSuY&usqp=CAU",
		description:"Loving can hurt, loving can hurt sometimes But its the only thing that"
	},
	{
		title:"photograph",
		artist:"ed sheeran",
		image:"https://api.time.com/wp-content/uploads/2019/09/karaoke-mic.jpg",
		description:"Loving can hurt, loving can hurt sometimes But its the only thing that"
	},
	{
		title:"photograph",
		artist:"ed sheeran",
		image:"https://www.tech4masters.com/1/2014/12/google-song-lyrics.jpg",
		description:"Loving can hurt, loving can hurt sometimes But its the only thing that"
	},
	{
		title:"photograph",
		artist:"ed sheeran",
		image:"https://f.prxu.org/song-exploder/images/f648851c-d36e-4342-8a9f-521df2fc7a62/songexploder-logo.png",
		description:"Loving can hurt, loving can hurt sometimes But its the only thing that"
	}
]

var Music=require("./models/music"),
	Review=require("./models/review")

function seedDB(){
	
	Music.remove({},function(err){
		if(!err){
			//array.forEach(function(music){
			//	Music.create(music,function(err,music){
			//		if(err){
			//			console.log(err)
			//		}else{
						
						Review.remove(function(err){
							
			//				Review.create({content:"test case"},function(err,review){
			//					if(err){
			//						console.log(err)
			//					}else{
			//						music.reviews.push(review);
			//						music.save();
			//						console.log(music)
			//					}
			//				})
							
						})
						
			//		}
			//	})	
			//})

		}
	})
	
}




module.exports = seedDB;



