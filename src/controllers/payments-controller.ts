import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { AuthenticatedRequest } from '@/middlewares';
import paymentsService from '@/services/payments-service'

export async function getPayments(req: AuthenticatedRequest, res: Response) {
    const ticketId =Number(req.query.ticketId)
    const { userId } = req;

    if (!ticketId) return res.sendStatus(httpStatus.BAD_REQUEST)

    try {
        const payment = await paymentsService.getPayments(userId, ticketId);
        return res.status(httpStatus.OK).send(payment);

    } catch (error) {

        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}

export async function postPaymentProcess(req: AuthenticatedRequest, res: Response) {
    const { userId } = req;


    //if (!ticketTypeId) return res.sendStatus(httpStatus.BAD_REQUEST);
    //if (!userId) return res.sendStatus(httpStatus.NOT_FOUND);

    try {
//        const newTicket = await paymentsService.postTicket(userId, ticketTypeId);
        //console.log(newTicket);
  //      return res.status(httpStatus.CREATED).send(newTicket);
    } catch (error) {
        return res.sendStatus(httpStatus.NOT_FOUND);
    }
}
