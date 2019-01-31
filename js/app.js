function loadCache(){
	$("#stream-name").html(config.name);

	if (localStorage.stream_preview != null) {
		$("#stream-preview").attr("src",localStorage.stream_preview);
	}

	if (localStorage.stream_logo != null) {
		$("#stream-logo").attr("src",localStorage.stream_logo);
	}

	$(".stream-link").attr("href","https://www.twitch.tv/" + config.name);
}

function offlineStream(){
	$("#stream-viewers").html("-");
	$("#stream-game").html("-");
	$("#stream-title").html("...");
	$("#stream-status").html("Offline");
	$("#stream-status-point").removeClass("on");

	chrome.browserAction.setBadgeText({text: ""});

	if (localStorage.stream_logo != null) {
		$("#stream-logo").attr("src",localStorage.stream_logo);
	}
}

function onlineStream($data){
	$("#stream-viewers").html($data.stream.viewers);
	$("#stream-game").html($data.stream.channel.game);
	$("#stream-title").html($data.stream.channel.status);
	$("#stream-logo").attr("src",$data.stream.channel.logo);
	$("#stream-preview").attr("src",$data.stream.preview.large);
	$(".stream-link").attr('href',$data.stream.channel.url);
	$("#stream-status").html("Online");
	$("#stream-status-point").addClass("on");

	localStorage.stream_preview = $data.stream.preview.large;
	localStorage.stream_logo = $data.stream.channel.logo;
}

function checkStream(){
	$.ajax({
		type: "GET",
		dataType: "json",
		cache: false,
		url: "https://api.twitch.tv/kraken/streams/" + config.name + "?client_id=" + config.clientID,
		success : function(data){
			if (data.stream != null) {
				onlineStream(data);
			}else{
				offlineStream();
			}
		}
	});
	
}

loadCache();
checkStream();
setInterval(checkStream, 120000);
