import axios from 'axios';

export default axios.create({
  baseURL: 'https://quiz-9218d-default-rtdb.firebaseio.com/'
})
