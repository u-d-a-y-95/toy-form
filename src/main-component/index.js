import { useEffect, useReducer } from "react"
import reducer from "./state/reducer"
import { SET_ERRORS, SET_FIELD_TOUCHED, SET_FIELD_VALUE, SET_RESET, SET_VALUES } from "./state/type"
import { getInitialState } from "./state/utils"

const ToyForm = ({ initialValues = {}, validationSchema,onSubmit,onReset, children }) => {

    const [state, dispatch] = useReducer(reducer, getInitialState(initialValues))


    const checkValidity = (schema, values) => {
        schema?.validate(values, { abortEarly: false })
            .then(valid => {
                dispatch({
                    type: SET_ERRORS,
                    errors: {},
                    isValid: true
                })
            })
            .catch(err => {
                dispatch({
                    type: SET_ERRORS,
                    errors: err?.inner?.reduce((acc, error) => {
                        acc[error.path] = {
                            value: error?.value,
                            message: error?.message,
                            type: error?.type
                        }
                        return acc
                    }, {}),
                    isValid: false
                })
            })
    }

    useEffect(() => {
        if (state?.values && validationSchema) {
            checkValidity(validationSchema, state?.values)
        }
    }, [state?.values, validationSchema])



    const handleChange = e => {
        setFieldValue(e.target.name, e.target.value)
        setFieldTouched(e.target.name, true)
    }

    const handleBlur = e => {
        setFieldTouched(e.target.name, true)
    }

    const setFieldTouched = (fieldName, touchedValue) => {
        dispatch({
            type: SET_FIELD_TOUCHED,
            name: fieldName,
            value: touchedValue
        })
    }
    const setFieldValue = (fieldName, fieldValue) => {
        dispatch({
            type: SET_FIELD_VALUE,
            name: fieldName,
            value: fieldValue
        })
    }
    const setValues = values => {
        dispatch({
            type: SET_VALUES,
            value: values
        })
    }
    const resetForm = (values = initialValues) => {
        dispatch({
            type: SET_RESET,
            value: values
        })
    }
    const handleSubmit =()=>{
        onSubmit && onSubmit(state?.values,{
            ...state,
            resetForm,
            handleChange,
            setValues,
            handleBlur,
            setFieldValue
        })
    }
    const handleReset = () => {
        onReset && onReset(state?.values, {
            ...state,
            resetForm,
            handleChange,
            setValues,
            handleBlur,
            setFieldValue
        });

    }

    return children({
        ...state,
        setFieldValue,
        handleChange,
        handleBlur,
        setValues,
        handleReset,
        handleSubmit
    })
}

export default ToyForm