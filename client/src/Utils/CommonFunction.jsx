
export const applicationUrl =()=>{
    let URL = process.env.REACT_APP_PROD_URL_RENDER, timeHour = new Date().getHours();
    if(timeHour >= 8 && timeHour <= 20){        
        URL = process.env.REACT_APP_PROD_URL;
    }
    if(process.env.NODE_ENV === 'development'){
        URL = process.env.REACT_APP_DEV_URL
    }
    return URL;    
}