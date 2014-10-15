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
	//start HTML

	var content = "<div class='movie_container'>"
	var content = content +  "<h1 class='movie_title'>"+title+"</h1>"

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

			if (hour>12) {
				hour = hour - 12
			}

			var min = time.split(':')[1]
			//var time = Date.parse(time)
			//var time = new Date(time)
			//var hours = time.getHours()

			//console.log(hours)

			//check if theater exists inside the most recent container
			var exists = theaters_used.indexOf(theater_name) > -1
			console.log(exists)
			//console.log(theater_name+' '+theaters_used+ ' '+exists)
				
			if (exists) {
				content = content + "<span class='time'> "+hour+':'+min+"</span>"
				
			} else {
				content = content + "<h2 class='theater_name'>"+theater_name+"</h2>"
				
				content = content + "<span class='time'>"+hour+':'+min+"</span>"
			}
			theaters_used.push(theater_name)
		}
	})


	//content closing tags
	var content = content +  "</div>"

	if (theaters_used.length > 0) {
		$('#main').append(content)	
	}

	//append content to body
	

	console.log(theaters_used)
})



});

