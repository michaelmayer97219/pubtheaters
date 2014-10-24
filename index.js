$("document").ready(function() {

	//url construction
	var apikey = "9sw7r52pft7rgry8y6whknv5";
	var baseUrl = "https://data.tmsapi.com/v1";
	var showtimesUrl = baseUrl + '/movies/showings';
	var zipCode = "97201"
	var d = new Date();
	var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();

	function handleCall(data) {
			//dat = $.parseJSON(data)
			showtime_data = data
			showtimes_by_theater(showtime_data, $('#main'))

		}

	//get theater data
	$.ajax({
        url: showtimesUrl,
        data: {startDate: today,
            zip: zipCode,
			api_key: apikey
            },          
		dataType: "json",
		success: handleCall,
     
     }).fail(function(jqXHR, textStatus){
     	alert(textStatus)
     })

 
	//callback for above api call

	showtimes_by_theater(showtime_data, $('#main'))


	//default view will be showtimes_by_theater
	//showtimes_by_theater(APIdata, $('#main'))

	$('#byMovie').click(function() {
		$('#main').html('')
		showtimes_by_title(showtime_data, $('#main'))
	})

	$('#byTheater').click(function() {
		$('#main').html('')
		showtimes_by_theater(showtime_data, $('#main'))
	})

});

