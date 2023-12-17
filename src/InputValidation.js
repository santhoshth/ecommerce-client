// const nameFormat = new RegExp(/^([a-zA-Z]+\s?){0,20}$/);
// const addressFormat = new RegExp(/^([a-zA-Z0-9]+[\s,]?){0,30}$/);
// const pincodeFormat = new RegExp(/^([0-9]){0,6}$/);
const emailFormat = new RegExp(/^\w+([-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/);
const passwordFormat = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,16})");

export const nameValidation = (name) => {
    return name === "" ? "Enter your name" : name.length < 3 ? "Name should be at least 3 characters" : "";
}

export const addressValidation = (address) => {
    return address === "" ? "Enter your address" : address.length < 5 ? "Address should be at least 5 characters" : "";
}

export const cityValidation = (city) => {
    return city === "" ? "Enter your city" : city.length < 3 ? "City should be at least 3 characters" : "";
}

export const pincodeValidation = (pincode) => {
    return pincode.length < 6 ? "Enter your pincode" : "";
}

export const emailValidation = (email) => {
    if (email === "") {
        return "Enter your email address";
    } else {
        if (!emailFormat.test(email)) {
            return "Invalid email address";
        }

        return "";
    }
}

export const simplePasswordValidation = (password) => {
    if (password === "") {
        return "Enter your password";
    } else {
        if (password.length < 8) {
            return "Passsword should be at least 8 characters";
        }

        if (!passwordFormat.test(password)) {
            return "Password must include lower and upper case letters, number and symbol";
        }

        return "";
    }
}

export const passwordValidation = (password) => {
    if (password === "") {
        return "Enter your password";
    } else {
        if (password.length < 8) {
            return "Password should be at least 8 characters";
        }

        if (!(new RegExp("^(?=.*[a-z])")).test(password)) {
            return "Password should include a lower case character";
        }

        if (!(new RegExp("^(?=.*[A-Z])")).test(password)) {
            return "Password should include a upper case character";
        }

        if (!(new RegExp("^(?=.*[0-9])")).test(password)) {
            return "Password should include a number";
        }

        if (!(new RegExp("^(?=.*[@#$%^&-+=()])")).test(password)) {
            return "Password should include a special character";
        }

        return "";
    }
}

export const confirmPasswordValidation = (password, confirmPassword) => {
    if (confirmPassword === "") {
        return "Enter your password again";
    } else {
        if (password !== confirmPassword) {
            return "Password does not match";
        }

        return "";
    }
}