import React from 'react';
import LoginContainer from '../Auth/AuthContainer';
import Main from "./Main";
import {connect} from "react-redux";
import {API} from "../../api/API";
import {getRegister} from "../../redux/reducer";

class MainContainer extends React.Component {
    
    render() {
        return  <div>
                {
                    this.props.isAuth

                    ? 

                    <Main/>

                    : 

                    <LoginContainer/>
                }
                </div>
    }
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.data.isAuth
    }
}



export default connect(mapStateToProps, {getRegister})(MainContainer);
