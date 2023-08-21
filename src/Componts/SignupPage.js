import React, { useState } from 'react';

function LoginPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [errormsg, setErrormsg] = useState([]);


    // function for password validation
    function passwordValidate(str) {
        let isUpper = false, isLower = false, isNum = false, isSpecial = false;

        if (str.length >= 9) {
            for (let i = 0; i < str.length; i++) {
                if (str[i].toUpperCase() === str[i]) {
                    isUpper = true;
                }
                if (str[i].toLowerCase() === str[i]) {
                    isLower = true;
                }
                if (!isNaN(parseInt(str[i]))) {
                    isNum = true;
                }
                if (!/[a-zA-Z0-9]/.test(str[i])) {
                    isSpecial = true;
                }
            }

            if (isLower && isUpper && isNum && isSpecial) {
                return "Password is valid.";
            } else {
                let errors = [];
                if (!isLower) {
                    errors.push("Password must contain at least one lowercase letter./n");
                }
                if (!isUpper) {
                    errors.push("Password must contain at least one uppercase letter.");
                }
                if (!isNum) {
                    errors.push("Password must contain at least one numeric digit.");
                }
                if (!isSpecial) {
                    errors.push("Password must contain at least one special character.");
                }
                return errors;
            }
        } else {
            return "Password must be at least 9 characters long.";
        }
    }

    function phoneValidate(num) {
        if (num.length >= 10) {
            return true;
        }
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const passwordValidationResult = passwordValidate(password);
        const phoneValidationResult = phoneValidate(phone);

        if (passwordValidationResult !== "Password is valid.") {
            setErrormsg([passwordValidationResult]);
            return;
        }

        if (!phoneValidationResult) {
            setErrormsg(['Phone length must be greater than 10']);
            return;
        }

        setErrormsg([]);

        console.log(name, email, password, phone);

        // clear the form after submit
        setName('');
        setEmail('');
        setPassword('');
        setPhone('');
    }

    return (
        <div className='LoginContainer'>
            <div className="loginBox card">
                <div className='heading'>Signup Form</div>
                <hr />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="Input1" className="form-label">Name</label>
                        <input type="text" className="form-control" id="Input1" required onChange={(e) => { setName(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Input2" className="form-label">Email</label>
                        <input type="email" className="form-control" id="Input2" required onChange={(e) => { setEmail(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Input3" className="form-label">Password</label>
                        <input type="password" className="form-control" id="Input3" required onChange={(e) => { setPassword(e.target.value) }} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="Input4" className="form-label">Phone Number</label>
                        <input type="number" className="form-control" id="Input4" required onChange={(e) => { setPhone(e.target.value) }} />
                    </div>
                    <div>
                        <button className="btn btn-primary formBtn" type='submit'>Submit</button>
                    </div>
                    <div>{errormsg.map((errorMsg, index) => <div key={index} className="error-msg">{errorMsg}</div>)}</div>
                    <div><a href="/">Already have an account! Login</a></div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;
