const display = document.querySelector('#display');
const list = document.querySelector('.list');
const listItem = document.querySelector('.listItem');
const selectList = document.querySelector('#nomes');

selectList.addEventListener('click', (e) => {
  console.log(e.target.value);
});

//Funçao para popular o <select>
function selecionaDeputado(arrayTodosDeputados) {
  arrayTodosDeputados.forEach((object) => {
    //Criar <option> para cada nome e um className=opt
    const option = document.createElement('option');
    option.innerHTML = `${object.nome}`;
    option.className = 'opt';

    //Criar atributo value='id'
    const attributeName = document.createAttribute('value');
    attributeName.value = `${object.id}`;
    option.setAttributeNode(attributeName);
    selectList.appendChild(option);
  });
}

function deputados(arrayTodosDeputados) {
  for (const property in arrayTodosDeputados[0]) {
    console.log(property, arrayTodosDeputados[0][property]);
    if (
      property === 'nome' ||
      property === 'siglaPartido' ||
      property === 'siglaUf'
    ) {
      const li = document.createElement('li');
      li.innerHTML = `${property} : ${arrayTodosDeputados[0][property]}`;
      li.className = 'listItem';
      list.appendChild(li);
    }

    if (property === 'urlFoto') {
      const foto = document.createElement('img');
      const att = document.createAttribute('src');
      att.value = `${arrayTodosDeputados[0][property]}`;
      foto.setAttributeNode(att);
      list.insertAdjacentElement('beforebegin', foto);
    }
  }
}
