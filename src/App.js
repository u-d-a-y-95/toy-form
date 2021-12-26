// import './App.css';
import ToyForm from './main-component';
import * as yup from 'yup';
function App() {
  const initialValues = {
    firstName: "",
    lastName: ""
  }
  let schema = yup.object().shape({
    firstName: yup.string().required("First Name is required"),
    lastName: yup.string().required("Last Name is required"),
  });
  return (
    <div className="app">
      <h1>Sample Form</h1>
      <ToyForm
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values, { resetForm, setFieldValue }) => {
          alert(JSON.stringify(values))
        }}
        onReset={(values, { resetForm }) => {
          resetForm()
        }}
      >
        {
          ({
            handleChange,
            values,
            setFieldValue,
            errors,
            touched,
            handleBlur,
            handleReset,
            handleSubmit
          }) => <>
              <div className=''>
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={values?.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {
                  errors?.firstName && <span className="error">{errors?.firstName?.message}</span>
                }
              </div>

              <div className="mt-1">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={values?.lastName}
                  onChange={e => {
                    setFieldValue("lastName", e?.target?.value)
                  }}
                  onBlur={handleBlur}
                />
                {
                  errors?.lastName && <span className="error">{errors?.lastName?.message}</span>
                }
              </div>

              <div className="mt-1">
                <button type='button' onClick={handleSubmit}>Submit</button>
                <button type='button' onClick={handleReset}>Reset</button>
              </div>


            </>
        }
      </ToyForm>
    </div>
  );
}

export default App;
