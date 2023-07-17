import { Ticket, TicketType, TicketStatus } from '@prisma/client';
import { prisma } from '@/config';



async function findPaymentByTicketId(ticketId: number) {
    return prisma.payment.findFirst({
        where: {
            ticketId,
        },
    });
}


async function postPayment(ticketTypeId: number): Promise<Ticket & { TicketType: TicketType }> {
    const result = prisma.ticket.findFirst({
        where: { ticketTypeId },
        include: {
            TicketType: true,
        }
    });
    return result;
}

const paymentRepository = {
    findPaymentByTicketId,
    postPayment
};

export default paymentRepository;
