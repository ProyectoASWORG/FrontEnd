import axios from 'axios';
import AuthService from '../services/auth_service';

export function jwtInterceptor(){
    axios.interceptors.request.use(request => {
        const user = AuthService.getUser();
        console.log(request?.headers?.Authorization!==undefined);
        if(user && request?.headers?.Authorization === undefined){
            request.headers = {
                Authorization: `Bearer ${user.token}`
            }
        }
        return request;
    })

    axios.defaults.headers.common['Accept'] = 'application/json'            
} 