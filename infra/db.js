var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27007/db_siscad');

var usuarioSchema = new mongoose.Schema({
  nome: String,
  endereco: String,
  numero: String,
  bairro: String,
  cidade: String,
  estado: String,
  email: String,
  telefone: Number,
  matricula: { type : Number , unique : true, required : true },
  patente: String,
  funcao: String,
  numeroPraca: String,
  usuario: { type : String , unique : true, required : true },
  senha: { type : String , required : true }
}, {collection: 'usuarios'});

var vtrSchema = new mongoose.Schema({
  prefixo: { type : String , unique : true, required : true },
  equipe: String,
  areaAtuacao: String,
  equipamentos: String,
  comentarios: String,
  status: String
}, {collection: 'vtrs'});

module.exports = { Mongoose: mongoose, UserSchema: usuarioSchema, VtrSchema: vtrSchema }
