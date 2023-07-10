import { Ticket, TicketType, TicketStatus } from '@prisma/client';
import { prisma } from '@/config';

async function findTickets(): Promise<TicketType[]> {
    return prisma.ticketType.findMany();

}
async function findTicketsByUserId(registerId: number): Promise<Ticket & {
    TicketType: TicketType;
}> {
    const enrollmentId = registerId;
    return prisma.ticket.findFirst({
        where: { enrollmentId },
        include: {
            TicketType: true,
        }
    });
}




const ticketRepository = {
    findTickets,
    findTicketsByUserId
};

export default ticketRepository;
