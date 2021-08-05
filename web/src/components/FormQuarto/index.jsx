import React from 'react';
import Button from 'react-bootstrap/Button';

import { useHistory } from 'react-router-dom';

import CardQuarto from '../CardQuarto';

import { logout } from '../../services/auth';

const FormQuarto = () => {
    const history = useHistory();

    function logOut() {
        logout();
        history.push('/');
    }
    return (
        <div>
            Teste
            <CardQuarto></CardQuarto>
            <Button variant="danger" onClick={logOut} className="mt-3" block size="lg" type="button">
                Sair
            </Button>
        </div>
    );
}

export default FormQuarto;