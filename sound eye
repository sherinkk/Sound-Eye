var express = require("express")
var app=express();
var mongoose=require("mongoose")
var seedDB=require("./seeds.js")
var bodyParser=require("body-parser")
var methodOverride=require("method-override")
var localStrategy=require("passport-local")
var passport=require("passport")
var flash=require("connect-flash")



mongoose.connect(process.env.DATABASEURL,{useNewUrlParser:true,useUnifiedTopology:true})

app.set("view engine","ejs");
app.use(express.static(__dirname + "/public"))

var Music=require("./models/music.js")
var Review=require("./models/review.js")
var User=require("./models/user.js")


app.use(bodyParser.urlencoded({extended:true}))
app.use(methodOverride("_method"))
app.use(flash())

app.use(require("express-session")({
	
	secret:"hell",
	resave:false,
	saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session());


passport.use(new localStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser()) 


app.use(function(req,res,next){
	
	res.locals.currentUser=req.user,
	res.locals.success=req.flash("success"),
	res.locals.error=req.flash("error"),
	next();
	
})

//seedDB();



app.get("/",function(req,res){
	res.render("home")
})

app.get("/aboutus",function(req,res){
	res.render("aboutus")
})

app.get("/musics",function(req,res){
	Music.find({},function(err,musics){
		if(err){
			console.log(err)
		}else{
			res.render("music/musics",{musics:musics})
		}
	})
})
app.get("/musics/new",isLoggedIn,function(req,res){
	
	res.render("music/new");
})

app.post("/musics",isLoggedIn,function(req,res){
	
	var title=req.body.title,
		artist=req.body.artist,
		image=req.body.image,
		description=req.body.description,
		author=req.user;
	
	var newMusic={
		title:title,
		artist:artist,
		image:image,
		description:description,
		author:author
	}
	
	Music.create(newMusic,function(err,musics){
		if(err){
			console.log(err)
		}else{
			res.redirect("/musics")
		}
	})
	
})

app.get("/musics/:id/pages/:page",function(req,res){
	Music.findById(req.params.id).populate("reviews").populate("author").exec(function(err,music){
		if(err){
			console.log(err)
		}else{
			//music.reviews.forEach(function(review){
			//	review.populate("author")
			//})
			res.render("music/show",{music:music,page:req.params.page})
		}
	})
})

app.get("/musics/:id/edit",checkMusicOwnership,function(req,res){
	
	Music.findById(req.params.id,function(err,music){
		
		if(err){
			console.log(err)
		}else{
			res.render("music/edit",{music:music})
		}
	})
})

app.put("/musics/:id",checkMusicOwnership,function(req,res){
	
	var title=req.body.title,
		artist=req.body.artist,
		image=req.body.image,
		description=req.body.description;
	
	var newMusic={
		title:title,
		artist:artist,
		image:image,
		description:description
	}
	
	Music.findByIdAndUpdate(req.params.id,newMusic,function(err,music){
		if(err){
			console.log(err)
		}else{
			res.redirect("/musics/"+req.params.id+"/pages/info")
		}
	})
	
	
})

app.delete("/musics/:id",checkMusicOwnership,function(req,res){
	
	Music.findByIdAndRemove(req.params.id,function(err){
		if(err){
			console.log(err)
		}else{
			res.redirect("/musics")
		}
		
	})
})

app.get("/musics/:id/reviews/new",isLoggedIn,function(req,res){
	
	Music.findById(req.params.id,function(err,music){
		if(err){
			console.log(err)
		}else{
			res.render("review/new",{music:music})
		}
	})
	
})

app.post("/musics/:id/reviews",isLoggedIn,function(req,res){
	
	Music.findById(req.params.id,function(err,music){
		if(err){
			console.log(err)
		}else{
			var newReview = {
				content:req.body.content,
				rating:req.body.rating,
				author:{
					username:req.user.username,
					id:req.user
				}
				
			}
			Review.create(newReview,function(err,review){
				if(err){
					console.log(err)
				}else{
					
					music.reviews.push(review);
					music.save();
					res.redirect("/musics/"+req.params.id+"/pages/reviews")
				}
			})
		}
	})
})

app.get("/musics/:id/reviews/:reviewid/edit",checkReviewOwnership,function(req,res){
	
	Music.findById(req.params.id,function(err,music){
		if(err){
			console.log(err)
		}else{
			Review.findById(req.params.reviewid,function(err,review){
				
				if(err){
					console.log(err)
				}else{
					res.render("review/edit",{music:music,review:review})
				}
			})
		}
	})
})

app.put("/musics/:id/reviews/:reviewid",checkReviewOwnership,function(req,res){
	
	Review.findByIdAndUpdate(req.params.reviewid,{content:req.body.content,rating:req.body.rating},function(err,review){
		if(err){
			console.log(err)
		}else{
			res.redirect("/musics/"+req.params.id+"/pages/reviews")
		}
	})
})

app.delete("/musics/:id/reviews/:reviewid",checkReviewOwnership,function(req,res){ 

	Review.findByIdAndRemove(req.params.reviewid,function(err){
		if(err){
			console.log(err)
		}else{
			res.redirect("/musics/"+req.params.id+"/pages/reviews")
		}
	})
})

app.get("/register",function(req,res){
	res.render("index/register")
})


app.post("/register",function(req,res){
	
	User.register(new User({username:req.body.username}),req.body.password,function(err,user){
		if(err){
			req.flash("error",err.message)
			res.redirect("back")
		}else{
			passport.authenticate("local")(req,res,function(){
				res.redirect("/musics")
			})
			
		}
	})
})

app.get("/login",function(req,res){
	res.render("index/login")
})

app.post("/login",passport.authenticate("local",{
	
	successRedirect:"/musics",
	failureRedirect:"/login"
}),function(req,res){
		
})

app.get("/logout",function(req,res){
	req.logout();
	req.flash("success","Successfully logged out ")
	res.redirect("/musics")
})

function isLoggedIn(req,res,next){
	if(req.isAuthenticated()){
		next();
	}else{
		req.flash("error","You need to login first !!")
		res.redirect("/login")
	}
}

function checkMusicOwnership(req,res,next){
	
	if(req.isAuthenticated()){
		
		Music.findById(req.params.id,function(err,music){
			if(err){
				console.log(err)
			}else{
				
				if(req.user._id.equals(music.author._id)|| req.user.username == "admin"){
					next();
				}else{
				req.flash("error","You don't have permission for that !!")
				res.redirect("back")
				}
			}
		})
		
	}else{
		req.flash("error","You need to login first !!")
		res.redirect("/login")
	}
}

function checkReviewOwnership(req,res,next){
	if(req.isAuthenticated()){
		
		Review.findById(req.params.reviewid,function(err,review){
			if(err){
				console.log(err)
				
			}else{
				if(req.user._id.equals(review.author.id._id) || req.user.username == "admin"){
					
					next();
					
				}else{
					req.flash("error","You don't have permission for that !!")
					res.redirect("back")
				}
			}
		})
		
	}else{
		req.flash("error","You need to login first !!")
		res.redirect("/login")
	}
}

app.listen(process.env.PORT||3000,process.env.IP,function(){
	console.log("server up and running")
})