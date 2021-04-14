import React from 'react'
import "./Tracker.css";
import CalendarComponent from "../Calendar/Calendar";
import ViewTotal from "../ViewTotal/ViewTotal";
import AddFinance from "../AddFinance/AddFinance";

function Tracker(props) {
    return (
        <div>
            <div>
            <span>{props.date}</span>
            </div>
            <div className="main__view">
                <CalendarComponent/>
                <ViewTotal/>
            </div>
            <div>
                <AddFinance/>
            </div>
        </div>
    )
}

export default Tracker
