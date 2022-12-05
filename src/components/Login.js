import { useRef, useState, useEffect, useContext} from 'react'
import AuthContext from '../context/AuthProvider';

import axios from '../api/axios';
const RESPONSABILE_URL = '/api/responsabile/login'

const Login = ()=>{

/*     axios.get("/api/Responsabile").then(res => console.log(res))
 */
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

        let jsons = JSON.stringify({email : user, pwd : pwd}) 
        console.log(jsons)
        try {
            const response = await axios.post(RESPONSABILE_URL,
                jsons,
                {
                    headers: {'Content-Type': 'application/json'}
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
            } else if (error.response?.status === 400) {
                setErrMsg("Missing username or Password")
            } else if (error.response?.status === 401) {
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
                <p> Sign in </p>
            </section>
        ): (
        <section>
            <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"}>{errMsg}</p>
            <h1>Sign in</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor='email'>Email:</label>
                <input type='email' id='email' ref={userRef} autoComplete='off' onChange={(e) => setUser(e.target.value)} value={user} required/>
                <label htmlFor="password">Password:</label>
                <input type="password" id="password" onChange={(e) => setPwd(e.target.value)} value={pwd} required/>
                <button>Sign In</button>
            </form>
            <p>Need an account? <span>Sign up</span></p>
        </section>)}
        </>
    )
}

export default Login