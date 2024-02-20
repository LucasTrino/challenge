const anagrama = (array) => {
  const arrayLength = array.length;
  let anagramsArr = [];

  for (let i = 0; i < arrayLength; i++) {
    const element = array[i].str;

    for (let j = 0; j < arrayLength; j++) {
      const element2 = array[j].str;

      const convertString1 = element.toLowerCase().split('').sort().join('');
      const convertString2 = element2.toLowerCase().split('').sort().join('');

      if (i === j) continue;

      if (convertString1 === convertString2) {

        let obj = { 'anagramas': [element, element2] };

        anagramsArr.push(obj);
      }
    }
    
  }

  return anagramsArr
}