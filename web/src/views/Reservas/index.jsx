import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Table,
    Container,
    Row,
    Col,
    OverlayTrigger,
    Tooltip
} from 'react-bootstrap';
import NotificationAlert from 'react-notification-alert';

import api from '../../services/api';
import { getUser } from '../../services/auth';

const Reservas = () => {
    const [reservas, setReservas] = useState([]);
    const user = JSON.parse(getUser());

    const notificationAlertRef = React.useRef(null);

    useEffect(async () => {
        try {
            const response = await api.get(`/reservas/${user._key}`);
            setReservas(response.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    async function finalizarReserva(event, reserva_id) {
        event.preventDefault();
        try {
            const response = await api.put('/reserva/finalizar', { reserva_id });

            notificationAlertRef.current.notificationAlert({
                place: 'tc',
                message: (
                    <div>
                        <div>
                            Reserva finalizada com sucesso.
                        </div>
                    </div>
                ),
                type: "darnger",
                icon: "now-ui-icons ui-1_bell-53",
                autoDismiss: 7
            });
        } catch (error) {
            notificationAlertRef.current.notificationAlert({
                place: 'tc',
                message: (
                    <div>
                        <div>
                            Erro ao finalizar reserva.
                        </div>
                    </div>
                ),
                type: "darnger",
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
                                <Card.Title as="h4">Minhas reservas</Card.Title>
                            </Card.Header>
                            <Card.Body className="table-full-width table-responsive px-0">
                                <Table className="table-hover">
                                    <thead>
                                        <tr>
                                            <th className="border-0 text-center">Código do quarto</th>
                                            <th className="border-0">Data de reserva</th>
                                            <th className="border-0 text-center">Status</th>
                                            <th className="border-0 text-center">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {reservas.map((reserva) => {
                                            return (
                                                <tr key={reserva._key}>
                                                    <td>{reserva._to}</td>
                                                    <td>{reserva.data_reserva}</td>
                                                    {/* .split('-').reverse().join("/") */}
                                                    <td>{reserva.status ? 'Em uso' : 'Finalizado'}</td>
                                                    <td>
                                                        <OverlayTrigger
                                                            overlay={
                                                                <Tooltip id="tooltip-506045833">Finalizar reserva</Tooltip>
                                                            }
                                                        >
                                                            <Button className="btn-simple btn-link p-1"
                                                                type="button"
                                                                variant="warning"
                                                                onClick={(e) => {
                                                                    finalizarReserva(e, reserva._key);
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
            </Container>
        </>
    );
}

export default Reservas;
