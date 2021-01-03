import React, { useEffect, useState } from 'react';
import '../Authentication.css'
import { Link, Redirect } from 'react-router-dom';
import UserAPI from '../../API/UserAPI';

// import io from "socket.io-client";
// const socket = io("http://localhost:3000");


function SignIn(props) {

    const [redirect, setRedirect] = useState(false)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [users, setUsers] = useState([])

    const onChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value)
    }

    const onSignIn = () => {

        const checkUser = users.find(value => {
            return value.email === email
        })

        if (!checkUser){
            setEmailError(true)
            return
        }else{
            setEmailError(false)
            if (checkUser.password === password){

                sessionStorage.setItem('user_id', checkUser._id)
                sessionStorage.setItem('name_user', checkUser.name)
                sessionStorage.setItem('image_user', checkUser.image)

                setRedirect(true)
            }else{
                setPasswordError(true)
            }
        }
    }

    useEffect(() => {

        const fetchData = async () => {

            const response = await UserAPI.getAll()
            console.log(response)

            setUsers(response)

        }

        fetchData()

    }, [])


    return (
        <div className="limiter">
            <div className="container-login100">
                <div className="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-50">
                    <span className="login100-form-title p-b-33">
                        Sign In
					    </span>

                    { emailError && (<span className="error">* Email Không Hợp Lệ!</span>)}
                    { passwordError && (<span className="error">* Password Không Hợp Lệ!</span>)}

                    <div className="wrap-input100 validate-input" >
                        <input className="input100" type="text" placeholder="Email" onChange={onChangeEmail} />
                    </div>

                    <div className="wrap-input100 rs1 validate-input">
                        <input className="input100" type="password" placeholder="Password" onChange={onChangePassword} />
                    </div>

                    <div className="container-login100-form-btn m-t-20">
                        { redirect && <Redirect to="/Chat" />}
                        <button className="login100-form-btn" onClick={onSignIn}>
                            Sign in
						</button>
                    </div>

                    <div className="text-center p-t-45 p-b-4">
                        <span className="txt1">Create an account?</span>

                        <Link to="" className="txt2 hov1">
                            Sign up
						</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignIn;