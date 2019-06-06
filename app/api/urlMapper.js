const BASE_URL = 'https://updham.herokuapp.com'; //'http://127.0.0.1:8000/';
const USER = 'users/'
const MEDIA = 'upload-media/'

export default {
    BASE_URL,
    submitForm: `${BASE_URL}/${USER}`,
    getDocument: `${BASE_URL}/${MEDIA}`
}