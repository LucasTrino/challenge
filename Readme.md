# Challenge

---

#### Considerações:

Eu vou separar as explanações a respeito do código de acordo com a hash dos meus commits (não usarei o git flow, ou qualquer outro workflow que envolva o git, porque além de desnecessario neste caso, simplifica a correlação dessa 'documentação'). 

Os indexes que serão usados para as explicações das alterações de códigos segundo cada commit terão como titulo o pre-fixo 'commit' junto a hash do commit seguente, dessa forma: **commit-(hash-do-commit)**.

Tambem vou fazer uso de notas para digressões de raciocio, para encadear considerações a respeito do código e/ou linhas de pensamento para tanto. Os indexes desses serão pre-fixados como 'notas', e a numerações dessas como segue: **Nota (index)**

Outra consideração importante é que, na explanação do desafio há a consideração da documentação das linhas que tangem o processo, para além da parte tecnica  e/ou de uso, como documentar linhas de raciocio, teses, investigações e etc. Sendo assim, esse doc não tem como objetivo estrito a documentação de uso do que se propõe.

> Documentar todo o processo de investigação para o desenvolvimento da atividade [...]

> [...] os resultados destas tarefas são tão importantes do que o seu processo de pensamento e decisões à medida que as completa, por isso tente documentar e apresentar os seus hipóteses e decisões na medida do possível.

---

##### Nota 1:

As primeiras consirações que fiz antes de começar a codar, foi pesquisar sobre anagramas, para me ajudar a definar algumas regras que eu poderia precisar:
* A primeira foi evidentimente que anagramas precisam ter o mesmo número de caracteres. 
* Que tais caracteres são, claro, os mesmos, mas em uma ordem 'embaralhada'.

Isso me levandou alguns insights, como:
* Poderia usar a prop length como parametro de exclusão do 'match' entre duas palavras que não poderiam ser anagramas.
* Eu poderia usar a função **prototype.split()** como o parametro ('') para transformar a string em um array de caracteres (que formam a palavra), usar a função **prototype.sort()** encadeada sem o callback como parametro para me formar um array com os caracteres reordenados e, por fim, **prototype.join()** com o parametro ('') para me voltar uma string na nova ordem, que me daria a possibilidade de comparar os anagramas usando o operador de 'igualdade estrita': (**===**).
* Outra consideração foi, para a comparação de um valor dentro de um array com seus sucessores e antecessores, ou seja, adjacentes, o que eu conheci como **'iterating through adjacent elements'**, eu precisaria usar um loop encadeado: método mais simples e comumente usado para o tal **'iterating through adjacent elements'**, pelo menos até onde eu conheço. Para tanto, um loop **for** me valeria mais nesse contexto, para usar **break** e **continue**, além de me ajudar a controlar melhor o **index** e ajudar na performance tambem, algo que nesse contexto, pelo menos, é secundario para mim, mas é outro ponto a favor do **for**.
* Outra coisa que pensei foi, obviamente, o método **JSON.parse()** e o **JSON.stringify()** para manipular o **JSON** de entrada. E então eu fui ao código, afim de rascunhar e válidar essas idéias.
