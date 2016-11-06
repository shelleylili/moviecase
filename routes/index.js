var express = require('express');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/imooc",function(err){
    if(err){
        console.log(err);
    }
});
var Movie = require("../models/movie");
var User = require("../models/user");
var _ = require("underscore");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  Movie.fetch(function(err,movies){
      if(err) {
          console.log(err);
      }else{
          res.render('index', {
              title: '影片首页',
              movies:movies
          });
      }
      //console.log(movies);
  });
});
/*signup */
router.post("/user/signup",function(req,res){
    var _user = req.body;
    var user = new User(_user);
    user.save(function(err,user){
        if(err){
            console.log("ee",err);
        }

        res.redirect("/admin/userlist");
    });
});
/* user list page. */
router.get("/admin/userlist",function(req,res){
    User.fetch(function(err,users){
        if(err) {
            console.log(err);
        }else{
            res.render("userlist",{
                title:"列表 jade title",
                users:users
            });
            console.log(users[0]);
        }
    });
});
/* GET detail page. */
router.get("/movie/:id",function(req,res,next){
    var id=req.params.id;
    Movie.findById(id,function(err,movie){
        if(err){console.log(err);}else{
            res.render("detail",{
                title:"详情页面 jade title",
                movie:movie
            });
        }
    })
});
// admin update movie
router.get("/movie/update/:id",function(req,res){
   var id=req.params.id;
    if(id){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err);
            }else{
                res.render("admin",{
                    title:"更新页面",
                    movie:movie
                });
            }
        })
    }
});


//admin post movie
router.post('/admin/movie/new',function(req,res){
    console.log("body:",req.body);
    var id = req.body._id;
    console.log("id",id);
    var movieObj = req.body;
    console.log("movieObj",movieObj);
    var _movie;
    if(id!=="undefined"){
        Movie.findById(id,function(err,movie){
            if(err){
                console.log(err);
            }
            _movie = _.extend(movie,movieObj)//deep copy
            _movie.save(function(err,movie){
                if(err){
                    console.log(err);
                }
                res.redirect("/movie/"+movie._id);
            })
        })
    }else{
        _movie = new Movie({
            doctor:movieObj.doctor,
            title:movieObj.title,
            country:movieObj.country,
            year:movieObj.year,
            language:movieObj.language,
            poster:movieObj.poster,
            flash:movieObj.flash,
            summary:movieObj.summary
        });
        _movie.save(function(err,movie){
            if(err){
                console.log(err);
            }
            res.redirect("/movie/"+movie._id);
        });
    }
});

/* GET input page. */
router.get("/admin/movie",function(req,res,next){
    res.render("admin",{
        title:"录入页面 jade title",
        movie:{
            doctor:"",
            country:"",
            title:"",
            year:"",
            language:"",
            poster:"",
            flash:"",
            summary:""
        }
    });
});
/* GET list page. */
router.get("/admin/list",function(req,res){
    Movie.fetch(function(err,movies){
        if(err) {
            console.log(err);
        }else{
            res.render("list",{
                title:"列表 jade title",
                movies:movies
            });
            console.log(movies[0]);
        }
    });
});
router.delete("/admin/list",function(req,res){
    var id=req.query.id;
    if(id){
        Movie.remove({_id:id},function(err,movie){
            if(err){
                console.log(err);
            }else{
                res.json({success:1});
            }
        });
    }
});
module.exports = router;
