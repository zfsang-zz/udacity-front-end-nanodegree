function initMap() {
    function appViewModel() {
        var self = this;
        var infowindow;
        var address;
        var markersArray = [];
        var map;
        var emory = new google.maps.LatLng(33.7856107,-84.3246289);
        self.allPlaces = ko.observableArray([]);
        self.filter = ko.observable();
        self.foursquareInfo = '';
        self.markerFilter = ko.observableArray();
        // initialize function initializes the google map with given center options 
        function initialize() {
            map = new google.maps.Map(document.getElementById('map-canvas'), {
                center: emory,
                zoom: 14
            });
            // alert the user when the map are not  loaded
            getPlaces();
            var list = (document.getElementById('list'));
            map.controls[google.maps.ControlPosition.RIGHT_CENTER].push(list);
        }

        //Callback from google map .
        function callback(results, status) {
            if (status == google.maps.places.PlacesServiceStatus.OK) {
                bounds = new google.maps.LatLngBounds();
                results.forEach(function (place) {
                    place.marker = createMarker(place);
                    bounds.extend(new google.maps.LatLng(
                        place.geometry.location.lat(),
                        place.geometry.location.lng()));
                });
                map.fitBounds(bounds);
                results.forEach(getAllPlaces);
            }
        }
                // obtain over 10 health related locations in google place to show in google map by searching
        function getPlaces() {
            var request = {
                location: emory,
                radius: 1000,
                types: ['health']
            };
            infowindow = new google.maps.InfoWindow();
            service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, callback);
        }
        // create the marker
        function createMarker(place) {
            var marker = new google.maps.Marker({
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png',
                name: place.name.toLowerCase(),
                position: place.geometry.location,
                animation: google.maps.Animation.DROP,
                place_id: place.place_id
            });
            google.maps.event.addListener(marker, 'click', (function (marker) {
                return function () {
                    self.clickMarkerLocation(marker);
                    setTimeout(function () {
                        marker.setAnimation(google.maps.Animation.BOUNCE);
                    }, 2000);
                };
            })(marker));
            markersArray.push(marker);
            self.markerFilter.push(marker);
            return marker;
        }
        //  click  element for the nav list  and  point of infowindow.
        self.clickMarkerLocation = function (place) {
            var marker;
            for (var e = 0, len = markersArray.length; e < len; e++) {
                if (place.place_id === markersArray[e].place_id) {
                    marker = markersArray[e];
                    break;
                }
            }
            map.panTo(marker.position);
            self.getFoursquareInfo(place);
            //Set time for foursquare to load
            setTimeout(function () {
                var contentString = '<b>' + place.name + '</b>' + self.foursquareInfo;
                infowindow.setContent(contentString);
                infowindow.open(map, marker);
                marker.setAnimation(google.maps.Animation.BOUNCE);
                setTimeout(function () {
                    marker.setAnimation(null);
                }, 3000);
            }, 300);
        };

        $("li").click(function (evt) {      
        if(evt.target.tagName != 'ul') 
            return;
        $("li", this).toggle();
    });

        //filter   the search in the nav list
        self.visiblePlaces = ko.computed(function () {
            return self.markerFilter().filter(function (place) {
                if (!self.filter() || place.name.toLowerCase().indexOf(self.filter().toLowerCase()) !== -1)
                    return place;
            });
        }, self);
        // filtered marker   will show only  marker  that match the nav search
        self.visiblePlaces.subscribe(function () {
            var filter = ko.utils.compareArrays(self.markerFilter(), self.visiblePlaces());
            ko.utils.arrayForEach(filter, function (marker) {
                if (marker.status === 'deleted') {
                    marker.value.setMap(null);
                    infowindow.close();
                } else {
                    marker.value.setMap(map);
                }
            });
        });
        //fouersquare credencial to get request of location search
        var client_id = 'ODTNP32IIYKONDFKDPOV2JNPSUCTHZADZR3OH3J0YCIU4JLH';
        var client_secret = 'ZORQKD4WEQ5VMOOWGTMLYF0ZIV044BY0FCKWBLAJGE4SXNCQ';
        this.getFoursquareInfo = function (selector) {
            var URL = 'https://api.foursquare.com/v2/venues/search?client_id=' + client_id + '&client_secret=' + client_secret + '&v=20150321' + '&ll=' +
                33.7936107 + ',' + -84.3226289 + '&query=\'' + selector.name + '\'&limit=1';
            // append fsquare formated address to nfoview
            $.getJSON(URL)
                .done(function (response) {
                    var venue = response.response.venues[0];
                    var venueName = venue.name;
                    var faddress = venue.location.formattedAddress;
                    self.foursquareInfo = '<p>Foursquare  address:</p>' + venueName + '<br>' + faddress;
                    infowindow.setContent();
                }).error(function (e) // error handler
                    {
                        self.foursquareInfo = ('Unable to load foursquare');
                    });
        };
        //  Obtain the place information and push information to myplace
        function getAllPlaces(place) {
            var myPlace = {};
            myPlace.place_id = place.place_id;
            myPlace.position = place.geometry.location.toString();
            myPlace.name = place.name;
            myPlace.address = address;
            self.allPlaces.push(myPlace);
        }
        google.maps.event.addDomListener(window, 'load', initialize);
    }
    $(function () {
        ko.applyBindings(new appViewModel());
    });
}

function gmerror() {
    alert('google map not loaded');
}

$("#eye-button").click(function() {
    $("#sidebar").toggle(1000, "swing");
});
