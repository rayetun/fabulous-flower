import React, { useContext, useState } from 'react';
import { Container } from 'react-bootstrap';
import './Login.css';
import googleIcon from '../../images/icons/google.png';
import { UserContext } from '../../App';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { createUserWithEmailAndPassword, handleGoogleSignIn, initializeLoginFramework, signInWithEmailAndPassword } from './LoginManager';

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    initializeLoginFramework();

    const [newUser, setNewUser] = useState(false);

    const [user, setUser] = useState({
        isSignedIn: false,
        displayName: '',
        email: '',
        password: '',
        confirmPassword: false,
        error: '',
        success: false
    })


    const handleResponse = (res, redirect) => {
        setUser(res);
        setLoggedInUser(res);
        if (redirect) {
            history.replace(from);
        }
    }
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true);
            })
    }

    const handleBlur = (e) => {
        let isFieldValid = true;
        if (e.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(e.target.value);
        }
        if (e.target.name === 'password') {
            const isPasswordValid = e.target.value.length > 6;
            const passwordHasNumber = /\d{1}/.test(e.target.value);
            isFieldValid = isPasswordValid && passwordHasNumber;

        }
        if (isFieldValid) {
            const newUserInfo = { ...user };
            newUserInfo[e.target.name] = e.target.value;
            setUser(newUserInfo);
        }
        if (e.target.name === 'confirmPassword') {
            if (e.target.value === user.password) {
                const newUserInfo = { ...user };
                newUserInfo[e.target.name] = true;
                setUser(newUserInfo);
                document.getElementById("confirmPasswordMessage").innerText = "";
            }
            else {
                const newUserInfo = { ...user };
                newUserInfo[e.target.name] = false;
                setUser(newUserInfo);
                document.getElementById("confirmPasswordMessage").innerText = "Password didn't matched!!!";
            }

        }
    }

    // -----------------------submit event handler------------------------
    const handleSubmit = (e) => {
        if (newUser && user.email && user.password) {
            createUserWithEmailAndPassword(user.name, user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        if (!newUser && user.email && user.password) {
            signInWithEmailAndPassword(user.email, user.password)
                .then(res => {
                    handleResponse(res, true);
                })
        }
        e.preventDefault();
    }
    return (
        <Container bg="light">
            <Container>
                <div className="row mx-auto">
                    <form onSubmit={handleSubmit} className="login-form mx-auto my-5 w-50 py-4 px-5 rounded">
                        {!newUser ? <h3>Login</h3> : <h3>Create an account</h3>}
                        {newUser && <input type="text" className="custom-input" onBlur={handleBlur} name="name" placeholder="Enter Name" required />}
                        <br />
                        <input type="email" onBlur={handleBlur} className="custom-input" name="email" placeholder="Username or Email" required />
                        <br />
                        <input type="password" onBlur={handleBlur} className="custom-input" name="password" placeholder="Password" required />
                        {newUser && <small className="text-danger">*Minimum password length 6 & must contain a number!</small>}
                        <br />
                        {newUser && <input type="password" className="custom-input" onBlur={handleBlur} name="confirmPassword" placeholder="Confirm Password" id="confirmPasswordMessage" required />}
                     
                        <input type="submit" variant="warning" value={newUser ? 'Create an account' : 'Login'} className="my-4 btn-block font-weight-bold" />
                        {
                            newUser ?
                                <p className="text-center">Already have an account?
                                <Link to="#" onClick={() => setNewUser(!newUser)}>Login</Link>
                                </p>
                                :
                                <p className="text-center">Don't have an account?
                                <Link to="#" onClick={() => setNewUser(!newUser)}>Create an account</Link>
                                </p>
                        }
                        <p style={{ color: 'red' }}>{user.error}</p>
                        {
                            user.success && <p style={{ color: 'green' }}>User {newUser ? 'Created' : 'Logged in '} successfully!</p>
                        }
                    </form>
                </div>
                <div className="login-others text-center">
                    <span className="login-or">Or</span>
                    <br />
                    <br />
                    <button onClick={googleSignIn}>
                        <img src={googleIcon} alt="google-icon" /> Continue with Google
                    </button>
                </div>
            </Container>
        </Container>
    );
};

export default Login;