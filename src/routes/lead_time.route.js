
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function leadTimeRoutes(fastify, options) {
  // Get all lead times
  fastify.get('/lead_times', async (request, reply) => {
    try {
      const leadTimes = await prisma.lEAD_TIME.findMany();
      return leadTimes;
    } catch (error) {
      console.error('Error fetching lead times:', error);
      reply.status(500).send({ error: 'An error occurred while fetching lead times' });
    }
  });

  // Get a single lead time by ID
  fastify.get('/lead_times/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const leadTime = await prisma.lEAD_TIME.findUnique({
        where: { ID_LEAD_TIME: parseInt(id) },
      });
      if (!leadTime) {
        reply.status(404).send({ error: 'Lead time not found' });
      }
      return leadTime;
    } catch (error) {
      console.error('Error fetching lead time:', error);
      reply.status(500).send({ error: 'An error occurred while fetching the lead time' });
    }
  });

  // Create a new lead time
  fastify.post('/lead_times', async (request, reply) => {
    const { Data_de_chegada_do_insumo, INSUMO_ID_INSUMO, Previsao_Consumo } = request.body;
    try {
      const newLeadTime = await prisma.lEAD_TIME.create({
        data: {
          Data_de_chegada_do_insumo: new Date(Data_de_chegada_do_insumo),
          INSUMO_ID_INSUMO,
          Previsao_Consumo: new Date(Previsao_Consumo),
        },
      });
      reply.status(201).send(newLeadTime);
    } catch (error) {
      console.error('Error creating lead time:', error);
      reply.status(500).send({ error: 'An error occurred while creating the lead time' });
    }
  });

  // Update a lead time by ID
  fastify.put('/lead_times/:id', async (request, reply) => {
    const { id } = request.params;
    const { Data_de_chegada_do_insumo, INSUMO_ID_INSUMO, Previsao_Consumo } = request.body;
    try {
      const updatedLeadTime = await prisma.lEAD_TIME.update({
        where: { ID_LEAD_TIME: parseInt(id) },
        data: {
          Data_de_chegada_do_insumo: new Date(Data_de_chegada_do_insumo),
          INSUMO_ID_INSUMO,
          Previsao_Consumo: new Date(Previsao_Consumo),
        },
      });
      return updatedLeadTime;
    } catch (error) {
      console.error('Error updating lead time:', error);
      reply.status(500).send({ error: 'An error occurred while updating the lead time' });
    }
  });

  // Delete a lead time by ID
  fastify.delete('/lead_times/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      await prisma.lEAD_TIME.delete({
        where: { ID_LEAD_TIME: parseInt(id) },
      });
      reply.status(204).send();
    } catch (error) {
      console.error('Error deleting lead time:', error);
      reply.status(500).send({ error: 'An error occurred while deleting the lead time' });
    }
  });
}

export default leadTimeRoutes;
