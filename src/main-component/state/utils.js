export const getInitialState = (initialValue) =>{
    const obj = {...initialValue}

    return {
        values:obj,
        isDirty:false,
        isValid:true,
        touched:Object.keys(obj).reduce((acc,item)=>{
            acc[item] =false
            return acc
        },{}),
        errors:{}
    }
}