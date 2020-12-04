const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

let arrDeputados = [];
let deputado = {};
let despesas = {};

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
        });
      });
  })
  .post((req, res) => {
    deputado = JSON.parse(req.body.deputado);

    res.render('pages/index', {
      arrDeputados: arrDeputados,
      deputado: deputado,
    });

    fetch(
      `https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}/despesas?ordem=ASC&ordenarPor=ano`,
      { headers: { 'Content-Type': 'application/json' }, method: 'GET' }
    )
      .then((response) => {
        //Obs: sem a checagem if abaixo, o response é undefined, por que?
        if (response.ok) return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  });

module.exports = router;
