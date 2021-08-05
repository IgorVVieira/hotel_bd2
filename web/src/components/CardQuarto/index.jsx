import React from 'react';

import Card from 'react-bootstrap/Card';

const CardQuarto = ({ quarto }) => {
    return (
        <Card
            bg="primary"
            text="Teste"
            style={{ width: '18rem' }}
            className="mb-2"
        >
            <Card.Body>
                <Card.Title>Código {quarto.codigo} </Card.Title>
                <Card.Text>
                    Andar: {quarto.andar} 
                    {"\n"}Descrição: {quarto.descricao}.
                </Card.Text>
            </Card.Body>
        </Card>
    );
}

export default CardQuarto;