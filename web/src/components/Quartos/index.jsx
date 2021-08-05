import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import QuartoCard from '../CardQuarto';

import api from '../../services/api';

// import './Quartos.css';

class Quartos extends React.Component {
    state = {
        quartos: [],
    }
    async componentDidMount() {
        const response = await api.get('/quartos');

        this.setState({
            quartos: response.data
        });
    }

    render() {
        const { quartos } = this.state;
        return (
            <Container>
                <Row>
                    <Col>
                        {quartos.map((quarto) => {
                            return <QuartoCard key={quarto._id} quarto={quarto} />
                        })}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Quartos;