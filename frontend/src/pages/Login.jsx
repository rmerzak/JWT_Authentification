import {useState, useEffect} from 'react'
import {FaSignInAlt} from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {register, reset, login} from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    const dispatch = useDispatch()
    const {user, isLoading, isError, isSuccess, message} = useSelector(
        (state) => state.auth
    )
    useEffect(() => {
        console.log(user);
        console.log(isSuccess);
        if (isError) {
            toast.error(message)
        }
        if (isSuccess || user) {
            navigate('/')
        }
        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch])
    const {email, password} = formData;
    const onchange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }))
    }
    const onSubmit = (e) => {
        //console.log(e.target.name.value);
        e.preventDefault();
        const userData = {
            email,
            password
        }
        dispatch(login(userData));
    }
    if (isLoading)
    {
        return <Spinner />
    }
  return <>
  <section className='heading'>
      <h1>
          <FaSignInAlt/> Login
      </h1>
      <p>Login and start setting Goals</p>
  </section>
  <section className='form'>
      <form onSubmit={onSubmit}>
          <div className="form-group">
          <input type='text' className='form-control' id='email' name='email' value={email} placeholder='Enter your email' onChange={onchange}/>
          </div>
          <div className="form-group">
          <input type='text' className='form-control' id='password' name='password' value={password} placeholder='Enter your password' onChange={onchange}/>
          </div>
          <div className="form-group">
              <button type="submit" className='btn btn-block'>Submit</button>
          </div>
      </form>
  </section>
  </>
}

export default Login