const { modelNames } = require('mongoose');

var ID_CONTATO_INC = 3;

var contatos = [
    { _id: 1, nome: 'Nathalia Bim', email: 'nathalia.bim@aluno.ifsp.edu.br' },
    { _id: 2, nome: 'Nathalia Bim', email: 'nathalia.bim@aluno.ifsp.edu.br' },
    { _id: 3, nome: 'Nathalia Bim', email: 'nathalia.bim@aluno.ifsp.edu.br' }
]

module.exports = function (app) {
    var Contato = app.models.contato;
    var controller = {};
    var sanitize = require('mongo-sanitize');

    controller.salvaContato = function (req, res) {
        var _id = req.body._id;
        var dados = {
            "nome" : req.body.nome,
            "email" : req.body.email,
            "emergencia" : req.body.emergencia || null
            };
        if (_id) {
            Contato.findByIdAndUpdate(_id, dados).exec()
                .then(
                    function (contato) {
                        res.json(contato);
                    },
                    function (erro) {
                        console.error(erro)
                        res.status(500).json(erro);
                    }
                );
        } else {
            Contato.create(dados)
                .then(
                    function (contato) {
                        res.status(201).json(contato);
                    },
                    function (erro) {
                        console.log(erro);
                        res.status(500).json(erro);
                    }
                );
        }
    };


    
    controller.removeContato = function (req, res) {
        var _id = req.params.id;
        Contato.remove({ "_id": _id }).exec()
            .then(
                function () {
                    res.end();
                },
                function (err) {
                    return console.error(erro);
                }
            );
    }
    controller.listaContatos = function (req, res) {
        Contato.find().exec().then(
            function (contatos) {
                res.json(contatos);
            },
            function (erro) {
                console.error(erro)
                res.status(500).json(erro);
            });
    };

    controller.obtemContato = function (req, res) {
        var _id = req.params.id;
        Contato.findById(_id).exec().then(
            function (contato) {
                if (!contato) throw new Error("Contato não encontrado");
                res.json(contato)
            },
            function (erro) {
                console.log(erro);
                res.status(404).json(erro)
            });
    };
 
   
    function verificaAutenticacao(req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        } else {
            res.status('401').json('Não autorizado');
        }
    }

    return controller;
};
