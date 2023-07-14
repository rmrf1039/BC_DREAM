import { useState, useEffect } from "react";

import Input from "../components/forms/Input"
import Select from "../components/forms/Select"

const Register = (props) => {
    useEffect(() => {
        props.setIsMenuVisible(0);
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [sex, setSex] = useState("Male");

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

    const handleSubmit = (event) => {
        alert("submit");
        event.preventDefault();
    }

    return (
        <div className="container p-3">
            <div className="mb-5">
                <h1 className="text-center">Personal Information</h1>
                <h3 className="text-center">Please fill the information below</h3>
            </div>

            <form onSubmit={handleSubmit}>
                <Input title="Name" value={name} setValue={setName}></Input>
                <Input title="Email" value={email} setValue={setEmail}></Input>
                <Input title="Birthday" placeholder="yyyy/MM/dd" value={birthday} setValue={setBirthday}></Input>
                <Select
                    name="sexSelect"
                    title="Sex"
                    value={sex}
                    setValue={setSex}
                    options={[{
                        label: 'Male',
                        value: 'Male',
                    }, {
                        label: 'Female',
                        value: 'Female',
                    }]}
                ></Select>
                <div className="row">
                    <div className="col-6">
                        <Select
                            name="heightSelect"
                            title="Height (cm)"
                            value={height}
                            setValue={setHeight}
                            options={arrayRange(150, 190, 1)}
                        ></Select>
                    </div>
                    <div className="col-6">
                        <Select
                            name="weightSelect"
                            title="Weight (kg)"
                            value={weight}
                            setValue={setWeight}
                            options={arrayRange(40, 100, 1)}
                        ></Select>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100 mt-3">Confirm</button>
            </form>
        </div>
    );
}

export default Register;
