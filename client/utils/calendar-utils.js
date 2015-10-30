import {Calendar} from 'calendar';

export const monthNames = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

const calendar = new Calendar(0);

export function getMonthDays(year, month, events){
    return calendar.monthDays(year, month);
}
