const { Router } = require('express');
import { retrieveArticles } from '../controllers/news.controller';

const router = Router();

router.get('/', retrieveArticles);

export default router;
