import { useEffect, useReducer } from "react"
import reducer from "./state/reducer"
import { SET_ERRORS, SET_FIELD_TOUCHED, SET_FIELD_VALUE, SET_RESET, SET_TOUCHED, SET_VALUES } from "./state/type"
import { getInitialState } from "./state/utils"

const ToyForm = ({ initialValues = {}, validationSchema, onSubmit, onReset, children }) => {

    const [state, dispatch] = useReducer(reducer, getInitialState(initialValues))


    const checkValidity = async (schema, values, touched) => {
        try {
            await schema?.validate(values, { abortEarly: false })
            return {
                isValid: true,
                errors: {}
            }
        } catch (err) {
            return {
                isValid: false,
                errors: err?.inner?.reduce((acc, error) => {
                    if (touched[error.path]) {
                        acc[error.path] = {
                            value: error?.value,
                            message: error?.message,
                            type: error?.type
                        }
                    }
                    return acc
                }, {}),
            }
        }
    }

    const setCheckResult = async (schema, values, touched) => {
        const obj = await checkValidity(schema, values, touched)
        dispatch({
            type: SET_ERRORS,
            ...obj
        })
    }

    useEffect(() => {
        if (state?.values && validationSchema) {
            setCheckResult(validationSchema, state?.values, state?.touched)
        }
    }, [state?.values, state?.touched, validationSchema])



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
    const handleSubmit = async () => {
        // set
        const touched = Object.keys(state.touched).reduce((acc, item) => {
            acc[item] = true
            return acc
        }, {})
        setCheckResult(validationSchema, state?.values, touched)
        const obj = await checkValidity(validationSchema, state?.values, touched)
        obj?.isValid && onSubmit && onSubmit(state?.values, {
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