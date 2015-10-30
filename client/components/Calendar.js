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
                            <Link key={index} to={"events/" + event.id}>{event.name}</Link>
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

        var date = new Date();
        this.state = {
            month: date.getMonth(),
            year: date.getFullYear()
        };

        var eventsMap = this.events = new IndexedCollection();
        props.events.forEach(function (event) {
            var day = event.start.getDate();
            eventsMap.add(day, event);
        });

        this.onChange = this.onChange.bind(this);
    }
    onChange () {
        this.setState({
            month: parseInt(this.refs.month.value),
            year: parseInt(this.refs.year.value)
        });
    }
    render () {
        var weeks = getMonthDays(this.state.year, this.state.month);
        var eventsMap = this.events;
        return (
            <div className="calendar-wrapper">
                <form className="form-inline">
                	<select ref="month" className="form-control" value={this.state.month} onChange={this.onChange}>
                        {monthNames.map(function (name, index) {
                            return <option key={index} value={index}>{name}</option>;
                        })}
                	</select>
                	<select ref="year" className="form-control" value={this.state.year} onChange={this.onChange}>
                		<option value={2015}>2015</option>
                		<option value={2016}>2016</option>
                		<option value={2017}>2017</option>
                	</select>
                </form>
                <table className="table calendar">
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
