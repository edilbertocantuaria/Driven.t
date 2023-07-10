import { Ticket, TicketType, TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function findTickets(): Promise<TicketType[]> {
    return prisma.ticketType.findMany();

}

async function findTicketsByUserId(registerId: number): Promise<Ticket & { TicketType: TicketType }> {
    const enrollmentId = registerId;
    return prisma.ticket.findFirst({
        where: { enrollmentId },
        include: {
            TicketType: true,
        }
    });
}

type newTicketParams = Omit<Ticket, 'id' | 'createdAt' | 'updatedAt'>;

async function createTicket(infoNewTicket: newTicketParams) {
    return prisma.ticket.create({
        data: {
            ...infoNewTicket
        }
    })

}

async function findWithTicketTypeId(ticketTypeId: number): Promise<Ticket & { TicketType: TicketType }> {
    const result = prisma.ticket.findFirst({
        where: { ticketTypeId },
        include: {
            TicketType: true,
        }
    });
    return result;
}

const ticketRepository = {
    findTickets,
    findTicketsByUserId,
    createTicket,
    findWithTicketTypeId
};

export default ticketRepository;
