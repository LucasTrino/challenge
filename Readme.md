# Challenge

---

#### Considerações:

Eu vou separar as explanações a respeito do código de acordo com a hash dos meus commits (não usarei o git flow, ou qualquer outro workflowque envolva o git, porque além de desnecessário neste caso, simplifica a correlação dessa 'documentação').

Os indexes que serão usados para as explicações das alterações de códigos segundo cada commit terão como titulo o pre-fixo 'commit' junto a **abreviação** da hash do commit seguente, dessa forma: **commit-(hash-do-commit)**.

também vou fazer uso de notas para digressões de raciocino, para encadear considerações a respeito do código e/ou linhas de pensamento para tanto. Os indexes desses serão pre-fixados como 'notas', e a numerações dessas como segue: **Nota (index)**

Outra consideração importante é que, na explanação do desafio há a consideração da documentação das linhas que tangem o processo, para além da parte técnica e/ou de uso, como documentar linhas de raciocino, teses, investigações, etc. Sendo assim, esse doc não tem como objetivo estrito a documentação de uso do que se propõe.

> Documentar todo o processo de investigação para o desenvolvimento da atividade [...]

> [...] os resultados destas tarefas são tão importantes do que o seu processo de pensamento e decisões à medida que as completa, por isso tente documentar e apresentar os seus hipóteses e decisões na medida do possível.

---

##### Nota 1:

As primeiras considerações que fiz antes de começar a codar, foi pesquisar sobre anagramas, para me ajudar a definir algumas regras que eu poderia precisar:

- A primeira foi evidentemente que anagramas precisam ter o mesmo número de caracteres.
- Que tais caracteres são, claro, os mesmos, mas em uma ordem 'embaralhada'.

Isso me levandou alguns insights, como:

- Poderia usar a prop. length como parâmetro de exclusão do 'match' entre duas palavras que não poderiam ser anagramas.
- Eu poderia usar a função **prototype.split()** como o parâmetro ('') para transformar a string em um array de caracteres (que formam a palavra), usar a função **prototype.sort()** encadeada sem o callback como parâmetro para me formar um array com os caracteres reordenados e, por fim, **prototype.join()** com o parâmetro ('') para me voltar uma string na nova ordem, que me daria a possibilidade de comparar os anagramas usando o operador de 'igualdade estrita': (**===**).
- Outra consideração foi, para a comparação de um valor dentro de um array com seus sucessores e antecessores, ou seja, adjacentes, o que eu conheci como **'iterating through adjacent elements'**, eu precisaria usar um loop encadeado: método mais simples e comumente usado para o tal **'iterating through adjacent elements'**, pelo menos até onde eu conheço. Para tanto, um loop **for** me valeria mais nesse contexto, para usar **break** e **continue**, além de me ajudar a controlar melhor o **index** e ajudar na performance também, algo que nesse contexto, pelo menos, é secundário para mim, mas é outro ponto a favor do **for**.
- Outra coisa que pensei foi, obviamente, o método **JSON.parse()** e o **JSON.stringify()** para manipular o **JSON** de entrada. E então eu fui ao código, afim de rascunhar e validar essas ideias.

---

#### commit-288e744:

- Nesse commit criei uma função com o nome de anagrama, e defini um argumento chamado array. A princípio não vou me preocupar com padrões de nomes de variaveis ou argumentos, encapsular ou modularizar nada - vou deixar para aplicar os pincipios do SOLID a medida que problematizações posteriores surgirem. Como dito, é só um rascunho.
- Defini uma constante com o comprimento do array para controlar os loops **for** que viriam ('arrayLength'), e defini uma variavel **let** que será um array que irá ser populada por um objeto com uma chave 'anagramas' e com o valor que será um array de string com os anagramas ('anagramsArr').
- Fiz o encadeamento dos loops.
- Defini duas contantes com o nome de 'convertString1' e 'convertString2', cada uma com um valor de um item (string) que está sendo iterado que chama o método **string.prototype.toLowerCase()** para deixar as strings todas em caixa baixa, e o **split()**, **sort()** e **join()** como planejado anteriormente.
- Um **if** que testa se os dois valores possuem o mesmo index, portanto, o mesmo valor já que os loops estão encadeados, e chama um continue para não considerar o mesmo valor com um anagrama de si mesmo.
- Comparo 'convertString1' e 'convertString2' com **igualdade estrita**, crio um objeto no formato proposto, dou um **array.prototype.push()** com esse objeto como parâmetro, e retorno o 'anagramsArr'

