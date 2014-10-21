$("document").ready(function() {

	//default view will be showtimes_by_theater
	showtimes_by_theater(theater_times, $('#main'))

	$('#byMovie').click(function() {
		$('#main').html('')
		showtimes_by_title(theater_times, $('#main'))
	})

	$('#byTheater').click(function() {
		$('#main').html('')
		showtimes_by_theater(theater_times, $('#main'))
	})

});

