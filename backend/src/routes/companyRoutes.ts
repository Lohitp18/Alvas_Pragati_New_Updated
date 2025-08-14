import express from 'express';
import { getCompanies, addCompany } from '../controllers/companyController';

const router = express.Router();

router.get('/', getCompanies);
router.post('/', addCompany);

export default router;
