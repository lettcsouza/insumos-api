// routes/perda.routes.js

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function perdaRoutes(fastify, options) {
  // Get all perdas
  fastify.get('/perdas', async (request, reply) => {
    try {
      const perdas = await prisma.pERDA.findMany();
      return perdas;
    } catch (error) {
      reply.status(500).send({ error: 'An error occurred while fetching perdas' });
    }
  });

  // Get a single perda by ID
  fastify.get('/perdas/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const perda = await prisma.pERDA.findUnique({
        where: { ID_PERDA: parseInt(id) },
      });
      if (!perda) {
        reply.status(404).send({ error: 'Perda not found' });
      }
      return perda;
    } catch (error) {
      reply.status(500).send({ error: 'An error occurred while fetching the perda' });
    }
  });

  // Create a new perda
  fastify.post('/perdas', async (request, reply) => {
    const { Data_da_perda, Quantidade_perdida, Motivo_da_perda, Valor_perda, INSUMO_ID_INSUMO } = request.body;
    try {
      const newPerda = await prisma.pERDA.create({
        data: {
          Data_da_perda: new Date(Data_da_perda),
          Quantidade_perdida,
          Motivo_da_perda,
          Valor_perda,
          INSUMO_ID_INSUMO,
        },
      });
      reply.status(201).send(newPerda);
    } catch (error) {
      reply.status(500).send({ error: 'An error occurred while creating the perda' });
    }
  });

  // Update a perda by ID
  fastify.put('/perdas/:id', async (request, reply) => {
    const { id } = request.params;
    const { Data_da_perda, Quantidade_perdida, Motivo_da_perda, Valor_perda, INSUMO_ID_INSUMO } = request.body;
    try {
      const updatedPerda = await prisma.pERDA.update({
        where: { ID_PERDA: parseInt(id) },
        data: {
          Data_da_perda: new Date(Data_da_perda),
          Quantidade_perdida,
          Motivo_da_perda,
          Valor_perda,
          INSUMO_ID_INSUMO,
        },
      });
      return updatedPerda;
    } catch (error) {
      reply.status(500).send({ error: 'An error occurred while updating the perda' });
    }
  });

  // Delete a perda by ID
  fastify.delete('/perdas/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      await prisma.pERDA.delete({
        where: { ID_PERDA: parseInt(id) },
      });
      reply.status(204).send();
    } catch (error) {
      reply.status(500).send({ error: 'An error occurred while deleting the perda' });
    }
  });
}

export default perdaRoutes;
