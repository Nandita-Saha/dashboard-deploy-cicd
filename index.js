import express from 'express';
import { Router } from 'express';
const app = express();

const router = Router();
router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.get('/health', (req, res)=> {
   res.status(200).json({ status: 'everything is ok' });
});

const PORT = process.env.PORT ?? 8000;

app.use('/', router);

app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
});



