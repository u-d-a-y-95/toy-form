import { useState } from "react"

const  ToyForm = ({initialValues={},validationSchema,children}) =>{
    const [values,setValues] = useState(initialValues)
    const handleChange = e=>{
        // console.log(e.target.value)
        values[e.target.name] = e.target.value;
        setValues({...values})
        // if(validationSchema){
        //     validationSchema?.validate(values,{abortEarly: false})
        //     .then(valid=>{
        //         console.log(valid)
        //     })
        //     .catch(err=>{
        //         // console.log(err)
        //         console.log(err.errors)
        //     })
        // }
    }
    const setFieldValue = (fieldName,fieldValue) =>{
        values[fieldName] = fieldValue
        setValues({...values})
    }
    return children({
        handleChange,
        values,
        setFieldValue
    })
}

export default ToyForm