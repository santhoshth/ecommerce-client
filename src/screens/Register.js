import React, { useCallback, useEffect, useState } from 'react'
import '../styles/Login.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../redux/actions/UserActions';
import Error from '../components/Error';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { emailValidation, nameValidation, passwordValidation } from '../InputValidation';

function Register() {
    window.scrollTo(0, 0);

    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');

    const redirect = location.search ? location.search.split("=")[1] : "/";

    const userRegister = useSelector((state) => state.userRegister);
    const { error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const nameOnChange = (e) => {
        if ((/^([a-zA-Z]+\s?){0,}$/).test(e.target.value) && e.target.value.length <= 20) {
            setName(e.target.value);
        }
    }

    const passwordOnChange = (e) => {
        if ((/^([a-zA-Z0-9!@#$%^&*]){0,}$/).test(e.target.value) && e.target.value.length <= 20) {
            setPassword(e.target.value);
        }
    }

    const registerHandle = useCallback((e) => {
        // to avoid refreshing the page on clicking submit
        e.preventDefault();
        const nameValidationResponse = nameValidation(name);
        const emailValidationResponse = emailValidation(email);
        const passwordValidationResponse = passwordValidation(password);
        setErrorName(nameValidationResponse);
        setErrorEmail(emailValidationResponse);
        setErrorPassword(passwordValidationResponse);

        if (nameValidationResponse === "" && emailValidationResponse === "" && passwordValidationResponse === "" && name !== "" && email !== "" && password !== "") {
            dispatch(register(name, email, password));
        }
    }, [name, email, password, dispatch]);

    return (
        <div className="login">
            <Link to='/'>
                <img className="login__logo" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/2560px-Amazon_logo.svg.png" alt='login__logo' />
            </Link>
            {error ? <Error error={error} /> : null}
            <div className="login__container">
                <p className="login__title">Create Account</p>
                <form className="login__form">
                    <p className="login__field">Your name</p>
                    <input type="text" placeholder="First and last name" value={name} onChange={e => nameOnChange(e)} />
                    <div className="validation__error">
                        {errorName &&
                            <>
                                <PriorityHighIcon className='validation__icon' fontSize='small' />
                                <p>{errorName}</p>
                            </>
                        }
                    </div>

                    <p className="login__field">Email</p>
                    <input type="text" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                    <div className="validation__error">
                        {errorEmail &&
                            <>
                                <PriorityHighIcon className='validation__icon' fontSize='small' />
                                <p>{errorEmail}</p>
                            </>
                        }
                    </div>

                    <p className="login__field">Password</p>
                    <input type="password" placeholder="Password" value={password} onChange={e => passwordOnChange(e)} />
                    <div className="validation__error">
                        {errorPassword &&
                            <>
                                <PriorityHighIcon className='validation__icon' fontSize='small' />
                                <p>{errorPassword}</p>
                            </>
                        }
                    </div>

                    <button type="submit" onClick={e => registerHandle(e)}>Sign Up</button>
                </form>
                <p className="login__conditions">By continuing, you agree to Amazon's Conditions of Use and Privacy Notice. </p>
                <div className="login__conditions">
                    Already have an account?
                    <p>
                        <Link className="link link_login" to={redirect ? `/login?redirect=${redirect}` : "/login"}>
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register