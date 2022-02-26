// const checkNowBtn = document.getElementById('checkNowBtn');
// const myfun = ()=>{
//     alert("hello g");
// }
// checkNowBtn.addEventListener('click' , myfun);
// api.openweathermap.org/data/2.5/weather?q=karachi&appid=82e8e584433dd1f36228d24ef2564215

let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
}

const days = document.getElementById('days');
const dates = document.getElementById('dates');

const currentDay = ()=>{
    let arrDay = ["SUN","MON","TUE","WED","THU","FRI","SAT"];
    let currentTime = new Date();
    let a = arrDay[currentTime.getDay()];
    return a;
}
const currentDateMonth = ()=>{
    let arrMonth = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];
    let currentTime = new Date();
    let a = `${currentTime.getDate()} | ${arrMonth[currentTime.getMonth()]}`;
    return a;
}
days.innerHTML=currentDay();
dates.innerHTML=currentDateMonth();

// API WORKING START HERE

const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');
const cityPopup = document.getElementById('cityPopup');
const temprature = document.getElementById('temprature');
const tempStatus = document.getElementById('tempStatus');
const weatherIcon = document.getElementById('weatherIcon');
const showAreaMain = document.querySelector('.showAreaMain')


const getInfo = async(event)=>{
    event.preventDefault();
    let cityVal = cityName.value;
    if(cityVal===""){
        cityPopup.innerHTML = "Please write the name before search";
        alert("Please write the name before search");
        showAreaMain.classList.add('hiddendataArea')
    }
    else{
        try{
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=87eebaeae3057089c23e2522995f42fe`;
            const response = await fetch(url);
            const data = await response.json();
            const arrData = [data];
            cityPopup.innerHTML = ` ${arrData[0].name} , ${arrData[0].sys.country}`;
            temprature.innerHTML = ` ${arrData[0].main.temp} ℃ `;
            // arrData[0].weather[0].main
            const weatherType = arrData[0].weather[0].main;
            showAreaMain.classList.remove('hiddendataArea')
            
            if(weatherType == "Clear"){
                weatherIcon.innerHTML=`<i class="fas fa-cloud-sun" style=color:yellow></i>`;
            }
            else if(weatherType == "Cloud" || weatherType == "Clouds"){
                weatherIcon.innerHTML=`<i class="fas fa-cloud" style=color:skyblue></i>`;
            }
            else if(weatherType == "Haze" || weatherType == "Smoke"){
                weatherIcon.innerHTML=`<i class="fas fa-smog"></i>`;
            }
            else if(weatherType == "Rain"){
                weatherIcon.innerHTML=`<i class="fas fa-cloud-rain" style=color:rgb(115, 149, 172)></i>`;
            }
            else{
                alert("Sorry we can't find weather icon")
                weatherIcon.innerHTML=weatherType;
            }
        }
        catch{
            cityPopup.innerHTML = "Please enter city name properly";
            showAreaMain.classList.add('hiddendataArea')
        }
    }
}

submitBtn.addEventListener('click', getInfo);