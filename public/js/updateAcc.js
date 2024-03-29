import axios from "axios";
import { showAlert } from "./alert";

export const updateAccountSetting = async(data,type) =>{
    const url = type === 'password' ? '/api2/v1/users/updatePassword' : '/api2/v1/users/updateMe'
    try{
        const updateData = await axios({
            method:'PATCH',
            url,
            data
        });
        if(updateData.data.status === 'success'){

            showAlert('success',`${type} successful!`)
            window.setTimeout(()=>{
                location.assign('/me')
            },1500)
        }
    }catch(err){
        showAlert('error',err.response.data.message)

    }
}
