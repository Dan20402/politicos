const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

let arrDeputados = [];
let deputado = {};
let despesas = {};
let mesValor = [];

router
  .route('/')
  .get((req, res) => {
    const url = 'https://dadosabertos.camara.leg.br/api/v2/deputados';
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        arrDeputados = data.dados;

        res.render('pages/index', {
          arrDeputados: arrDeputados,
          deputado: deputado,
          mesValor: mesValor,
        });
      });
  })
  .post((req, res) => {
    deputado = JSON.parse(req.body.deputado);

    fetch(
      `https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}/despesas?ordem=ASC&ordenarPor=ano&ano=2020`,
      { headers: { 'Content-Type': 'application/json' }, method: 'GET' }
    )
      .then((response) => {
        //Obs: sem a checagem if abaixo, o response é undefined, por que?
        if (response.ok) return response.json();
      })
      .then((data) => {
        despesas = data.dados;

        despesas.forEach((obj) => {
          mesValor.push({
            mes: obj.mes,
            valor: obj.valorLiquido,
          });
        });
        mesValor.sort((a, b) => {
          return a.mes - b.mes;
        });
      });

    console.log(mesValor);

    res.render('pages/index', {
      arrDeputados: arrDeputados,
      deputado: deputado,
      mesValor: mesValor,
    });
  });

module.exports = router;
