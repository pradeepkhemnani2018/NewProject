import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = () => {
        axios
            .post('http://localhost:3001/login', { email, password })
            .then((response) => {
                const { token, data } = response.data;
                const { id, email } = data;

                sessionStorage.setItem('token', token); // Store the token in sessionStorage
                sessionStorage.setItem('loggedInUser', email); // Store the email in sessionStorage
                sessionStorage.setItem('userId', id); // Store the id in sessionStorage with key 'userId'

                navigate('/mainpagehome'); // Redirect to the dashboard
                window.location.reload(); // Refresh the page
            })
            .catch((error) => {
                console.error('Login error:', error);
                // Handle login error and display an error message
            });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleLogin();
        }
    };


    return (
        <div className="custom-container">



            <div className="main-content" style={{ padding: 30, paddingBottom: 120, marginTop: -120, backgroundColor: '#efefef' }}>
                <div className="row justify-content-center mt-4" style={{ paddingTop: 120 }}>
                    <div className="col-lg-4 col-md-6 col-sm-8 col-10">
                        {/* Wrap the login form with card */}
                        <div className="card p-4 shadow" >
                            <h3 className="mb-4 text-center">Login</h3>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="email" style={{ fontWeight: 'bold' }}>Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        onKeyDown={handleKeyDown} // Add keydown event listener
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password" style={{ fontWeight: 'bold' }}>Password</label>
                                    <div className="input-group">
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="form-control"
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            onKeyDown={handleKeyDown}
                                        />
                                        <div className="input-group-append" style={{ paddingTop: 3 }}>
                                            <span className="input-group-text" onClick={() => setShowPassword(!showPassword)}>
                                                <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"} />
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div style={{ textAlign: 'center' }}>
                                    <button type="button" onClick={handleLogin} className="btn btn-primary btn-block">Login</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>








    );
};

export default Login;
