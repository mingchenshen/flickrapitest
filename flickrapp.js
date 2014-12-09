var key = 'fcdb711b312bc36301b8332f0cfa68fa';

function InitialGetPhotos(topic){
	var request = {
		tags: topic,
		tagmode: "any",
		format: "json"
	};
	var call = $.ajax({
		url: "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?",
		data: request,
		dataType: "json",
		type: "GET",
		success: function(data){
			console.log('it worked');
			displayPhotos(data);
		},
		error: function(){console.log('it failed')}
	});
};

function AfterGetPhotos(topic){
	$("[class*='container']").find("a").slideUp(600);
	setTimeout(function() {
		$("[class*='container']").text('');
		InitialGetPhotos(topic);		
	}, 550)
};

function displayPhotos(data){
	$.each(data.items, function(i, item){
		if(i == 30){
			console.log('it asdd');
			return false;
		}
		var pic = item.media.m;
		pic = pic.replace("_m.jpg", "_b.jpg");
		var p = i % 3;
		// $("." + p + "_container").append("<a href='" + item.link + "'><img src='" + pic + "'/></a>");
		$("." + p + "_container").append("<img class='picture' src='" + pic + "'/>");
		$(".main").find("img").show('clip', 600);
	});
}

$(document).ready(function(){
	InitialGetPhotos('owls');
	//get photos click
	$(".getP").click(function(){
		AfterGetPhotos('color');
	});
	//get overlay click
	// $(".pic").click(function(){
	$(".picture").click(function(){
		$(".box_overlay").show();
		console.log('here');
	});
	$(".box_overlay").click(function(){
		$(this).toggle();
	})
});