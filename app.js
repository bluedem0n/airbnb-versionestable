var express = require("express");
var app = express();
var dream = require('dreamjs');

dream.customType('pi', function () {
  return Math.PI;
});

var genero = ['women', 'men'];
var numero = [];
for (var i = 0; i <= 99; i++) {
    numero.push(i);
}
dream.customType('imagen', function(helper){
  return 'https://randomuser.me/api/portraits/med/' + helper.oneOf(genero) + '/' + helper.oneOf(numero) + '.jpg' ;
});

dream.customType('FiveWordsSentence', function (helper) {
  return helper.chance.sentence({words: 5});
});

var lugares = dream
  .schema({
    phrase: 'FiveWordsSentence',
    imagen: 'imagen',
    address: 'address',
    contact: {
      phone: 'phone',
      servicePhone: /^(800[1-9]{6})$/
    },
    foo: function () {
      return 'bar';
    },
    pi: 'pi',
    hello: 'hello'
  })
  .generateRnd(100)
  .output();
  
app.get('/places', function (req, res) {
    var lugar = req.query.lugar;
    var lugaresFiltrados = [];
    for (var i = 0; i < lugares.length; i++) { //lugares = > dream shema
        var plac = lugares[i]; //lugares = > dream shema
            lugaresFiltrados.push(plac);      
    }
    res.send(lugaresFiltrados);
})

app.use(express.static(__dirname + "/src"));
app.use(express.static(__dirname + "/static"));
app.listen(3000 , function(){
  console.log("Servidor Encendido");
});