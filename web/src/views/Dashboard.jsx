import React, { useEffect, useState } from 'react';
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';

import api from '../services/api';

const Dashboard = () => {
  const [quartos, setQuartos] = useState([]);

  useEffect(async () => {
    try {
      const response = await api.get('/quartos');
      setQuartos(response.data);
    } catch (error) {
      console.log('Deu erro');
    }
  }, []);

  useEffect(() => {
    let newState = quartos.map((e) => e); // map your state here
    setQuartos(newState); // and then update the state
    console.log(newState);
  }, [setQuartos]);

  return (
    <>
      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Lista de quartos</Card.Title>
                <p className="card-category">
                  Todos quartos disponíveis no hotel
                </p>
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover">
                  <thead>
                    <tr>
                      <th className="border-0">Código</th>
                      <th className="border-0">Andar</th>
                      <th className="border-0">Descrição</th>
                      <th className="border-0">Reservas</th>
                      <th className="border-0">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quartos.map((quarto) => {
                      return (
                        <tr key={quarto._id}>
                          <td>{quarto.codigo}</td>
                          <td>{quarto.andar}</td>
                          <td>{quarto.descricao}</td>
                          <td>5</td>
                          <td className="td-actions text-left">
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-488980961">
                                  Editar quarto
                                </Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="info"
                              >
                                <i className="fas fa-edit"></i>
                              </Button>
                            </OverlayTrigger>
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-506045838">Remover</Tooltip>
                              }
                            >
                              <Button
                                className="btn-simple btn-link p-1"
                                type="button"
                                variant="danger"
                              >
                                <i className="fas fa-times"></i>
                              </Button>
                            </OverlayTrigger>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Dashboard;
