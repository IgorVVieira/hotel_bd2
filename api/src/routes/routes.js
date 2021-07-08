import { Router } from "express";
const route = Router();

route.get('/', (req, res) => {
    return  res.status(200).send({
        title: 'API teste',
        version: '1.0.0'
    });
});

export default route;