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
        obj.mes = 'Jan';
        break;
      case 2:
        obj.mes = 'Fev';
        break;
      case 3:
        obj.mes = 'Mar';
        break;
      case 4:
        obj.mes = 'Abr';
        break;
      case 5:
        obj.mes = 'Mai';
        break;
      case 6:
        obj.mes = 'Jun';
        break;
      case 7:
        obj.mes = 'Jul';
        break;
      case 8:
        obj.mes = 'Ago';
        break;
      case 9:
        obj.mes = 'Set';
        break;
      case 10:
        obj.mes = 'Out';
        break;
      case 11:
        obj.mes = 'Nov';
        break;
      case 12:
        obj.mes = 'Dez';
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
