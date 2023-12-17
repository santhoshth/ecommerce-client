import React from 'react';
import '../styles/Footer.css';;

function Footer() {
    const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };

    return (
        <div className="footer">
            <div className="back__to__top">
                <button onClick={scrollTop}><p>Back to top</p></button>
            </div>
            <div className="footer__container">
                <div className="footer__content">
                    <div className="c1">
                        <h3>Get to Know Us</h3>
                        <p>About Us</p>
                        <p>Careers</p>
                        <p>Press Release</p>
                        <p>Amazon Cares</p>
                        <p>Gift a Smile</p>
                        <p>Amazon Science</p>
                    </div>
                    <div className="c2">
                        <h3>Connect with Us</h3>
                        <p>Facebook</p>
                        <p>Twitter</p>
                        <p>Instagram</p>
                    </div>
                    <div className="c3">
                        <h3>Make Money With Us</h3>
                        <p>Sell on Amazon</p>
                        <p>Amazon Global Selling</p>
                        <p>Become an Affiliate</p>
                        <p>Fulfilment by Amazon</p>
                        <p>Advertise Your Products</p>
                        <p>Amazon Pay on Merchants</p>
                    </div>
                    <div className="c4">
                        <h3>Let Us Help You</h3>
                        <p>COVID-19 and Amazon</p>
                        <p>Your Account</p>
                        <p>Returns Centre</p>
                        <p>100% Purchase Protection</p>
                        <p>Amazon App Download</p>
                        <p>Amazon Assistant Download</p>
                        <p>Help</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer