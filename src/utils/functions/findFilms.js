import { shortMovieDuration } from "../constants";
import { errorMessages } from "../errorMessages";

function findFilms(arr, text, checkbox) {
  return new Promise((res, rej) => {
    const filteredArray = filter(arr, text, checkbox);

    if (filteredArray.length === 0) {
      rej(errorMessages.notFound);
    }

    res(filteredArray);
  });
}



function filter(arr, text, checkbox) {
  return arr.filter((el) => {
    if (checkbox) {
      if(el.duration <= shortMovieDuration && (el.nameRU.toLowerCase().includes(text.toLowerCase()) || el.nameEN.toLowerCase().includes(text.toLowerCase()))){
        return el
      }

    } else if (el.nameRU.toLowerCase().includes(text.toLowerCase()) || el.nameEN.toLowerCase().includes(text.toLowerCase())) {

      return el;
    }
    return false;
  });
}

export default findFilms;
