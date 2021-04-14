import React from 'react';
import { Formik, Field, Form } from "formik";
import {isEmpty, isValidincome, isLength} from "../../common/validators";
import "./Login.css";

function Register(props) {
    return (
        <div className="form__container">
            <h3>Register</h3>
            <Formik initialValues={{ name: "", password: "", income: 0}}
                onSubmit={async values => {
                  let {name, password, income} = values;
                  if (isEmpty(name, password) && isValidincome(income) && isLength(10, name, password)){
                      console.log(name, password, income, "REGISTER>>>>>>>");
                      props.auth({name: name, password: password, income: income});
                  };
                }}
            >
                <Form className="form">
                    <span>Name</span><Field className="form__field" name="name" type="text"/>
                    <span>Password</span><Field className="form__field" name="password" type="password"/>
                    <span>Income</span><Field className="form__field" name="income" type="number"/>
                    <button type="submit">Register</button>
                </Form>
            </Formik>
        </div>
    )
}


export default Register;
