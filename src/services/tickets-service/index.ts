import { Ticket, TicketStatus } from '@prisma/client';
import { request } from '@/utils/request';
import httpStatus from 'http-status';
import { invalidDataError, notFoundError } from '@/errors';
import addressRepository, { CreateAddressParams } from '@/repositories/address-repository';
import enrollmentRepository, { CreateEnrollmentParams } from '@/repositories/enrollment-repository';
import { exclude } from '@/utils/prisma-utils';
import { isValid } from '@brazilian-utils/brazilian-utils/dist/utilities/inscricao-estadual';
import { isValidEmail } from '@brazilian-utils/brazilian-utils';
import { error } from 'console';
import ticketRepository from '@/repositories/ticket-repository';


async function getTickets(userId: number) {
    const register = await enrollmentRepository.findWithAddressByUserId(userId);
    if (!register) throw notFoundError();

    const tickets = await ticketRepository.findTicketsByUserId(register.id);
    if (!tickets) throw notFoundError;

    return tickets;

}

async function getTicketsType() {
    const tickets = await ticketRepository.findTickets();
    if (!tickets) throw notFoundError;
    return tickets

}



async function postTicket(userId: number, ticketTypeId: number) {
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


const ticketsService = {
    getTickets,
    getTicketsType,
    postTicket
};

export default ticketsService;
