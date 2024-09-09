import React, { useState } from "react";
import firebase from "firebase/compat/app";
import { auth, storage, db, firestore } from "../Config/ConfigFirebase";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import "./style.css"
import { ToastContainer,Bounce , toast} from "react-toastify";


function SignUp() {
    const [image, setImage] = useState(null);
    var Navigate = useNavigate()

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
        image: Yup.mixed().required("Image is required")
    });

    const initialValues = {
        name: "",
        email: "",
        password: "",
        image: null
    };

    const handleImageChange = (e, setFieldValue) => {
        const file = e.target.files[0];
        setImage(file);
        setFieldValue("image", file); // Update the Formik field value
    };

    const handleImageUpload = () => {
        return new Promise((resolve, reject) => {
            if (!image) {
                reject(new Error("No image file selected"));

                return;
            }

            const storageRef = firebase.storage().ref();
            const imageRef = storageRef.child(`profileImages/${image.name}`);

            const uploadTask = imageRef.put(image);

            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    // Progress function (optional)
                    console.log(snapshot);
                },
                (error) => {
                    // Handle unsuccessful uploads
                    console.error("Image upload failed:", error);
                    reject(error);
                    toast.success   ("Image upload failed. Please try again.");
                },
                async () => {
                    // Handle successful uploads on complete
                    const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
                    console.log("Image URL:", downloadURL);
                    resolve(downloadURL); // Resolve the promise with the download URL
                }
            );
        });
    };

    const CreateAccount = async (values, { setSubmitting, setErrors, resetForm }) => {
        const { email, password } = values;

        try {
            // First, upload the image
            const imageUrl = await handleImageUpload();

            // Then, create the user account
            const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const user = userCredential.user;
            const userId = user.uid

            // You can now use the imageUrl, for example:
            // Save it in the user's Firestore document or update the user's profile
            console.log("User created:", user);
            console.log("Profile image URL:", imageUrl);
            // Reset the form fields
            let userObject = {
                email,
                password,
                userName: values.name,
                imageUrl,
                userId,
                'usertype': 'user'
            }
            await firestore.collection('users').doc(userId).set(userObject);

            toast('SignUp Success Fully', {
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

            resetForm();
            setImage(null); // Clear the image state

            Navigate('/signin')

            setSubmitting(false);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
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
        <>
            <div>
                <div className="max-width">
                    <div className="container-fluid">
                        <div>
                            <div className="formInner">
                            <h1 className="center"><span className="text-black">SignUp</span> With Saylani</h1>
                            <Formik
                                    initialValues={initialValues}
                                    validationSchema={validationSchema}
                                    onSubmit={CreateAccount}
                                >
                                    {({ isSubmitting, setFieldValue }) => (
                                        <Form>
                                            <div className="field-box">
                                                <label htmlFor="name">Name</label>
                                                <Field type="text" name="name" className="form-field"  />
                                                <ErrorMessage name="name" component="div" className="error-message" />
                                            </div>
                                            <div className="field-box" >
                                                <label htmlFor="email">Email</label>
                                                <Field type="email" name="email" className="form-field" />
                                                <ErrorMessage name="email" component="div" className="error-message" />
                                            </div>
                                            <div className="field-box" >
                                                <label htmlFor="password">Password</label>
                                                <Field type="password" name="password" className="form-field" />
                                                <ErrorMessage name="password" component="div" className="error-message" />
                                            </div>
                                            <div className="field-box" >
                                                <label htmlFor="image">Profile Image</label>
                                                <input
                                                    className="image-field"
                                                    type="file"
                                                    name="image"
                                                    onChange={(e) => handleImageChange(e, setFieldValue)}
                                                />
                                                <ErrorMessage name="image" component="div" className="error-message" />
                                            </div>
                                            <button className="fromBtn" type="submit" disabled={isSubmitting}>
                                                {isSubmitting ? "Creating Account..." : "Create Account"}
                                            </button>
                                        </Form>
                                    )}
                                </Formik>
                               <div className="link-form1">
                               <Link to={'/signin'} className="formredirect">SignIn</Link>
                               </div>
                               <ToastContainer/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

// function SignUp(){

//     const [email,setEmail] = useState("")
//     const [password,setPassword] = useState("")


//    const CreateAccount=()=>{

//     firebase.auth().createUserWithEmailAndPassword(email, password)
//   .then((userCredential) => {
//     // Signed in 
//     var user = userCredential.user;
//     console.log(user)
//     // ...
//   })
//   .catch((error) => {
//     var errorCode = error.code;
//     var errorMessage = error.message;
//     console.log(error)
//     // ..
//   });
//     }


//     return(
//         <div>
//         <input type="text" placeholder="name" name="text" id="text" />
//         <input type="email" value={email} placeholder="email" name="email" onChange={(e)=>setEmail(e.target.value)} id="email" />
//         <input type="password" value={password} placeholder="password" name="password"  onChange={(e)=>setPassword(e.target.value)}  id="password" />
//         <button onClick={()=>CreateAccount()}>Create Account</button>
//         </div>
//     )
// }


export default SignUp