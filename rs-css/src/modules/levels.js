const levels = [
  [{
    code: "<parcel class=\"item item-help item-0\"></parcel>",
    codeExample: "<parcel />",
    selector: "parcel",
    shortDescribe: {
      en: 'Tag selector',
    },
    describe: {
      en: 'Task 1: You should select the element "parcel" by its Tag',
    },
    mount: 1,
  }],
  [{
    code: `<parcel class="item item-help item-0"></parcel>
          <div class="item wrap wrap-shift-1">
            <parcel id="thatElement" class="item item-help item-inner"></parcel>
          </div`,
    codeExample: "<parcel /><div><parcel id=\"thatElement\" /></div>",
    selector: "#thatElement",
    shortDescribe: {
      en: 'ID selector',
    },
    describe: {
      en: 'Task 2: You should select the element by its ID or combine the ID selector with the Type selector',
    },
    mount: 1,
  }],
  [{
    code: `<parcel class="item item-help item-0"></parcel>
          <div class="item wrap wrap-shift-1">
            <parcel class="item item-help item-inner"></parcel>
          </div>`,
    codeExample: "<parcel /><div><parcel /></div>",
    selector: "parcel",
    shortDescribe: {
      en: 'Tag selector',
    },
    describe: {
      en: 'Task 3: Select all "parcel" elements',
    },
    mount: 2,
  }],
  [{
    code: `<parcel class="item item-help item-0"></parcel>
          <box class="item wrap wrap-shift-1">
            <parcel class="item item-help item-inner"></parcel>
          </box>`,
    codeExample: "<parcel /><box><parcel /></box>",
    selector: "box parcel",
    shortDescribe: {
      en: 'Tag selector',
    },
    describe: {
      en: 'Task 4: Select the "parcel" element located inside the "box"',
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
      en: 'Task 5: Select the "letter" element located inside the "envelope" using ID selector and Tag selector together',
    },
    mount: 1,
  }],
  [{
    code: `<letter class="item letter item-0"></letter>
          <letter class="small item letter small-letter item-1"></letter>
          <letter class="item letter item-2"><letter />`,
    codeExample: `<letter /><letter class="small"></letter><letter />`,
    selector: ".small",
    shortDescribe: {
      en: 'Class Selector',
    },
    describe: {
      en: 'Task 6: Select the certain "letter" element using its class Name',
    },
    mount: 1,
  }],
  [{
    code: `<letter class="item letter item-0"></letter>
          <envelope class="international item wrap wrap-shift-1">
            <letter class="item letter item-inner"></letter>
          </envelope>
          <letter class="item letter item-2"><letter />`,
    codeExample: `<letter /><envelope class="international"><letter /></envelope><letter />`,
    selector: ".international letter",
    shortDescribe: {
      en: 'Class Selector',
    },
    describe: {
      en: 'Task 7: Use Tag Selector and Class Selector in order to get the Element "letter"',
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
      en: `Task 8: Use All what you've learned to get all "letter" containers we need`,
    },
    mount: 2,
  }],
  [{
    code: `<parcel class="item wrap wrap-shift-0">
            <letter class="item letter item-inner"></letter>
          </parcel>
          <envelope class="item wrap wrap-shift-1">
            <letter class="item letter item-inner"></letter>
          </envelope>
          <box class="item wrap wrap-shift-2">
            <letter class="item letter item-inner"></letter>
          </box>`,
    codeExample: `<parcel><letter /></parcel><envelope><letter /></envelope><box><letter /></box>`,
    selector: "envelope, box",
    shortDescribe: {
      en: 'Comma Separated Selectors',
    },
    describe: {
      en: `Task 9: Use Comma Separated selectors to get the "envelop" and "box" containers`,
    },
    mount: 2,
  }],
  [{
    code: `<parcel class="item wrap wrap-shift-0">
            <box class="item item-help item-inner"></box>
          </parcel>
          <envelope class="item wrap wrap-shift-1">
            <letter class="item letter item-inner"></letter>
          </envelope>
          <box class="item wrap wrap-shift-2">
            <parcel class="item letter item-inner"></parcel>
          </box>`,
    codeExample: `<parcel><box /></parcel><envelope><letter /></envelope><box><letter /></box>`,
    selector: "*",
    shortDescribe: {
      en: 'Universal (*) Selector',
    },
    describe: {
      en: `Task 10: Can you pick all what's blinking using Universal Selector?`,
    },
    mount: 6,
  }],
  [{
    code: `<box class="item wrap wrap-shift-0">
            <parcel class="item item-help item-inner"></parcel>
          </box>
          <letter class="small item letter small-letter item-small-1"></letter>
          <box class="item wrap wrap-shift-2">
            <letter class="item letter item-inner"></letter>
          </box>
          <box class="item wrap wrap-shift-3">
            <parcel class="item item-help item-inner"></parcel>
          </box>`,
    codeExample: `<box><parcel /></box><letter class="small"></letter><box><letter /></box><box><parcel /></box>`,
    selector: "box *",
    shortDescribe: {
      en: '* Selector',
    },
    describe: {
      en: `Task 11: Can you pick all what's blinking within "boxes" using Universal Selector?`,
    },
    mount: 3,
  }],
  [{
    code: `<envelope class="item wrap wrap-shift-0">
            <parcel class="item item-help item-inner"></parcel>
          </envelope>
          <letter class="small item letter small-letter item-small-1"></letter>
          <envelope class="item wrap wrap-shift-2">
            <letter class="item letter item-inner"></letter>
          </envelope>
          <letter class="item letter item-3"></letter>
          <box class="item wrap wrap-shift-4">
            <parcel class="item item-help item-inner"></parcel>
          </box>`,
    codeExample: `<envelope><parcel /></envelope><letter class="small"></letter><envelope><letter /></envelope><letter /><box><parcel /></box>`,
    selector: "envelope + letter",
    shortDescribe: {
      en: '+ Selector',
    },
    describe: {
      en: `Task 12: Could you please grub the element that located next to "envelop" elements using "+"?`,
    },
    mount: 2,
  }],
  [{
    code: `<envelope class="item wrap wrap-shift-0">
            <parcel class="item item-help item-inner"></parcel>
          </envelope>
          <letter class="small item letter small-letter item-small-1"></letter>
          <letter class="item letter item-2"></letter>
          <box class="item wrap wrap-shift-3">
            <parcel class="item item-help item-inner"></parcel>
          </box>`,
    codeExample: `<envelope><parcel /></envelope><letter class="small"></letter><letter /><box><parcel /></box>`,
    selector: "envelope ~ letter",
    shortDescribe: {
      en: '~ Selector',
    },
    describe: {
      en: `Task 13: Now grab ALL elements that located next to "envelop" elements using "~"?`,
    },
    mount: 2,
  }],
  [{
    code: `<envelope class="item wrap wrap-shift-0">
            <parcel class="item item-help item-inner"></parcel>
          </envelope>
          <letter class="small item letter small-letter item-small-1"></letter>
          <letter class="item letter item-2"></letter>
          <box class="item wrap wrap-shift-3">
            <parcel class="item item-help item-inner"></parcel>
          </box>`,
    codeExample: `<envelope><parcel /></envelope><letter class="small"></letter><letter /><box><parcel /></box>`,
    selector: "envelope > parcel",
    shortDescribe: {
      en: '> Selector',
    },
    describe: {
      en: `Task 14: You can with ease get elements that are direct children of other elements using ">"?`,
    },
    mount: 1,
  }],
  [{
    code: `<envelope class="item wrap wrap-shift-0">
            <parcel class="item item-help item-inner"></parcel>
          </envelope>
          <box class="item wrap wrap-shift-1">
            <parcel class="item item-help item-inner"></parcel>
            <letter class="small item letter small-letter item-inner-shifted"></letter>
          </box>`,
    codeExample: `<envelope><parcel /></envelope><box><parcel /><letter class="small"></letter></box>`,
    selector: "box :first-child",
    shortDescribe: {
      en: ':first-child Selector',
    },
    describe: {
      en: `Task 15: You can with ease get elements that are direct children of other elements (The first child element) using ":first-child"
      . A child element is any element that is directly nested in another element`,
    },
    mount: 1,
  }],
  [{
    code: `<envelope class="item wrap wrap-shift-0">
            <parcel class="item item-help item-inner"></parcel>
          </envelope>
          <box class="item wrap wrap-shift-1">
            <parcel class="item item-help item-inner"></parcel>
            <letter class="small item letter small-letter item-inner-shifted"></letter>
          </box>`,
    codeExample: `<envelope><parcel /></envelope><box><parcel /><letter class="small"></letter></box>`,
    selector: "box :last-child",
    shortDescribe: {
      en: ':last-child Selector',
    },
    describe: {
      en: `Task 16: If it comes to happen that you need to get last child element you should try - ":last-child"`,
    },
    mount: 1,
  }],
  [{
    code: `<envelope class="item wrap wrap-shift-0">
          </envelope>
          <envelope class="item wrap wrap-shift-1">
          </envelope>
          <envelope class="item wrap wrap-shift-2">
          </envelope>
          <envelope class="item wrap wrap-shift-3">
          </envelope>`,
    codeExample: `<envelope></envelope><envelope></envelope><envelope></envelope><envelope></envelope>`,
    selector: "envelope:nth-child(3)",
    shortDescribe: {
      en: ':nth-child(A) Selector',
    },
    describe: {
      en: `Task 17: You can choose an element like by number of order in a queue using ":nth-child(A)"`,
    },
    mount: 1,
  }],
  [{
    code: `<envelope class="item wrap wrap-shift-0">
        <letter class="item letter item-inner"></letter>
      </envelope>
      <letter class="small item letter small-letter item-small-1"></letter>
      <letter class="item letter item-2"></letter>
      <box class="item wrap wrap-shift-3">
        <letter class="item letter item-inner"></letter>
      </box>`,
    codeExample: `<envelope><parcel /></envelope><letter class="small"></letter><letter /><box><parcel /></box>`,
    selector: "letter:not(.small)",
    shortDescribe: {
      en: ':not(X) Selector',
    },
    describe: {
      en: `Task 18: You can choose elements that do not have class "small" using ":not(X)"`,
    },
    mount: 3,
  }],
  [{
    code: `<envelope class="item wrap wrap-shift-0">
        <letter class="item letter item-inner"></letter>
      </envelope>
      <letter class="small item letter small-letter item-small-1"></letter>
      <letter class="item letter item-2" data-set="matter"></letter>
      <box class="item wrap wrap-shift-3">
        <letter class="item letter item-inner"></letter>
      </box>`,
    codeExample: `<envelope><letter /></envelope><letter class="small"></letter><letter data-set="matter"></letter><box><letter /></box>`,
    selector: `[data-set="matter"]`,
    shortDescribe: {
      en: '[data-set="matter"]',
    },
    describe: {
      en: `Task 19: Elements are chosen through their Attributes are not rare! Use "[attribute]"`,
    },
    mount: 1,
  }],
  [{
    code: `<envelope class="item wrap wrap-shift-0">
        <letter class="item letter item-inner"></letter>
      </envelope>
      <letter class="small item letter small-letter item-small-1" for="mr Engineer"></letter>
      <letter class="item letter item-2" for="mr President"></letter>
      <box class="item wrap wrap-shift-3">
        <letter class="item letter item-inner"></letter>
      </box>`,
    codeExample: `<envelope><letter /></envelope><letter class="small" for="mr Engineer"></letter><letter for="mr President"></letter><box><letter /></box>`,
    selector: `letter[for]`,
    shortDescribe: {
      en: '[] combine with other',
    },
    describe: {
      en: `Task 20: Use Tag Selector with Attribute selector together in order to get all necessary elements!`,
    },
    mount: 2,
  }],
];
export default levels;