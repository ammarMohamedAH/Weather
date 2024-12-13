var d;
getData("alex")
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
        d=`${position.coords.latitude}, ${position.coords.longitude}`
        getData(d);
    });
  }else{
    getData("alex");
    }




const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function getData(x=d) {
  fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=0a854d7f2dbd41578c6113637240812&q=${x}&days=3&aqi=no&alerts=no`
  )
    .then(function (data) {
      return data.json();
    })
    .then(function (data) {
      
     
      document.getElementById("demo").innerHTML=`
      <div class="col-lg-4" >
            <div class="card h-100">
              <div
                class="card-header d-flex justify-content-between align-items-center"
              >
                <div id="today">${days[ new Date(data.forecast.forecastday["0"].date).getDay()]}</div>
                <div>${ new Date(data.forecast.forecastday["0"].date).getDate()} ${monthNames[ new Date(data.forecast.forecastday["0"].date).getMonth()]}</div>
              </div>
              <div class="card-body">
                <div class="container">
                  <div id="city">${data.location.name}</div>
                  <div>
                    <div class="fs-0 fw-bold text-center">
                    <span id="degree-today">${data.current.temp_c}</span>
                    <span><sup>o</sup>C</span>
                  </div>
                    <span id="deg-icon"
                      ><img src="${`https:${data.current.condition.icon}`}" alt="Icon" id="icon-pic"
                    /></span>
                  </div>
                  <div id="weather" class="text-primary">${data.current.condition.text}</div>
                  <hr>
                  <div class=" d-flex justify-content-evenly">
                    <span id="humidity">
                      <span
                        ><img src="./images/icon-umberella.png" alt="" />
                        20%</span
                      >
                    </span>
                    <span id="wind" class="ps-2 pe-2">
                      <span
                        ><img src="./images/icon-wind.png" alt="" /> ${data.current.
                          wind_kph
                          }
                        km/h</span
                      >
                    </span>
                    <span class="compass">
                      <span
                        ><img src="./images/icon-compass.png" alt="" />
                        ${data.current.wind_dir}</span
                      >
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
           
     `
     
      for(let i=1;i<data.forecast.forecastday.length;i++) {
       document.getElementById("demo").innerHTML +=`<div class="col-lg-4 " >
            <div class="card h-100">
              <div
                class="card-header d-flex justify-content-between align-items-center"
              >
                <div id="today">${days[ new Date(data.forecast.forecastday[i].date).getDay()]}</div>
                <div>${ new Date(data.forecast.forecastday[i].date).getDate()} ${monthNames[ new Date(data.forecast.forecastday[i].date).getMonth()]}</div>
              </div>
              <div class="card-body">
                <div class="container ">
                <div id="deg-icon " class="d-flex justify-content-center"
                      ><img src="${`https:${data.forecast.forecastday[i].day.condition.icon}`}" alt="Icon" id="icon-pic"
                    /></div>
                  
                  <div>
                    <div class="fs-0 fw-bold text-center">
                    <span id="degree-today">${data.forecast.forecastday[i].day.
                      avgtemp_c
                      }</span>
                    <span><sup>o</sup>C</span>
                  </div>
                    <div class="fs-6 fw-bold text-dep">
                    <span id="degree-today">Max: ${data.forecast.forecastday[i].day.
                      maxtemp_c
                      }</span>
                    <span><sup>o</sup>C</span>
                  </div>
                    <div class="fs-6 fw-bold text-dep">
                    <span id="degree-today">Min: ${data.forecast.forecastday[i].day.
                      mintemp_c
                      }</span>
                    <span><sup>o</sup>C</span>
                  </div>
                  <span id="weather" class="text-primary">${data.forecast.forecastday[i].day.condition.text}</span>
                    
                  </div>
              
                  
                </div>
              </div>
            </div>
          </div>`
      }

      
    })
}


let search=document.getElementById("search");
search.addEventListener("input",function searchCity() {
  if (search.value.length>2) {
    
    getData(search.value )
  }else{
    getData()
    
  }
  
}
)
