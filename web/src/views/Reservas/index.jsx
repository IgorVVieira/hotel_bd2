import React, { useEffect, useState } from 'react';
import {
    Button,
    Card,
    Table,
    Container,
    Row,
    Col,
} from 'react-bootstrap';

import api from '../../services/api';
import { getUser } from '../../services/auth';

const Reservas = () => {
    const [reservas, setReservas] = useState([]);
    const user = JSON.parse(getUser());

    useEffect(async () => {
        try {
            const response = await api.get(`/reservas/${user._id}`);
            let reservasrray = [];

            response.data.map((quarto) => {
                quarto.reservas.map((reserva) => {
                    reservasrray.push(reserva);
                });
            });
            setReservas(reservasrray);
        } catch (error) {
            console.log(error);
        }
    }, []);

    return (
        <>
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
                                                <tr>
                                                    <td>{reserva.quarto_id}</td>
                                                    <td>{reserva.data_reserva.split('-').reverse().join("/")}</td>
                                                    <td>{reserva.status ? 'Em uso' : 'Finalizado'}</td>
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
