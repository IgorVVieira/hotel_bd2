import app from './app';
import 'dotenv/config';

const port = 3333 || process.env.PORT;

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});