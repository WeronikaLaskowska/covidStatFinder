const input = document.getElementById('searchCountry');
const submit= document.getElementById('search-btn');
const body = document.getElementById('main');
const output = document.getElementById('output');

body.addEventListener('click', readInput);
function showAlert(msg){
    //Create div
const div = document.createElement('div');
div.className=`alert error`;
div.appendChild(document.createTextNode(msg));
console.log(div);
const space = document.querySelector('.alert-space');
space.appendChild(div);

//Timeout 
setTimeout(function () {
    document.querySelector('.alert').remove();
}, 4000);
}

function readInput (e) {
   if(e.target.className === 'mt-4 btn-secondary'){
       fetch(`https://covid-19-data.p.rapidapi.com/country?name=${input.value}&format=json`, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "059e2102b8mshdb657081bb5353ep161249jsn55128607e7e1",
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com"
	}
})
.then(response => {
	return response.json();
})
.then(response => {
    output.innerHTML=`
    <table class="table">
  <caption>${response[0].country} statistics</caption>
  <thead>
    <tr>
      <th scope="col">Stat name</th>
      <th scope="col">Stat data</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Country name:</th>
      <td>${response[0].country}</td>
    </tr>
    <tr>
      <th scope="row">Confirmed cases:</th>
      <td>${response[0].confirmed}</td>
    </tr>
    <tr>
      <th scope="row">Recovered:</th>
      <td>${response[0].recovered}</td>
    </tr>
    <tr>
      <th scope="row">Critical:</th>
      <td>${response[0].critical}</td>
    </tr>
    <tr>
      <th scope="row">Deaths:</th>
      <td>${response[0].deaths}</td>
    </tr>
    <tr>
      <th scope="row">Last update:</th>
      <td>${response[0].lastUpdate}</td>
    </tr>
  </tbody>
</table>
    `
    input.value='';
})
.catch(err => {
	showAlert(`${input.value} is a wrong country name or not in database`);
    input.value='';
});
}
   
}


