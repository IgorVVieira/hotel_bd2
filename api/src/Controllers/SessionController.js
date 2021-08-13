import { db } from '../database/connection';

import jwt from 'jsonwebtoken';

class SessionController {
    async login(request, response) {
        try {
            const { email, senha } = request.body;
            const user = await db.collection('users').findOne({
                email: email,
                senha: senha,
            });

            if (user) {
                const token = jwt.sign({
                    user_id: user._id,
                },
                    process.env.SECRET,
                    { expiresIn: 3600, }
                );

                return response.json({ auth: true, token, user });
            }
            return response.status(401).json({ error: 'Usuário não encontrado.' })
        } catch (error) {
            return response.status(500).json({ 'Erro': error });
        }
    }

    verifyJwt(request, response, next) {
        const { token } = request.headers;
        jwt.verify(token, process.env.SECRET, (err, decoded) => {
            if (err) {
                return response.status(400).end();
            }
            request.user_id = decoded.user_id;
            next();
        });
    }
}

export default new SessionController;