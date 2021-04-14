const axios = require("axios");

const instance = axios.create({
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
    baseURL: "https://salty-retreat-57585.herokuapp.com" //"http://localhost:80/"  //"https://salty-retreat-57585.herokuapp.com"
})

const API = {
    createAccount(data){ //data must be obj
        return instance.post("/user/create", data).then(responce => {
            return responce.data;
        }).catch(err => console.log(err));
    },
    getAuth(data){
        return instance.post("/user/login", data).then(responce => {
            return responce.data;
        }).catch(err => console.log(err));
    },
    getDailyCashInfo(id, date){
        return instance.get(`/${id}&${date}`).then(responce => {
            return responce.data;
        }).catch(err => console.log(err))
    },
    setDailyCashInfo(id, data){
        return instance.post(`/finance/create/${id}`, data).then(responce => {
            return responce.status;
        }).catch(err => console.log(err));
    },
    updateDailyCashInfo(id, date, info){
        return instance.put(`/${id}&${date}`,info).then(responce => {
            return responce.status;
        }).catch(err => console.log(err));
    },
    deleteCashInfo(id, date){
        return instance.delete(`/${id}&${date}`).then(responce => {
            return responce.status;
        }).catch(err => console.log(err));
    },
    getAllMonthCashInfo(id, month){
        return instance.get(`/all/${id}&${month}`).then(responce => {
            return responce.data;
        }).catch(err => console.log(err));
    }
}

export {API};




