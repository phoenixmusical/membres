import React from 'react';
import {Link} from 'react-router';
import {monthNames, getMonthDays} from 'utils/calendar-utils';
import IndexedCollection from 'utils/IndexedCollection';

class CalendarDay extends React.Component {
    render () {
        const props = this.props;
        const day = props.day || "";
        if (props.events.length > 0) {
            return (
                <td className="bg-primary">
                    {day}
                    {props.events.map(function (event, index) {
                        return (
                            <a key={index} className="event" href={BASE_URL+"comities/"+event.comity+"/events/"+event.id}>
                                {event.name}
                            </a>
                        );
                    })}
                </td>
            );
        } else {
            return <td>{day}</td>;
        }
    }
}

export default class Calendar extends React.Component {
    constructor (props) {
        super(props);

        const date = new Date();
        this.state = {
            month: date.getMonth(),
            year: date.getFullYear()
        };

        this.onChange = this.onChange.bind(this);
    }
    onChange () {
        this.setState({
            month: parseInt(this.refs.month.value),
            year: parseInt(this.refs.year.value)
        });
    }
    render () {
        const {month, year} = this.state;
        const weeks = getMonthDays(year, month);
        const eventsMap = new IndexedCollection();
        this.props.events.forEach(function (event) {
            if (month === event.start.getMonth()) {
                eventsMap.add(event.start.getDate(), event);
            }
        });
        return (
            <div className="calendar-wrapper">
                <form className="form-inline">
                	<select ref="month" className="form-control" value={month} onChange={this.onChange}>
                        {monthNames.map(function (name, index) {
                            return <option key={index} value={index}>{name}</option>;
                        })}
                	</select>
                	<select ref="year" className="form-control" value={year} onChange={this.onChange}>
                		<option value={2015}>2015</option>
                		<option value={2016}>2016</option>
                		<option value={2017}>2017</option>
                	</select>
                </form>
                <table className="table calendar">
                    <thead>
                        <tr>
                            <th>Dim</th>
                            <th>Lun</th>
                            <th>Mar</th>
                            <th>Mer</th>
                            <th>Jeu</th>
                            <th>Ven</th>
                            <th>Sam</th>
                        </tr>
                    </thead>
                	<tbody>
                        {weeks.map(function (week, index) {
                            return (
                                <tr key={index}>
                                    {week.map(function (day, index) {
                                        return <CalendarDay key={index} day={day} events={eventsMap.get(day)} />;
                                    })}
                                </tr>
                            );
                        })}
                	</tbody>
                </table>
            </div>
        );
    }
}
