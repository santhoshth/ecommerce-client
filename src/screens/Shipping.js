import React, { useEffect, useState } from 'react'
import '../styles/Profile.css';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from './../redux/actions/CartActions';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import { addressValidation, cityValidation, nameValidation, pincodeValidation } from '../InputValidation';

function Profile() {
    window.scrollTo(0, 0);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    const userLogin = useSelector((state) => state.userLogin);
    const { userInfo } = userLogin;

    const [name, setName] = useState(shippingAddress?.name);
    const [address, setAddress] = useState(shippingAddress?.address);
    const [city, setCity] = useState(shippingAddress?.city);
    const [pincode, setPincode] = useState(shippingAddress?.pincode);

    const [errorName, setErrorName] = useState('');
    const [errorAddress, setErrorAddress] = useState('');
    const [errorCity, setErrorCity] = useState('');
    const [errorPincode, setErrorPincode] = useState('');

    useEffect(() => {
        if (userInfo === null) {
            navigate("/login", { replace: true })
        }
    }, [userInfo, navigate])

    const pincodeOnChange = (e) => {
        if (new RegExp(/^([0-9]){0,6}$/).test(e.target.value))
            setPincode(e.target.value);
    }

    const nameOnChange = (e) => {
        if (new RegExp(/^([a-zA-Z]+\s?){0,}$/).test(e.target.value) && e.target.value.length <= 20) {
            setName(e.target.value);
        }
    }

    const cityOnChange = (e) => {
        if (new RegExp(/^([a-zA-Z]+\s?){0,}$/).test(e.target.value) && e.target.value.length <= 20) {
            setCity(e.target.value);
        }
    }

    const addressOnChange = (e) => {
        if ((/^([a-zA-Z0-9]+\s?){0,}$/).test(e.target.value) && e.target.value.length <= 30) {
            setAddress(e.target.value);
        }
    }

    const allValidationClear = () => {
        return name !== "" && address !== "" && city !== "" && pincode !== "" && errorName === "" && errorAddress === "" && errorCity === "" && errorPincode === "" ? true : false;
    }

    const shippingHandler = (e) => {
        e.preventDefault();
        setErrorName(nameValidation(name));
        setErrorAddress(addressValidation(address));
        setErrorCity(cityValidation(city));
        setErrorPincode(pincodeValidation(pincode));

        if (allValidationClear()) {
            dispatch(saveShippingAddress({ name, address, city, pincode, country: "India" }));
            navigate('/payment')
        }
    }

    return (
        <>
            <div className="profile__outer">
                <div className="shipping">
                    <div className="shipping__nav">
                        <Link style={{ textDecoration: 'none' }} to="/cart">
                            <p className="profile__account">Cart</p>
                        </Link>
                        <ArrowRightIcon className="arrow__icon" fontSize='small' />
                        <span>Shipping</span>
                    </div>
                    <div className="shipping__container">
                        <p className="shipping__title">Delivery Address</p>
                        <div className="shipping__list">
                            <div className="shipping__list__row">
                                <div className="shipping__list__row__left">
                                    <span>Full name</span>
                                    <div className="new__input__shipping">
                                        <input
                                            type="text"
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
                            <div className="shipping__list__row">
                                <div className="shipping__list__row__left">
                                    <span>Address</span>
                                    <div className="new__input__shipping">
                                        <input
                                            type="email"
                                            required={true}
                                            value={address}
                                            onChange={(e) => addressOnChange(e)}
                                        />
                                        <div className="validation__error">
                                            {errorAddress &&
                                                <>
                                                    <PriorityHighIcon className='validation__icon' fontSize='small' />
                                                    <p>{errorAddress}</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shipping__list__row last__row">
                                <div className="shipping__list__row__left">
                                    <span>City</span>
                                    <div className="new__input__shipping">
                                        <input
                                            type="text"
                                            value={city}
                                            onChange={(e) => cityOnChange(e)}
                                        />
                                        <div className="validation__error">
                                            {errorCity &&
                                                <>
                                                    <PriorityHighIcon className='validation__icon' fontSize='small' />
                                                    <p>{errorCity}</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shipping__list__row last__row">
                                <div className="shipping__list__row__left">
                                    <span>Pincode</span>
                                    <div className="new__input__shipping">
                                        <input
                                            type="text"
                                            placeholder="6 digits [0-9] PIN code"
                                            value={pincode}
                                            onChange={(e) => pincodeOnChange(e)}
                                        />
                                        <div className="validation__error">
                                            {errorPincode &&
                                                <>
                                                    <PriorityHighIcon className='validation__icon' fontSize='small' />
                                                    <p>{errorPincode}</p>
                                                </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="shipping__list__row last__row">
                                <div className="shipping__list__row__left">
                                    <span>Country</span>
                                    <div className="new__input__shipping">
                                        <input
                                            type="text"
                                            value={"India"}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="edit__button__shipping" onClick={e => shippingHandler(e)}>Continue</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Profile