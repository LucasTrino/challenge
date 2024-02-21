# Challenge

---

#### Considerações:

Eu vou separar as explanações a respeito do código de acordo com a hash dos meus commits (não usarei o git flow, ou qualquer outro workflow que envolva o git, porque além de desnecessario neste caso, simplifica a correlação dessa 'documentação').

Os indexes que serão usados para as explicações das alterações de códigos segundo cada commit terão como titulo o pre-fixo 'commit' junto a **abreviação** da hash do commit seguente, dessa forma: **commit-(hash-do-commit)**.

Tambem vou fazer uso de notas para digressões de raciocio, para encadear considerações a respeito do código e/ou linhas de pensamento para tanto. Os indexes desses serão pre-fixados como 'notas', e a numerações dessas como segue: **Nota (index)**

Outra consideração importante é que, na explanação do desafio há a consideração da documentação das linhas que tangem o processo, para além da parte tecnica e/ou de uso, como documentar linhas de raciocio, teses, investigações e etc. Sendo assim, esse doc não tem como objetivo estrito a documentação de uso do que se propõe.

> Documentar todo o processo de investigação para o desenvolvimento da atividade [...]

> [...] os resultados destas tarefas são tão importantes do que o seu processo de pensamento e decisões à medida que as completa, por isso tente documentar e apresentar os seus hipóteses e decisões na medida do possível.

---

##### Nota 1:

As primeiras consirações que fiz antes de começar a codar, foi pesquisar sobre anagramas, para me ajudar a definar algumas regras que eu poderia precisar:

- A primeira foi evidentimente que anagramas precisam ter o mesmo número de caracteres.
- Que tais caracteres são, claro, os mesmos, mas em uma ordem 'embaralhada'.

Isso me levandou alguns insights, como:

- Poderia usar a prop length como parametro de exclusão do 'match' entre duas palavras que não poderiam ser anagramas.
- Eu poderia usar a função **prototype.split()** como o parametro ('') para transformar a string em um array de caracteres (que formam a palavra), usar a função **prototype.sort()** encadeada sem o callback como parametro para me formar um array com os caracteres reordenados e, por fim, **prototype.join()** com o parametro ('') para me voltar uma string na nova ordem, que me daria a possibilidade de comparar os anagramas usando o operador de 'igualdade estrita': (**===**).
- Outra consideração foi, para a comparação de um valor dentro de um array com seus sucessores e antecessores, ou seja, adjacentes, o que eu conheci como **'iterating through adjacent elements'**, eu precisaria usar um loop encadeado: método mais simples e comumente usado para o tal **'iterating through adjacent elements'**, pelo menos até onde eu conheço. Para tanto, um loop **for** me valeria mais nesse contexto, para usar **break** e **continue**, além de me ajudar a controlar melhor o **index** e ajudar na performance tambem, algo que nesse contexto, pelo menos, é secundario para mim, mas é outro ponto a favor do **for**.
- Outra coisa que pensei foi, obviamente, o método **JSON.parse()** e o **JSON.stringify()** para manipular o **JSON** de entrada. E então eu fui ao código, afim de rascunhar e válidar essas idéias.

---

#### commit-288e744:

- Nesse commit criei uma função com o nome de anagrama, e defini um argumento chamado array. A principio não vou me preocupar com padrões de nomes de variaveis ou argumentos, encapsular ou modularizar nada - vou deixar para aplicar os pincipios do SOLID a medida que problematizações posteriores surgirem. Como dito, é só um rascunho.
- Defini uma constante com o comprimento do array para controlar os loops **for** que viriam ('arrayLength'), e defini uma variavel **let** que será um array que irá ser populada por um objeto com uma chave 'anagramas' e com o valor que será um array de string com os anagramas ('anagramsArr').
- Fiz o encadeamento dos loops.
- Defini duas contantes com o nome de 'convertString1' e 'convertString2', cada uma com um valor de um item (string) que está sendo iterado que chama o método **string.prototype.toLowerCase()** para deixar as string todas em caixa baixa, e o **split()**, **sort()** e **join()** como planejado anteriormente.
- Um **if** que testa se os dois valores possuem o mesmo index, portanto, o mesmo valor já que os loops estão encadeado, e chama um continue para não considerar o mesmo valor com um anagrama de si mesmo.
- Comparo 'convertString1' e 'convertString2' com **iqualdade estrita**, crio um objeto no formato proposto, dou um **array.prototype.push()** com esse objeto como parâmetro, e retorno o 'anagramsArr'

Como era esperado, minha saída criou objetos com arrays de valores duplicados, mas era o minimo necessario para o first commit (nesse caso, já que os commits aqui servem facilitar a documentação).

##### A saida ficou assim:

> [
&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;"anagramas": 
&nbsp;&nbsp;&nbsp;&nbsp;[
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"amor",
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"roma"
&nbsp;&nbsp;&nbsp;&nbsp;]
&nbsp;&nbsp;},
&nbsp;&nbsp;{
&nbsp;&nbsp;&nbsp;&nbsp;"anagramas": 
&nbsp;&nbsp;&nbsp;&nbsp;[
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"roma",
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"amor"
&nbsp;&nbsp;&nbsp;&nbsp;]
&nbsp;&nbsp;},
&nbsp;&nbsp;[...]
]

---

##### Nota 2:
Agora, para o próximo commit, eu preciso:
* Acertar a saida, colocar os anagramas em um unico valor do meu array a ser retornado para não duplicar valores - array com as mesmas palavars mas em ordem tocada, como acima, onde temos dois objetos que possuem 'roma' e 'amor', mas em ordem trocada. 

* Tambem posso fazer alguns ajustes, como definir 'entitites' como a chave de cada objeto do array a ser retornado, no caso, 'anagramas', em uma variavel, e tambem selecionar a chave na qual estão as strings em cada objeto de entrada com **Object.prototype.keys()**.

* Posso usar um combinação de **array.prototype.find()** e **array.prototype.findIndex()**, ou talvez um **array.prototype.some()** para testar se já existe dentro de 'anagramsArr' (valor a ser retornado), um objeto que contenha um array com um anagrama do valor que esta sendo iterado no segundo **for**, dessa forma consigo ajuster a saida e não limitar o array de anagramas de dois valores.

* Posso ir aplicando os principios do SOLID, pois aumentando as condicionais e declarando mais variaveis de controle para isso, é mais fácil ir particionando o código seguindo a modularidade e função unica, além de definir nomes melhores para as variaveis e parametros seguindo o ISP.