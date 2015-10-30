import React from 'react';
import {momentLocalizer, setLocalizer} from 'react-big-calendar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';
//import globalize from 'globalize';

setLocalizer(momentLocalizer(moment));

function EventWeek(props) {
    return <strong>{props.event.title}</strong>
}

export default class Calendar extends React.Component {
    render(){
        var components = {
            event: EventWeek
        };
        return (
            <div>
                <BigCalendar
                    selectable
                    popup
                    events={this.props.events}
                    components={components} />
            </div>
        );
    }
}
