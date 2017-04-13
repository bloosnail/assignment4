(function() {

	var in_glob = $(".flexsearch-input").after("<ul class='flexsearch-results'></ul>");
	// results/messages container
	var result_glob = $(".flexsearch-results");
	
	// no data yet
	var data = [];

	//parse
	$.when(
		$.getJSON( 'http://www.mattbowytz.com/simple_api.json?data=programming', function(response){
			$.each( response, function(key, val) {
				console.log(val);
				if(val !== 10 && val !== 200 && val.length > 2){
					data =  data.concat(val);
				}
			});
		}),

		$.getJSON( 'http://www.mattbowytz.com/simple_api.json?data=interests', function(response){
			$.each( response, function(key, val) {
				if(val !== 9 && val !== 200 && val.length > 2){
					data =  data.concat(val);
				}
			});
		})


	).then(function() {
		//clear and add all results
		for(var i = 0; i < data.length; i++) {
			result_glob.append("<li class='flexsearch-result'>" + data[i] + "</li>");
		}

		// do autocomplete
		in_glob.on("keyup", function(event){

			var input = in_glob.val().toLowerCase();
			var results = [];

			for(var i  = 0; i < data.length; i++) {
				// if substr exists in word, add it to results
				var tmp = data[i].toLowerCase();
				
				if(tmp.includes(input)) {
					results.push(data[i]);
				}
			}

			//clear results on update
			result_glob.html("");
			//display results
			if(results.length) {
				for(i = 0; i < results.length; i++) {
					result_glob.append("<li class='flexsearch-result'>" + results[i] + "</a></li>");
				}
			}
		});
	});
})();