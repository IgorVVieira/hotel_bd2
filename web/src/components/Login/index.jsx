import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useHistory, NavLink } from 'react-router-dom';
import './Login.css';

import api from '../../services/api';
import { login } from '../../services/auth';


const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            email,
            senha,
        }

        try {
            const response = await api.post('/login', data);
            toast.success('Login realizado com sucecesso.', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
            });
            login(response.data.token);
            history.push('/quarto');
        } catch (error) {
            toast.error('Usuário ou senha incorretos.', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
            });
        }
    }

    return (
        <div className="Login">
            <NavLink to='/novo-usuario'>Cadastrar</NavLink>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        autoFocus
                        type="email"
                        value={email}
                        required
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="password">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control
                        type="password"
                        value={senha}
                        required
                        onChange={(e) => setSenha(e.target.value)}
                    />
                </Form.Group>
                <Button className="mt-3" block size="lg" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default Login;