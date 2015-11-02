import {monthNames} from './calendar-utils';

function wrapDateFunction(fnc) {
	return function (date) {
		if (!date) {
			return "";
		}
		if (typeof date === 'string') {
			date = new Date(date);
		}
		return fnc(date);
	};
}

function pad2(number) {
	const str = number.toString();
	return str.length < 2 ? '0' + str : str;
}

function formatDate(date) {
	return date.getFullYear()+"-"+pad2(date.getMonth()+1)+"-"+pad2(date.getDate());
}

function formatTime(date) {
	return pad2(date.getHours())+':'+pad2(date.getMinutes());
}

function formatDateTime(date) {
	return formatDate(date) + " " + formatTime(date);
}

exports.date = wrapDateFunction(formatDate);
exports.time = wrapDateFunction(formatTime);
exports.datetime = wrapDateFunction(formatDateTime);

const ONE_MINUTE = 60 * 1000;
const TWO_MINUTES = 2 * ONE_MINUTE;
const THIRTY_MINUTES = 30 * ONE_MINUTE;
const ONE_HOUR = 60 * ONE_MINUTE;
const ONE_DAY = 24 * ONE_HOUR;
const ONE_YEAR = 365 * ONE_DAY;

exports.smartTime = wrapDateFunction(function (date) {
	const now = new Date();
	const span = now.getTime() - date.getTime();
	if (span < 0) {
		return formatDateTime(date);
	}
	if (span < ONE_MINUTE) {
		return "maintenant";
	}
	if (span < TWO_MINUTES) {
		return "il y a une minute";
	}
	if (span < THIRTY_MINUTES) {
		const minutes = Math.floor(span / ONE_MINUTE);
		return "il y a " + minutes + " minutes";
	}
	if (span < ONE_DAY) {
		if (now.getDate() === date.getDate()) {
			return "aujourd'hui à " + formatTime(date);
		} else {
			return "hier à " + formatTime(date);
		}
	}
	if (span < ONE_YEAR) {
		const time = formatTime(date);
		const monthName = monthNames[date.getMonth()];
		return date.getDate() + " " + monthName + " à " + formatTime(date);
	}
	return formatDateTime(date);
});
