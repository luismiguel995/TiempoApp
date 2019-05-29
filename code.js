
$(document).on("mobileinit" , function()
{

	$(function()
	{



		$("#home").on("pageinit", function()
		{
		    if(navigator.geolocation)
		    {
		         navigator.geolocation.getCurrentPosition(successF, errorF);
			}
			else
			{
		         alert("Este navegador no permite geolocalizar");
		    }
			function successF(position)
			{
				let lat = position.coords.latitude;
				let long = position.coords.longitude;
				var url2 = "http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+long+"&units=metric&APPID=d5284c4710dd915e006a1e98318976c6";
				var url = "http://api.openweathermap.org/data/2.5/weather?q=Madrid&APPID=d5284c4710dd915e006a1e98318976c6";
				var city_name;
		        var temp;
		        var pressure;
		        var wind_speed;
		        var country_name;
		        var weather_description;
				//alert('Your latitude is :'+lat+' and longitude is '+long+'); 



				$.getJSON(url2)
					.done(function(response)
					{
						console.log(response);
						var fecha = new Date();
						var dias = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
						$("#dia").html(dias[fecha.getDay()]);
						$("#temp").html(parseInt(response.main.temp) + "º");
						$("#ciudad").html(response.name);
						$("#pais").html(response.sys.country);
						$("#tiempo").html(response.weather[0].description.toUpperCase());
						$("#icono").attr("src","/iconos/"+response.weather[0].icon+".png");
						$("#humedad").html("HUMEDAD " + response.main.humidity + "%");
						$("#viento").html("VIENTO " + response.wind.speed + "m/s");
						$("#temMinMax").html("MIN/MAX " + parseInt(response.main.temp_min) + "º " + " / " + parseInt(response.main.temp_max) + "º");


					}); 

				$.getJSON(url)
					.done(function(response)
					{
						console.log(response);
					 

					}); 
			    
			}
				function errorF(position)
				{
				      alert('Error!');
				}



				//traer datos del localStorage
				var ciudades = JSON.parse(localStorage.getItem('datos'));
				if(ciudades != null){
					$.each(ciudades, function( index, value ) {
						let ciudad = "<li><a href='#'>" + ciudades[index] + "</a></li>";
							$("#listaciudades").append(ciudad);
							$("#listaciudades").listview();
						
					});
					
				}
			
				

		 });


	    $( "#autocomplete" ).on( "filterablebeforefilter", function ( e, data )
		{
	        var $ul = $( this ),
	            $input = $( data.input ),
	            value = $input.val(),
	            html = "";
	        $ul.html( "" );
	        if ( value && value.length > 2 )
			{
		            $ul.html( "<li><div class='ui-loader'><span class='ui-icon ui-icon-loading'></span></div></li>" );
		            $ul.listview( "refresh" );
		            $.ajax({
		                url: "http://gd.geobytes.com/AutoCompleteCity",
		                dataType: "jsonp",
		                crossDomain: true,
		                data: {
		                    q: $input.val()
		                }
		            })
		            .then( function ( response ) {
	                $.each( response, function ( i, val ) {
	                    html += "<li><a href='#'>" + val + "</a></li>";
	                });
	                $ul.html( html );
	                $ul.listview( "refresh" );
	                $ul.trigger( "updatelayout");

								
									
	            });

	        }
	    });


		$("#autocomplete").on('click', 'li', function()
					{
							
							let ciudad = "<li><a href='#'>" + $(this).text() + "</a></li>";
							$("#listaciudades").append(ciudad);
							$("#listaciudades").listview();

									//traer datos del localStorage
									var ciudades = JSON.parse(localStorage.getItem('datos'));

									if(ciudades == null){
									
									ciudades = [];
									}
									ciudades.push($(this).text());
									localStorage.setItem('datos', JSON.stringify(ciudades));
		

							$.ajax({
								url: "http://api.openweathermap.org/data/2.5/weather?APPID=d5284c4710dd915e006a1e98318976c6",
								data: {
									q: $(this).text()
								}
							})
							
							.then( function ( response )
							{
								
								if (typeof(localStorage) !== "undefined"){
								  localStorage.setItem("ciudad", "response");
								 $("#listaciudades").innerHTML = localStorage.getItem(ciudad);
								} else {
								  $("#listaciudades").innerHTML = "Sorry, your browser does not support Web Storage...";
								}

								console.log(response);
							});	

							$.mobile.changePage("#ciudades", { transition: "slideup" });
					});

	
	

		$("#listaciudades").on('click', 'li', function()
		{
			$.mobile.changePage("#home", { transition: "slideup" });

			$.ajax({
				url: "http://api.openweathermap.org/data/2.5/weather?APPID=d5284c4710dd915e006a1e98318976c6",
				data: {
				q: $(this).text(),
				units: "metric"
				},
				success: function(response){

						var fecha = new Date();
						var dias = ["DOMINGO", "LUNES", "MARTES", "MIERCOLES", "JUEVES", "VIERNES", "SABADO"];
						$("#dia").html(dias[fecha.getDay()]);
						$("#temp").html(parseInt(response.main.temp) + "º");
						$("#ciudad").html(response.name);
						$("#pais").html(response.sys.country);
						$("#tiempo").html(response.weather[0].description.toUpperCase());
						$("#icono").attr("src","/iconos/"+response.weather[0].icon+".png");
						$("#humedad").html("HUMEDAD " + response.main.humidity + "%");
						$("#viento").html("VIENTO " + response.wind.speed + "m/s");
						$("#temMinMax").html("MIN/MAX " + parseInt(response.main.temp_min) + "º " + " / " + parseInt(response.main.temp_max) + "º");

				}

			});

			
		});

	});
});




