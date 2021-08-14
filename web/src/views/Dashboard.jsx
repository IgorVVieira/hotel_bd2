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
  Modal,
  Form,
} from 'react-bootstrap';
import NotificationAlert from 'react-notification-alert';

import { Link } from 'react-router-dom';

import api from '../services/api';
import { getUser } from '../services/auth';

const Dashboard = () => {
  const [quartos, setQuartos] = useState([]);
  const [data_reserva, setDataReserva] = useState('');
  const [quarto_id, setQuartoId] = useState('');
  const user = JSON.parse(getUser());

  const [showModal, setShowModal] = useState(false);

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

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      const response = api.post(`/reserva/${quarto_id}/${user._id}`, {data_reserva});
      setShowModal(false);
      notificationAlertRef.current.notificationAlert({
        place: 'tc',
        message: (
          <div>
            <div>
              Reserva feita com sucesso.
            </div>
          </div>
        ),
        type: "success",
        icon: "now-ui-icons ui-1_bell-53",
        autoDismiss: 7
      });
    } catch (error) {
      notificationAlertRef.current.notificationAlert({
        place: 'tc',
        message: (
          <div>
            <div>
              Erro ao efetuar reserva.
            </div>
          </div>
        ),
        type: "darnger",
        icon: "now-ui-icons ui-1_bell-53",
        autoDismiss: 7
      });
    }
    console.log(quarto_id);
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
                      <th className="border-0 text-center">Código</th>
                      <th className="border-0 text-center">Andar</th>
                      <th className="border-0">Valor</th>
                      <th className="border-0">Descrição</th>
                      <th className="border-0">Reservas</th>
                      <th className="border-0 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {quartos.map((quarto) => {
                      return (
                        <tr key={quarto._id}>
                          <td className="text-center">{quarto.codigo}</td>
                          <td>{quarto.andar}</td>
                          <td>R$ {quarto.valor},00</td>
                          <td>{quarto.descricao}</td>
                          <td className="text-center">{quarto.reservas ? quarto.reservas.length : 0}</td>
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
                            <OverlayTrigger
                              overlay={
                                <Tooltip id="tooltip-506045833">Reservar</Tooltip>
                              }
                            >
                              <Button className="btn-simple btn-link p-1"
                                type="button"
                                variant="warning"
                                onClick={() => {
                                  setShowModal(true);
                                  setQuartoId(quarto._id)
                                }}
                              >
                                <i className="nc-icon nc-lock-circle-open"></i>
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

        <Modal show={showModal} onHide={() => setShowModal(false)}>
          <Modal.Header className="justify-content-center">
            <div className="modal-profile">
              <i className="nc-icon nc-lock-circle-open"></i>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col md="6">
                  <Form.Group>
                    <label>Data da reserva</label>
                    <Form.Control type="date" required value={data_reserva}
                      onChange={(e) => setDataReserva(e.target.value)}
                    ></Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <div className="modal-footer">
                <Button className="btn-fill" type="button" variant="warning"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </Button>
                <Button className="btn-fill pull-right" type="submit" variant="success">
                  Cadastrar
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
}

export default Dashboard;
