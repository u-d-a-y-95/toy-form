

<p 
    style="color:#33AFFF;
           text-align:center;
           font-size:3em;
           margin:0
           ">Toy Form</p>

<p style="color:#33AFFF;
          text-align:center">
Build forms in React, without any hassel
</p>


# Introduction
Toy Form is a thin  wrapper for Form, which is inspired from [Formik](https://formik.org/docs/overview).
It gives some api to easily handle form state.[Yup](https://github.com/jquense/yup) can integrated easily

*** Props ***

    initialValues,
    validationSchema,
    onSubmit,
    onReset
    children

as render props in call back it return
    values,
    isDirty,
    errors,
    touched,

    setValues
    setFieldValue
    resetForm
    submitForm

    handleSubmit
    handleReset
    handleBlur
    handleChange

