import React from 'react';

import Card from 'react-bootstrap/Card';

import './styles.css';

const CardQuarto = ({ quarto }) => {
    return (
        <div className="Center-page">
            <Card
                bg="secondary"
                text="light"
                style={{ width: '20rem' }}
                className="mb-2 mt-3"
            >
                <Card.Body>
                    <Card.Title>Código {quarto.codigo} </Card.Title>
                    <Card.Text>
                        <ul className="list-unstyled">
                            <li> <strong>Andar:</strong> {quarto.andar}</li>
                            <li><strong>Descrição:</strong> {quarto.descricao}</li>
                            <li>
                                <button>Reservar</button>
                            </li>
                        </ul>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default CardQuarto;