import { useState, useEffect } from "react";

import Input from "../components/forms/Input"

const Register = (props) => {
    useEffect(() => {
        props.setIsMenuVisible(0);
    });

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [sex, setSex] = useState("Male");

    return (
        <div className="container p-3">
            <div className="mb-5">
                <h1 className="text-center">Weclome to DREAM</h1>
                <h3 className="text-center">Please fill the information below</h3>
            </div>

            <form>
                <Input title="Name" value={name} setValue={setName}></Input>
                <Input title="Email" value={email} setValue={setEmail}></Input>
            </form>
        </div>
    );
}

export default Register;
