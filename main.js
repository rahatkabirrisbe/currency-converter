// const form = document.querySelector("form");
// const fromInput = document.querySelector("#from-input");
// const fromOption = document.querySelector("#from-option");
// const toInput = document.querySelector("#to-input");
// const toOption = document.querySelector("#to-option");

const localStorageData = {};
const currencyData = {
  apiKey: "916fd477f22e3d463b54",
  from: "",
  to: "",
  async getData() {
    const arr = [];
    const res = await fetch(
      "https://free.currconv.com/api/v7/countries?apiKey=916fd477f22e3d463b54"
    );
    const data = await res.json();
    // console.log(data);
    // const d = Object.entries(data.results);
    const d = Object.values(data.results);
    return d;
  },
  async getCurrency(from, to) {
    const res = await fetch(
      `https://free.currconv.com/api/v7/convert?q=${from}_${to}&apiKey=916fd477f22e3d463b54`
    );
    const data = await res.json();
    console.log(data);
  },
};
const UI = {
  allSelectors() {
    return {
      form: document.querySelector("form"),
      fromInput: document.querySelector("#from-input"),
      fromOption: document.querySelector("#from-option"),
      toInput: document.querySelector("#to-input"),
      toOption: document.querySelector("#to-option"),
    };
  },
  async initialize() {
    const { fromOption, toOption, fromInput, toInput } = this.allSelectors();
    const data = await currencyData.getData();
    let html = "";
    // console.log(fromOption);
    data.forEach((value, i) => {
      // const v = value.currencyName.split(" ")[0];
      // console.log(value);
      html += `<option>${value.currencyName}</option>`;
    });
    fromOption.insertAdjacentHTML("afterbegin", html);
    toOption.insertAdjacentHTML("afterbegin", html);
    // console.log(html);

    const fromValue = fromInput.value;
    const toValue = toInput.value;
    fromOption.addEventListener("change", () => {
      // console.log(fromOption.value);
      const valueOptionFrom = fromOption.value;
      const valueOptionTo = toOption.value;
      data.filter((value) => {
        if (value.currencyName === valueOptionFrom) {
          currencyData.from = value.id;
        }
        if (value.currencyName === valueOptionTo) {
          currencyData.to = value.id;
        }
        return;
      });
    });
  },
};

UI.initialize();
