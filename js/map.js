var _map;
var _markers = [];
var _curve;
var _percent;
var _timer;
var _originPosition;
var _currentMessage;

function myMap() {
	_originPosition = new google.maps.LatLng(30.4083821, -97.72624439999998)
  var mapCanvas = document.getElementById("map");
  var mapOptions = {
      center: _originPosition,
      zoom: 10
  };
  var marker = new google.maps.Marker({
      position: mapOptions.center,
      title: 'NI 3rd Floor cube 3N.K06',
      icon: "../pigeonAndLetter.png"
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
              title: 'Destination',
              icon: "../target.png"
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

function resetMarker()
{
	_markers[0].setPosition(_originPosition);
	if (_markers[1] !== undefined)
	{
		_markers[1].setMap(null);
	}
	_markers[0].setIcon("../pigeonAndLetter.png");
}

function startMessageFlying(message)
{
	_currentMessage = message;
	_percent = 0;
	(function() {
	 _timer = setInterval(drawFlightOutCurve, 100);
	})();
	drawCurve(_map);
}

function startMessageFlyingBack()
{
	_percent = 0;
	_markers[0].setIcon("../pigeon.png");
	_markers[1].setIcon("../letter.png");
	(function() {
	 _timer = setInterval(drawFlightBackCurve, 100);
	})();
}

function drawFlightOutCurve()
{
  var randomNumber = Math.floor(Math.random() * Math.floor(25));
  if (randomNumber === 5)
  {
    // Bird got eaten.
    alert("Your bird was eaten.  Try sending your message again.")
    clearInterval(_timer);
    resetMarker();
    _curve.setMap(null);
    return;
  }
	drawCurve(_map, (100 - _percent) / 100);
	_percent++;
	if (_percent > 100)
	{
		clearInterval(_timer);
		commitMessage(_currentMessage);
		startMessageFlyingBack();
	}
}

function drawFlightBackCurve()
{
	drawCurve(_map, _percent / 100);
	_percent++;
	if (_percent > 100)
	{
		clearInterval(_timer);
		resetMarker();
		_curve.setMap(null);
	}
}

function drawCurve(map, percent)
{
	var lineLength = google.maps.geometry.spherical.computeDistanceBetween(_originPosition, _markers[1].getPosition());
    var lineHeading = google.maps.geometry.spherical.computeHeading(_originPosition, _markers[1].getPosition());
	  
	var pos1 = google.maps.geometry.spherical.computeOffset(_originPosition, lineLength / 3, lineHeading - 60)
	var pos2 = google.maps.geometry.spherical.computeOffset(_markers[1].getPosition(), lineLength / 3, -lineHeading + 120)
	
	if (_curve !== undefined)
	{
		_curve.setMap(null);
	}
	_curve = new GmapsCubicBezier(_originPosition, pos1, pos2, _markers[1].getPosition(), 0.01, percent, map, _markers[0]);
}

//https://stackoverflow.com/questions/34131378/how-to-make-a-dashed-curved-polyline-in-google-maps-js-api
var GmapsCubicBezier = function(latlong1, latlong2, latlong3, latlong4, resolution, percent, map, marker) {
  var lat1 = latlong1.lat();
  var long1 = latlong1.lng();
  var lat2 = latlong2.lat();
  var long2 = latlong2.lng();
  var lat3 = latlong3.lat();
  var long3 = latlong3.lng();
  var lat4 = latlong4.lat();
  var long4 = latlong4.lng();

  var points = [];
  
  for (it = 0; it <= 1 * percent; it += resolution) {
    points.push(this.getBezier({
      x: lat1,
      y: long1
    }, {
      x: lat2,
      y: long2
    }, {
      x: lat3,
      y: long3
    }, {
      x: lat4,
      y: long4
    }, it));
  }
  var path = [];
  for (var i = 0; i < points.length - 1; i++) {
    path.push(new google.maps.LatLng(points[i].x, points[i].y));
    path.push(new google.maps.LatLng(points[i + 1].x, points[i + 1].y, false));
  }
  
  if (marker !== undefined && points.length > 0)
  {
	  marker.setPosition(new google.maps.LatLng(points[points.length - 1].x, points[points.length - 1].y))
  }

  var Line = new google.maps.Polyline({
    path: path,
    geodesic: true,
    strokeOpacity: 0.0,
    icons: [{
      icon: {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        scale: 4
      },
      offset: '0',
      repeat: '20px'
    }],
    strokeColor: 'grey'
  });

  Line.setMap(map);

  return Line;
};


GmapsCubicBezier.prototype = {

  B1: function(t) {
    return t * t * t;
  },
  B2: function(t) {
    return 3 * t * t * (1 - t);
  },
  B3: function(t) {
    return 3 * t * (1 - t) * (1 - t);
  },
  B4: function(t) {
    return (1 - t) * (1 - t) * (1 - t);
  },
  getBezier: function(C1, C2, C3, C4, percent) {
    var pos = {};
    pos.x = C1.x * this.B1(percent) + C2.x * this.B2(percent) + C3.x * this.B3(percent) + C4.x * this.B4(percent);
    pos.y = C1.y * this.B1(percent) + C2.y * this.B2(percent) + C3.y * this.B3(percent) + C4.y * this.B4(percent);
    return pos;
  }
};