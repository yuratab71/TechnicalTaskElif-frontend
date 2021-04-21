import React, {useEffect} from 'react';
import "./MonthReport.css";
import {connect} from "react-redux";
import {setMonth, getMonthInfo} from "../../redux/reducer";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import NotInterestedIcon from '@material-ui/icons/NotInterested';
import { CircularProgress } from '@material-ui/core';

function MonthReport(props) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    
    useEffect(() => {
      let currentMonth = new Date();
      currentMonth = currentMonth.toString().split(" ")[1];
      props.setMonth(currentMonth);
      console.log(props.id, currentMonth);
      props.getMonthInfo(props.id, currentMonth);
    }, []);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = (e) => {
      setAnchorEl(null);
      props.setMonth(e.target.id ? e.target.id : null);
      if (e.target.id){
        props.getMonthInfo(props.id, e.target.id);
      }
    };
  

    return (
        <div className="monthly__report__container">
            <div className="monthly__report__header">
              <h2>Monthly Report</h2>
              <h3>{props.month ? props.month : "Chose Month"}</h3>
            </div>
            {props.isFetching
            ?
            
            <div>
              <CircularProgress/>
            </div>

            :
            <div>
                <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                  Chose Month
                </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                    <MenuItem id="Jan" onClick={handleClose}>January</MenuItem>
                    <MenuItem id="Feb" onClick={handleClose}>February</MenuItem>
                    <MenuItem id="Mar" onClick={handleClose}>March</MenuItem>
                    <MenuItem id="Apr" onClick={handleClose}>April</MenuItem>
                    <MenuItem id="May" onClick={handleClose}>May</MenuItem>
                    <MenuItem id="Jun" onClick={handleClose}>June</MenuItem>
                    <MenuItem id="Jul" onClick={handleClose}>July</MenuItem>
                    <MenuItem id="Aug" onClick={handleClose}>August</MenuItem>
                    <MenuItem id="Sep" onClick={handleClose}>September</MenuItem>
                    <MenuItem id="Oct" onClick={handleClose}>October</MenuItem>
                    <MenuItem id="Nov" onClick={handleClose}>November</MenuItem>
                    <MenuItem id="Dec" onClick={handleClose}>December</MenuItem>
              </Menu>
            </div>
            }
            
      <div>
        {props.monthInfo.length > 0 && props.month 
        
        ? 
        
        <div>
            {props.monthInfo.map(el => {
              return <div key={el.date} className="month__report">
                <p>{el.date}</p>
                <p>Food: {el.food}</p>
                <p>Sport: {el.sport}</p>
              </div>
            })
            }
            <div className="income__statistics">
              <div>
              Total: {props.monthlySpend}
              </div>
              <div>
                Your income: {props.income}
              </div>
              <div>
                {props.income >= props.monthlySpend 
                
                ? 
                
                <CheckCircleIcon style={{ color: "green" }} fontSize="large"/> //WHEN GOOD TOTAL COUNT
                
                : 
                
                <NotInterestedIcon style={{ color: "red" }} fontSize="large"/> //WHEN BAD TOTAL COUNT
                
                }
              </div>
            </div>
        </div> 
        
        : 
        
        "No information"}
      </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        id: state.data.id,
        name: state.data.name,
        date: state.data.currentDate,
        income: state.data.income,
        month: state.data.currentMonth,
        monthInfo: state.data.monthCashInfo,
        monthlySpend: state.data.monthlySpend,
        isFetching: state.data.monthFetching
    }
}

export default connect(mapStateToProps, {setMonth, getMonthInfo})(MonthReport);
