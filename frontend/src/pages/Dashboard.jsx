import {useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
function Dashboard() {
  const navigate = useNavigate();
  const {user} = useSelector((state) => state.auth)
  console.log(user);
  console.log("i m here")
  useEffect(() => {
    if (!user) {
      navigate('/login')
    }
  }, [user,navigate])
  return (
    <>
    <section className="heading"></section>
    <h1>Welcome {user && user.name}</h1>
    <p>Goals Dashboard</p>
    </>
  )
}

export default Dashboard