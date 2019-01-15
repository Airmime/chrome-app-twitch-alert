var alreadyCheck = false;
var audio = new Audio("sounds/pull-out.ogg");

function pushNotification(id, title, message, iconUrl) {

	chrome.notifications.create(id, {
		type: "basic",
		title: title,
		message: message,
		iconUrl: iconUrl
	});	
}

function checkStream(){
	$.ajax({
		type: "GET",
		dataType: "json",
		cache: false,
		url: "https://api.twitch.tv/kraken/streams/" + config.name + "?client_id=" + config.clientID,
		success : function(data){
			if (data.stream != null) {
				chrome.browserAction.setBadgeText({text: "LIVE"});
				chrome.browserAction.setBadgeBackgroundColor({color: config.default_color});
				chrome.browserAction.setTitle({title: config.name + " - Online"});

				if (!alreadyCheck) {
					pushNotification(config.name, "Hey, I'm online - " + data.stream.channel.display_name, "I'm playing "+ data.stream.channel.game +", join me on twitch.", "img/icon_128.png");
					audio.play();
					alreadyCheck = true;
				}

			}else{
				chrome.browserAction.setBadgeText({text: ""});
				chrome.browserAction.setTitle({title: config.name + " - Offline"});
			}
		}
	});
}

checkStream();
setInterval(checkStream, 120000);