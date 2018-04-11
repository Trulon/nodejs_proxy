//本项目启动端口
const port = 9010;

var express = require("express");
var proxy = require('http-proxy-middleware');
var app = express();

//匹配请求转发到代理主机,可使用正则表达式匹配
app.use('/his', proxy({
    target: "http://www.baidu.com",
    changeOrigin: true
}));

//设置响应头允许跨域[无该设置被代理的站点数据也能拿到，该设置为了让自己的响应支持任意页面访问]
app.all('*', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "X-Requested-With");
	res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	//res.header("X-Powered-By",' 3.2.1');
	//res.header("Content-Type", "application/json;charset=utf-8");
	next();
});

//本项目的静态资源
app.use(express.static('public'));

var server = app.listen(port, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})