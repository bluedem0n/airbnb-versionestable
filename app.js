var express = require("express");
var app = express();
var dream = require('dreamjs');

dream.customType('pi', function () {
  return Math.PI;
});


app.use(express.static(__dirname + "/src"));
app.use(express.static(__dirname + "/static"));
app.listen(3000 , function(){
  console.log("Servidor Encendido");
});