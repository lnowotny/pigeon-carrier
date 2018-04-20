var _map;
var _markers = [];

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

  _map = new google.maps.Map(mapCanvas, mapOptions);
  marker.setMap(_map);
  _markers.push(marker);
}

function drawMap() 
{
    var address = document.getElementById("address");
    var stringAddress = address.value;
    if (stringAddress === "")
    {
      return;
    }
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( { 'address' : stringAddress}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) 
        {
          if (status != google.maps.GeocoderStatus.ZERO_RESULTS) 
          {
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()),
              title: 'Destination'
            });
            marker.setMap(_map);
            if (_markers[1] !== undefined)
            {
              _markers[1].setMap(null);
            }
            _markers[1] = marker;
            var bounds = new google.maps.LatLngBounds();
            for (var i = 0; i < _markers.length; i++) {
              bounds.extend(_markers[i].getPosition());
             }
             _map.fitBounds(bounds);
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