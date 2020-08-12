import axios from 'axios';

const instance =axios.create({
    baseURL:'https://react-burger-shop-3e820.firebaseio.com/',
})

export default instance;