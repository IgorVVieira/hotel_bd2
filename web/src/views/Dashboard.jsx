import React, { useEffect, useState } from 'react';
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import NotificationAlert from 'react-notification-alert';

import { Link } from 'react-router-dom';

import api from '../services/api';

const Dashboard = () => {
  const [quartos, setQuartos] = useState([]);

  const notificationAlertRef = React.useRef(null);

  useEffect(async () => {
    try {
      const response = await api.get('/quartos');
      setQuartos(response.data);
    } catch (error) {
      console.log('Deu erro');
    }
  }, []);

  async function deleteQuarto(event, id) {
    event.preventDefault();
    try {
      api.delete(`/quarto/${id}`);

      const novosQuartos = Array.from(quartos);
      novosQuartos.splice(id, 1);
      setQuartos(novosQuartos);

      notificationAlertRef.current.notificationAlert({
        place: 'tc',
        message: (
          <div>
            <div>
              Quarto deletado com sucesso.
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
              Erro ao deletar quarto.
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
          <Col md="12">
            <Card className="card-plain table-plain-bg">
              <Card.Header>
                <Card.Title as="h4">Lista de quartos</Card.Title>
                <p className="card-category">
                  Todos quartos disponíveis no hotel
                </p>
                <Card.Title as="h5">Cadastrar novos quartos: <Link to="admin/novo-quarto"> <i className="nc-icon nc-simple-add" lg="2"></i> </Link></Card.Title>
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
                                onClick={(e) => { deleteQuarto(e, quarto._id) }}
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
