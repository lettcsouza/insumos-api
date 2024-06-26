// index.js

import Fastify from 'fastify';
import insumoRoutes from './routes/insumo.routes.js';
import cors from '@fastify/cors';
import perdaRoutes from './routes/perda.routes.js';
import notificacaoRoutes from './routes/notificacao.route.js';
import leadTimeRoutes from './routes/lead_time.route.js';
import dashboardRoutes from './routes/dashboards.routes.js';

// Cria uma instância do Fastify
const fastify = Fastify({ logger: true });

// Habilita CORS
await fastify.register(cors, {
  origin: '*',
});
const port = process.env.PORT || 3000

fastify.get('/', (req, res) => {
  res.send('Hello World!')
})

// Registra as rotas de insumo, perdas
fastify.register(insumoRoutes);
fastify.register(perdaRoutes);
fastify.register(notificacaoRoutes);
fastify.register(leadTimeRoutes);
fastify.register(dashboardRoutes);

// Defina as opções de escuta, incluindo a porta
const options = {
  port: port,
  host: '0.0.0.0'
  // Outras opções, se necessário
};

// Inicia o servidor com as opções definidas
fastify.listen(options, (err) => {
  if (err) {
      console.error(err);
      process.exit(1);
  }
  console.log('app is listening on port:', options.port);
});
