const levels = [
  [{
    code: "<parcel class=\"item parcel parcel-0\"></parcel>",
    codeExample: "<parcel />",
    selector: "parcel",
    shortDescribe: {
      ru: 'Тэги',
    },
    describe: {
      ru: 'Задание: Необходимо выбрать элемент "parcel", используя селектор тэга',
    },
    mount: 1,
  }],
  [{
    code: "<parcel class=\"item parcel parcel-0\"></parcel><div class=\"item\"><parcel id=\"thatElement\" class=\"item parcel parcel-1\"></parcel></div",
    codeExample: "<parcel /><div><parcel id=\"thatElement\" /></div>",
    selector: "#thatElement",
    shortDescribe: {
      ru: 'ID селектор',
    },
    describe: {
      ru: 'Задание: Необходимо выбрать элемент по его ID',
    },
    mount: 1,
  }],
  [{
    code: "<parcel class=\"item parcel parcel-0\"></parcel><div class=\"item\"><parcel class=\"item parcel parcel-1\"></parcel></div>",
    codeExample: "<parcel /><div><parcel /></div>",
    selector: "div parcel",
    shortDescribe: {
      ru: 'Тэги',
    },
    describe: {
      ru: 'Задание: Необходимо выбрать все теги "parcel", расположенные внутри "div" элемента',
    },
    mount: 2,
  }],
];
export default levels;