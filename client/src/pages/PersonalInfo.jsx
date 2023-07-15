import { useState, useEffect } from "react";

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Input from "../components/forms/Input"
import Select from "../components/forms/Select"

const Register = (props) => {
    useEffect(() => {
        props.setIsMenuVisible(0);
    });

    // Initial values
    const [values, setValues] = useState({
        name: "",
        email: "",
        birthday: "",
        height: "",
        weight: "",
        sex: "Male",
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

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValues((prevFormData) => ({ ...prevFormData, [name]: value }));
    }

    const handleSubmit = (event) => {
        alert("submit");
        console.log(values);
        event.preventDefault();
    }

    return (
        <Container className="p-3">
            <div className="mb-5">
                <h1 className="text-center">Personal Information</h1>
                <h3 className="text-center">Please fill the information below</h3>
            </div>

            <Form onSubmit={handleSubmit}>
                <Input name="name" title="Name" value={values.name} setValue={handleChange}></Input>
                <Input name="email" title="Email" value={values.email} setValue={handleChange}></Input>
                <Input name="birthday" title="Birthday" placeholder="yyyy/MM/dd" value={values.birthday} setValue={handleChange}></Input>
                <Select
                    name="sex"
                    title="Sex"
                    value={values.sex}
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
                <Button variant="primary" type="submit" className="w-100 mt-3">Confirm</Button>
            </Form>
        </Container>
    );
}

export default Register;
