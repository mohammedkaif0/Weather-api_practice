const notificationelement=document.querySelector('.notifications');
const iconelement=document.querySelector('.weather-icon');
const tempvalueelement=document.querySelector('.temperature-value p');
const tempdescriptionelement=document.querySelector('.temperature-description p');
const locationelement=document.querySelector('.location p');
const weather = {};

weather.temperature = {
    unit : "celsius"
}
function displayTemperature(){
    iconelement.innerHTML=`<img src="icons/${weather.iconId}.png"/>`;
    tempvalueelement.innerHTML=`${weather.temperature.value} &deg;<span>c</span>`;
    tempdescriptionelement.innerHTML=`${weather.description}`;
    locationelement.innerHTML=`${weather.city},${weather.country}`;
}
function celsiusToFahrenheit(temperature) {
    return (temperature * 9/5)+32;
}
tempvalueelement.addEventListener('click', function(){
    if(weather.temperature.value==="undefined") return;
    if(weather.temperature.unit ==="celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        tempvalueelement.innerHTML = `${fahrenheit} &deg;<span>F</span>`;
        weather.temperature.value="Fahrenheit";
    }
    else{
        tempvalueelement.innerHTML = `${weather.temperature.value} &deg;<span>C</span>`;
        weather.temperature.value="celsius";

    }
})
if("geolocation" in navigator){
    navigator.geolocation.getCurrentPosition(setPosition,showError)
}
else{
    notificationelement.style.display="block";
    notificationelement.innerHTML="<p>Browser Does not supports geolocation</p>"
}
function setPosition(position){
    let lattitude =position.coords.latitude;
    let longitude =position.coords.longitude;
    getWeather(lattitude,longitude);
}
function showError(error){
    notificationelement.style.display="block";
    notificationelement.innerHTML=`<p>show ${error.message}</p>`;
}
//Api
const kelvin=273;
const key='7f6c8df724c7c74620b47ced20a11df7';
function getWeather(latitude,longitude){
    let api=`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${key} `;
    fetch(api).then(function(response){
        let data=response.json();
        return data;
    })
    .then(function(data){
        weather.temperature.value = Math.floor(data.main.temp - kelvin);
        weather.description=data.weather[0].description;
        weather.iconId=data.weather[0].icon;
        weather.city=data.name;
        weather.country=data.sys.country;
    })
    .then(function(){
        displayTemperature();
    });
}
