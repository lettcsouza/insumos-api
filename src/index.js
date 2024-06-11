// index.js

import Fastify from 'fastify';
import insumoRoutes from './routes/insumo.routes.js';
import cors from '@fastify/cors';
import perdaRoutes from './routes/perda.routes.js';
import notificacaoRoutes from './routes/notificacao.route.js';
import leadTimeRoutes from './routes/lead_time.route.js';

// Cria uma instância do Fastify
const fastify = Fastify({ logger: true });

// Habilita CORS
await fastify.register(cors, {
  origin: '*',
});

// Registra as rotas de insumo, perdas
await fastify.register(insumoRoutes);
await fastify.register(perdaRoutes);
await fastify.register(notificacaoRoutes);
await fastify.register(leadTimeRoutes);

// Inicia o servidor
const start = async () => {
  try {
    await fastify.listen({ port: 3000 });
    console.log('Server is running on http://localhost:3000');
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};

start();
