const filtrarDados = (arrayCota, arrayNews) => {
  //filtrar news

  const news = arrayNews.filter((obj) => {
    return (
      obj.source.name === 'Terra.com.br' ||
      obj.source.name === 'Uol.com.br' ||
      obj.source.name === 'Abril.com.br' ||
      obj.source.name === 'R7.com' ||
      obj.source.name === 'Ig.com.br' ||
      obj.source.name === 'Globo'
    );
  });

  arrayCota.sort((a, b) => {
    return a.mes - b.mes;
  });

  arrayCota.forEach((obj) => {
    switch (obj.mes) {
      case 1:
        obj.mes = 'Janeiro';
        break;
      case 2:
        obj.mes = 'Fevereiro';
        break;
      case 3:
        obj.mes = 'Março';
        break;
      case 4:
        obj.mes = 'Abril';
        break;
      case 5:
        obj.mes = 'Maio';
        break;
      case 6:
        obj.mes = 'Junho';
        break;
      case 7:
        obj.mes = 'Julho';
        break;
      case 8:
        obj.mes = 'Agosto';
        break;
      case 9:
        obj.mes = 'Setembro';
        break;
      case 10:
        obj.mes = 'Outubro';
        break;
      case 11:
        obj.mes = 'Novembro';
        break;
      case 12:
        obj.mes = 'Dezembro';
        break;
      default:
        obj.mes = 'Unidentified';
        break;
    }
  });

  //Agrupar as despesas pelo key 'mes'
  const key = 'mes';
  const filtrado = arrayCota.reduce((resultado, atual) => {
    if (!resultado[atual[key]]) {
      resultado[atual[key]] = [];
    }
    resultado[atual[key]].push(atual);
    return resultado;
  }, {});

  //transformar filtrado em array e retornar
  return [Object.values(filtrado), news];
};

module.exports = filtrarDados;
