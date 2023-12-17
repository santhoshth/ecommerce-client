import React, { useEffect, useState } from 'react'
import '../styles/Profile.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/actions/UserActions';
import { ToastContainer, toast } from 'react-toastify';
import Error from '../components/Error';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { confirmPasswordValidation, emailValidation, nameValidation, passwordValidation } from '../InputValidation';

function Profile() {
    window.scrollTo(0, 0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const toastId = React.useRef(null);

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
    const { error } = userUpdateProfile;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [errorName, setErrorName] = useState('');
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirmPassword, setErrorConfirmPassword] = useState('');

    useEffect(() => {
        if (userInfo === null) {
            navigate("/login", { replace: true });
        } else {
            setName(userInfo?.name);
            setEmail(userInfo?.email);
        }
    }, [userInfo, navigate]);

    const notify = (message, type) => {
        if (!toast.isActive(toastId.current)) {
            if (type === "error") {
                toastId.current = toast.error(message);
            } else if (type === "success") {
                toastId.current = toast.success(message);
            } else {
                toastId.current = toast.info(message);
            }
        }
    }

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

    const confirmPasswordOnChange = (e) => {
        if ((/^([a-zA-Z0-9!@#$%^&*]){0,}$/).test(e.target.value) && e.target.value.length <= 20) {
            setConfirmPassword(e.target.value);
        }
    }

    const updateHandler = (e) => {
        e.preventDefault();

        // UPDATE PROFILE
        if (password === '' && confirmPassword === '') {
            setErrorName(nameValidation(name));
            setErrorEmail(emailValidation(email));

            if (errorName === "" && errorEmail === "" && name !== "" && email !== "") {
                if (name === userInfo?.name && email === userInfo?.email) {
                    notify("No changes are made", "error");
                } else {
                    dispatch(updateUserProfile({ id: userInfo?._id, name, email }));
                    notify("Profile Updated", "success");
                }
            }
        } else {
            setErrorName(nameValidation(name));
            setErrorEmail(emailValidation(email));
            setErrorPassword(passwordValidation(password));
            setErrorConfirmPassword(confirmPasswordValidation(password, confirmPassword));

            if (errorName === "" && errorEmail === "" && errorPassword === "" && errorConfirmPassword === "" &&
                name !== "" && email !== "" && password !== "" && confirmPassword !== "") {
                dispatch(updateUserProfile({ id: userInfo?._id, name, email, password }));
                setPassword('');
                setConfirmPassword('');
                notify("Profile Updated", "success");
            }
        }

    }

    return (
        <>
            <ToastContainer
                style={{ marginTop: "50px" }}
                pauseOnHover={false}
                pauseOnFocusLoss={false}
                draggable={false}
                autoClose={2000}
            />
            {error ? <Error error={error} /> : null}
            <div className="profile__outer">
                <div className="profile">
                    <div className="profile__nav">
                        <Link style={{ textDecoration: 'none' }} to="/account">
                            <p className="profile__account">Your Account</p>
                        </Link>
                        <ArrowRightIcon className="arrow__icon" fontSize='small' />
                        <span>Login & Security</span>
                    </div>
                    <p className="profile__title">Login & Security</p>
                    <div className="profile__list">
                        <div className="profile__list__row">
                            <div className="profile__list__row__left">
                                <span>Name:</span>
                                <p>{userInfo?.name}</p>
                            </div>
                            <div className="profile__list__row__left">
                                <span>New Name:</span>
                                <div className="new__input">
                                    <input
                                        type="text"
                                        placeholder="New name"
                                        required
                                        value={name}
                                        onChange={(e) => nameOnChange(e)}
                                    />
                                    <div className="validation__error">
                                        {errorName &&
                                            <>
                                                <PriorityHighIcon className='validation__icon' fontSize='small' />
                                                <p>{errorName}</p>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile__list__row">
                            <div className="profile__list__row__left">
                                <span>E-mail:</span>
                                <p>{userInfo?.email}</p>
                            </div>
                            <div className="profile__list__row__left">
                                <span>New E-mail:</span>
                                <div className="new__input">
                                    <input
                                        type="email"
                                        placeholder="New email"
                                        required={true}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                    <div className="validation__error">
                                        {errorEmail &&
                                            <>
                                                <PriorityHighIcon className='validation__icon' fontSize='small' />
                                                <p>{errorEmail}</p>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="profile__list__row last__row">
                            <div className="profile__list__row__left">
                                <span>New Password:</span>
                                <div className="new__input">
                                    <input
                                        type="password"
                                        placeholder="New password"
                                        value={password}
                                        onChange={(e) => passwordOnChange(e)}
                                    />
                                    <div className="validation__error">
                                        {errorPassword &&
                                            <>
                                                <PriorityHighIcon className='validation__icon' fontSize='small' />
                                                <p>{errorPassword}</p>
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="profile__list__row__left">
                                <span>Confirm Password:</span>
                                <div className="new__input">
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        value={confirmPassword}
                                        onChange={(e) => confirmPasswordOnChange(e)}
                                    />
                                </div>
                                <div className="validation__error">
                                    {errorConfirmPassword &&
                                        <>
                                            <PriorityHighIcon className='validation__icon' fontSize='small' />
                                            <p>{errorConfirmPassword}</p>
                                        </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <button className="edit__button" onClick={e => updateHandler(e)}>Update</button>
                </div>
            </div>
        </>
    )
}

export default Profile