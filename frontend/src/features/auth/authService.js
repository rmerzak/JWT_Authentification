import axios from 'axios'

const API_URL = '/api/users/'

//Register user

const register = async (userData) => {
    const responce = await axios.post(API_URL, userData)

    if (responce.data)
    {
        localStorage.setItem('user', JSON.stringify(responce.data))
    }
    return responce.data
}


//login user

const login = async (userData) => {
    const responce = await axios.post(API_URL + 'login', userData)

    if (responce.data)
    {
        localStorage.setItem('user', JSON.stringify(responce.data))
    }
    return responce.data
}

// Logout user

const logout = () => {
    localStorage.removeItem('user')
}

const authService = {
    login,
    logout,
    login
}
export default authService