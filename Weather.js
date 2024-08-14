const API_KEY = "14951c93f3d11e8ac8bed96dd90e8bc7";
const search = document.getElementById("search");
const loader = document.querySelector(".loader");

const searchTemperature = () => {
  const city = document.getElementById("city-name").value;
  setInnerText("temp", "");
  setInnerText("humidity", "");
  setInnerText("wind-speed", "");
  document.getElementById("image-icon").setAttribute("src", "");
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  loader.style = "display: inline-block";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayTemperature(data));
};

const displayTemperature = (temperature) => {
  loader.style = "display: none";
  if (temperature.cod === "404") {
    document.querySelector(".not-found").style = "display: block";
  } else {
    document.querySelector(".not-found").style = "display: none";
  }
  setInnerText("temp", temperature.main.temp);
  setInnerText("humidity", temperature.main.humidity);
  setInnerText("wind-speed", temperature.wind.speed);

  const url = `http://openweathermap.org/img/wn/${temperature.weather[0].icon}@2x.png`;
  const imgIcon = document.getElementById("image-icon");
  imgIcon.setAttribute("src", url);
};

const setInnerText = (id, text) => {
  document.getElementById(id).innerText = text;
};

search.addEventListener("click", searchTemperature);
