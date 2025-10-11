const nae = document.getElementById("name");
const btn = document.getElementById("btn");
const result = document.getElementById("result");
const city = document.getElementById("city");
btn.onclick = () => {
  let val = nae.value;
  /* console.log(val); */
  /* navigator.geolocation.getCurrentPosition((success) => {
    console.log(success);
    var lat = success.coords.latitude;
    var lon = success.coords.longitude;
    console.log(lat);
    console.log(lon); */
  // TODO: Replace 'YOUR_API_KEY' with your actual OpenWeatherMap API key.
  // For security, do NOT hardcode your API key in client-side code.
  // Consider fetching the key from a secure backend or prompting the user.
  var key = "YOUR_API_KEY";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${val}
      &appid=${key}`
  )
    .then((res) => res.json())
    .then((data) => {
      /* console.log(data.name); */
      /*  console.log(data);
      console.log(data.main.temp_min);
      console.log(data.weather[0].main);
      console.log(data.sys.country); */
      /*   let unix = data.sys.sunrise; */
      /* let newdt = new Date(unix * 1000); */
      /* console.log(newdt); */
      /* let hh = newdt.getHours(); */
      /*  console.log(hh); */
      /*   let hr = hh >= 13 ? hh % 12 : hh;
      let hr2 = hr < 10 ? "0" + hr : hr;
      let ampm = hr >= 12 ? "pm" : "am";
      const mm = newdt.getMinutes();
      let mm2 = mm < 10 ? "0" + mm : mm; */
      result.innerHTML = `
      <h3 class="imgbg"><img class="img" src="https://openweathermap.org/img/wn/${data.weather[0].icon
        }.png"</h3>
        <h1 class="tmp">${(data.main.temp - 273).toFixed(1)} &#176;C</h1>
        <h2>${data.weather[0].main}</h2>
        <h5> Feels Like : ${(data.main.feels_like - 273).toFixed(
          1
        )} &#176;C</h5>`;
      country.innerHTML = `<span id="country">${data.sys.country}</span>`;
      city.innerHTML = `<span id="city">${data.name}/</span>`;
    })
    .catch((error) => {
      console.log(error);
      result.innerHTML = `<h1 class="er">City name not found! 🐥</h1>`;
    });
};
const time = document.getElementById("tm");
const dt = document.getElementById("dte");
const country = document.getElementById("country");
const dy = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const mth = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
setInterval(() => {
  const newdt = new Date();
  const hours = newdt.getHours();
  const minutes = newdt.getMinutes();
  const day = newdt.getDay();
  const month = newdt.getMonth();
  const date = newdt.getDate();
  /*     console.log(dy[day]); */
  /* console.log(hours); */
  const hrin12format = hours >= 13 ? hours % 12 : hours;
  const apmp = hours >= 12 ? "PM " : "AM";
  const min = minutes < 10 ? "0" + minutes : minutes;
  const hrs = hrin12format < 10 ? "0" + hrin12format : hrin12format;
  const nhr = hrin12format == "00" ? "12" : hrin12format;
  time.innerHTML = ` <span class="tm">${nhr}:${min} ${apmp}</span>`;
  dt.innerHTML = `<span class="dt1"> ${dy[day]}, ${date} ${mth[month]}</span>`;
}, 1000);

const locatebtn = document.getElementById("locate");
var key2 = "YOUR_API_KEY";
locatebtn.onclick = () => {
  navigator.geolocation.getCurrentPosition((success) => {
    var lat = success.coords.latitude;
    var lon = success.coords.longitude;
    /*  console.log(lat);
    console.log(success);
    console.log(lon); */
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key2}`
    )
      .then((res) => res.json())
      .then((data) => {
        /* console.log(data); */
        result.innerHTML = `
        <h3 class="imgbg"><img class="img" src="https://openweathermap.org/img/wn/${data.weather[0].icon
          }.png"</h3>
          <h1 class="tmp">${(data.main.temp - 273).toFixed(1)} &#176;C</h1>
          <h2>${data.weather[0].main}</h2>
          <h5> Feels Like : ${(data.main.feels_like - 273).toFixed(
            1
          )} &#176;C</h5>`;
        country.innerHTML = `<span id="country">${data.sys.country}</span>`;
        city.innerHTML = `<span id="city">${data.name}/</span>`;
      })
      .catch((err) => {
        console.log(err);
        result.innerHTML = `<h1 class="er">Oops! Allow the Location 🐥</h1>`;
      });
  });
};