Como era esperado, minha saída criou objetos com arrays de valores duplicados, mas era o mínimo necessário para o first commit (nesse caso, já que os commits aqui servem facilitar a documentação).

##### A saida ficou assim:

> [
> &nbsp;&nbsp;{"anagramas": ["amor","roma"]},
> &nbsp;&nbsp;{"anagramas": ["roma","amor"]},
> &nbsp;&nbsp;[...]
> ]

---

##### Nota 2:

Agora, para o próximo commit, eu preciso:

- Acertar a saida, colocar os anagramas em um único valor do meu array a ser retornado para não duplicar valores - array com as mesmas palavars, mas em ordem tocada, como acima, onde temos dois objetos que possuem 'roma' e 'amor', mas em ordem trocada.

- Também posso fazer alguns ajustes, como definir 'entitites' como a chave de cada objeto do array a ser retornado, no caso, 'anagramas', em uma variavel, e também selecionar a chave na qual estão as strings em cada objeto de entrada com **Object.prototype.keys()**.

- Posso usar uma combinação de **array.prototype.find()** e **array.prototype.findIndex()**, ou talvez um **array.prototype.some()** para testar se já existe em 'anagramsArr' (valor a ser retornado), um objeto que contenha um array com um anagrama do valor que esta sendo iterado no segundo **for**, dessa forma consigo ajustar a saida e não limitar o array de anagramas de dois valores.

- Posso ir aplicando os princípios do SOLID - dentro do possivel, claro - pois aumentando as condicionais e declarando mais variaveis de controle para isso, é mais fácil ir particionando o código seguindo a modularidade e função unica, além de definir nomes melhores para as variaveis e parâmetros seguindo o ISP.

---

#### commit-6c8e92d:

Nesse commit eu comecei mudando os nomes das variaveis e parâmetros, e deixando de lado modularização, adicionando as regras na propria função principal - a findAnagrams().
Após definir as regras e 'testar', garantindo que a saída estava correta, eu parti para modularizar o código e reduzir o tamanho de findAnagrams(). Eu não segui 100% o ISP nesse caso, pois, nomear as funções de acordo com o contexto do que foi pedido - anagramas -, ajuda as explicações e entendimento, além disso, também não sigo aqui o princípio de responsabilidade unica, dado o escopo reduzido.
Então, ja 'modularizado', vou seguir minhas explicações segundo as funções criadas, começando pela principal - findAnagrams() e ir explicando as outras na ordem em que aparecem nela.

- Comecei declarando quatro variaveis usando o **sigle var** pattern.
- Defini 'anagramKey' e 'firstKey' para aumentar a flexibilidade do formato do JSON de entrada e o de saida.
- A primeira coisa que eu precisei fazer foi pegar o valor da string do primeiro objeto do array de entrada e aplicar a 'conversão' com **toLowerCase()**, **split()**, **sort()** e **join()**, junto a isso, já modularizei essa regra em uma função chamada 'sortStringAlphabetically', e coloquei esse valor dentro de 'currentElement'.
- Depois precisei ajustar o retorno e corrigir algumas falhas do 'rascunho' do primeiro commit como, por exemplo, criar um objeto com arrays de valores semelhantes e que tinham um limite de dois valores. Para isso, precisei iterar também sobre 'anagramsArray', o array que servira de retorno. Então, criei outro **for** loop para percorrer sobre ele e procurar um anagrama do 'currentElement' já existente. Então, criei a função 'findAndAddAnagram()'. Em cada objeto em 'anagramsArray', vou procurar por um valor do array que é um anagrama do elemento atual: 'currentElement' e fazer a comparação.
  - Para iterar sobre os valores, usei **array.prototype.some()** com um callback que vai organizar o valor iterado usando a função 'sortStringAlphabetically()' e retornando o booleano atraves do '==='.
  - A lógica acima, coloquei dentro de outra função chamada 'hasAnyEqualAnagram'.
  - Caso exista um anagrama que corresponda ao 'currentElement', eu adiciono 'currentElement' no array do objeto que esta sendo iterado em 'anagramsArray' e retorno um valor booleano: true, caso o exista uma correspondencia. False, caso não exista ou 'anagramsArray' esteja vazio - a princípio adicionei um **if** para testar o **length** de 'anagramsArray', mas quando fui criar a função 'findAndAddAnagram()' me dei conta que caso ele seja igual a zero, ele vai falhar na condição do **for** e o loop não irá ser executado.
  - Criei uma variavel com o nome 'found', pois caso o retorno de 'findAndAddAnagram()' seja false, preciso adicionar o princípio do **'iterating through adjacent elements'** mencionado anteriormente, sobre as regras especuladas no primeiro 'commit'.
