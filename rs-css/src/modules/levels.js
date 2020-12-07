const levels = [
  [{
    code: "<parcel class=\"item item-help item-0\"></parcel>",
    codeExample: "<parcel />",
    selector: "parcel",
    shortDescribe: {
      en: 'Tag selector',
    },
    describe: {
      en: 'Task: You should select the element "parcel" by its Tag',
    },
    mount: 1,
  }],
  [{
    code: "<parcel class=\"item item-help item-0\"></parcel><div class=\"item\"><parcel id=\"thatElement\" class=\"item item-help item-1\"></parcel></div",
    codeExample: "<parcel /><div><parcel id=\"thatElement\" /></div>",
    selector: "#thatElement",
    shortDescribe: {
      en: 'ID selector',
    },
    describe: {
      en: 'Task: You should select the element by its ID or combine the ID selector with the Type selector',
    },
    mount: 1,
  }],
  [{
    code: "<parcel class=\"item item-help item-0\"></parcel><div class=\"item\"><parcel class=\"item item-help item-1\"></parcel></div>",
    codeExample: "<parcel /><div><parcel /></div>",
    selector: "parcel",
    shortDescribe: {
      en: 'Tag selector',
    },
    describe: {
      en: 'Task: Select all "parcel" elements',
    },
    mount: 2,
  }],
  [{
    code: "<parcel class=\"item item-help item-0\"></parcel><box class=\"item\"><parcel class=\"item item-help item-1\"></parcel></box>",
    codeExample: "<parcel /><box><parcel /></box>",
    selector: "box parcel",
    shortDescribe: {
      en: 'Tag selector',
    },
    describe: {
      en: 'Task: Select the "parcel" element located inside the "box"',
    },
    mount: 1,
  }],
  [{
    code: `<box class="item wrap wrap-shift-0">
            <parcel class="item item-help item-inner"></parcel>
          </box>
          <envelope class="item wrap wrap-shift-1">
            <letter class="item letter item-inner"></letter>
          </envelope>
          <envelope id="important" class="item wrap wrap-shift-2">
            <letter class="item letter item-inner"></letter>
          </envelope>`,
    codeExample: `<box>
                    <parcel />
                  </box>
                  <envelope>
                    <letter />
                  </envelope>
                  <envelope id="important">
                    <letter />
                  </envelope>`,
    selector: "#important letter",
    shortDescribe: {
      en: 'Tag and ID selector',
    },
    describe: {
      en: 'Task: Select the "letter" element located inside the "envelope" using ID selector and Tag selector together',
    },
    mount: 1,
  }],
  [{
    code: `<letter class=" item item-help item-0"></letter><letter class="small item item-help item-1"></letter><letter class="item item-help item-2"><letter />`,
    codeExample: `<letter /><letter class="small"></letter><letter />`,
    selector: ".small",
    shortDescribe: {
      en: 'Class Selector',
    },
    describe: {
      en: 'Task: Select the certain "letter" element using its class Name',
    },
    mount: 1,
  }],
  [{
    code: `<letter class="item item-help item-0"></letter>
          <envelope class="international item wrap wrap-shift-1">
            <letter class="item letter item-inner"></letter>
          </envelope>
          <letter class="item item-help item-2"><letter />`,
    codeExample: `<letter /><envelope class="international"><letter /></envelope><letter />`,
    selector: ".international letter",
    shortDescribe: {
      en: 'Class Selector',
    },
    describe: {
      en: 'Task: Use Tag Selector and Class Selector in order to get the element "letter"',
    },
    mount: 1,
  }],
  [{
    code: `<envelope class="item wrap wrap-shift-0">
            <box class="item item-help item-inner"></box>
          </envelope>
          <envelope class="item wrap wrap-shift-1">
            <letter class="item letter item-inner"></letter>
          </envelope>
          <envelope class="item wrap wrap-shift-2">
            <box class="item item-help item-inner"></box>
          </envelope>
          <envelope class="item wrap wrap-shift-3">
            <letter class="item letter item-inner"></letter>
          </envelope>`,
    codeExample: `<envelope><box /></envelope><envelope><letter /></envelope><envelope><box /></envelope><envelope><letter /></envelope>`,
    selector: "envelope letter",
    shortDescribe: {
      en: 'Tag | ID | Class',
    },
    describe: {
      en: `Task: Use All what you've learned to get all "letter" containers we need`,
    },
    mount: 2,
  }],
  [{
    code: `<parcel class="item wrap wrap-shift-0">
            <letter class="item item-help item-inner"></letter>
          </parcel>
          <envelope class="item wrap wrap-shift-1">
            <letter class="item letter item-inner"></letter>
          </envelope>
          <box class="item wrap wrap-shift-2">
            <parcel class="item item-help item-inner"></parcel>
          </box>`,
    codeExample: `<parcel><box /></parcel><envelope><letter /></envelope><box><letter /></box>`,
    selector: "envelope, box",
    shortDescribe: {
      en: 'Comma Separated Selectors',
    },
    describe: {
      en: `Task: Use Comma Separated selectors to get the "envelop" and "box" containers`,
    },
    mount: 2,
  }],
  [{
    code: `<parcel class="item wrap wrap-shift-0">
            <letter class="item item-help item-inner"></letter>
          </parcel>
          <envelope class="item wrap wrap-shift-1">
            <letter class="item letter item-inner"></letter>
          </envelope>
          <box class="item wrap wrap-shift-2">
            <parcel class="item item-help item-inner"></parcel>
          </box>`,
    codeExample: `<parcel><box /></parcel><envelope><letter /></envelope><box><letter /></box>`,
    selector: "*",
    shortDescribe: {
      en: 'Universal Selector',
    },
    describe: {
      en: `Task: Can you pick all what's blinking using Universal Selector?`,
    },
    mount: 6,
  }],
];
export default levels;