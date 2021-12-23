// import './App.css';
import ToyForm from './main-component';
import * as yup from 'yup';
function App() {
  let schema = yup.object().shape({
    name: yup.string().email().required(),
    lastname: yup.string().required(),
  });
  return (
    <div className="App">
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
              {
                console.log(errors)
              }
              <input
                name="name"
                value={values?.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <input
                name="lastname"
                value={values?.lastname}
                onChange={handleChange}
                onBlur={handleBlur}
              />

            </>
        }
      </ToyForm>
    </div>
  );
}

export default App;
