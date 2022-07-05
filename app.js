const select = document.querySelectorAll("select");
const input = document.querySelectorAll("input");
let html = "";

async function getCurrency() {
  let myHeaders = new Headers();
  myHeaders.append("apikey", "almqL6bsXEeqasTqD7wyaIq2k4zMakP8");

  let requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  try {
    const res = await fetch(
      "https://api.apilayer.com/exchangerates_data/latest",
      requestOptions
    );
    const data = await res.json();
    const rates = data.rates;
    const arrKeys = Object.keys(rates);
    arrKeys.map((item) => {
      return (html += `<option value=${item}>${item}</option>`);
    });
    select.forEach((item) => {
      item.insertAdjacentHTML("afterbegin", html);
    });

    function convert(i, j) {
      return (input[i].value =
        (input[j].value * rates[select[i].value]) / rates[select[j].value]);
    }
    input[0].addEventListener("keyup", () => convert(1, 0));
    input[1].addEventListener("keyup", () => convert(0, 1));
    select[0].addEventListener("change", () => convert(1, 0));
    select[1].addEventListener("change", () => convert(0, 1));

    localStorage.setItem("keys", JSON.stringify(arrKeys));
    localStorage.setItem("rates", JSON.stringify(rates));
    document.addEventListener("DOMContentLoaded", () => {
      const items = JSON.parse(localStorage.getItem("keys"));
      items.map((item) => {
        return (html += `<option value=${item}>${item}</option>`);
      });
      select.forEach((item) => {
        item.insertAdjacentHTML("afterbegin", html);
      });

      const rates = JSON.parse(localStorage.getItem("rates"));
      input[0].addEventListener("keyup", () => convert(1, 0));
      input[1].addEventListener("keyup", () => convert(0, 1));
      select[0].addEventListener("change", () => convert(1, 0));
      select[1].addEventListener("change", () => convert(0, 1));
    });
  } catch (error) {
    console.log(error);
  }
}

getCurrency();
