import React, { useState } from 'react';

import {
    Button,
    Card,
    Form,
    Container,
    Row,
    Col,
} from 'react-bootstrap';

import { useHistory } from 'react-router-dom';

import NotificationAlert from 'react-notification-alert';

import api from '../../services/api';

const FormQuarto = () => {
    const [codigo, setCodigo] = useState('');
    const [andar, setAndar] = useState('');
    const [descricao, setDescricao] = useState('');

    const history = useHistory();

    const notificationAlertRef = React.useRef(null);

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            await api.post('/quarto', { codigo, andar, descricao });

            notificationAlertRef.current.notificationAlert({
                place: 'tc',
                message: (
                    <div>
                        <div>
                            Quarto cadastrado com sucesso.
                        </div>
                    </div>
                ),
                type: "success",
                icon: "now-ui-icons ui-1_bell-53",
                autoDismiss: 7
            });

            history.push('/admin/dashboard');
        } catch (error) {
            console.log(error);
            notificationAlertRef.current.notificationAlert({
                place: 'tc',
                message: (
                    <div>
                        <div>
                            Erro ao cadastrar quarto. Tente novamente.
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
        <>
            <NotificationAlert ref={notificationAlertRef} />
            <Container fluid>
                <Row>
                    <Col md="8">
                        <Card>
                            <Card.Header>
                                <Card.Title as="h4" className="text-center">Novo quarto</Card.Title>
                            </Card.Header>
                            <Card.Body>
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col md="4">
                                            <Form.Group>
                                                <label>Código</label>
                                                <Form.Control
                                                    placeholder="Código"
                                                    type="number"
                                                    required
                                                    min="0"
                                                    value={codigo}
                                                    onChange={(e) => setCodigo(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="4">
                                            <Form.Group>
                                                <label>Andar</label>
                                                <Form.Control
                                                    placeholder="Andar"
                                                    type="number"
                                                    required
                                                    value={andar}
                                                    min="0"
                                                    max="10"
                                                    onChange={(e) => setAndar(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md="6">
                                            <Form.Group>
                                                <label>
                                                    Descrição
                                                </label>
                                                <Form.Control
                                                    placeholder="Descrição"
                                                    as="textarea"
                                                    required
                                                    value={descricao}
                                                    onChange={(e) => setDescricao(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Button
                                        className="btn-fill pull-right"
                                        type="submit"
                                        variant="success"
                                    >
                                        Cadastrar
                                    </Button>
                                    <div className="clearfix"></div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default FormQuarto;
