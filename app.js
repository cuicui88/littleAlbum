var express = require("express");//引入express模块
var app = express();//被引入的express是一个函数，需要执行并将其赋值给app，需要用app执行后面的语句
var router = require("./controller");
//因为controller文件夹下的package.json文件里面指定了router.js为入口文件,因此不用显式地引入router.js文件


//设置模板引擎为ejs模板引擎
app.set("view engine","ejs");
//路由中间件
//下面设置的是一个静态页面
app.use(express.static("./public"));//一些需要公用的文件都存在这个里面，比如bootstrap的相关文件
app.use(express.static("./uploads"));

//首页
app.get("/",router.showIndex);//注意，这里并不需要传req,res参数，这里用来显示主页面,对应于index.ejs文件呈现的内容
app.get("/:albumName",router.showAlbum);//用来显示图片页面，主要对应于albums.ejs文件呈现的内容
app.get("/up",router.showUp);//上传页显示的内容，对应于up.ejs显示的内容
app.post("/up",router.doPost);//up路径的页面使用post请求进行数据的上传，对应于up.ejs中的表单要提交的内容
//最后的中间件
app.use(function(req,res){
    res.render("err");
});
app.listen(3000,"10.170.51.225");