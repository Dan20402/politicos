const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const axios = require('axios');
const filtrarDados = require('./filtrar_dados');

//Variaveis globais para templates
let arrayDeputados = [];
let deputado = {};
let cotaArr = [];
let arrayNews = [];

router
  .route('/')
  .get((req, res) => {
    const nomeUrl = 'https://dadosabertos.camara.leg.br/api/v2/deputados';
    fetch(nomeUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error(response.status);
        }
      })
      .then((data) => {
        arrayDeputados = data.dados;
        res.render('pages/index', {
          arrayDeputados: arrayDeputados,
          deputado: deputado,
          cotaArr: cotaArr,
          arrayNews: arrayNews,
        });
      })
      .catch((err) => console.log(err));
  })
  .post((req, res) => {
    deputado = JSON.parse(req.body.deputado);
    const cotaUrl = `https://dadosabertos.camara.leg.br/api/v2/deputados/${deputado.id}/despesas?ordem=ASC&ordenarPor=ano&ano=2020`;

    const apiKey = '5d425dea7e5246bda907a9cae559a448';
    const domains = 'Uol.com.br,Abril.com.br,Terra.com.br';
    const newsUrl = `http://newsapi.org/v2/everything?q=${deputado.nome}&apiKey=${apiKey}`;

    const requests = [cotaUrl, newsUrl];
    const promises = requests.map((url) => fetch(url));

    Promise.all(promises)
      .then(async ([promiseCota, promiseNews]) => {
        const cota = await promiseCota.json();
        const news = await promiseNews.json();
        return [cota, news];
      })
      .then((data) => {
        const cota = data[0].dados;

        //Visualizar somente os 3 primeiros artigos
        const news = data[1].articles.slice(0, 5);

        [cotaArr, arrayNews] = filtrarDados(cota, news);

        /*1. Ordenar cota por mes, juntar e somar valores mensais */

        res.render('pages/index', {
          arrayDeputados: arrayDeputados,
          deputado: deputado,
          cotaArr: cotaArr,
          arrayNews: arrayNews,
        });
      });
  });

module.exports = router;
