import React, {useEffect} from 'react';
import {getDateCashInfo} from "../../redux/reducer";
import "./ViewTotal.css";
import {connect} from "react-redux";
import CircularProgress from '@material-ui/core/CircularProgress';

function ViewTotal(props) {
    useEffect(() => {
        console.log("rerender", props.info);
        props.getDateCashInfo(props.id, props.date);
    }, [props.date]);

    return (
        <div className="view_container">
            {props.isFetching
            
            ?   //when fetching
                <div>
                    <CircularProgress/>
                </div>
            :   // common
            <div>
            {props.info 
            ? <div>
                Food<p>{props.info.food}</p>
                Sport<p>{props.info.sport}</p>
            </div>
            : "Інформації про цей день немає"
            }
            </div>
            }   
        </div>
    )
}

export const mapStateToProps = (state) => {
    return {
        date: state.data.currentDate,
        id: state.data.id,
        info: state.data.cashInfo,
        isFetching: state.data.isGetCashFetching
    }
} 

export default connect(mapStateToProps, {getDateCashInfo})(ViewTotal);
