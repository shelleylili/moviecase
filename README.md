从慕课网上看到的视频教程，学习过程中试着搭建的小案例

一、node和express搭建环境
    1）npm init
    2）npm install express-generator   //如果不提前安装第四部时候会提示express不是能不指令
    3）npm install express
    4）express    创建框架结构//生成项目的目录结构了
    5）bower init 
    6）bower install bootstrap jquery
    7）在views/layout.jade文件中引入bootstrap和jquery，因为layout.jade被其他文件继承，所以只在该页面中引用即可。
    8）建立admin.jade(录入页面)detail.jade(电影详情页面)list.jade(电影列表页面)index.jade(初始海报介绍页面)等文件。
    9）搭建路由在routes/index.js下面
        var express = require('express');
        var router = express.Router();
        router.get("/",function(req,res,next){
            res.render('index', {//首页
              title: '影片首页',
              movies:{
                    doctor:"*********"
                        .
                        .
                        .
               }//可以自己模拟数据测试
          });
        });
        还有router.get(/admin/list ---》列表页
        router.get(/admin/movie---->录入页面
        router.get(/movie/:id----》详情页
        后面还有添加router.delete(/admin/list  删除某个id的电影
                               router.post(/admin/movie/new 新添加  (表单里面对应action)
                               router.get(/admin/update/:id 修改
二、mongodb部分
1）.下载，官网上没有windXP系统适合，从http://download.csdn.net/download/jason7654321/4410283
获取32位的资源。（因为XP系统mongodb3.0以下版本有个大坑，一会儿会遇到）
2）.解压该文件到一个层级较少的根目录例如E:\mongodb，然后在解压后的E:\mongodb\下面创建data目录，再在data\下面创建db目录存放数据库（E:\mongodb\data\db）,log目录存放日志文件（E:、mongodb\data\log）。然后进入cmd，进入E:\mongodb\bin目录，执行命令：mongod --dbpath E:\mongodb\data\db --port 27017 --logpath E:\mongodb\data\log --journal回车，就可以看到wait connect to 127.0.0.1:27017。。。。等提示，就可以在浏览器中输入：localhost:27017测试，如果看到You are trying to access MongoDB on the native driver port. For http diagnostic access, add 1000 to the port number. 这行文字就表示成功了。
3）.可以在刚才的cmd中接着输入mongod回车，或者在 E:\mongodb\bin\mongo.exe打开，如果成功可以看到提示版本号等信息，然后可以输入以下命令来做测试和使用：
1.show dbs ：显示所有数据库
2.use imooc：进入imooc数据库，没有imooc就创建一个并进入
3.show collections：显示所有集合
4.db.createCollection（“movies”）；创建集合movies
5.db.moives.insert({//这种格式是方便看，命令行里面还是直接敲到一行
      doctor:"shelley",year:"2020",title:"zhuzhuxiaxia",
       poster:"http://r3.ykimg.com/05160000530EEB63675839160D0B79D5",
       language:"chinese,english",
       country:"China",
       flash:"http://player.youku.com/player.php/sid/XNjA1Njc0NTUy/v.swf",
       summary:"It's really a perfect movie in this area. Nice! "
}):   向集合movies插入数据(这里还有注意的是_id是默认分配的不用设置)
这样反复加入几条数据，随心意几条都可以，
6.db.movies.remove({_id:"05hsdfhkdsfhkdsfhjkfl9884783kell"}) :移除该条数据
三、nodejs和mongodb连接的部分
1）.npm install mongoose@3.8.14    //所以这里加了这个版本号
2)  var mongoose = require("mongoose");
      mongoose.connect("mongodb://localhost/imooc")  //这里就出现坑了.......
        /********************
node里面连接mongodb本地数据库报错MongodbError connect UNKNOWN的问题解决了，是因为系统winxp的缘故，安装的是3.0以下的mongodb，然后mongoose要使用3.8以下版本，我重新安装了一个3.8.14的mongoose就可以了，stackoverflow上找到的方法，卡了好长时间。。。。。
       **********************/
然后就可以愉快的访问数据了。。。。。
/********issues**********/
各种错误
1.集合里面插数据时候以为_id要自己插入........
2.body.input类型的name可以获取到这个元素对应的value值
3.添加.bowerrc文件转移bower  install的插件到指定目录
4.npm install moment安装后
    var app = express();
    app.locals.moment = require("moment");  //放到app的locals上才能在页面调用moment方法。而不是router上。
5.app.use(express.static(path.join(_dirname,"public"))); //指定引入文件默认路径时候要注意，会经常忘了写错路径在页面引用文件时候。
6.创建schema模式时候忘记暴露该接口
