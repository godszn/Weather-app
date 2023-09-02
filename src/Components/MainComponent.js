import React from 'react'
import axios from 'axios'
import { useState, useEffect } from 'react'
import moonBG from '../images/moon.png'
import MountainBG from '../images/Mountain.jpg'
import { Parallax } from 'react-parallax'
import '@fortawesome/fontawesome-free/css/all.css';
import {format} from 'date-fns'

function MainComponent() {
    const [currentDate, setCurrentDate] = useState ('');
    const [currentTime, setCurrentTime] = useState ('');
    const [selectedDate, setDate] = useState('');
    const [time, setTime] = useState('');
    const weekDays = ['Sunday' , 'Monday', 'Tuesday' , 'Wednesday' , 'Thursday' , 'Friday'];
    const Months = ['january' , 'February' , 'March' , 'April' , 'May' , 'june' , 'july' , 'August' , 'September' ,
     'October' , 'November' , 'December'];
    const date = [ 1,2 ,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];
 
     const updateDateTime = () => {
        const now = new Date();
        const daysOfWeek = weekDays[now.getDay()];
        const month = Months[now.getMonth()] 
        const selectedDay = date[now.getDate() - 1]
        setDate(selectedDay);
        setCurrentDate(daysOfWeek);
        setCurrentTime(month)
     }

     useEffect(() => {
        const TimeZone = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(TimeZone)
     },[])

     const formattedTime = format(time, 'HH:mm:ss');

       useEffect(() => {
      updateDateTime();
       },[])

    let getSuffix = () => {
        if (selectedDate === 1) {
          return 'st';
        } else if (selectedDate === 2) {
          return 'nd';
        } else {
          return 'th';
        }
      };
    
      const dateOutput = selectedDate + getSuffix();

     const [data , setData] = useState({
        celsius: 20,
        name : 'london',
        speed: 10,
        humidity: 2, 
        country: 'nigeria',
        wind: 5,
        Pressure: 2,
        description: 'astroothegod'
     })
     const [name , setName] = useState('');
     const handleChange = () => {
       if (name !== "") {
            const APIkey = 'df246cf1f66aa731deba5fb2273e3c09';
            const APIurl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=df246cf1f66aa731deba5fb2273e3c09&units=metric`;   
            axios.get(APIurl)
            .then(res => {
                setData({
                    ...data, celsius: Math.ceil(res.data.main.temp) , name: res.data.name, humidity: res.data.main.humidity,
                    speed: res.data.wind.speed, country: res.data.sys.country, wind: Math.ceil(res.data.wind.speed),
                    Pressure: res.data.main.pressure, description: res.data.weather[0].description
                })
                console.log('resolve', res) 
            })
            .catch(err => console.log('error' , err));
       }
     } 
  return (
    <div>
          <Parallax className = 'custom-parallax' strength = {300} bgImage = {MountainBG}>
           <div className = 'content container-2xl flex pt-6'>
                <div className = 'sidebar rounded-md shadow-lg backdrop-blur-md w-1/6 flex-col'>
                    <div className = 'nav-brand p-4'>
                        <h2 className = 'font-semibold text-gray-200 text-xl font-sans uppercase'> 
                           Go Weather
                        </h2>
                    </div>
                        <div className = 'Dashboard-container rounded-md text-white font-semibold text-base'
                            style = {{
                                backgroundColor : 'rgb(91 86 118 / 60%)'
                            }}>
                            <div className = 'Dashboard-contents flex mt-12 mb-80 p-4'>
                                <span className = 'mr-3'>
                                    <i class="fa-solid fa-house"></i>
                                </span>
                                <span className = 'dashboard'>
                                    <h4 >
                                        Dashboard
                                    </h4>
                                </span>
                            </div>
                        </div>
                </div>
                <div className = 'w-2/3 backdrop-blur-sm '>
                    <div  className = 'navbar-wrapper border-b-2 border-b-slate-400 backdrop-blur-sm justify-between
                     h-fit p-3 flex'>
                        <div className = 'left-nav flex-col'>
                            <div className = 'flex p-3 flex-col'>
                                    <h1 className = 'font-semibold text-gray-200 text-md font-sans'>
                                       {currentDate} {dateOutput}
                                    </h1>
                                    <h3 className = 'font-semibold text-gray-200 text-sm font-sans'>
                                        {currentDate} {formattedTime}
                                    </h3>
                            </div>
                        </div>
                        <div className = 'right-nav flex p-2 h-fit mr-3'>
                            <div className = 'search-wrapper rounded-md flex h-fit bg-slate-100  pl-2 items-center'>
                            <i className="fas fa-search text-gray-600 items-center"></i>
                                <input className = 'p-2 rounded-md bg-gray-100 w-80 searchBar'  style = {{height: '3rem'}} type = 'text' 
                                placeholder = 'search location here' onChange = {e => setName(e.target.value)}/>
                                <button className = 'p-2 rounded-mg items-center' onClick = {handleChange}>
                                    <a className = 'font-semibold text-sm font-sans text-gray-600'>
                                        Search
                                    </a>
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className = 'overview-wrapper'>
                        <div className = 'flex overview-nav p-3 justify-between'>
                           <div className = 'Total-text flex text-slate-100 font-semibold font-sans p-3'>
                              <h4>
                                 Total Overview
                              </h4>
                            </div>
                            <div className = 'detail-wrapper flex text-slate-100 font-semibold font-sans p-3'>
                                <h4>
                                More details
                                </h4> 
                            </div>
                        </div>
                        <div className = 'elements-wrapper grid grid-cols-2 gap-2'>
                            <div className = 'flex-row flex bg-gray-500 rounded-md p-3 element-cont
                             font-semibold text-slate-100'>
                                <div className = 'flex mr-3 ml-3 items-center'>
                                   <i className="fa-solid fa-wind text-4xl"></i>
                                </div>
                                <div className = 'flex flex-col justify-center pl-2'>
                                    <h4>
                                        Wind speed
                                    </h4>
                                    <h1 className = 'text-2xl' style = {{ color : 'rgb(12 11 84)'}}>
                                        {data.wind} KM/h
                                    </h1>
                                </div>
                            </div>
                            <div className = 'flex-row flex bg-gray-500 rounded-md p-3 element-cont font-semibold text-slate-100'>
                                <div className = 'flex mr-3 ml-3 items-center'>
                                   <i className="fa-solid fa-cloud-rain text-4xl"></i>
                                </div>
                                <div className = 'flex flex-col justify-center pl-2'>
                                    <h4>
                                    Rain Chance
                                    </h4>
                                    <h1 className = 'text-2xl' style = {{ color : 'rgb(12 11 84)'}}>
                                      24%
                                    </h1>
                                </div>
                            </div>
                            <div className = 'flex-row flex bg-gray-500 rounded-md p-3 element-cont  font-semibold text-slate-100'>
                                <div className = 'flex mr-3 ml-3 items-center'>
                                   <i className="fa-sharp fa-solid fa-water text-4xl"></i>
                                </div>
                                <div className = 'flex flex-col justify-center pl-2'>
                                    <h4>
                                       Pressure
                                    </h4>
                                    <h1 className = 'text-2xl' style = {{ color : 'rgb(12 11 84)'}}>
                                       {data.Pressure} hpa
                                    </h1>
                                </div>
                            </div>
                            <div className = 'flex-row flex bg-gray-500 rounded-md p-3 element-cont  font-semibold text-slate-100'>
                                <div className = 'flex mr-3 ml-3 items-center'>
                                   <i className="fa-sharp fa-solid fa-sun text-4xl"></i>
                                </div>
                                <div className = 'flex flex-col justify-center pl-2'>
                                    <h4>
                                       Uv index
                                    </h4>
                                    <h1 className = 'text-2xl' style = {{ color : 'rgb(12 11 84)'}}>
                                       2,3 
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className = 'Weekly-prediction-wrapper flex'>
                           <div className = 'weekly-container text-gray-200 w-full font-semibold p-4 font-sans'>
                               <div className = 'prediction-headers p-1 flex justify-between flex-1'>
                                  <div className = 'prediction-header-cont'>
                                     <h3>
                                          Prediction
                                     </h3>
                                  </div>
                                  <div className = 'prediction-header-cont'>
                                     <h3>
                                          Weekly
                                     </h3>
                                  </div>
                               </div>
                               <div className = 'p-3 flex prediction-widget w-full bg-gray-500'>
                                     <div className = ' flex justify-between flex-1'>
                                        <div>
                                            <h3>
                                                Today
                                            </h3>
                                        </div>
                                        <div>
                                            <h3>
                                                16°C
                                            </h3>
                                        </div>
                                        <div>
                                            <h3>
                                                Cloudy
                                            </h3>
                                        </div>
                                     </div>
                                  </div>
                               <div className = 'p-3 flex prediction-widget w-full bg-gray-500'>
                                     <div className = ' flex justify-between flex-1'>
                                        <div>
                                            <h3>
                                                Today
                                            </h3>
                                        </div>
                                        <div>
                                            <h3>
                                                16°C
                                            </h3>
                                        </div>
                                        <div>
                                            <h3>
                                                Cloudy
                                            </h3>
                                        </div>
                                     </div>
                                  </div>
                               <div className = 'p-3 flex prediction-widget w-full bg-gray-500'>
                                     <div className = ' flex justify-between flex-1 '>
                                        <div>
                                            <h3>
                                                Today
                                            </h3>
                                        </div>
                                        <div>
                                            <h3>
                                                16°C
                                            </h3>
                                        </div>
                                        <div>
                                            <h3>
                                                Cloudy
                                            </h3>
                                        </div>
                                     </div>
                                  </div>
                           </div>
                        </div>
                    </div>
                </div>
                <div className = 'right-bar  shadow-lg backdrop-blur-md w-1/4 h-fit container p-3'>
                    <div className = 'cities-widget-wrapper justify-between flex '>
                        <div className = 'cities-widget flex-col'>
                            <h1 className = ' font-semibold text-gray-200 text-xl font-sans'>
                                   {data.country}
                            </h1>
                            <h3 className = 'font-semibold text-gray-100 text-sm'>
                              {data.name}
                            </h3>
                        </div>
                      <div className = 'city-time flex items-center'>
                        <h3 className = 'font-semibold text-gray-200 text-sm'>
                            08:30 <span>AM</span>
                        </h3>
                      </div>
                    </div>
                    <div className = 'temperature-wrapper flex justify-between border-b-2 border-b-gray-200'>
                      <div className = 'temperature flex flex-col text-5xl text-gray-200 font-sans pt-11 p-5'>
                          <div> <i class="fa-solid fa-cloud-moon p-4"></i></div>
                          {/* <i class="fa-solid fa-cloud-sun"></i> */}
                        <h1>
                            {data.celsius}°C
                        </h1>
                      </div>
                      <div className = ' text-sm font-semibold text-gray-200 font-sans items-center flex'>
                        {data.description}
                      </div>
                    </div>
                    <div className = 'rain-chance-wrapper mb-3 flex'>
                       <div className = 'rain-chance font-semibold text-gray-200 font-sans w-full mt-2 p-2 flex flex-col'>
                           <h3>
                              Chance of rain
                           </h3>   
                           <div className = 'percentage-wrapper flex flex-row m-2'>
                                <div className = 'percentage-widget flex flex-1'>
                                   <div className = 'percentage-time items-center flex'>
                                        <div>
                                            <h5>
                                                7PM
                                            </h5>
                                        </div>
                                    </div>
                                    <div className = 'progressive-container rounded-xl w-9/12'>
                                        <div className = 'progressive-bar p-4 w-1/2 rounded-xl'>
                                            
                                        </div>
                                    </div>
                                    <div className = 'flex items-center'>
                                        <div>
                                            <h4>
                                                44%
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                           </div>                     
                           <div className = 'percentage-wrapper flex flex-row m-2'>
                                <div className = 'percentage-widget flex flex-1'>
                                   <div className = 'percentage-time items-center flex'>
                                        <div>
                                            <h5>
                                                8PM
                                            </h5>
                                        </div>
                                    </div>
                                    <div className = 'progressive-container rounded-xl w-9/12'>
                                        <div className = 'progressive-bar p-4 w-4/5 rounded-xl'>
                                            
                                        </div>
                                    </div>
                                    <div className = 'flex items-center'>
                                        <div>
                                            <h4>
                                                80%
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                           </div>                     
                           <div className = 'percentage-wrapper flex flex-row m-2'>
                                <div className = 'percentage-widget flex flex-1'>
                                   <div className = 'percentage-time items-center flex'>
                                        <div>
                                            <h5>
                                                9PM
                                            </h5>
                                        </div>
                                    </div>
                                    <div className = 'progressive-container rounded-xl w-9/12'>
                                        <div className = 'progressive-bar p-4 w-11/12 rounded-xl'>
                                            
                                        </div>
                                    </div>
                                    <div className = 'flex items-center'>
                                        <div>
                                            <h4>
                                                92%
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                           </div>                     
                       </div>
                    </div>
                    <div className = 'sunRise-wrapper flex'>
                        <div className = 'sunRise-container w-full flex flex-col'>
                            <div className = 'S-headers flex mb-3 text-gray-200 justify-between flex-1
                             font-sans  font-semibold'>
                                <div className = 'S-headers-cont'>
                                    <h4>
                                        Sunrise & Sunset
                                    </h4>
                                </div>
                                <div className = 'S-headers-cont'>
                                    <h4>
                                        Tegal
                                    </h4>
                                </div>
                            </div>
                            <div className = 'sunRise-timezone rounded-xl flex p-3'>
                               <div className = 'timezone-wrapper items-center w-full text-gray-200 font-semibold font-sans flex'>
                                    <div>
                                        <i className="fa-sharp fa-solid fa-sun text-3xl pr-3"></i>
                                    </div>
                                    <div className = 'timezone-headers flex flex-1 justify-between '>
                                        <div>
                                            <h4 className = 'text-sm'>
                                                Sunrise
                                            </h4>
                                            <h2 className = 'text-xl'>
                                                4:20AM
                                            </h2>
                                        </div>
                                        <div className = 'Hours flex items-center'>
                                            <h3 className = 'text-sm'>
                                              4 hours ago
                                            </h3>
                                       </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
       </Parallax>
    </div>
  )
}

export default MainComponent
