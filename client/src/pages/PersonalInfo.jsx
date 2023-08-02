import { useState } from "react";
import { useNavigate } from 'react-router-dom'

import { useAxios } from '../providers/AxiosProvider';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Input from "../components/forms/Input"
import Select from "../components/forms/Select"

import { Container, Button } from "nes-ui-react";

const Register = () => {
  const navigate = useNavigate();

  const { profile, signup, alterUser, deleteUser } = useAxios();
  
  // Initial values
  const [values, setValues] = useState(profile ? profile : {
    username: "",
    email: "",
    birth: "",
    height: 175,
    weight: 60,
    gender: "Male",
  });

  const arrayRange = (start, stop, step) =>
    Array.from(
      { length: (stop - start) / step + 1 },
      (value, index) => {
        return {
          label: start + index * step,
          value: start + index * step,
        };
      }
    );

  const handleChange = (name, value) => {
    // type casting
    if (["height", "weight"].includes(name)) value = parseInt(value, 10)

    setValues((prevFormData) => ({ ...prevFormData, [name]: value }));
  }

  const handleSubmit = (event) => {
    if (profile) {
      alterUser(values);
    } else {
      signup(values)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        console.log("Registered Failed");
      });
    }
    
    event.preventDefault();
  }

  return (
    <>
      <Container title="Profile" alignTitle="center" className="m-3 mt-0">
        <Form onSubmit={handleSubmit} className="text-start">
          <div className="mb-3">
            <Input name="username" title="Username" value={values.username} setValue={handleChange}></Input>
            <Input name="email" title="Email" value={values.email} setValue={handleChange}></Input>
            <Input name="birth" title="Birthday" placeholder="yyyy-MM-dd" value={values.birth} setValue={handleChange}></Input>
            <Select
              name="gender"
              title="Gender"
              value={values.gender}
              setValue={handleChange}
              options={[{
                label: 'Male',
                value: 'Male',
              }, {
                label: 'Female',
                value: 'Female',
              }]}
            ></Select>
            <Row>
              <Col>
                <Select
                  name="height"
                  title="Height (cm)"
                  value={values.height}
                  setValue={handleChange}
                  options={arrayRange(150, 190, 1)}
                ></Select>
              </Col>
              <Col>
                <Select
                  name="weight"
                  title="Weight (kg)"
                  value={values.weight}
                  setValue={handleChange}
                  options={arrayRange(40, 100, 1)}
                ></Select>
              </Col>
            </Row>
          </div>
          <Button color="primary" size="medium" type="submit" className="w-100">Confirm</Button>
        </Form>
      </Container>
      {
        profile && 
        <div className="p-3 pt-0">
          <Button color="error" size="medium" type="submit" className="w-100" onClick={deleteUser}>Delete User</Button>
        </div>
      }
    </>
  );
}

export default Register;
