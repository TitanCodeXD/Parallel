export const api = import.meta.env.VITE_API_URL || "http://localhost:5000/api"
export const uploads = import.meta.env.VITE_UPLOADS_URL || "http://localhost:5000/uploads"

//import.meta.env.VITE_API_URL //import.meta.env.API_URL || "http://localhost:5000/api"
//import.meta.env.VITE_API_URL //import.meta.env.UPLOADS_URL || "http://localhost:5000/uploads"

export const requestConfig = (method, data, token = null, image = null) => {

    let config 

    if(image){
        config = {
            method,
            body: data,
            headers: {},

        };
    } else if(method === "DELETE" || data === null) {

        config = {
            method,
            headers: {},
        };
    } else {
        config = {
            method,
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
    }

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }

    return config;
    
};


