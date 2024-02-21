const sortStringAlphabetically = (string) => {
  return string.toLowerCase().split('').sort().join('');
};

const hasAnyEqualAnagram = (anagramsArray, targetString) => {
  return anagramsArray.some(anagram => {
    const sortedAnagram = sortStringAlphabetically(anagram);
    return targetString === sortedAnagram;
  });
};

function findAndAddAnagram(anagramsArr, anagramKey, element, elementSortedAlphabetically) {
  for (let j = 0; j < anagramsArr.length; j++) {
    const obj = anagramsArr[j];
    const existingAnagramsElements = obj[anagramKey];
    if (hasAnyEqualAnagram(existingAnagramsElements, elementSortedAlphabetically)) {
      obj[anagramKey].push(element);
      return true;
    }
  }
  return false;
}

function findElementAnagram(arr, key, element, elementSortedAlphabetically) {
  for (let k = 0; k < arr.length; k++) {
    const element2 = arr[k][key];
    const element2SortedAlphabetically = sortStringAlphabetically(element2);
    if (element !== element2 && elementSortedAlphabetically === element2SortedAlphabetically) {
      return true;
    }
  }
  return false;
}

const findAnagrams = (json) => {
  const parsedArray = JSON.parse(json), 
  arrayLength = parsedArray.length, 
  anagramKey = 'anagramas', 
  firstKey = Object.keys(parsedArray[0])[0];

  let anagramsArray = [];

  for (let i = 0; i < arrayLength; i++) {
    const currentElement = parsedArray[i][firstKey];
    const sortedElement = sortStringAlphabetically(currentElement);

    let found = findAndAddAnagram(anagramsArray, anagramKey, currentElement, sortedElement);

    if (!found) {
      let hasAnagram = findElementAnagram(parsedArray, firstKey, currentElement, sortedElement, i);

      if (hasAnagram) {
        anagramsArray.push({ [anagramKey]: [currentElement] });
      }
    }
  }

  return JSON.stringify(anagramsArray);
};

