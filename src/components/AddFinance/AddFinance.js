import React from 'react';
import "./AddFinance.css";
import {connect} from "react-redux";
import { Formik, Field, Form } from "formik";
import {isValidincome} from "../../common/validators";
import {SendCashInfoSheme} from "../../common/dataShemes";
import {setDateCashInfo, updateDateCashInfo, deleteDateCashInfo} from "../../redux/reducer";
import CircularProgress from '@material-ui/core/CircularProgress';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';

function AddFinance(props) {
    
    const deleteDailyInfo = () => {
        props.deleteDateCashInfo(props.id, props.date);
    }
    
    return (
        <div className="add__finance__container">
            <div>
                <span>{props.date}</span>
                <hr/>
                {props.isFetching // IS FETCHING
                ?   <div className="fetching">
                        <CircularProgress/>
                    </div>
                :
                 props.cashInfo
                 
                 ? 
                    <div className="fetching">Change Information</div>
                : 
                    <div className="fetching">Add some information</div>   
                }
            </div>
            <div className="finance__form">
                <Formik
                initialValues={{ food: 0, sport: 0}}
                onSubmit={async values => {
                    if (isValidincome(values.food) && isValidincome(values.sport)){
                        let data = new SendCashInfoSheme(props.id, props.date, values.food, values.sport);
                        if (props.cashInfo) {
                            props.updateDateCashInfo(props.id, props.date, data);
                        } else props.setDateCashInfo(props.id, data);
                    } else {
                        alert("Sorry, invalid information");
                    }
                }} 
                >
                    <Form>
                        <div className="finace__form">
                            <span>Food</span><Field name="food" type="number"/>
                        </div>
                        <div className="finace__form">
                            <span>Sport</span><Field name="sport" type="number"/>
                        </div>
                        {props.cashInfo
                        ?
                            <div className="finance__form__buttons">
                                <button disabled={props.isFetching} className="finance__form__button" type="submit"><SaveIcon fontSize="large"/></button>
                                <button disabled={props.isFetching} className="finance__form__button" onClick={deleteDailyInfo}type="button"><DeleteIcon fontSize="large"/></button>
                            </div>
                        :
                            <button disabled={props.isFetching} className="finance__form__button"><SaveIcon fontSize="large"/></button>
                        }
                        
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        id: state.data.id,
        cashInfo: state.data.cashInfo,
        date: state.data.currentDate,
        isFetching: state.data.isGetCashFetching
    }
}

export default connect(mapStateToProps, {setDateCashInfo, updateDateCashInfo, deleteDateCashInfo})(AddFinance);
