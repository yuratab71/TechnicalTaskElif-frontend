import React from 'react';
import Register from "./Register";
import Login from "./Login";
import CircularProgress from '@material-ui/core/CircularProgress';
import {getAuth, getRegister} from "../../redux/reducer";
import {connect} from "react-redux";
import "./Login.css";

class LoginContainer extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            Authmode: true,
            login: "Login",
            register: "Register",
        }
    }
    
    switchMode(){
        this.setState({
            Authmode: !this.state.Authmode
        })
    }
    
    render() {
        return  <div>
                    <div>
                        <h3>Welcome to cash tracker app</h3>
                    </div>
                    {this.props.isFetching
                    ?   
                    <div className="form__container">
                        <div>
                            <CircularProgress color="secondary"/> {/* WHEN FETCHING */}
                        </div>
                    </div>  
                    :
                    <div> {/* COMMON */}
                        {this.state.Authmode 
                        ? <Login auth={this.props.getAuth}/>   
                        : <Register auth={this.props.getRegister}/>}
                    </div>   
                    }
                    <button className="login__form__button" onClick={this.switchMode.bind(this)}>{this.state.Authmode ? this.state.register : this.state.login}</button>
                </div>
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.data.isLoginFetching
    }
}



export default connect(mapStateToProps, {getAuth, getRegister})(LoginContainer);
