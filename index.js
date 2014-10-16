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

$("document").ready(function() {

//FUNCTION FOR SHOWTIMES BY TITLE
// loop through each showtime object
$.each(theater_times, function (index, val) {
	//Set variables
	var title = val.title
	var movie_object = val.showtimes
	var image_url = val.preferredImage.uri
	var genres = val.genres 
	var mpaa = val.ratings
	var shortdes = val.shortDescription
	

	var content = "<div class='movie_container'>"
	var content = content +  "<h1 class='movie_title'>"+title+"</h1>"

	//add movie descriptions

	var content = content + "<div class='movie_info'>"
	
	//loop through genres and append to movie container

	var content = content + "<span class='genres'>Genre:"
	$.each(genres, function(ind, val) {
		content = content + "<span> "+val+" </span>"
	})
	content = content + "</span>" //close genres

	//Add MPAA

	if (typeof mpaa !== 'undefined') {
		content = content + "<span class='mpaa'>Rating: "+mpaa[0].code+"</span>"
	}	else {
		content = content + "<span class='mpaa'>Rating: Unrated</span>"
	}

	//add short description

	content = content + "<div class='shortdes'>" + shortdes + "</div>"
	content = content + "</div>" //close movie info

	

	//array to hold theaternames to check for duplicate times
	
	var theaters_used = []
	$.each(movie_object, function(i, v) {
		var id = v.theatre.id
		var isPub = theater_codes.indexOf(id) == -1
		


		if(!isPub) {
			
			var theater_name = v.theatre.name
			var time = v.dateTime
			var time = time.split('T')[1]
			var hour = time.split(':')[0]
			var min = time.split(':')[1]

			if (hour>12) {
				hour = hour - 12
			}

			//check if theater exists inside the most recent container
			var exists = theaters_used.indexOf(theater_name) > -1
			
			//console.log(theater_name+' '+theaters_used+ ' '+exists)
				
			if (exists) {
				content = content + "<span class='time'> "+hour+':'+min+"</span>"
				
			} else {
				content = content + "<div class='theater_in_movie'>"
				content = content + "<h2 class='theater_name'>"+theater_name+"</h2>"
				
				content = content + "<span class='time'>"+hour+':'+min+"</span>"
			}
			theaters_used.push(theater_name)
			
		}

	})
content = content + "</div>"

	//content closing tags
	var content = content +  "</div>"

	if (theaters_used.length > 0) {
		$('#main').append(content)	
	}

	//append content to body
	

})

console.log(theater_times)

});

