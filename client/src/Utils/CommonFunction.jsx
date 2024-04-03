
export const applicationUrl =()=>{
    let URL = process.env.REACT_APP_PROD_URL, timeHour = new Date().getHours();
    if(timeHour>20 && timeHour<8){        
        console.log('aaa');
        URL = process.env.REACT_APP_PROD_URL_RENDER;
    }
    if(process.env.NODE_ENV === 'development'){
       // URL = process.env.REACT_APP_DEV_URL
    }
    return URL;    
}