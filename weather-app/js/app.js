

function UpdateError(message){
    document.querySelector('.error').innerHTML += `<div id="error"><h1>${message}</h1></div>`; 
}
function ClearError(){
    if(document.querySelector('.error'))
    return document.querySelector('.error').innerHTML = "";
}
function CreateDataObject(data, iconsData){
    let {temp,feels_like,humidity} = data.main;
    let city = data.name;
    let {country} = data.sys;
    let {description} = data.weather[0];
    // console.log();
    let code = data.weather[0].id;
    let {icon,bg} = iconsData[code];
    let {speed} = data.wind;
    document.body.style.cssText = `background: url(./assets/${bg}.jpg) no-repeat;
                                   background-position: center center;
                                   background-size: cover;`;
    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
        icon = 'day-' + icon;
    }
    return AddDataToDOM({
        city,
        country,
        description,
        feels_like,
        humidity,
        windSpeed: speed,
        temprature:Math.round(temp)
    },icon);
}

function AddDataToDOM({city,country,description,temprature,feels_like,humidity,windSpeed},icon){
    removeLoader();
    document.getElementById('loc').textContent = `${city}, ${country}`;
    document.querySelector('.weatherDescription').textContent = description;
    document.getElementById('temprature').textContent = temprature;
    document.querySelector('.icon').innerHTML = `<i class="wi wi-${icon}"></i>`;
    document.getElementById('feels_like').textContent = Math.round(feels_like * (100)) / 100  + ' °C'; 
    document.getElementById('humidity').textContent = Math.round(humidity * (100)) / 100 + ' %';
    document.getElementById('wind_speed').textContent = Math.round(windSpeed * (100)) / 100 + ' m/s';

}
function toggleUnits(){
    document.getElementById('changeUnit').addEventListener("click",()=>{
        let currentTemprature = parseInt(document.getElementById('temprature').textContent);
        let newUnit = document.getElementById('changeUnit').textContent.trim();
        let nextTemprature = changeTempratureUnit(currentTemprature, newUnit.slice(1));
        document.getElementById('temprature').textContent = nextTemprature;
        document.querySelector('.degree').innerHTML = `
            <div id="temprature">${nextTemprature}</div> ${newUnit} 
            <i class="line"></i> <span id="changeUnit"> ${newUnit.slice(1) === 'F' ? '°C' : '°F'} </span></div>`;
            toggleUnits();
    });
}
toggleUnits();
function changeTempratureUnit(temp,unit="F"){
    let temprature;
    if(unit === "F") temprature = temp * 9/5 + 32;
    else if(unit === "C") temprature = (temp - 32) * 5/9;
    return Math.round(temprature);
}


document.getElementById('searchBtn').addEventListener("click",(e)=>{
    e.preventDefault();
    let input = document.getElementById('search').querySelector('input');
    ClearError();
    getData(input.value);
});

var _KEY_ = '13f1903062a5f9a0107dff7c211c51c9';
async function getData(search=""){
    document.querySelector('.loader').classList.remove('display-none');
    document.querySelector('.page').classList.add('display-none');
    document.querySelector('.right').classList.add('display-none');
    if(search.trim() === "") search = 'Navi Mumbai';
    try {
        const dataObj = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${_KEY_}&units=metric`,{
        mode:'cors'
        });
        const data = await dataObj.json();
        const icons = await fetch('./json/icons.json',{
            mode:'same-origin'
        });
        const iconsData = await icons.json();
        CreateDataObject(data, iconsData);
        ClearError();
    } catch (error) {
        removeLoader();
        return UpdateError('No such City Found, <br> Try city Name followed by country name');
    }
} 
getData();


function removeLoader(){
    document.querySelector('.page').classList.remove('display-none');
    document.querySelector('.right').classList.remove('display-none');
    document.querySelector('.loader').classList.add('display-none');
}