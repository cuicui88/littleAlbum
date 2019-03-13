
var file = require("../models/file.js");
var path = require("path");
var formidable = require("../node_modules/formidable");
var fs = require("fs");
//util = require("util");
//首页
exports.showIndex = function(req,res,next){
    //这就是Node.js的编程思维，就是所有的东西，都是异步的；
    //所以，内层函数用的不是return回来的东西，而是调用高层函数提供的
    //回调函数，把数据当做回调函数的参数来使用
    file.getAllAlbums(function(err,allAlbums){
        if(err){
            next();
            return;
        }
        res.render("index",{
            "albums":allAlbums
        });
    });
};
//相册页,遍历相册的所有图片
exports.showAlbum = function(req,res,next){
    var albumName = req.params.albumName;
    //具体业务交给模块
    file.getAllImagesByAlbumName(albumName,function(err,imagesArray){
        if(err){
            next();
            return;
        }
        res.render("album",{
            "albumname": albumName,
            "images": imagesArray
        });
    });
    
};

//显示上传表单的时候下拉列表中的文件夹名字
exports.showUp = function(req,res,next){
    file.getAllAlbums(function(err,allAlbums){
        if(err){
            next();
            return;
        }
        res.render("up",{
            "albums":allAlbums
        });
    });
};
//将图片上传到文件夹里面
exports.doPost = function(req,res,next){
    var form = new formidable.IncomingForm();
    form.uploadDir = path.normalize(__dirname+"/../tempup/");
    form.parse(req, function(err, fields, files) {
      //console.log(files);
      //console.log(fields);
      //console.log(util.inspect({fields: fields, files: files}));
      if(err){
          next();
          return;
      }
    //  var size = parseInt(files.tupian.size);
    //   if(size>2048){
    //     res.send("图片尺寸应该少于2M");
    //     fs.unlink(files.tupian.path);
    //     return;
    //   }
      var oldpath = files.tupian.path;
      var wenjianjia = fields.wenjianjia;
      var newpath = path.normalize(__dirname+"/../uploads/"+wenjianjia+"/"+files.tupian.name);
      fs.rename(oldpath,newpath,function(err){
        if(err){
            res.send("改名失败");
            return;
        }
        res.send("成功！");
       });
    });
    
}