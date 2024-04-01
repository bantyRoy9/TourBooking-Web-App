import {toast} from 'react-toastify';


// Toastify Notification
export default function Alert(messageText,messageType,autoClose){
    let messageStyle={
      position: "top-right",
      autoClose:autoClose?autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
    };
    if(messageText){   
        if(messageType){
            if(messageType==="E"){
                toast.error(messageText,messageStyle);
            }else if(messageType==="S"){
               toast.success(messageText,messageStyle);
            }else if(messageType==="W"){
               toast.warning(messageText,messageStyle);
            }
        }else{
           toast.info(messageText,messageStyle);
        }
    }
}
