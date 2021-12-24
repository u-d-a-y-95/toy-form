// import './App.css';
import ToyForm from './main-component';
import * as yup from 'yup';
function App() {
  let schema = yup.object().shape({
    name: yup.string().email().required(),
    lastname: yup.string().required(),
  });
  return (
    <div className="app">
      <h1>Sample Form</h1>
      <ToyForm
        initialValues={{
          name: "uday",
          address: "",
          lastname:"",
          gender: "male",
          district: "Dhaka"
        }}
        validationSchema={schema}
      >
        {
          ({
            handleChange,
            values,
            setFieldValue,
            errors,
            touched,
            handleBlur
          }) => <>
              <label htmlFor="name">First Name</label>
              <input
                id = "name"
                name="name"
                value={values?.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <label htmlFor="name">Last Name</label>
              <input
                name="lastname"
                value={values?.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              <button>Submit</button>
              <button>Reset</button>

            </>
        }
      </ToyForm>
    </div>
  );
}

export default App;
