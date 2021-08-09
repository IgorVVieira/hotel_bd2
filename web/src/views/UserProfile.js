import { React, useState, useEffect } from 'react';

import {
  Badge,
  Button,
  Card,
  Form,
  Navbar,
  Nav,
  Container,
  Row,
  Col,
} from 'react-bootstrap';

import { getUser, getToken } from '../services/auth';

const User = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [idade, setIdade] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(async () => {
    try {
      const user = JSON.parse(getUser());
      setNome(user.nome);
      setEmail(user.email);
      setCpf(user.cpf);
      setIdade(user.idade);
      setSenha(user.senha);
    } catch (error) {
      console.log('Deu erro');
    }
  }, []);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4" className="text-center">Editar perfil</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
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
