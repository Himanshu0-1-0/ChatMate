'use client';
import { useState, useRef } from 'react';
import styles from './Signin.module.css';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
export default function Signin() {
  const router= useRouter();
  const [isSignIn, setIsSignIn] = useState(true);
  const loginFormRef = useRef(null);
  const registerFormRef = useRef(null);

  const errorToast = (msg) => {
    toast.error(msg, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const successToast = (msg) => {
    toast.success(msg, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const toggleForm = () => {
    setIsSignIn((prevIsSignIn) => !prevIsSignIn);
  };

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(loginFormRef.current);
    const email = formData.get('email');
    const password = formData.get('password');

    if (!emailRegex.test(email)) {
      errorToast('Invalid email address');
      return;
    }

    // request to backend.....
    try {
      const response = await fetch('https://chatmate-backend-8usd.onrender.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token);
        successToast('Logged in successfully');
        router.push("/Chats/homepage")
      } else {
        const errorData = await response.json();
        errorToast(`Login failed: ${errorData.error}`);
      }
    } catch (error) {
      errorToast(`Login failed: ${error.message}`);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = new FormData(registerFormRef.current);
    const username = formData.get('username');
    const email = formData.get('email');
    const password = formData.get('password');
    const confirmPassword = formData.get('confirmPassword');
    // Handle register logic

    if (!emailRegex.test(email)) {
      errorToast('Invalid email address');
      return;
    }

    if (password.length < 6) {
      errorToast('Minimum Length of Password should be 6..');
      return;
    }

    if (password !== confirmPassword) {
      errorToast("Passwords Don't Match..");
      return;
    }

    //req to backend
    const obj = { username, email, password };
    try {
      const response = await fetch('https://chatmate-backend-8usd.onrender.com/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
      });

      if (!response.ok) {
        if (response.status === 400) {
          const data = await response.json();
          errorToast('Registration failed: ' + data.error);
        } else {
          errorToast('Registration failed: ' + response.statusText);
        }
        return;
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      successToast('Registered Successfully');
      router.push("/Chats/homepage")
    } catch (error) {
      errorToast('Registration failed: ' + error.message);
    }
  };

  return (
   
    <div className={`${styles.all}`}>
    <div className={`${styles.container} ${isSignIn ? '' : styles['sign-up-mode']}`}>
      <div className={styles['forms-container']}>
        <div className={styles['signin-signup']}>
          <form
            ref={loginFormRef}
            onSubmit={handleLogin}
            className={`${styles.form1} ${styles['sign-in-form']} ${isSignIn ? styles.active : ''}`}
          >
            <h2 className={styles.title}>Sign In</h2>
            <div className={styles['input-field']}>
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" name="email" required />
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" name="password" required />
            </div>
            <input type="submit" value="Login" className={`${styles.btn} ${styles.solid}`} />
          </form>

          <form
            ref={registerFormRef}
            onSubmit={handleRegister}
            className={`${styles.form1} ${styles['sign-up-form']} ${isSignIn ? '' : styles.active}`}
          >
            <h2 className={styles.title}>Sign Up</h2>
            <div className={styles['input-field']}>
              <i className="fas fa-user"></i>
              <input type="text" placeholder="Username" name="username" required />
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" name="email" required />
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" name="password" required />
            </div>
            <div className={styles['input-field']}>
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Confirm Password" name="confirmPassword" required />
            </div>
            <input type="submit" value="Sign Up" className={`${styles.btn} ${styles.solid}`} />
          </form>
        </div>
      </div>
      <div className={styles['panels-container']}>
        <div className={`${styles.panel} ${styles['left-panel']}`}>
          <div className={styles.content}>
            <h3>Don&#39;t have an account..?</h3>
            <p>Ready to Connect? Sign up and start chatting in seconds!</p>
            <button className={`${styles.btn} ${styles.transparent}`} id="sign-up-btn" onClick={toggleForm}>
              Sign Up
            </button>
          </div>
          <img src="./img/imag.png" className={styles.image} alt="" />
        </div>
        <div className={`${styles.panel} ${styles['right-panel']}`}>
          <div className={styles.content}>
            <h3>Already Registered..?</h3>
            <p>Join the Conversation. Sign in now and dive into the chat!</p>
            <button className={`${styles.btn} ${styles.transparent}`} id="sign-in-btn" onClick={toggleForm}>
              Sign In
            </button>
          </div>
          <img src="./img/imag.png" className={styles.image} alt="" />
        </div>
      </div>
    </div>
  </div>

  );
}
