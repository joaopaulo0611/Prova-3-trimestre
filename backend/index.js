import express from 'express';
import cors from 'cors';
import DatabaseMusicas  from './database-postgres.js';

const app = express();
const database = new DatabaseMusicas();

app.use(cors({
     origin: '*',
     methods: ['GET', 'POST', 'PUT', 'DELETE']
}));

app.use(express.json());

app.listen(8080, () => {
     console.log('Servidor rodando na porta 8080');
});


//----------------ROTAS---DO---CRUD---------------------//

//teste 

app.get("/", (req, res) => {
     return res.send("teste");
});

// Criar (rota POST)

app.post('/musicas', async (req, res) => {
     try {
          const body = req.body;
          await database.createMusica(body);
          res.status(201).send("Musica criada com sucesso!");
     } catch (error) {
          console.error("Erro ao criar musica!", error);
          res.status(500).send("Erro ao criar musica.");
     }
});

// Mostrar as musicas (rota GET)

app.get('/musicas', async (req, res) => {
     try {
          const musicas = await database.listMusicas();
          res.status(200).json(musicas);
     } catch (error) {
          console.error("Erro ao buscar musica!", error);
          res.status(500).send("Erro ao buscar musica.");
     }
});

// Mostrar tarefa por ID (rota GET com ID)

app.get("/musicas/:id", async (req, res) => {
     try {
          const tarefaID = req.params.id;
          const tarefa = await database.listTarefaByID(tarefaID);
          if (tarefa.length > 0) {
               res.status(200).json(tarefa);
          } else {
               res.status(404).send("Tarefa não encontrada.");
          }
     } catch (error) {
          console.error("Erro ao buscar tarefa por ID!", error);
          res.status(500).send("Erro ao buscar tarefa por ID.");
     }
});

// Deletar tarefa (rota DELETE)

app.delete("/tarefas/:id", async (req, res) => {
     try {
          const tarefaID = req.params.id;

          await database.deleteTarefa(tarefaID);
          res.status(200).send("Tarefa deletada com sucesso.");
     } catch (error) {
          if (error.message === 'Tarefa não encontrada') {
               res.status(404).send("Tarefa não encontrada.");
          } else {
               console.error("Erro ao deletar tarefa!", error);
               res.status(500).send("Erro ao deletar tarefa.");
          }
     }
});


// Atualizar tarefa (rota PUT)
app.put('/tarefas/:id', async (req, res) => {
     try {
          const tarefaID = req.params.id;
          const { titulo, descricao, cor, corTexto, concluido } = req.body;

          const alteracoes = {
               titulo,
               descricao,
               cor,
               corTexto,
               concluido: concluido !== undefined ? concluido : false,
          };

          console.log('Atualizando tarefa:', tarefaID, alteracoes);

          await database.updateTarefa(tarefaID, alteracoes);
          res.status(200).send("Tarefa atualizada com sucesso.");
     } catch (error) {
          if (error.message === 'Tarefa não encontrada') {
               res.status(404).send("Tarefa não encontrada.");
          } else {
               console.error("Erro ao atualizar tarefa!", error);
               res.status(500).send("Erro ao atualizar tarefa.");
          }
     }
});

app.put('/concluir/:id', async (req, res) => {
     try {
          const tarefaID = req.params.id;
          await database.concluirTarefa(tarefaID);
          res.status(200).send("Tarefa concluída com sucesso.");
     } catch (error) {
          if (error.message === 'Tarefa não encontrada') {
               res.status(404).send("Tarefa não encontrada.");
          } else {
               console.error("Erro ao concluir tarefa!", error);
               res.status(500).send("Erro ao concluir tarefa.");
          }
     }
});