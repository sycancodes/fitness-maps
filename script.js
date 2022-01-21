"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

//Adding geolocation
let map;
let mapEvent;
if (navigator.geolocation)
  navigator.geolocation.getCurrentPosition(function (position) {
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    //console.log(`https://www.google.co.uk/maps/@${latitude},${longitude}`);
    console.log(`https://map.baidu.com/@${latitude},${longitude}`);

    const coords = [latitude, longitude];

    map = L.map("map").setView(coords, 11);

    //const map = L.map("map").setView([51.505, -0.09], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    //handling clicks on the map

    map.on(
      "click",
      function (mapE) {
        mapEvent = mapE;
        form.classList.remove("hidden");
        inputDistance.focus();
      },
      function () {
        alert("Could not get your position");
      }
    );

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Clear input fields
      inputDistance.value =
        inputDuration.value =
        inputCadence.value =
        inputElevation.value =
          "";
      //Display maker
      console.log(mapEvent);
      const { lat, lng } = mapEvent.latlng;
      L.marker([lat, lng])
        .addTo(map)
        .bindPopup(
          L.popup({
            maxWidth: 250,
            minWidth: 100,
            autoclose: false,
            closeOnClick: false,
            className: "running-popup",
          })
        )
        .setPopupContent("Workout")
        .openPopup();
    });
  });

//Toggling between the elevation and cadence classes
// Add some implementations later

inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle('form__row--hidden');
  inputCadence.closest(".form__row").classList.toggle('form__row--hidden');
});
