//API dadosabertos do congresso nacional
const urlDadosAbertos = 'https://dadosabertos.camara.leg.br/api/v2/deputados';

fetch(urlDadosAbertos)
  .then((response) => response.json())
  .then((data) => {
    let arrayTodosDeputados = data.dados;

    const display = document.querySelector('#display');
    const list = document.querySelector('.list');
    const selectList = document.querySelector('#nomes');
    const foto = document.getElementById('foto');

    popularSelect(arrayTodosDeputados);

    selectList.addEventListener('click', (e) => {
      //console.log(e.target.value);
      deputados(Number(e.target.value));
    });

    //Funçao para popular o tag select
    function popularSelect(arrayTodosDeputados) {
      arrayTodosDeputados.forEach((object) => {
        //Criar <option> para cada nome e um className=opt
        const option = document.createElement('option');
        option.innerHTML = `${object.nome}`;
        option.className = 'opt';

        //Criar atributo value='id' em <option>
        const attributeName = document.createAttribute('value');
        attributeName.value = `${object.id}`;
        option.setAttributeNode(attributeName);
        selectList.appendChild(option);
      });
    }

    function deputados(id) {
      //Evita as primeiras 513 NaN do select
      if (!isNaN(id)) {
        const deputado = arrayTodosDeputados.filter((obj) => obj.id === id);

        //Apaga a lista do deputado anterior
        while (list.firstChild) list.removeChild(list.firstChild);

        for (let key in deputado[0]) {
          if (key === 'nome' || key === 'siglaPartido' || key === 'siglaUf') {
            const li = document.createElement('li');
            li.innerHTML = `${key} : ${deputado[0][key]}`;
            list.appendChild(li);
          }
          if (key === 'urlFoto') {
            foto.setAttribute('src', `${deputado[0][key]}`);
          }
        }
      }
    }
  });
