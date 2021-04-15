import React, {useState, useEffect} from 'react'
import Calendar from 'react-calendar';
import {connect} from "react-redux";
import {setDate} from "../../redux/reducer";

function CalendarComponent(props) {
    const[value, setValue] = useState(new Date());
    
    useEffect(() => {
        props.setDate(value.toString().split(" ").splice(0,3).join(""));
    }, []);

    const onSetValue = (value) => {
        console.log(value);
        setValue(value);
        let date = value.toString().split(" ").splice(0,3).join("");
        props.setDate(date);
    }

    return (
        <div>
            <Calendar
            locale="en"
            onChange={onSetValue}
            value={value}
            maxDate={new Date(2021, 11, 31, 0, 0, 0, 0)}
            minDate={new Date(2021, 0, 1, 0, 0, 0, 0)}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
    }
}

export default connect(mapStateToProps, {setDate})(CalendarComponent);
