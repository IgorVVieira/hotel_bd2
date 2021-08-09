import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import NotificationAlert from 'react-notification-alert';
import { useHistory, NavLink } from 'react-router-dom';
import './styles.css';

import api from '../../services/api';
import { login, isAuthenticated } from '../../services/auth';

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const history = useHistory();
    const notificationAlertRef = React.useRef(null);

    useEffect(() => {
        if (isAuthenticated()) {
            history.push('/admin/dashboard');
        }
    });

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await api.post('/login', { email, senha });
            notificationAlertRef.current.notificationAlert({
                place: 'tc',
                message: (
                    <div>
                        <div>
                            Login realizado com sucesso.
                        </div>
                    </div>
                ),
                type: "danger",
                icon: "now-ui-icons ui-1_bell-53",
                autoDismiss: 7
            });
            login(response.data.token, JSON.stringify(response.data.user));
            history.push('/admin/dashboard');
        } catch (error) {
            notificationAlertRef.current.notificationAlert({
                place: 'tc',
                message: (
                    <div>
                        <div>
                            Login ou senha inválidos. Tente novamente.
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
        <div className="Formulario">
            <NotificationAlert ref={notificationAlertRef} />
            <NavLink to='/novo-usuario'>Cadastrar</NavLink>
            <Form onSubmit={handleSubmit}>
                <Form.Group size="lg" controlId="email">
                    <h1 className="text-center">Login</h1>
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
                <Button variant="success" className="mt-3" block size="lg" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default Login;