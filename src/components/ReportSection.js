import React, { useState } from 'react';

let Details= '';
const AppId = '05418e642cd1a55786983cd93948ad16';
let currentDate = '';
let convertedDate = '';
let currentTemp= '';
let currentCondition= '';
let TempHiLo= '';
let hourlyRecords= '';
let minTemp= '';
let maxTemp= '';
let cityName = '';
let src = '';
let time = '';
let feelsLike = '';
let humidity = '';
const ReportSection = (datares) => {
    Details = datares.details;
    const [ReportDetails, setWeatherReport] = useState('');

    console.log(Details);
    if(Details.lat !== null && Details.lon !== null){
        getWeatherReport(Details.lat,Details.lon);

    }
 
    function getWeatherReport(lat,lon){
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat='+lat+'&lon='+lon+'&units=imperial&appid='+AppId)
    .then(response => response.json())
    .then(data => {
        if(data.cod === '404'){
            alert(data.message);
        }else{

            setWeatherReport(data)
            // console.log(data);
            currentDate = new Date(data.current.dt * 1000);
            convertedDate = currentDate.toLocaleDateString('en-us', {
                weekday: 'long',
                day : 'numeric',
                month : 'long',
                year : 'numeric'
            });
            
            time =   currentDate.toLocaleString('en-US', { hour: 'numeric', hour12: true })


            // document.getElementById('currentDate').innerHTML = convertedDate; 
            currentTemp = data.current.temp; //+' <span>&#8457;</span>';
            // document.getElementById('currentTemp').innerHTML = currentTemp; 
            currentCondition = data.current.weather[0]['description'];
            // document.getElementById('currentContition').innerHTML = currentCondition; 
                //01d@2x.png
                console.log(data.current.weather[0]['icon'])
            // document.getElementById('sunny').src = '/icon/'+data.current.weather[0]['icon']+"@2x.png"; 
            // document.getElementById('sunny').classList.add('showImage');
            feelsLike = data.current.feels_like;
            humidity = data.current.humidity
            // document.getElementById('FeelsLike').innerHTML = data.current.feels_like+' <span>&#8457;</span>'; 
            // document.getElementById('Humidity').innerHTML = data.current.humidity+' <span>&#8457;</span>';



            TempHiLo = '';
            hourlyRecords = data.hourly;
            minTemp = ''; maxTemp = '';

            
            for (let i=0 ; i<8 ; i++){
                if(i === 0){
                    minTemp =  hourlyRecords[i]['temp'];
                }
                if(i === 7){
                    maxTemp = hourlyRecords[i]['temp'];
                }
            } 
            // TempHiLo = +maxTemp+' <span>&#8457;</span>' + ' / '+minTemp+' <span>&#8457;</span>';
            // document.getElementById('TempHiLow').innerHTML = TempHiLo; 

            
            // getNextThreeDaysForeCast(data.daily);
        }        
    });
  }
    console.log(Details);

    return (
        <section className="reportSection">
            <div className="first-container">
                <table>
                    <tbody>
                        <tr>
                        <td>
                                <div className="reponseDiv">
                                    <div className="current-city">
                                        <h1><span> </span> <span className="city" id="city"> {Details.name}</span></h1> <br/>
                                    </div>
                                    <div className="current-date">
                                        <h3><span></span><span className="currentDate" id="currentDate"> {convertedDate} {time}</span></h3> <br/>
                                    </div>
                                    <div className="temperature">
                                        <h3><span></span><span className="FeelsLike" id="FeelsLike">  {feelsLike}</span></h3><br/>
                                    </div>
                                    <div className="temperature">
                                        <h3><span></span><span className="Humidity" id="Humidity"> {humidity} </span></h3><br/>
                                    </div>

                                    <div className="current-temperature">
                                        <h1><span></span><span className="currentTemp" id="currentTemp">{currentTemp}</span></h1><br/>
                                        <div></div>
                                    </div>  
                                    <div>
                                        <img src=""  id="sunny" style={{display: "none"}}/>
                                    </div>
                                    <div className="current-conditions">
                                        <h3><span></span><span className="currentContition" id="currentContition"> {currentCondition}</span> <span id="icon"> </span></h3><br/>
                                    </div>                                                                         
                                    <div className="temperature">
                                        <h3><span></span><span className="TempHiLow" id="TempHiLow"> {minTemp}  /  {maxTemp} </span></h3><br/>
                                    </div>
                                    <div className="modReq">
                                        <div className="day1" id="dayOne"> <br/> <span id="dayOneDate"> </span> <br/> <span id="dayOneTemp">  </span> <br/> <span id="dayOneCond"> </span>  </div>
                                        <div className="day2" id="dayTwo"> <br/> <span id="dayTwoDate"> </span> <br/><span id="dayTwoTemp"> </span> <br/> <span id="dayTwoCond"> </span>  </div>
                                        <div className="day3" id="dayThree"> <br/> <span id="dayThreeDate"> </span><br/> <span id="dayThreeTemp"></span> <br/> <span id="dayThreeCond"> </span> </div>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className="weather-forecast"> 
                                    <h1>WEATHER <br/> FORECAST</h1>
                                </div>
                            </td>     
                        </tr>
                    </tbody>
                </table>
            </div>
        </section>  
    );
}
  
export default ReportSection;

// {/* <img src="" id="dayOneWeather"/>
// <img  src="" id="dayTwoWeather"/>
// <img src="" id="dayThreeWeather"/> */}