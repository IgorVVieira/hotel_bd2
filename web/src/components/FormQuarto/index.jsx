import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { logout } from '../../services/auth';
import api from '../../services/api';

const FormQuarto = () => {
    const history = useHistory();

    const [codigo, setCodigo] = useState('');
    const [andar, setAndar] = useState('');
    const [descricao, setDescricao] = useState('');

    function logOut() {
        logout();
        history.push('/');
    }

    async function handleSubmit() {
        try {
            await api.post('/quarto', {codigo, andar, descricao});
            toast.success('Quarto cadastrado com sucesso.', {
                position: "top-center",
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: 0,
            });
            history.push('/quartos');
        } catch (error) {
            toast.success('Erro ao cadastrar quarto.', {
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
                    <Form.Label>Código</Form.Label>
                    <Form.Control
                        autoFocus
                        type="text"
                        value={codigo}
                        required
                        onChange={(e) => setCodigo(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="idade">
                    <Form.Label>Andar</Form.Label>
                    <Form.Control
                        autoFocus
                        type="number"
                        value={andar}
                        required
                        onChange={(e) => setAndar(e.target.value)}
                    />
                </Form.Group>
                <Form.Group size="lg" controlId="cpf">
                    <Form.Label>Descrição</Form.Label>
                    <Form.Control
                        autoFocus
                        type="textarea"
                        value={descricao}
                        required
                        onChange={(e) => setDescricao(e.target.value)}
                    />
                </Form.Group>
                <Button variant="success" className="mt-3" block size="lg" type="submit">
                    Cadastrar
                </Button>
            </Form>
            <Button variant="danger" onClick={logOut} className="mt-3" block size="lg" type="button">
                Sair
            </Button>
        </div>
    );
}

export default FormQuarto;