import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [message, setMessage] = useState("");

  const sendOTP = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/send-otp", { email });
      setStep(2);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error sending OTP.");
    }
  };

  const verifyOTP = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/verify-otp", { email, otp });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Error verifying OTP.");
    }
  };

  return (
    <div className="container">
      <div className="form-box">
        <h2>Email OTP Verification</h2>
        {step === 1 && (
          <>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={sendOTP}>Send OTP</button>
          </>
        )}
        {step === 2 && (
          <>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={verifyOTP}>Verify OTP</button>
          </>
        )}
        <p className="message">{message}</p>
      </div>
    </div>
  );
}

export default App;
