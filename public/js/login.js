import axios from 'axios'
import { showAlert } from './alert'

export const signup = async (name, email, password, passwordconfirm) => {
    
    try {

        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/signUp',
            data: {
                name, email, password, passwordconfirm
            }
        });
        // console.log(res);

        if (res.data.status === 'success') {
            showAlert('success', 'User SignUp successful!')
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
};

export const login = async (email, password) => {
    try {
        console.log(email, password);
        const res = await axios({
            method: 'POST',
            url: '/api/v1/users/login',
            data: {
                email,
                password
            }

        });
        // console.log(res);

        if (res.data.status === 'success') {
            showAlert('success', 'logged in successful!')
            window.setTimeout(() => {
                location.assign('/')
            }, 1500)
        }
    } catch (err) {
        showAlert('error', err.response.data.message)
    }
};

export const logout = async (req, res, next) => {
    try {
        const res = await axios({
            method: 'GET',
            url: '/api/v1/users/logout',
        });
        if ((res.data.status = 'success')) location.reload(true);
    } catch (err) {
        showAlert('error', 'Error logging out! Try again.');
    }

}