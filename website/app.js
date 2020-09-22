/* Global Variables */

let baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey = '&appid=be3c273cb21b8d705b771d9a433c6b2a';


//select the button
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
  const newZip = document.getElementById('zip').value;
  const content = document.getElementById('feelings').value;
  
  if (newZip ==""){
    alert("zip code is required");
    return false;
  }
  
  getFeelings (baseURL, newZip, apiKey)
  .then(function (userData) {
    // add data
    postData('/add', { date: newDate, temp: userData.main.temp, content })
  }).then(function (newData) {
    // call updateUI to update browser content
    updateUI()
  })
}


// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Async GET
const getFeelings = async (baseURL, feelings, key)=>{

  const res = await fetch(baseURL+feelings+key)

    try {
        const userData = await res.json();
        console.log(userData);
        return userData;
      }catch(error) {
      console.log("error", error);
      }
  }

  // Async post
  const postData = async (url = '', data = {}) => {
    const req = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json;charset=UTF-8"
      },
      body: JSON.stringify({
        date: data.date,
        temp: data.temp,
        content: data.content
      })
    })
  
    try {
      const newData = await req.json();
      return newData;
    }
    catch (error) {
      console.log(error);
    }
  };
  

  // update UI

  const updateUI = async () => {
    const request = await fetch('/all')
      try{
        const allData = await request.json()
        console.log(allData);
        document.getElementById('date').innerHTML = allData.date;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;
      }
      catch(error){
        console.log("error", error);
      }
  }