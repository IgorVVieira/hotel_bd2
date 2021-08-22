import db from '../database/connection';

import jwt from 'jsonwebtoken';
const Users = db.collection('users');

class SessionController {
    async login(request, response) {
        try {
            const { email, senha } = request.body;
            const cursor = await db.query(`
                FOR u IN users
                FILTER u.email == '${email}'
                AND u.senha == '${senha}'
                RETURN u`);

            const user = await cursor.all();

            if (user[0]) {
                const token = jwt.sign({
                    user_id: user[0]._id,
                },
                    process.env.SECRET,
                    { expiresIn: 3600, }
                );

                return response.json({ auth: true, token, user: user[0] });
            }
            return response.status(401).json({ error: 'Usuário não encontrado.' })
        } catch (error) {
            console.log(error);
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