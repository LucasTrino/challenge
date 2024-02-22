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

const validateJsonFormat = (json) => {
  try {
    const arrayJson = JSON.parse(JSON.stringify(json)),
      firstKey = Object.keys(arrayJson[0])[0];


    if (!Array.isArray(arrayJson)) {
      throw new Error('JSON data is not an array');
    }

    if (arrayJson.length === 0) {
      throw new Error('JSON array is empty');
    }

    //defensive 5
    for (let i = 0; i < arrayJson.length; i++) {
      const obj = arrayJson[i];

      if (typeof obj !== 'object' || Object.keys(obj).length !== 1) {
        throw new Error('JSON array contains elements that do not match the required format');
      }

      const value = obj[Object.keys(obj)[0]];

      //defensive 6
      if (typeof value !== 'string') {
        throw new Error('Value associated with the key is not a string');
      }

      const currentKey = Object.keys(arrayJson[i])[0];

      if (currentKey !== firstKey) {
        throw new Error('Keys in objects within the JSON array are not consistent');
      }

    }

    return true;

  } catch (error) {
    console.error('Error validating JSON format:', error.message);
    return false;
  }
};

const findAnagrams = (json) => {
  try {

    if (!validateJsonFormat(json)) {
      throw new Error('Invalid JSON format');
    }

    const arrayJson = JSON.parse(JSON.stringify(json)),
      arrayLength = arrayJson.length,
      anagramKey = 'anagramas',
      firstKey = Object.keys(arrayJson[0])[0];

    let anagramsArray = [];

    for (let i = 0; i < arrayLength; i++) {
      const currentElement = arrayJson[i][firstKey];

      const sortedElement = sortStringAlphabetically(currentElement);

      let found = findAndAddAnagram(anagramsArray, anagramKey, currentElement, sortedElement);

      if (!found) {
        let hasAnagram = findElementAnagram(arrayJson, firstKey, currentElement, sortedElement, i);

        if (hasAnagram) {
          anagramsArray.push({ [anagramKey]: [currentElement] });
        }
      }
    }

    return anagramsArray;
  } catch (error) {
    console.error('An error occurred:', error.message);
    return JSON.stringify({ error: error.message });
  }
};
