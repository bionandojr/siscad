var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Notícias EngSoft' });
});

/* GET listusuarios page. */
router.get('/listusuarios', function(req, res) {
   var db = require("../infra/db");
   var Users = db.Mongoose.model('usuarios', db.UserSchema, 'usuarios');
   Users.find({}).lean().exec( //O lean() é opcional aqui, mas uma boa prática de performance, para
      function (e, docs) {     //retornar um JSON text-plain ao invés de objetos Mongoose complexos
         res.render('listusuarios', { "listusuarios": docs, title: 'SisCAD - Sistema de Cadastro e Despacho de Ocorrências' });
   });
});

/* GET cadastrar novo usuário */
router.get('/newuser', function(req, res) {
  res.render('newuser', { title: 'Cadastrar novo usuário' });
});

/* POST para adicionar usuário */
router.post('/adduser', function(req, res) {
  var db = require('../infra/db');
  const bcrypt = require('bcrypt');

  var nomeUsuario = req.body.nomeusu;
  var postoGrad = req.body.postoGraduacao;
  var numeroPraca = req.body.numeropraca;
  var matric = req.body.matricula;
  var func = req.body.funcao;
  var lograd = req.body.logradouro;
  var numer = req.body.numero;
  var bairr = req.body.bairro;
  var cidad = req.body.cidade;
  var estad = req.body.estado;
  var fone = req.body.contato;
  var email = req.body.email;
  var usuari = req.body.usuario;
  var senha = bcrypt.hashSync(req.body.senha, 10);

  var Users = db.Mongoose.model('usuarios', db.UserSchema, 'usuarios');

  var userDados = new Users({
    nome: nomeUsuario,
    endereco: lograd,
    numero: numer,
    bairro: bairr,
    cidade: cidad,
    estado: estad,
    email: email,
    telefone: fone,
    matricula: matric,
    patente: postoGrad,
    funcao: func,
    numeroPraca: numeroPraca,
    usuario: usuari,
    senha: senha
  });

  userDados.save(function (err) {
    if (err) {
      console.log("Deu erro! " + err.message);
      return err;
    }
    else {
      console.log("Usuário adicionado com sucesso");
      res.redirect("listusuarios");
    }
  });

  userDados.find(function(err, users) {
    if (err) {
      console.log("Deu erro! " + err.message);
      return err;
    }
    else {
      console.log(users);
      res.redirect("listusuarios");
    }
  });


});

module.exports = router;
