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

theater_detail = [

	{"1657":{
		"name":"Laurelhurst Theater",
		"address":" 2735 E Burnside St, Portland, OR 97214",
		"phone": "(503) 232-5511"
		}
	},
	{"238":{
		"name":"Bagdad Theater",
		"address":"3702 SE Hawthorne Blvd, Portland, OR 97214",
		"phone": "(503) 467-7521"
		}
	},
	{"6734":{
		"name":"Hollywood Theater",
		"address":"4122 NE Sandy Blvd, Portland, OR 97212",
		"phone": "(503) 281-4215"
		}
	},
	{"1196":{
		"name":"Kennedy School",
		"address":"5736 NE 33rd Ave, Portland, OR 97211",
		"phone": "(503) 249-3983"
		}
	},
	{"243":{
		"name":"Mission Theater",
		"address":"1624 NW Glisan St, Portland, OR 97209",
		"phone": "(503) 223-4527"
		}
	},
	{"240":{
		"name":"Cinema 21",
		"address":"616 NW 21st Ave, Portland, OR 97209",
		"phone": "(503) 223-4515"
		}
	},
	{"3031":{
		"name":"Living Room Theater",
		"address":"341 SW 10th Ave, Portland, OR 97205",
		"phone": "(971) 222-2010"
		}
	},
	{"2213":{
		"name":"Academy Theater",
		"address":"7818 SE Stark St, Portland, OR 97215",
		"phone": "(503) 252-0500"
		}
	}
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
	$.each(theater_detail, function(index, obj) {
		//loop through movie title objects
		var code = Object.keys(obj)
		theater_obj = obj[Object.keys(obj)]
		var location = theater_obj.name
		var address = theater_obj.address
		var content = "<div class='main_container'>"
		var content = content + "<h1 class='main_title'>"+location+"</h1>"
		var content = content + "<div class='main_info'>"+address+"</div>"
		var titles_used = []
		content = content + "<div class='secondary'>"

		//loop through theater data
		$.each(data, function(index, val) {

			showtime_array = val.showtimes
			//loop through showtime arrays
			$.each(showtime_array, function(i, v) {
				var theatre_id = v.theatre.id
				//check if theater_id matches current container
				if (theatre_id == code) {
					var title = val.title
					var time = v.dateTime
					
					if (titles_used.indexOf(title) === -1) {

						//content = content + "<div class='secondary'>"
						content = content + "<h2 class='secondary_name'>"+val.title+"</h2>"
						content = content + time_to_span(time)
					} else {
						content = content + time_to_span(time)
					}
					
					titles_used.push(title)
				}

				//content = content + "</div>" //close secondary div
			})

		})
		var content = content + "</div>" //cloase secondary
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
