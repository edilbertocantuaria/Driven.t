import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import ticketsService from '@/services/tickets-service'

export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;

    try {
        const tickets = await ticketsService.getTickets(userId);
        return res.status(httpStatus.OK).send(tickets);

    } catch (error) {

        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export async function getTicketsType(req: AuthenticatedRequest, res: Response) {
    try {
        const tickets = await ticketsService.getTicketsType();
        return res.status(httpStatus.OK).send(tickets);

    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;
    const { ticketTypeId } = req.body;

    if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);
    //if (!userId) return res.sendStatus(httpStatus.NOT_FOUND);

    try {
        const newTicket = await ticketsService.postTicket(userId, ticketTypeId);
        //console.log(newTicket);
        return res.status(httpStatus.CREATED).send(newTicket);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}
