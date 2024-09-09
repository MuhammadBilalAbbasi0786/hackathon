import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { auth, storage, db, firestore } from "../Config/ConfigFirebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "./style.css"

function SignIn() {
    var Navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    });

    const initialValues = {
        email: "",
        password: "",

    };

    const SignInAccount = async (values, { setSubmitting, setErrors, resetForm }) => {
        const { email, password } = values;

        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            const user = userCredential.user;
            const userId = user.uid
            console.log(userId)
            toast('Login User', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });

            await firestore.collection('users').doc(userId).get()
                .then((snap) => {
                    console.log(snap.data())
                    let mainData = snap.data()

                    let userObject = {
                        userId,
                        userEmail: mainData.email
                    }
                    console.log(userObject)
                    // Convert the userObject to a JSON string
                    var jsonString = JSON.stringify(userObject);

                    // Store the JSON string in localStorage
                    localStorage.setItem("object", jsonString);

                    if (mainData.usertype == 'user') {
                        Navigate('/userpanel')
                    }
                    else if (mainData.usertype == 'admin') {
                        Navigate('/adminpanel')
                    }
                    else {
                        Navigate('/signup')
                    }
                })
                .catch((e) => {
                    console.log(e)
                    toast('Some error here', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        });
                })


            // resetForm();

            // Navigate('/signin')

            setSubmitting(false);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error);
            toast('error', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });

            // Set form errors
            if (errorCode === "auth/email-already-in-use") {
                setErrors({ email: "Email is already in use" });
            } else if (errorCode === "auth/weak-password") {
                setErrors({ password: "Password is too weak" });
            } else {
                console.error("Unexpected error:", errorMessage);
            }
            setSubmitting(false);
        }
    };

    return (
        <div>
            <div>
                <div className="max-width">
                    <div className="container-fluid">
                        <div>
                            <div className="formInner">
                                <h1 className="center"><span className="text-black">SignUp</span> With Saylani</h1>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={SignInAccount}
                                >
                                    {({ isSubmitting, setFieldValue }) => (
                                        <Form>
                                            <div className="field-box">
                                                <label htmlFor="email">Email</label>
                                                <Field type="email" name="email" className="form-field" />
                                                <ErrorMessage name="email" component="div" className="error-message" />
                                            </div>
                                            <div className="field-box">
                                                <label htmlFor="password">Password</label>
                                                <Field type="password" name="password" className="form-field" />
                                                <ErrorMessage name="password" component="div" className="error-message" />
                                            </div>
                                            <button className="fromBtn" type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? "Creating Account..." : "Create Account"}
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                                <div className="link-form1">
                                    <Link to={'/signup'} className="formredirect">SignUp</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <ToastContainer/>
                    
                </div>
            </div>
        </div>
    )
}

export default SignIn