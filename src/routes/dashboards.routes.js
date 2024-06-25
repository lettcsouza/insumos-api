
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function dashboardRoutes(fastify, options) {
    // Quantidade de insumos no estoque
    fastify.get('/dashboard/insumos-estoque', async (request, reply) => {
      try {
        const totalInsumos = await prisma.iNSUMO.aggregate({
          _sum: {
            Quantidade_em_estoque: true,
          },
        });
        return { totalInsumos: totalInsumos._sum.Quantidade_em_estoque };
      } catch (error) {
        console.error('Error fetching insumos estoque:', error);
        reply.status(500).send({ error: 'An error occurred while fetching insumos estoque' });
      }
    });
  
    // Insumos vencidos
    fastify.get('/dashboard/insumos-vencidos', async (request, reply) => {
      try {
        const today = new Date();
        const insumosVencidos = await prisma.iNSUMO.findMany({
          where: {
            Data_de_validade: {
              lt: today,
            },
          },
        });
        return { insumosVencidos };
      } catch (error) {
        console.error('Error fetching insumos vencidos:', error);
        reply.status(500).send({ error: 'An error occurred while fetching insumos vencidos' });
      }
    });
  
    // Insumos com menos de 30 dias de validade
    fastify.get('/dashboard/insumos-menor-30dias', async (request, reply) => {
      try {
        const today = new Date();
        const next30Days = new Date();
        next30Days.setDate(today.getDate() + 30);
        const insumosMenor30Dias = await prisma.iNSUMO.findMany({
          where: {
            Data_de_validade: {
              gte: today,
              lte: next30Days,
            },
          },
        });
        return { insumosMenor30Dias };
      } catch (error) {
        console.error('Error fetching insumos menor 30 dias:', error);
        reply.status(500).send({ error: 'An error occurred while fetching insumos menor 30 dias' });
      }
    });
  
    // Insumos com mais de 30 dias de validade
    fastify.get('/dashboard/insumos-maior-30dias', async (request, reply) => {
      try {
        const next30Days = new Date();
        next30Days.setDate(next30Days.getDate() + 30);
        const insumosMaior30Dias = await prisma.iNSUMO.findMany({
          where: {
            Data_de_validade: {
              gt: next30Days,
            },
          },
        });
        return { insumosMaior30Dias };
      } catch (error) {
        console.error('Error fetching insumos maior 30 dias:', error);
        reply.status(500).send({ error: 'An error occurred while fetching insumos maior 30 dias' });
      }
    });
  }
  
  export default dashboardRoutes;