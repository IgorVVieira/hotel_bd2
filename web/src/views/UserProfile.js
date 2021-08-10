import React, { useState, useEffect } from 'react';

import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import NotificationAlert from 'react-notification-alert';

import { getUser } from '../services/auth';
import api from '../services/api';
import { setUser } from '../services/auth';

const User = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [senha, setSenha] = useState('');

  const notificationAlertRef = React.useRef(null);
  const user = JSON.parse(getUser());

  useEffect(async () => {
    try {
      setNome(user.nome);
      setEmail(user.email);
      setCpf(user.cpf);
      setIdade(user.idade);
      setSenha(user.senha);
    } catch (error) {
      console.log('Deu erro');
    }
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = await api.put('/user', { id: user._id, nome, email, cpf, idade, senha });
      console.log(response.data.value)
      setNome(response.data.value.nome);
      setEmail(response.data.value.email);
      setCpf(response.data.value.cpf);
      setIdade(response.data.value.idade);
      setSenha(response.data.value.senha);
      setUser(response.data.value);

      notificationAlertRef.current.notificationAlert({
        place: 'tc',
        message: (
          <div>
            <div>
              Perfil alterado com sucesso.
            </div>
          </div>
        ),
        type: "success",
        icon: "now-ui-icons ui-1_bell-53",
        autoDismiss: 7
      });
    } catch (error) {
      console.log(error);
      notificationAlertRef.current.notificationAlert({
        place: 'tc',
        message: (
          <div>
            <div>
              Erro ao atualizar o perfil. Tente novamente.
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
                <Card.Title as="h4" className="text-center">Editar perfil</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col md="4">
                      <Form.Group>
                        <label>Nome</label>
                        <Form.Control
                          placeholder="Nome"
                          type="text"
                          required
                          value={nome || ''}
                          onChange={(e) => setNome(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group>
                        <label>
                          Email
                        </label>
                        <Form.Control
                          placeholder="Email"
                          type="email"
                          required
                          value={email || ''}
                          onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="4">
                      <Form.Group>
                        <label>
                          CPF
                        </label>
                        <Form.Control
                          placeholder="CPF"
                          type="text"
                          required
                          value={cpf || ''}
                          onChange={(e) => setCpf(e.taget.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <Form.Group>
                        <label>Idade</label>
                        <Form.Control
                          type="number"
                          required
                          min="1"
                          max="110"
                          value={idade || ''}
                          onChange={(e) => setIdade(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                    <Col md="8">
                      <Form.Group>
                        <label>Senha</label>
                        <Form.Control
                          type="password"
                          required
                          min="8"
                          max="8"
                          value={senha || ''}
                          onChange={(e) => setSenha(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="success"
                  >
                    Atualizar
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

export default User;
