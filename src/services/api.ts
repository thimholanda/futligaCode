import axios from 'axios';

const api = axios.create({
    baseURL: 'http://futligaservices-test.sa-east-1.elasticbeanstalk.com/api',
    headers: {
        'usuario': 'joint',
        'senha' : 'thiago.holanda'
    }
});

export default api;
