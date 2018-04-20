function sendMessage()
{
}

function saveUserName()
{
    var input = document.getElementById("username");
    sessionStorage.setItem("username", input.value);
    return true;
}

function getUserName()
{
	return sessionStorage.getItem("username");
}

function initializeSendMessageForm(sendMessageForm)
{
    debugger;
    var userName = getUserName();
    document.getElementById("from").value = userName;
}

function drawMap() 
{
    var address = document.getElementById("address");
    var stringAddress = address.value;
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address' : stringAddress}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) 
        {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) 
          {
            var mapCanvas = document.getElementById("map");
            var mapOptions = {
                center: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
                zoom: 10
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);
          }
          else 
          {
            alert("No results found");
          }
        } 
        else
        {
          alert("Invalid address");
        }
      });
}

function myMap() {
    var mapCanvas = document.getElementById("map");
    var mapOptions = {
        center: new google.maps.LatLng(30.4083821, -97.72624439999998),
        zoom: 10
    };
    var marker = new google.maps.Marker({
        position: mapOptions.center,
        title: 'NI 3rd Floor cube 3N.K06'
      });

    var map = new google.maps.Map(mapCanvas, mapOptions);
    marker.setMap(map);
}