import './App.css';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Home from './screens/Home';
import Checkout from './screens/Checkout';
import Payment from './screens/Payment';
import Orders from './screens/Orders';
import Login from './screens/Login';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React from 'react';
import SingleProduct from './screens/SingleProduct';
import Register from './screens/Register';
import Account from './screens/Account';
import Profile from './screens/Profile';
import Shipping from './screens/Shipping';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import SearchProduct from './screens/SearchProduct';
import NotFound from './screens/NotFound';

// stripe public key
const stripePromise = loadStripe("pk_test_51KxVxUSGSdcNvrR9hr9VVKCOcI8hyhthnxdEvYxr0eCPTZ4JY8bQdLbideYnaqPilC6UOmeGfRFkGGGJZiXSaWCr00oGzEDBVK");

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<><Header /><Home /></>} />
          <Route path="/search/:keyword" element={<><Header /><SearchProduct /></>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/products/:id" element={<><Header /><SingleProduct /></>} />
          <Route path="/cart" element={<><Header /><Checkout /></>} />
          <Route path="/cart/:id" element={<><Header /><Checkout /></>} />
          {/* Private Routes only for Users */}
          <Route path="/account" element={<><Header /><Account /></>} />
          <Route path="/profile" element={<><Header /><Profile /></>} />
          <Route path="/orders/:id" element={<><Header /><Orders /></>} />
          <Route path="/orders" element={<><Header /><Orders /></>} />
          <Route path="/shipping" element={<><Header /><Shipping /></>} />
          <Route path="/payment" element={
            <>
              <Header />
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </>
          } />
          <Route path="*" element={<><NotFound /></>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
