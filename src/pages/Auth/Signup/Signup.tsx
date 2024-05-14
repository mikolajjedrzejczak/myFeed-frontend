import styles from './Signup.module.scss';

import { FormEvent, useState } from 'react';
import {  Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import FormInput from '../../../components/FormInput/FormInput';

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [repeatPassword, setRepeatPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const inputs = { username, email, name, password };

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      setError("Password doesn't match!");
      return;
    }

    try {
      await axios.post('/api/auth/signup', inputs);
      navigate('/signin?success=true');
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  return (
    <div className={styles.signup}>
      <h1 className={styles.brandName}>
        <span>My</span>Feed
      </h1>
      <div className={styles.container}>
        <h2>Sign Up</h2>
        <form onSubmit={handleSignUp}>
          {error && <span className={styles.error}>{error}</span>}
          {!error && <span className={styles.error}></span>}

          <FormInput
            type="email"
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />

          <FormInput
            type="text"
            placeholder="Name"
            handleChange={(e) => setName(e.target.value)}
          />
          <FormInput
            type="text"
            placeholder="Username"
            handleChange={(e) => setUsername(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="Password"
            handleChange={(e) => setPassword(e.target.value)}
          />
          <FormInput
            type="password"
            placeholder="Repeat password"
            handleChange={(e) => setRepeatPassword(e.target.value)}
          />
          <button
            className={styles.submit}
            type="submit"
            disabled={
              !username || !name || !email || !password || !repeatPassword
            }
          >
            Sign Up
          </button>
        </form>
        <div className={styles.login}>
          <span>Do you have an account?&nbsp;&nbsp;</span>
          <Link className="link" to="/signin">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
