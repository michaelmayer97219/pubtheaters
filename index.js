$("document").ready(function() {

	//url construction
	var apikey = "9sw7r52pft7rgry8y6whknv5";
	var baseUrl = "https://data.tmsapi.com/v2";
	var showtimesUrl = baseUrl + '/movies/showings';
	var zipCode = "97201"
	var d = new Date();
	var today = d.getFullYear() + '-' + (d.getMonth()+1) + '-' + d.getDate();

	function handleCall(data) {
			
			showtimes_by_theater(data, $('#main'))
			$('#byMovie').click(function() {
				$('#main').html('')
				showtimes_by_title(data, $('#main'))
			})

			$('#byTheater').click(function() {
				$('#main').html('')
				showtimes_by_theater(data, $('#main'))
			})

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
     	$('#main').html("<h1 style='height:1000px; font-size:1.3em'>Sorry, it appears we've hit our rate limit for today :'(</h1>")
     })



	//default view will be showtimes_by_theater
	//showtimes_by_theater(APIdata, $('#main'))



});