- Para tanto - aplicar o **'iterating through adjacent elements'** - criei a função 'findElementAnagram()', que é uma refatoração do 'rascunho' do 'commit' anterior. Agora ela retorna um booleano - true caso ache um anagrama adjacente ao 'currentElement', reorganizado com a função 'sortStringAlphabetically()', no array de entrada, e false, caso não encontre. Coloco esse valor de retorno na variavel 'hasAnagram' que me serviu como variavel de controle para fazer um **push()** de um novo valor em 'anagramsArray' caso essa esteja vazia, ou ainda não exista um objeto que contenha um array já com um anagrama de 'currentElement'.
- Adicionei o **parse()** e o **stringify()**.

#####A saida ficou assim:

> '[
> &nbsp;&nbsp;{"anagramas": ["amor","roma","ramo"]},
> &nbsp;&nbsp;{"anagramas": ["padre","pedra"]},
> &nbsp;&nbsp;{"anagramas": ["bolo","lobo"]},
> &nbsp;&nbsp;{"anagramas": ["rota","ator"]}
> ]'

Obs: Esqueci de adicionar a explanação acima no commit correspondente.

---

#### Nota 3:

Para o proximo commit, eu pensei em adicionar os testes automatizados com **jest** para as funções criadas, ou adicionar algo em relação à programação defensiva. Acho que para melhorar o que já existe, vou para a segunda opção. Claro que começar pelos testes é sempre a melhor opção, mas dado o escopo reduzido do desafio e o tempo, além das configurações de setup para isso, talvez partir para melhorar a funcionalidade das funções, em busca de melhorar a consistencia, eu vou adicionar mais valor para a entrega, e aplicando uma programação defensiva eu já aumento a segurança e confiabilidade das funções.

---

#### commit-cf14a0c:

Nesse commit eu apliquei algumas estratégias da programação defensiva na 'função principal': 'findAnagrams()'. Adicionei um bloco **try/catch** e coloquei alguns comentários em cada alteração, e vou esclarecer cada uma abaixo:

- A primeira foi testar se o parsed JSON me volta, de fato, um array:
  `    
if (!Array.isArray(parsedArray)) {
  throw new Error('JSON data is not an array');
}`

![defensive 1](./imgs/defensive%201.png)

- A segunda foi para aumentar a consistencia de saida usando o **"early return"**:

`  if (arrayLength === 0) {
     return JSON.stringify([]);
   }`
![defensive 2](./imgs/defensive%202.png)

- O terceiro foi garantir que as chaves, que precisamos para operar sobre o JSON, são consistentes, ou seja, têm o mesmo 'nome':
  `  
for (let i = 1; i < arrayLength; i++) {
   const currentKey = Object.keys(parsedArray[i])[0];
   if (currentKey !== firstKey) {
      throw new Error('Keys in the objects are not consistent. Expected '${firstKey}', but found '${currentKey}' at index ${i}');
   }
}`

![defensive 3](./imgs/defensive%203.png)

- O quarto é conferir se o valor do 'currentElement', ou seja, do valor que deveria ser uma string que pode ser anagrama é `null` ou `undefined`. Na verdade, nesse caso, poderia generalizar se 'currentElement' é igual uma string - vou modificar no proximo commit.
  `   if (typeof currentElement === 'undefined' || currentElement === null) {
    console.warn('Element at index ${i} is undefined or null.');
    continue;
 }`

![defensive 4](./imgs/defensive%204.png)

---

#### Nota 4:

No proximo commit vou corrigir alguns pontos do commit anterior e 'modularizar' as validações de formato do JSON de entrada.

---


