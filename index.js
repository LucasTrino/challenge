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
  try {

    const parsedArray = JSON.parse(json);

    //defensive 1
    if (!Array.isArray(parsedArray)) {
      throw new Error('JSON data is not an array');
    }

    const arrayLength = parsedArray.length;
    const anagramKey = 'anagramas';

    //defensive 2
    if (arrayLength === 0) {
      return JSON.stringify([]);
    }

    const firstKey = Object.keys(parsedArray[0])[0];

    let anagramsArray = [];

    //defensive 3
    for (let i = 1; i < arrayLength; i++) {
      const currentKey = Object.keys(parsedArray[i])[0];
      if (currentKey !== firstKey) {
        throw new Error(`Keys in the objects are not consistent. Expected '${firstKey}', but found '${currentKey}' at index ${i}`);
      }
    }

    for (let i = 0; i < arrayLength; i++) {
      const currentElement = parsedArray[i][firstKey];

      //defensive 4
      if (typeof currentElement === 'undefined' || currentElement === null) {
        console.warn(`Element at index ${i} is undefined or null.`);
        continue;
      }

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
  } catch (error) {
    console.error('An error occurred:', error.message);
    return JSON.stringify({ error: error.message });
  }
};
