import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'

import { useAxios } from '../providers/AxiosProvider';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Input from "../components/forms/Input"
import Select from "../components/forms/Select"

import { Container, Button } from "nes-ui-react";

const Register = ({ layout = null, register = false }) => {
  useEffect(() => {
    layout?.({
      type: 'init',
      data: {
        isShowBack: register ? false : true,
        backgroundColor: '#E0DCDB',
        backgroundImage: 'url("https://lh3.google.com/u/0/d/12OYkAJ18918N0qwFflRzEUlYSeovwROl=w3360-h1686-iv1")',
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [layout]);

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
      <Container title="個人資料" alignTitle="center" className="m-3 mt-0 gameboy-layout">
        <Form className="text-start text-light">
          <Input name="username" title="用戶名" value={values.username} setValue={handleChange}></Input>
          <Input name="email" title="電子郵件" value={values.email} setValue={handleChange}></Input>
          <Input name="birth" title="生日" placeholder="yyyy-MM-dd" value={values.birth} setValue={handleChange}></Input>
          <Select
            name="gender"
            title="性別"
            value={values.gender}
            setValue={handleChange}
            options={[{
              label: '男生',
              value: 'Male',
            }, {
              label: '女生',
              value: 'Female',
            }]}
          ></Select>
          <Row>
            <Col>
              <Select
                name="height"
                title="身高 (公分)"
                value={values.height}
                setValue={handleChange}
                options={arrayRange(150, 190, 1)}
              ></Select>
            </Col>
            <Col>
              <Select
                name="weight"
                title="體重 (公斤)"
                value={values.weight}
                setValue={handleChange}
                options={arrayRange(40, 100, 1)}
              ></Select>
            </Col>
          </Row>
        </Form>
      </Container>
      <div className="p-3 pt-0 d-flex flex-column align-items-end">
        <Button color="pink" size="medium" type="submit" className="mb-3 pink-button" onClick={handleSubmit}>確認</Button>
        {
          profile && 
          <Button color="error" size="medium" type="submit" onClick={deleteUser}>刪除帳戶</Button>
        }
      </div>
    </>
  );
}

export default Register;
