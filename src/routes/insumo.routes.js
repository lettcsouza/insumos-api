// routes/insumo.routes.js

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function insumoRoutes(fastify) {
  // Get all insumos
  fastify.get('/insumos', async (request, reply) => {
    try {
      const insumos = await prisma.iNSUMO.findMany();
      return insumos;
    } catch (err) {
      reply.status(500).send({ error: 'An error occurred while fetching insumos' });
    }
  });

  // Get a single insumo by ID
  fastify.get('/insumos/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      const insumo = await prisma.iNSUMO.findUnique({
        where: { ID_INSUMO: parseInt(id) },
      });
      if (!insumo) {
        reply.status(404).send({ error: 'Insumo not found' });
      }
      return insumo;
    } catch (err) {
      reply.status(500).send({ error: 'An error occurred while fetching the insumo' });
    }
  });

  // Create a new insumo
  fastify.post('/insumos', async (request, reply) => {
    const { Nome, Descricao, Custo_Unitario, Data_de_validade, Quantidade_em_estoque, Numero_Lote, Fabricante, Data_Fabricacao } = request.body;
    try {
      const newInsumo = await prisma.iNSUMO.create({
        data: {
          Nome,
          Descricao,
          Custo_Unitario,
          Data_de_validade: new Date(Data_de_validade),
          Quantidade_em_estoque,
          Numero_Lote,
          Fabricante,
          Data_Fabricacao: new Date(Data_Fabricacao),
        },
      });
      reply.status(201).send(newInsumo);
    } catch (err) {
      reply.status(500).send({ error: 'An error occurred while creating the insumo' });
    }
  });

  // Update an insumo by ID
  fastify.put('/insumos/:id', async (request, reply) => {
    const { id } = request.params;
    const { Nome, Descricao, Custo_Unitario, Data_de_validade, Quantidade_em_estoque, Numero_Lote, Fabricante, Data_Fabricacao } = request.body;
    try {
      const updatedInsumo = await prisma.iNSUMO.update({
        where: { ID_INSUMO: parseInt(id) },
        data: {
          Nome,
          Descricao,
          Custo_Unitario,
          Data_de_validade: new Date(Data_de_validade),
          Quantidade_em_estoque,
          Numero_Lote,
          Fabricante,
          Data_Fabricacao: new Date(Data_Fabricacao),
        },
      });
      return updatedInsumo;
    } catch (err) {
      reply.status(500).send({ error: 'An error occurred while updating the insumo' });
    }
  });

  // Delete an insumo by ID
  fastify.delete('/insumos/:id', async (request, reply) => {
    const { id } = request.params;
    try {
      await prisma.iNSUMO.delete({
        where: { ID_INSUMO: parseInt(id) },
      });
      reply.status(204).send();
    } catch (err) {
      reply.status(500).send({ error: 'An error occurred while deleting the insumo' });
    }
  });
}

export default insumoRoutes;
