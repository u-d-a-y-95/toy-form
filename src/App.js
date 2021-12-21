import logo from './logo.svg';
import './App.css';
import ToyForm from './main-component';
import * as yup from 'yup';
function App() {
  let schema = yup.object().shape({
    name: yup.string().required(),
  });
  return (
    <div className="App">
      <ToyForm
        initialValues={{
          name: "uday",
          address: "",
          gender:"male",
          district:"Dhaka"
        }}
        validationSchema={schema}
      >
        {
          ({
            handleChange,
            values,
            setFieldValue
          }) => <>
              {
                // console.log(values)
              }
              <input
                name="name"
                value={values?.name}
                onChange={handleChange}
              />
              <br />
              Address
              <br />

              <input
                name="gender"
                type="radio"
                value={values.gender}
                checked={values.gender === "male"}
                onChange={handleChange}
              />Male <br />

              <input
                name="gender"
                type="radio"
                value={values.gender}
                checked={values.gender === "female"}
                onChange={e => {
                  setFieldValue("gender", "female")
                }}
              />Female <br />

              <select name="district" value={values?.district} onChange={handleChange}>
                <option value="Dhaka">Dhaka</option>
                <option value="Tangail">Tangail</option>
                <option value="Mymshing">Mymshing</option>
                <option value="Rajshahi">Rajshahi</option>
              </select>

              <input
                name="interest"
                type="checkbox"
                value={values.interest}
                checked={values.interest === "football"}
                onChange={e => {
                  setFieldValue("interest", "football")
                }}
              />FootBall <br />

              <input
                name="gender"
                type="checkbox"
                value={values.interest}
                checked={values.interest === "cricket"}
                onChange={e => {
                  setFieldValue("interest", "cricket")
                }}
              />Cricket <br />


            </>
        }
      </ToyForm>
    </div>
  );
}

export default App;
