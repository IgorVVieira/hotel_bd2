import React from 'react';
import Button from 'react-bootstrap/Button';

import { useHistory } from 'react-router-dom';

import { logout } from '../../services/auth';

const FormQuarto = () => {
    const history = useHistory();
    async function logOut() {
        await logout();
        history.push('/');
    }
    return (
        <div>
            Teste
            <Button onClick={logOut} className="mt-3" block size="lg" type="button">
                Sair
            </Button>
        </div>
    );
}

export default FormQuarto;