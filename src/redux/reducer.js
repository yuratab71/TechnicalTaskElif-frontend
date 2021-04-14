import {API} from "../api/API";

const AUTH = "AUTH";
const SET_DATE = "SET_DATE";
const SET_CASH_INFO = "SET_CASH_INFO";
const CASH_FETCHING = "CASH+FETCHING";
const LOGIN_FETCHING = "LOGIN_FETCHING";
const SET_MONTH_INFO = "SET_MONTH_INFO";
const SET_MONTH = "SET_MONTH";
const SET_MONTLY_SPEND = "SET_MONTHLY_SPEND";
const MONTH_FETCHING = "MONTH_FETCHING";
const SWITCH_PAGE = "SWITCH_PAGE";

let initialState = {
    name: null,
    id: null,
    isAuth:  false, 
    dates: null, 
    income: null, 
    currentDate: null, 
    cashInfo: null, 
    isLoginFetching: false, 
    isGetCashFetching: false,
    monthCashInfo: [],
    currentMonth: null,
    monthlySpend: null,
    monthFetching: false,
    switchPage: true 
}

const reducer = (state = initialState, action) => {
    //console.log(action.type, "action >>>>>>");
    switch( action.type ) {
        case AUTH:
            return {
                ...state,
                id: action.id,
                name: action.name,
                income: action.income,
                isAuth: true
            }
        case CASH_FETCHING: 
            return {
                ...state,
                isGetCashFetching: action.boolean
            }
        case LOGIN_FETCHING:
            return {
                ...state,
                isLoginFetching: action.boolean
            }
        case SET_DATE:
            return {
                ...state,
                currentDate: action.date
            }
        case SET_CASH_INFO:
            return {
                ...state,
                cashInfo: action.data
            }
        case SET_MONTH_INFO:
            return {
                ...state,
                monthCashInfo: [...action.info]
            }
        case SET_MONTLY_SPEND: 
            return {
                ...state,
                monthlySpend: action.spend
            }
        case SET_MONTH:
            return {
                ...state,
                currentMonth: action.month
            }
        case MONTH_FETCHING:
            return {
                ...state,
                monthFetching: action.boolean
            }
        case SWITCH_PAGE:
            return {
                ...state,
                switchPage: action.boolean
            }        
        default:
            return state;
    }
}

export default reducer;

export const auth = (data) => {
    return {
        type: AUTH,
        name: data.name,
        id: data.id,
        income: data.income
    } 
}
export const monthlySpendAC = (spend) => {
    return {
        type: SET_MONTLY_SPEND,
        spend
    }
}
export const currentDate = (date) => {
    return {
        type: SET_DATE,
        date
    } 
}
export const switchPagesAC = (boolean) => {
    return {
        type: SWITCH_PAGE,
        boolean
    }
}
export const cashInfo = (data) => {
    return {
        type: SET_CASH_INFO,
        data
    }
}
export const cashFetching = (boolean) => {
    return {
        type: CASH_FETCHING,
        boolean
    }
}
export const loginFetching = (boolean) => {
    return {
        type: LOGIN_FETCHING,
        boolean
    }
}
export const monthInfo = (info) => {
    return {
        type: SET_MONTH_INFO,
        info
    }
}
export const monthAC = (month) => {
    return {
        type: SET_MONTH,
        month: month
    }
}
export const setMonth = (month) => {
    return (dispatch) => {
        dispatch(monthAC(month));
    }
}
export const monthFetching = (boolean) => {
    return {
        type: MONTH_FETCHING,
        boolean
    }
}

export const switchPages = (boolean) => {
    return (dispatch) => {
        dispatch(switchPagesAC(boolean));
    }
}

export const getMonthInfo = (id, month) => {
    return (dispatch) => {
        dispatch(monthFetching(true));
        API.getAllMonthCashInfo(id, month).then(data => {
            let total = data.reduce((accumulator, currentValue) => {
                return currentValue.food + currentValue.sport + accumulator;
              }, 0);
            dispatch(monthlySpendAC(total));
            dispatch(monthInfo(data));
            dispatch(monthFetching(false));
        }).catch(err => {
            dispatch(monthFetching(false));
            console.log(err);
        });
    }
}
export const getAuth = (body) => {
    return (dispatch) => {
        dispatch(loginFetching(true));
        API.getAuth(body).then(data => {
            dispatch(auth(data));
            dispatch(loginFetching(false));
        }).catch(err => {
            dispatch(loginFetching(false));
            console.log(err);
        })
    }
}

export const getRegister = (body) => {
    return (dispatch) => {
        dispatch(loginFetching(true));
        API.createAccount(body).then(data => {
            dispatch(auth(data));
            dispatch(loginFetching(false));
            }).catch(err => {
                dispatch(loginFetching(false));
                console.log(err);
            })
        }
    }

export const setDate = (date) => {
    return (dispatch) => {
        dispatch(currentDate(date));
    }
}

export const getDateCashInfo = (id, date) => {
    return (dispatch) => {
        dispatch(cashFetching(true));
        dispatch(cashInfo(null));
        API.getDailyCashInfo(id, date).then(data => {
            dispatch(cashInfo(data));
            dispatch(cashFetching(false));
        }).catch(err => {
            console.log(err);
            dispatch(cashFetching(false));
        })
    }
}

export const setDateCashInfo = (id , info) => {
    return (dispatch) => {
        dispatch(cashFetching(true));
        API.setDailyCashInfo(id, info).then(status => {
                dispatch(cashInfo({food: info.food, sport: info.sport}));
                dispatch(cashFetching(false));
        }).catch(err => {
            console.log(err);
            dispatch(cashFetching(false));
        });
    }
}

export const updateDateCashInfo = (id, date, info) => {
    return (dispatch) => {
        dispatch(cashFetching(true));
        API.updateDailyCashInfo(id, date, info).then(status => {
                dispatch(cashInfo({food: info.food, sport: info.sport}));
                dispatch(cashFetching(false));
        }).catch(err => {
            console.log(err);
            dispatch(cashFetching(false));
        })
    }
}

export const deleteDateCashInfo = (id, date) => {
    return (dispatch) => {
        dispatch(cashFetching(true));
        API.deleteCashInfo(id, date).then( status => {
            dispatch(cashInfo(null));  
            dispatch(cashFetching(false));
        }).catch(err => {
            dispatch(cashFetching(false));
            console.log(err);
        })
    }
}