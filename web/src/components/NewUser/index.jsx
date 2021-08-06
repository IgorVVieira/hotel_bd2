import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { toast } from 'react-toastify';
import { useHistory, NavLink } from 'react-router-dom';

import api from '../../services/api';

const Login = () => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();

    async function handleSubmit(event) {
        event.preventDefault();
        const data = {
            nome,
            idade,
            cpf,
            email,
            senha,
        }

        try {
            await api.post('/user', data);
            toast.success('Usuário cadastrado com sucecesso.', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
            });
            history.push('/');
        } catch (error) {
            toast.error('Falha ao cadastrar o usuário. Tente novamente.', {
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
        <div className="Formulario">
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={nome}
                        required
                        onChange={(e) => setNome(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="idade">
                    <Form.Label>Idade</Form.Label>
                    <Form.Control
                        autoFocus
                        type="number"
                        value={idade}
                        required
                        onChange={(e) => setIdade(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="cpf">
                    <Form.Label>CPF</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={cpf}
                        required
                        onChange={(e) => setCpf(e.target.value)}
                    />
                </Form.Group>
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
                    Cadastrar
                </Button>
            </Form>
        </div>
    );
}

export default Login;