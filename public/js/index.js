import '@babel/polyfill'
import { displayMap } from './mapbox';
import { login, logout,signup } from './login';
import { updateAccountSetting } from './updateAcc';
import { bookTour } from './stripe'

const mapBox = document.getElementById('map');
const signupbtn = document.querySelector('.form--signup');
const loginbtn = document.querySelector('.form--login');
const logoutbtn = document.querySelector('.nav__el--logout');
const updatebtn = document.querySelector('.form-user-data');
const updatePassbtn = document.querySelector('.form-user-password')
const bookingbtn = document.getElementById('booking-tour');
if (mapBox) {
    const locations = JSON.parse(mapBox.dataset.locations);
    displayMap(locations)
}
if(signupbtn){
    signupbtn.addEventListener('submit', e =>{
        e.preventDefault();
        // console.log('work');
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const passwordconfirm = document.getElementById('passwordconfirm').value;
        // signup(name,email,password,passwordconfirm);
        alert('Still developing mode....')
    });
}
if (loginbtn) {
    loginbtn.addEventListener('submit', e => {
        e.preventDefault();
        // console.log('work');
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        // console.log(email, password);
        login(email, password)
    });
}

if (logoutbtn) logoutbtn.addEventListener('click', logout)

if (updatebtn) {
    updatebtn.addEventListener('submit', e => {
        e.preventDefault();
        const form = new FormData()
        form.append('name', document.getElementById('name').value);
        form.append('email', document.getElementById('email').value);
        form.append('photo', document.getElementById('photo').files[0])
        updateAccountSetting(form, 'data')
    })
}

if (updatePassbtn) {
    updatePassbtn.addEventListener('submit', async e => {
        e.preventDefault();
        document.querySelector('.btn--save-password').textContent = 'updating ...';
        
        const passwordCurrent = document.getElementById('password-current').value
        const password = document.getElementById('password').value
        const passwordconfirm = document.getElementById('password-confirm').value
        
        await updateAccountSetting({ passwordCurrent, password, passwordconfirm }, 'password');
        
        document.querySelector('.btn--save-password').textContent = 'Save Password'
        document.getElementById('password-current').value = ''
        document.getElementById('password').value = ''
        document.getElementById('password-confirm').value = ''
    })
}

if(bookingbtn){
    bookingbtn.addEventListener('click', e =>{
        e.target.textContent = 'processing ...'
        const { tourId }  = e.target.dataset;
        // console.log(tourId);
        bookTour(tourId)
    })
}