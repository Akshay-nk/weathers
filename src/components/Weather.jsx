import Axios from 'axios';
import React, { useState, useEffect } from 'react'
import './Weather.css'




function Weather() {
  const API_key = "228b492fda91d5126216cb573939a770";

  const [search, setSearch] = useState('');
  const [img, setImg] = useState([]);
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);

  const bg = 'https://cdn.pixabay.com/photo/2020/02/06/15/59/forest-4824759_1280.png'

  const fetchData = async () => {
    try {
      const response = await Axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${API_key}&units=metric`
      );
      console.log(response.data);
      setData(response.data);
      setError(false);
      
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // City not found error
        setError(true);
      } else {
        // Other errors (e.g., rate limit exceeded)
        console.error("Weather:", err);
        setError(true);
      }
      setData(null); // Reset data on error
    }
  };

  const getImg = () => {
    Axios.get(`https://api.unsplash.com/search/photos?page=1&query=${search}&client_id=vlWvWOTSt6UkqCFZ4gX76GqacFinpC_SMqmPahXo2RI`)
      .then((response) => {
        console.log(response);
        setImg(response.data.results);
      })
      .catch((error) => {

        console.error("img api error",error);
        setImg([]); // Reset images on error
      });
  };



  useEffect(() => {
    
    if(search) { 
      fetchData(); // Fetch weather data when 'search' changes
      getImg(); }// Fetch images based on the entered city
    
  }, [search]);

  const randomImage = img.length > 0 ? img[Math.floor(Math.random() * img.length)]?.urls?.regular : bg;

  return (
    <>

      <div className='body'>



        {/* ------------input section-------------- */}


        <h1 className=' my-5 text-center  ms-4 header'>
       <span className='head'>WEATHER</span ></h1>

        <div className="input-search" px-5 mt-5 >
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Enter Your city' />

          <button className="ms-3" onClick={fetchData}>
          <i class="fa-solid fa-magnifying-glass fa-flip"></i>
          </button>
        </div>

        {/*--------------------- content to display--------------------- */}

        <div className='display' >
          {error ? (
            <div className='error'>
              <div className="container">
                <h1>oops! city not found</h1>

              </div>

            </div>


          ) : !data ? (
            <h2 className='serch'>  Search City </h2>

          ) : (
            <div className='city-info'>


              <div className="row row-pic"

                style={{
                  backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.573), rgba(0, 0, 0, 0.277)), url(${randomImage})`,

                  backgroundPosition: 'center',
                  backgroundSize: 'cover',
                  backgroundRepeat: 'no-repeat',
                  height: '350px',
                  width:'350px',borderRadius:'30px',
                 
                  
                }}>

<div className='loc'>
                  <h3 ><i class="fa-solid fa-location-dot fa-fade" style={{color: "#fcfcfc;"}}></i> {data?.name} | {data?.sys.country}</h3>
                  
  
</div>                <img className='wicon'
                  src={`https://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
                  alt="Weather Icon"
                />
                <h1>{data?.main?.temp} &deg;C</h1>
                <h2 style={{color:'yellow'}}>{data?.weather[0].description}</h2>

                

                </div >

                <div className="row ">

<div className='col'>
  <div className="box">
  <h5><i class="fa-solid fa-water me-2 fs-5"></i>Humidity</h5>
  <h2>{data?.main?.humidity + " %"}</h2>
  
  </div>
  
  <div className="box">
  <h5><i class="fa-solid fa-wind me-2 fs-5"></i>Wind Speed</h5>
  <h2 className='pb-2'>{data?.wind?.speed + " Km/h"}</h2>
                        
  </div>
  
</div>

<div className='col'>
  <div className="box">
  <h5>Feels Like</h5>
 
  <h2 className='pb-2'> {Math.round(data?.main.feels_like)}°C</h2>
  </div>
  <div className="box">
  <h5><i class="fa-solid fa-wind me-2 fs-5"></i>Pressure</h5>
  <h2 className='pb-2'>{data?.main.pressure}<span className='font2 fs-5'>hPa</span></h2>
  </div>
</div>
                  
                </div>




            </div>


          )}
        </div>




      </div>


    </>
  )
}

export default Weather