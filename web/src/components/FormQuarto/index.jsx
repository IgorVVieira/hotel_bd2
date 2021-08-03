import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./Login.css";

const FormQuarto = () => {
    const [codigo, setCodigo] = useState("");
    const [andar, setAndar] = useState("");
    const [suite, setSuite] = useState('');
    const [ar_condicionado, setAr] = useState('');
    const [password, setPassword] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div className="FormQuarto">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="codigo">
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        autoFocus
                        type="codigo"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </Form.Group>
                <Button block size="lg" type="submit">
                    Cadastrar
                </Button>
            </Form>
        </div>
    );
}

export default FormQuarto;