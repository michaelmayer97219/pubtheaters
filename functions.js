// Desirable theaters

theater_codes = [
	"1657", //Laurelhurst
	"238", //Bagdad
	"6734", //Hollywood
	"1196", //Kennedy School
	"243", //Mission
	"3031", //living room	
	"240", //Cinema 21
	"2213", //academy 
]

theater_code_objects = [

	{"1657":"Laurelhurst Theater"},
	{"238": "Bagdad Theater"},
	{"6734": "Hollywood Theater"},
	{"1196": "Kennedy School"},
	{"243": "Mission Theater"},
	{"3031": "Living Room Theater"},
	{"240": "Cinema 21"},
	{"2213": "Academy Theater"}

]

//Function to parse date-time and return html element

function time_to_span (date) {
	var time = date.split('T')[1]
	var hour = time.split(':')[0]
	var min = time.split(':')[1]
	if (hour>12) {
		hour = hour - 12
	}

	return "<span class='time'> "+hour+':'+min+"</span>"

}

//function to check if mpaa is unrated

function mpaa_check(rate) {
	if (typeof rate !== 'undefined') {
	return rate[0].code
	}	else {
	return "Unrated"
	}
}


//FUNCTION FOR SHOWTIMES BY THEATER

//loop through each showtime object

function showtimes_by_theater(data, targetDiv) {
	//loop through theaters
	$.each(theater_code_objects, function(index, obj) {
		//loop through movie title objects
		var code = Object.keys(obj)[0]
		var location = obj[code]
		var content = "<div class='main_container'>"
		var content = content + "<h1 class='main_title'>"+location+"</h1>"
		var titles_used = []

		//loop through theater data
		$.each(data, function(index, val) {
			content = content + "<div class='secondary'>"
			showtime_array = val.showtimes
			//loop through showtime arrays
			$.each(showtime_array, function(i, v) {
				var theatre_id = v.theatre.id
				//check if theater_id matches current container
				if (theatre_id === code) {
					var title = val.title
					var time = v.dateTime
					console.log(time)
					
					if (titles_used.indexOf(title) === -1) {
						content = content + "<h2 class='secondary_title'>"+val.title+"</h2>"
						content = content + time_to_span(time)
					} else {
						content = content + time_to_span(time)
					}
					
					titles_used.push(title)
					
				}
			})
		content = content + "</div>" //close secondary div
		})

		var content = content + "</div>" //cloase main_container
		targetDiv.append(content)
	})


}


//FUNCTION FOR SHOWTIMES BY TITLE
// loop through each showtime object

function showtimes_by_title(data, targetDiv) {
	$.each(data, function (index, val) {
		//Set variables
		var title = val.title
		var movie_object = val.showtimes
		var image_url = val.preferredImage.uri
		var genres = val.genres 
		var mpaa = val.ratings
		var shortdes = val.shortDescription
	
		var content = "<div class='main_container'>"
		var content = content +  "<h1 class='main_title'>"+title+"</h1>"
		var content = content + "<div class='main_info'>"
		
		//loop through genres and append to movie container

		var content = content + "<span class='info'>Genre:"
		$.each(genres, function(ind, val) {
			content = content + "<span> "+val+" </span>"
		})
		content = content + "</span>" //close genres

		//Add MPAA
		content = content + "<span class='info_2'>Rating: "+mpaa_check(mpaa)+"</span>"

		//add short description

		var content = content + "<div class='shortdes'>" + shortdes + "</div>"
		var content = content + "</div>" //close movie info

		//array to hold theaternames to check for duplicate time		
		var theaters_used = []
		content = content + "<div class='secondary'>"
		$.each(movie_object, function(i, v) {
			var id = v.theatre.id
			var theater_name = v.theatre.name
			var isPub = theater_codes.indexOf(id) == -1
			if(!isPub) {

				//check if theater exists inside the most recent container
				var exists = theaters_used.indexOf(theater_name) > -1
				if (exists) {
					content = content + time_to_span(v.dateTime)
				} else {
					
					content = content + "<h2 class='secondary_name'>"+theater_name+"</h2>"
					content = content + time_to_span(v.dateTime)
				}
				theaters_used.push(theater_name)
			}
		})
		console.log(theaters_used)



		var content = content + "</div>" // close theater_in_movie
		var content = content +  "</div>" //cose movie_container

		//append content if theater container isn't empty
		if (theaters_used.length > 0) {
			targetDiv.append(content)	
		}
	})
}
