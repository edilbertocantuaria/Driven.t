import { Ticket, TicketStatus } from '@prisma/client';
import { request } from '@/utils/request';
import httpStatus from 'http-status';
import { invalidDataError, notFoundError, unauthorizedError } from '@/errors';
import addressRepository, { CreateAddressParams } from '@/repositories/address-repository';
import enrollmentRepository, { CreateEnrollmentParams } from '@/repositories/enrollment-repository';
import { exclude } from '@/utils/prisma-utils';
import { isValid } from '@brazilian-utils/brazilian-utils/dist/utilities/inscricao-estadual';
import { isValidEmail } from '@brazilian-utils/brazilian-utils';
import { error } from 'console';
import ticketRepository from '@/repositories/ticket-repository';
import paymentRepository from '@/repositories/payment-repository'


async function getPayments(userId: number, ticketId: number) {
    console.log(userId, ticketId)
    const ticket = await ticketRepository.findWithTicketTypeId(ticketId);
    if (!ticket) throw notFoundError();

    const register = await enrollmentRepository.findById(ticket.enrollmentId);
    if (!register) throw notFoundError();

    if (register.userId !== userId) throw unauthorizedError();




    const payment = await paymentRepository.findPaymentByTicketId(ticketId);
    if (!payment) throw notFoundError();
    return payment;

}


async function postPaymentProcess(userId: number, ticketTypeId: number) {
    const register = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!register) throw notFoundError;
    //console.log(register);

    const infoNewTicket = {
        status: TicketStatus.RESERVED,
        ticketTypeId,
        enrollmentId: register.id,
    }

    //console.log(infoNewTicket);

    await ticketRepository.createTicket(infoNewTicket);
    const ticket = await ticketRepository.findWithTicketTypeId(ticketTypeId);


    return ticket
}


const paymentsService = {
    getPayments,
    postPaymentProcess
};

export default paymentsService;
