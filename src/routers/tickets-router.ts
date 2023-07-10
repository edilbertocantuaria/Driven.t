import { Router } from 'express';
import { authenticateToken, validateBody } from '@/middlewares';
import { getTicketsType, getTickets, postTicket } from '@/controllers';

import { createEnrollmentSchema } from '@/schemas';

const ticketsRouter = Router();

ticketsRouter
    .all('/*', authenticateToken)
    .get('/types', getTicketsType)
    .get('/', getTickets)
    .post('/', postTicket)

export { ticketsRouter };