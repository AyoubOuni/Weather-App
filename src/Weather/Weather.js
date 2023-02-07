import React,{useState,useEffect} from 'react'
import './Weather.css'
import evening from './images/evening.jpg'
import morning from './images/morning.jpg'
import night from './images/night.jpeg'
import noon from './images/noon.jpg'
import pic from './images/pic.jpg'
import ice from './images/ice.jpg'
import r from './images/rain.jpg'
import icon from './images/icon.png'

function Weather() {
//declaration
  const [time, setTime] = useState('');
  var [t, sett] = useState('');
  var [tim, settim] = useState('');
  var [w, setw] = useState('');
  var [rai, setrai] = useState('');
  var [snow, setsnow] = useState('');
  var [error, seterror] = useState(false);
  const [city, setCity] = useState('');
  const [citys, setCitys] = useState('');
  const [weather, setWeather] = useState({});
  var inter;
  var element = document.getElementById("all");

//function 1
  const handleSubmit = async (e) => {
          e.preventDefault();
          const apiKey = '5de736e4d924b76352a1dac502db97d6';
          const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
          const response = await fetch(apiUrl);
          const data = await response.json();
          setWeather(data);
          console.log(data);
          if(data.cod==404){
            seterror(true);

          }
          else if(data.cod==400){
            element.style.backgroundImage = `url(${pic})`;
            clearInterval(inter);
            setw('');
            setrai('');
            sett('');
            
          }
          else{
            seterror(false);
          }
                    setCitys(city.toLowerCase().split(" ").map(word => word[0].toUpperCase() + word.slice(1)).join(" "));

          var d=parseFloat((data.main.temp)-(273.15)).toFixed(2);
          setw(parseFloat((data.main.temp)-(273.15)).toFixed(2));
          await fetch(`http://api.timezonedb.com/v2.1/list-time-zone?format=json&key=ZOL8W43ZQDAB&country=${data.sys.country}`)
            .then(response => response.json())
            .then(async data2 => {
            await sett(data2.zones[0].timestamp-3600 )
var rain=false;
var sno=false;
if(data.weather[0].main=='Rain'){
  rain=true;
  sno=false;
  setrai(true)
    setsnow(false)

  await setTimeOfDay(data2.zones[0].timestamp-3600,d,rain,sno)
}
else if(data.weather[0].main=='Snow'){
  rain=false;
    sno=true;

  setrai(false)
  setsnow(true)
  await setTimeOfDay(data2.zones[0].timestamp-3600,d,rain,sno)
}
else{
  
   rain=false;
  sno=false;
  setrai(false)
    setsnow(false)

  await setTimeOfDay(data2.zones[0].timestamp-3600,d,rain,sno)
}
}
)
.catch(error => console.error(error));
setTime('');
setCity('');
        };
//function 2
        useEffect(() => {
          const intervalId = setInterval( () => {
            t++
            const currentTime = new Date(t * 1000);
            var hours = currentTime.getUTCHours()+1;
          
            setTime(currentTime.toLocaleTimeString());
            if((w=='')&&(rai=='')){
              element.style.backgroundImage = `url(${pic})`;

            }else{
            if(snow==true){
              element.style.backgroundImage = `url(${ice})`;
            
            }
            else if (rai==true){
              element.style.backgroundImage = `url(${r})`;
            
            }
            else if (rai==false)
              { if ((hours >= 19) || (hours < 6)) {
                settim('night')
                element.style.backgroundImage = `url(${night})`;
                return "night";
              } else if ((hours >= 6)&&(hours < 12)) {
                settim('morning')
                element.style.backgroundImage = `url(${morning})`;
            
                return "morning";
              } else if ((hours >= 12) && (hours < 17)) {
                settim('noon')
                element.style.backgroundImage = `url(${noon})`;
            
                return "noon";
              } else  if ((hours >= 17)&&(hours < 19)){
                settim('evening')
                element.style.backgroundImage = `url(${evening})`;
            
                return "evening";
              }}}
          }, 1000);
          inter=intervalId;
          return () => clearInterval(intervalId);
        }, [t]);
//function 3
    function convertSecondstoTime(given_seconds) {
          
          var dateObj = new Date(given_seconds * 1000);
          var hours = dateObj.getUTCHours();
          var  minutes = dateObj.getUTCMinutes();
          var timeString = hours.toString().padStart(2, '0')
                + ':' + minutes.toString().padStart(2, '0');
                   return timeString;
        }
//function 4
        function setTimeOfDay(timestamp,tempu,rain,snoww) {
          let date = new Date(timestamp * 1000);
  let hours = date.getHours();
if(snoww==true){
  element.style.backgroundImage = `url(${ice})`;

}
else if (rain==true){
  element.style.backgroundImage = `url(${r})`;

}
else if (rain==false)
  { if ((hours >= 19) || (hours < 6)) {
    settim('night')
    element.style.backgroundImage = `url(${night})`;
    return "night";
  } else if ((hours >= 6)&&(hours < 12)) {
    settim('morning')
    element.style.backgroundImage = `url(${morning})`;

    return "morning";
  } else if ((hours >= 12) && (hours < 17)) {
    settim('noon')
    element.style.backgroundImage = `url(${noon})`;

    return "noon";
  } else  if ((hours >= 17)&&(hours < 19)){
    settim('evening')
    element.style.backgroundImage = `url(${evening})`;

    return "evening";
  }}
        }
        
        
   
//rendering
    return (
        <div   id='all' >
          <div className="d-flex justify-content-center pt-1 pb-1">
      <div class="card mt-5 wid" style={{filter: 'blur(0px)',zIndex:'100'}} >
  <div class="card-content bg">
<div className="d-flex justify-content-center mt-3">
<img src={icon} alt="icon" width="100" height="100"/>
</div>
<div className="d-flex justify-content-center h3 mt-3 ">
Weather App
</div>
        <div className=" weather-app ">
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Enter city name" value={city} onChange={e => {setCity(e.target.value);}} />
            <button type="submit" ><span className=" position-relative btm text-nowrap" style={{bottom:'1px'}}>Get weather</span></button>
          <br/> 
          </form>
          <div> {(error===true)?<div style={{marginTop:'19px',fontSize:'17px'}} className=" d-flex justify-content-center text-danger little2   text-nowrap">Please enter a valid city name!</div>:""}</div>

          {weather.main && (
            <div id='stat' className="weather-info text-dark h6 size pt-4 white">
              <p>City: {citys}</p>
              <p>Temperature: {Math.round(parseFloat((weather.main.temp)-(273.15)).toFixed(2))}°C</p>
              <p>Humidity: {weather.main.humidity}%</p>
              <p>Wind speed: {weather.wind.speed}m/s</p>
            

              <p>Country:  <img src={`https://www.countryflagicons.com/SHINY/48/${weather.sys.country}.png`} width='37' height='37'/></p>

              <p>Time:       {time.toString()} </p>
               <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}  height='90'className="mb-3" alt="" />
              <p>Sunset: {convertSecondstoTime((weather.sys.sunset+weather.timezone))}</p>
              <p className="pt-1">Sunrise: {convertSecondstoTime(weather.sys.sunrise+weather.timezone)}</p>
      

            </div>
          )}
        </div>
        </div>
</div>
</div>
<br/>
        </div>
      );
    
}

export default Weather
