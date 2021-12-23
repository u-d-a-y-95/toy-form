export const getInitialState = (initialValue) =>{
    return {
        values:initialValue,
        isDirty:false,
        isValid:true,
        touched:{},
        errors:{}
    }
}