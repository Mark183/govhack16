var Google = {

	init: function(){
		Google.events();
        // Google.render_map();

		var map;
	},

	events: function(){

	},

	render_map: function($el) {
		// var
	var $markers = $el.find('.marker');

	var styles = [
        // we will add the style rules here.
        {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#71d6ff"
            },
            {
                "saturation": 100
            },
            {
                "lightness": -5
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": 0
            },
            {
                "lightness": 100
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#deecec"
            },
            {
                "saturation": -73
            },
            {
                "lightness": 72
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#bababa"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 25
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#e3e3e3"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 0
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffffff"
            },
            {
                "saturation": -100
            },
            {
                "lightness": 100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels",
        "stylers": [
            {
                "hue": "#59cfff"
            },
            {
                "saturation": 100
            },
            {
                "lightness": 34
            },
            {
                "visibility": "on"
            }
        ]
    }
    ];

    var isDraggable = $(document).width() > 480 ? true : false; // If document (your website) is wider than 480px, isDraggable = true, else isDraggable = false

	// vars
	var args = {
		mapTypeControlOptions: {
	        mapTypeIds: ['Styled']
	    },
		zoom		: 5,
        draggable: isDraggable,
        panControl: true,
		scrollwheel: false,
		center		: new google.maps.LatLng(0, 0),
		// mapTypeId	: google.maps.MapTypeId.ROADMAP
		disableDefaultUI: true,
		mapTypeId: 'Styled'
	};
	
	// create map	        	
	// map = new google.maps.Map( $el[0], args);
    map = new google.maps.Map(document.getElementById('theMap'), args);

	var styledMapType = new google.maps.StyledMapType(styles, { name: 'Styled' });
    map.mapTypes.set('Styled', styledMapType);

	// add a markers reference
	map.markers = [];						
		
	// add markers
	$markers.each(function(){

		Google.add_marker( $(this), map );

	});

	// center map
	Google.center_map( map );

    google.maps.event.addListenerOnce(map, 'idle', function(){
         google.maps.event.trigger(map, 'resize');
         Google.center_map(map);
     });
	},

	add_marker: function($marker, map) {
		/*
		*  add_marker
		*
		*  This function will add a marker to the selected Google Map
		*
		*  @type	function
		*  @date	8/11/2013
		*  @since	4.3.0
		*
		*  @param	$marker (jQuery element)
		*  @param	map (Google Map object)
		*  @return	n/a
		*/

        // create info window outside of each - then tell that singular infowindow to swap content based on click
        var infowindow = new google.maps.InfoWindow({
            content     : '' 
        });

		// var
		var latlng = new google.maps.LatLng( $marker.attr('data-lat'), $marker.attr('data-lng') );

		// create marker
		var siteURL = window.location;
		var iconBase = siteURL.host == "localhost:3000" ? siteURL.protocol + "//" + siteURL.host + "/" + siteURL.pathname.split('/')[1] + '/assets/img/' : iconBase = siteURL.protocol + "//" + siteURL.host + '/assets/img/';

		var markerType = iconBase + 'map-marker.png';

		var marker = new google.maps.Marker({
			position	: latlng,
			map			: map,
			icon		: markerType
		});

		// add to array
		map.markers.push( marker );

		// if marker contains HTML, add it to an infoWindow
		if( $marker.html() )
		{
			
			// show info window when marker is clicked & close other markers
			google.maps.event.addListener(marker, 'click', function() {
				//swap content of that singular infowindow
						infowindow.setContent($marker.html());
				        infowindow.open(map, marker);
			});
			
			// close info window when map is clicked
			     google.maps.event.addListener(map, 'click', function(event) {
			        if (infowindow) {
			            infowindow.close(); }
					}); 
				
		}
	},

	center_map: function(map) {
		// vars
		var bounds = new google.maps.LatLngBounds();

		// loop through all markers and create bounds
		$.each( map.markers, function( i, marker ){

			var latlng = new google.maps.LatLng( marker.position.lat(), marker.position.lng() );

			bounds.extend( latlng );

		});

		// only 1 marker?
		if( map.markers.length == 1 )
		{
			// set center of map
		    map.setCenter( bounds.getCenter() );
		    map.setZoom( 5 );
		}
		else
		{
			// fit to bounds
			map.fitBounds( bounds );
		}
	}



};

$(function(){
    Google.init();
});