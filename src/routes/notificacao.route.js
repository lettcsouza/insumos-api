
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function notificacaoRoutes(fastify, options) {
  // Get all notificacoes
  fastify.get('/notificacoes', async (request, reply) => {
    try {
      const notificacoes = await prisma.nOTIFICACAO.findMany();
      return notificacoes;
    } catch (error) {
      console.error('Error fetching notificacoes:', error);
      reply.status(500).send({ error: 'An error occurred while fetching notificacoes' });
    }
  });

  // Get a single notificacao by ID
  fastify.get('/notificacoes/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const notificacao = await prisma.nOTIFICACAO.findUnique({
        where: { ID_NOTIFICACAO: parseInt(id) },
      });
      if (!notificacao) {
        reply.status(404).send({ error: 'Notificacao not found' });
      }
      return notificacao;
    } catch (error) {
      console.error('Error fetching notificacao:', error);
      reply.status(500).send({ error: 'An error occurred while fetching the notificacao' });
    }
  });

  // Create a new notificacao
  fastify.post('/notificacoes', async (request, reply) => {
    const { Data_da_notificacao, Data_de_validade, Tipo_de_notificacao, INSUMO_ID_INSUMO } = request.body;
    try {
      console.log('Request Body:', request.body); // Log request body for debugging
      const newNotificacao = await prisma.nOTIFICACAO.create({
        data: {
          Data_da_notificacao: new Date(Data_da_notificacao),
          Data_de_validade: new Date(Data_de_validade),
          Tipo_de_notificacao,
          INSUMO_ID_INSUMO,
        },
      });
      reply.status(201).send(newNotificacao);
    } catch (error) {
      console.error('Error creating notificacao:', error);
      reply.status(500).send({ error: 'An error occurred while creating the notificacao' });
    }
  });

  // Update a notificacao by ID
  fastify.put('/notificacoes/:id', async (request, reply) => {
    const { id } = request.params;
    const { Data_da_notificacao, Data_de_validade, Tipo_de_notificacao, INSUMO_ID_INSUMO } = request.body;
    try {
      const updatedNotificacao = await prisma.nOTIFICACAO.update({
        where: { ID_NOTIFICACAO: parseInt(id) },
        data: {
          Data_da_notificacao: new Date(Data_da_notificacao),
          Data_de_validade: new Date(Data_de_validade),
          Tipo_de_notificacao,
          INSUMO_ID_INSUMO,
        },
      });
      return updatedNotificacao;
    } catch (error) {
      console.error('Error updating notificacao:', error);
      reply.status(500).send({ error: 'An error occurred while updating the notificacao' });
    }
  });

  // Delete a notificacao by ID
  fastify.delete('/notificacoes/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      await prisma.nOTIFICACAO.delete({
        where: { ID_NOTIFICACAO: parseInt(id) },
      });
      reply.status(204).send();
    } catch (error) {
      console.error('Error deleting notificacao:', error);
      reply.status(500).send({ error: 'An error occurred while deleting the notificacao' });
    }
  });
}

export default notificacaoRoutes;
