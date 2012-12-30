		var ge;
		    
    	google.load("earth", "1");
     	google.load("maps", "2");
     	
		function addCrimes()
		{
			
			
			
		}
		
		function init() 
	    {
	      google.earth.createInstance('map3d', initCallback, failureCallback);
	    
	      addSampleUIHtml(
	        '<input id="location" type="text" value="" placeholder="Place to go..."/>'
	      );
	    
	      addSampleButton('GO!', buttonClick);
	     
		}
	    
	    function initCallback(instance) 
	    {
	      ge = instance;
	      ge.getWindow().setVisibility(true);
	      ge.getNavigationControl().setVisibility(ge.VISIBILITY_SHOW);
	      
	      $.ajaxSetup({
				url : "/source/swedenXML.xml",
				type : "get",

				headers : {
					"Accept" : "application/xml",
					"Content-type" : "application/x-www-form-urlencoded"
				}
			});

			$.ajax({
				success : function(data) {
					
					$(data).find('event').each (function() 
				    { 
					    var lat = $(this).find('lat').text();
					    var lng = $(this).find('lng').text();
					    
					    latCon = parseFloat(lat);
					    lngCon = parseFloat(lng);
					    
						/// Create the placemark.
						var placemark = ge.createPlacemark('');
						placemark.setName("placemark");
						
						// Define a custom icon.
						var icon = ge.createIcon('');
						icon.setHref('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
						var style = ge.createStyle('');
						style.getIconStyle().setIcon(icon);
						placemark.setStyleSelector(style);
						
						// Set the placemark's location.  
						var point = ge.createPoint('');
						point.setLatitude(latCon);
						point.setLongitude(lngCon);
						placemark.setGeometry(point);
						
						// Add the placemark to Earth.
						ge.getFeatures().appendChild(placemark);
				    });
					
				},
				error : function(object, error) {
					console.log(error);
				}
			});
	      
	    }
		
		function failureCallback(errorCode) 
		{
			
	    }
	    
		function addSampleUIHtml(html) 
		{
		 	document.getElementById('sample-ui').innerHTML += html;
		}
		
		function addSampleButton(caption, clickHandler) 
		{
	        var btn = document.createElement('input');
	        btn.type = 'button';
	        btn.value = caption;
	        
	        if (btn.attachEvent)
	          btn.attachEvent('onclick', clickHandler);
	        else
	          btn.addEventListener('click', clickHandler, false);
	
	        // add the button to the Sample UI
	        document.getElementById('sample-ui').appendChild(btn);
		 }
		      
		 function buttonClick() 
		 {
		      var geocodeLocation = document.getElementById('location').value;
		    
		      var geocoder = new google.maps.ClientGeocoder();
		      geocoder.getLatLng(geocodeLocation, function(point) {
		        if (point) {
		          var lookAt = ge.createLookAt('');
		          lookAt.set(point.y, point.x, 10, ge.ALTITUDE_RELATIVE_TO_GROUND,
		                     0, 10, 20000);
		          ge.getView().setAbstractView(lookAt);
		        }
		      });
	     }
	     
	     
	
		 
		    
	    
	    

	    
	    
