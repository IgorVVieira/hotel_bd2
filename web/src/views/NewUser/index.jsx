import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import NotificationAlert from 'react-notification-alert';
import { useHistory, NavLink } from 'react-router-dom';

import api from '../../services/api';

import './styles.css';

const NewUser = () => {
    const [nome, setNome] = useState('');
    const [idade, setIdade] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [adm, setAdm] = useState('');

    const history = useHistory();
    const notificationAlertRef = React.useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await api.post('/user', { nome, idade, cpf, email, senha, adm });
            notificationAlertRef.current.notificationAlert({
                place: 'tc',
                message: (
                    <div>
                        <div>
                            Usuário cadastrado com sucesso.
                        </div>
                    </div>
                ),
                type: "danger",
                icon: "now-ui-icons ui-1_bell-53",
                autoDismiss: 7
            });
            history.push('/');
        } catch (error) {
            notificationAlertRef.current.notificationAlert({
                place: 'tc',
                message: (
                    <div>
                        <div>
                            Erro ao cadastrar usuário. Tente novamente.
                        </div>
                    </div>
                ),
                type: "danger",
                icon: "now-ui-icons ui-1_bell-53",
                autoDismiss: 7
            });
        }
    }

    return (
        <div className="FormularioNovoUsuario">
            <NotificationAlert ref={notificationAlertRef} />
            <NavLink to='/'>Login</NavLink>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="nome">
                    <h1 className="text-center">Novo usuário</h1>
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
                        min="0"
                        max="101"
                        onChange={(e) => setIdade(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="cpf">
                    <Form.Label>CPF - sem pontos</Form.Label>
                    <Form.Control
                        autoFocus
                        type="string"
                        value={cpf}
                        required
                        min="11"
                        max="11"
                        onChange={(e) => setCpf(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
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
                <Form.Label htmlFor="admin">Administrador</Form.Label>
                <div className="form-group">
                    <select className="form-control" name={adm} onChange={(e) => setAdmin(e.target.value)}>
                        <option value="1">Sim</option>
                        <option value="0">Não</option>
                    </select>
                </div>
                <Button variant="success" className="mt-3" block size="lg" type="submit">
                    Cadastrar
                </Button>
            </Form>
        </div>
    );
}

export default NewUser;