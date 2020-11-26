//API dadosabertos do congresso nacional
const urlDadosAbertos = 'https://dadosabertos.camara.leg.br/api/v2/deputados';

fetch(urlDadosAbertos)
  .then((response) => response.json())
  .then((data) => {
    let arrayTodosDeputados = data.dados;
    selecionaDeputado(arrayTodosDeputados);
    deputados(arrayTodosDeputados);
  });
