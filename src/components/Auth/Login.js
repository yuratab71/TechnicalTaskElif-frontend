import React from 'react';
import { Formik, Field, Form } from "formik";
import {isEmpty, isLength} from "../../common/validators";
import "./Login.css";

function Login(props) {
    return (
        <div className="form__container">
            <h3>Login</h3>
            <Formik initialValues={{ name: "", password: ""}}
                onSubmit={async values => {
                  let {name, password} = values;
                  if (isEmpty(name, password) && isLength(10, name, password)){
                      props.auth({name: name, password: password});
                  };
                }}
            >
                <Form>
                    <span>Name</span><Field className="form__field" name="name" type="text"/>
                    <span>Password</span><Field className="form__field" name="password" type="password"/>
                    <button type="submit">Log in</button>
                </Form>
            </Formik>
                
               
        </div>
    )
}

export default Login;
