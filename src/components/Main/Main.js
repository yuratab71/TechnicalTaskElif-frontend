import React from 'react';
import {connect} from "react-redux";
import 'react-calendar/dist/Calendar.css';
import {switchPages} from "../../redux/reducer";
import "./Main.css";
import MonthReport from "../MonthReport/MonthReport";
import Tracker from "../Tracker/Tracker";

function Main(props) {
    
    const switchHandler = () => {
        props.switchPages(!props.switch)
    }

    return (
        <div>
            <div>
                <div>Hello, {props.name} :D</div>
            </div>
                <hr/>
                {props.switch 
                
                ?   <div>
                        <button onClick={switchHandler}>{props.switch ? "To Monthly Report" : ""}</button>
                        <Tracker/>
                    </div>
                    
                :
                    <div>
                        <button onClick={switchHandler}>{props.switch ? "" : "To Tracker"}</button>
                        <MonthReport/>
                    </div>
                    
                }
            </div>
    )
}

const mapStateToProps = (state) => {
    return {
        name: state.data.name,
        date: state.data.currentDate,
        switch: state.data.switchPage
    }
}

export default connect(mapStateToProps, {switchPages})(Main);
