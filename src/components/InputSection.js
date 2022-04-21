import React, {useState } from 'react';

import ReportSection from "./ReportSection";
// const AppId = 'c0bc5c6c03f4571d007d1ad6ca418f45';
   const AppId = '05418e642cd1a55786983cd93948ad16';

const InputSection = (data) => {
    const [details, setDetails] = useState('');

    function getLatLonByZipCode(){
        var ZipCode = document.getElementById("zipCode").value;
        console.log(ZipCode)
        if(ZipCode === ''){
            alert('Enter a Zip Code !');
        }else{
            var url = 'https://api.openweathermap.org/geo/1.0/zip?zip='+ZipCode+'&appid='+AppId
            // if (location.protocol === "http:"){
            //     url = 'http://api.openweathermap.org/geo/1.0/zip?zip='+ZipCode+'&appid='+AppId
            // }
             fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
               if(data.cod === '404'){ 
                 alert(data.message);
               }else{
                //    console.log(data);

                setDetails(data);
                //  document.getElementById('city').innerHTML = data.name;
               }
            });
        }
      }
    

    return (
        <div>
            <div className="requestDiv" >
                <input type="text" name="zipCode" id="zipCode" placeholder="Enter Your Zip Code"/>
                <button onClick={getLatLonByZipCode} > Submit </button>
            </div>
      
            {details &&<ReportSection details={details} ></ReportSection>}
        </div>
    );
  }
  

 
  

  function getNextThreeDaysForeCast(dailyArray){

    let DayOne = dailyArray[0];
    let DayTwo = dailyArray[1];
    let DayThree = dailyArray[2];
    let currentDate = new Date(DayOne.dt * 1000);

    let dayOneTemp = dailyArray[0]['temp']['min'] +' <span>&#8457;</span> ' + '/'+ dailyArray[0]['temp']['max'] +' <span>&#8457;</span> ';
    let dayTwoTemp =  dailyArray[1]['temp']['min'] +' <span>&#8457;</span> '  +'/'+ dailyArray[1]['temp']['max'] +' <span>&#8457;</span> ';
    let dayThreeTemp = dailyArray[2]['temp']['min'] +' <span>&#8457;</span> '  +'/'+ dailyArray[2]['temp']['max'] +' <span>&#8457;</span> ';

    document.getElementById('dayOneTemp').innerHTML = dayOneTemp;
    document.getElementById('dayTwoTemp').innerHTML = dayTwoTemp;
    document.getElementById('dayThreeTemp').innerHTML = dayThreeTemp; 

    var convertedDate = currentDate.toLocaleDateString('en-us', {
        weekday: 'long'
    });
    document.getElementById('dayOneDate').innerHTML = convertedDate; 

    currentDate = new Date(DayTwo.dt * 1000);
    var convertedDate = currentDate.toLocaleDateString('en-us', {
        weekday: 'long'
    });
    document.getElementById('dayTwoDate').innerHTML = convertedDate ;

    currentDate = new Date(DayThree.dt * 1000);
    var convertedDate = currentDate.toLocaleDateString('en-us', {
        weekday: 'long'
    });
    document.getElementById('dayThreeDate').innerHTML = convertedDate  ;


    console.log(DayOne.weather[0].description,DayTwo.weather[0].description,DayThree.weather[0].description)
    document.getElementById('dayOneCond').innerHTML = DayOne.weather[0].description;
    document.getElementById('dayTwoCond').innerHTML = DayTwo.weather[0].description;
    document.getElementById('dayThreeCond').innerHTML = DayThree.weather[0].description;


    document.getElementById('dayOneWeather').src = '/icon/'+DayOne.weather[0].icon+"@2x.png"; 
    document.getElementById('dayTwoWeather').src = '/icon/'+DayTwo.weather[0].icon+"@2x.png"; 
    document.getElementById('dayThreeWeather').src = '/icon/'+DayThree.weather[0].icon+"@2x.png"; 

  }

  export default InputSection;
