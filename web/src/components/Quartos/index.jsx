import React, { useEffect, useState } from 'react';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';

import QuartoCard from '../CardQuarto';

import api from '../../services/api';

const Quartos = () => {
    const [quartos, setQuartos] = useState('');

    useEffect(() => {
        async function carregaQuartos() {
            const response = await api.get('/quartos');
            const novosQuartos = [...quartos, response.data.map(quarto => quarto.data)];
            setQuartos(novosQuartos);
        }
        console.log(quartos);
        carregaQuartos();
    });
    return (
        <Container>
            <Row>
                <Col>
                    {JSON.pase(quartos).map((quarto) => {
                        return <QuartoCard key={quarto._id} quarto={quarto} />
                    })}
                </Col>
            </Row>
            <Button variant="primary" onClick="" className="m-3 Page-center" style={{ margin: '0 auto' }} block size="lg" type="button">
                Novo quarto
            </Button>
        </Container>
    );
}

export default Quartos;