		var ge;

    	google.load("earth", "1");
     	google.load("maps", "2");
     	
		function init() 
	    {
	      google.earth.createInstance('maps', initCallback, failureCallback);

	      addSampleUIHtml(
	        '<input id="location" type="text" value="" placeholder="Place to go..."/> <a href="#" id="adv">Advance</a> '
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
					var events = data;
					$(events).find('event').each (function() 
				    { 
				    	var id = $(this).attr('id');
					    var lat = $(this).find('lat').text();
					    var lng = $(this).find('lng').text();
					    var title = $(this).find('title').text().substr(0, 1).toUpperCase();
					    title += $(this).find('title').text().substr(1).toLowerCase();
					    var date = $(this).find('date').text();
					    var place = $(this).find('place').text();
					    
					    var text = $(this).find('text').contents().unwrap('<div>').text().substr(0, 200)+"....";
					    text += '</br> [<a class="mInfo" rel="'+id+'" href="#">Continue reading</a>]';
					    
					    if(lat != 0 && lng != 0)
					    {
					    	latCon = parseFloat(lat);
						    lngCon = parseFloat(lng);

							/// Create the placemark.
							var placemark = ge.createPlacemark('');
							placemark.setName(title);
							
							if(text.indexOf("Text:") == 1)
							{
								var mytextSplit2 = text.split("Text:");
								placemark.setDescription('<div id="crimeInfo">'+mytextSplit2[0]+'</div>');	
	
							}
							else
							{
								var mytextSplit = text.split("Publicerad:");
								placemark.setDescription('<div id="crimeInfo">'+mytextSplit[0]+'</div>');

							}
							// Define a custom icon.
							var icon = ge.createIcon('');
							if(title.indexOf('Misshandel') > -1)
							{
								icon.setHref('http://maps.google.com/mapfiles/kml/paddle/purple-circle.png');
							}
							else if(title.indexOf('Trafik') > -1 || title.indexOf('Rattfylleri') > -1)
							{
								icon.setHref('http://maps.google.com/mapfiles/kml/paddle/wht-circle.png');
							}
							else if(title.indexOf('Stöld') > -1 || title.indexOf('Inbrott') > -1 || title.indexOf('Snatt') > -1)
							{
								icon.setHref('http://maps.google.com/mapfiles/kml/paddle/red-circle.png');
							}
							else
							{
								icon.setHref('http://maps.google.com/mapfiles/kml/paddle/ylw-circle.png');
							}
	
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
						}
				    });
				    $(".mInfo").live("click", function(data)
					{ 
						var currId = $(this).attr('rel');
						moreInfo(currId);
					});
				},
				error : function(object, error) {
					console.log(error);
				}
			});
			
				      $.ajaxSetup({
				url : "/source/englandXML.json",
				type : "get",

				headers : {
					"Accept" : "application/xml",
					"Content-type" : "application/x-www-form-urlencoded"
				}
			});

			$.ajax({
				success : function(data) {
					var obj = jQuery.parseJSON(data);
					$.each(obj, function(i, obj) {
						var id = obj.location.street.id;
					    var lat = obj.location.latitude
					    var lng = obj.location.longitude
					    var title = obj.category.substr(0, 1).toUpperCase();
					    title += $(this).find('title').text().substr(1).toLowerCase();
					    var date = obj.month;
					    var place = obj.location.name;
					    
					    latCon = parseFloat(lat);
						lngCon = parseFloat(lng);
					    
					    
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
	     function moreInfo(id)
	     { 
	     	$.get("/source/swedenXML.xml", function(data){
				$(data).find('event').each (function()
		     	{
		     		var findId = $(this).attr('id');
	        		if(findId == id)
	        		{
	        			var lat = $(this).find('lat').text();
					    var lng = $(this).find('lng').text();
					    var title = $(this).find('title').text().substr(0, 1).toUpperCase();
					    title += $(this).find('title').text().substr(1).toLowerCase();
					    var date = $(this).find('date').text();
					    var place = $(this).find('place').text();
					    var link = $(this).find('link').text();
					    
					    var text = $(this).find('text').contents().unwrap('<div>').text();
					    if(text.indexOf("Text:") > -1)
						{
							var mytextSplit2 = text.split("Text:");
							text = mytextSplit2[0];	

						}
						else
						{
							var mytextSplit = text.split("Publicerad:");
							text = mytextSplit[0];
						}
					    $(".hero-unit").prepend("<div id='moreInfo'></div>");
					    $('#moreInfo').hide();
					    $("#moreInfo").append("<h3>"+title+"</h3>");
					    $("#moreInfo").append("<p><img src='http://cdn3.iconfinder.com/data/icons/token/Token,%20128x128,%20PNG/Clock-Time.png' width='30px;'>"+date+' '+place+"<img src='http://cdn4.iconfinder.com/data/icons/Mobile-Icons/128/04_maps.png' width='20px;'>"+lat+' '+lng+"</p>");
					    $("#moreInfo").append("<p></p>");
					    $("#moreInfo").append("<p>"+text+"</p>");
					    $("#moreInfo").append("<p> Source: <a href='"+link+"'>"+link+"</a></p>");
					    
					    $("#moreInfo").show('slow');
	        		}
				});
			});
		 }

