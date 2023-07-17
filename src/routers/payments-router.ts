import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getPayments, postPaymentProcess } from '@/controllers';

import { createEnrollmentSchema } from '@/schemas';

const paymentsRouter = Router();

paymentsRouter
    .all('/*', authenticateToken)
    .get('/', getPayments)
    .post('/process', postPaymentProcess)

export { paymentsRouter };