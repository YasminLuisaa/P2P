// Importa o módulo 'ws', que permite a criação de um servidor WebSocket no Node.js.
const WebSocket = require('ws');

// Cria um novo servidor WebSocket que escuta na porta 6789.
const server = new WebSocket.Server({ port: 6789 });

// Define um evento que é disparado quando um novo cliente se conecta ao servidor WebSocket.
server.on('connection', socket => {

    // Define um evento para lidar com as mensagens recebidas de um cliente.
    socket.on('message', async message => {
        try {
            // Para cada cliente conectado, verifica se ele não é o remetente da mensagem
            // e se está pronto para receber dados.
            server.clients.forEach(client => {
                if (client !== socket && client.readyState === WebSocket.OPEN) {
                    // Envia a mensagem recebida para todos os outros clientes conectados.
                    client.send(message);
                }
            });
        } catch (error) {
            // Se ocorrer um erro ao processar a mensagem, ele é capturado e exibido no console.
            console.error('Erro ao lidar com mensagem de sinalização:', error);
        }
    });
});

// Exibe no console uma mensagem indicando que o servidor de sinalização está em execução.
console.log('Servidor de sinalização rodando em ws://localhost:6789');
