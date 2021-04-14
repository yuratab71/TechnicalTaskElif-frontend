const isEmpty = (...arr) => {
    return arr.every(el => !!el);
}

const isValidincome = (num) => {
    return Number.isFinite(num) ? num>= 0 : false; 
}

const isLength = (num, ...arr) => {
    return arr.every(el => el.length <= num)
}

export {isEmpty, isValidincome, isLength};