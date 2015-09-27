
function pad2(number){
	var str = number.toString();
	return str.length < 2 ? '0'+str : str;
}

function formatDate(date){
	if(!date){
		return "";
	}
	return date.getFullYear()+"-"+pad2(date.getMonth()+1)+"-"+pad2(date.getDate());
}

function formatTime(date){
	if(!date){
		return "";
	}
	return pad2(date.getHours())+':'+pad2(date.getMinutes());
}

exports.date = formatDate;

exports.time = formatTime;

exports.datetime = function(date){
	return (formatDate(date) + " " + formatTime(date)).trim();
};

