import { useRef, useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthProvider';

import axios from '../api/axios';
const LOGIN_URL = '/auth'

const Login = ()=>{
    const {setAuth} = useContext(AuthContext)
    const userRef = useRef();
    const errRef = useRef();

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => { userRef.current.focus() }, [])

    useEffect(() => { setErrMsg('') }, [user, pwd])

    const handleSubmit = async (e)=>{
        e.preventDefault();

        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({user, pwd}),
                {
                    headers: {'Content-Type': 'application/json'}, withCredentials : true
                })
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles
            setAuth({user, pwd, roles, accessToken})
            setUser('')
            setPwd('')
            setSuccess(true)
        } catch (error) {
            if (!error?.response) {
                setErrMsg('No Server response')
            } else if (err.response?.status === 400) {
                setErrMsg("Missing username or Password")
            } else if (err.response?.status === 401) {
                setErrMsg("Unauthorized")
            } else {
                setErrMsg('Login failed')
            }
            errRef.current.focus()
        }

    }

    return (
        <>{success ? (
            <section>
                <h1>Success!</h1>
                <p> <a href='#'>Sign in</a> </p>
            </section>
        ): (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-alive="assertive">{errMsg}</p>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='username'>Username:</label>
                <input type='text' id='username' ref={userRef} autoComplete='off' onChange={(e) => setUser(e.target.value)} value={user} required/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required/>
                <button>Sign In</button>
            </form>
            <p>Need an account? <span><a href='#'>Sign up</a></span></p>
        </section>)}
        </>
    )
}

export default Login