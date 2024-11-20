import { sql } from './db.js';

export default class DatabaseMusicas { 
   async listMusicas() {
      return await sql`SELECT * FROM Musicas`;
  }

  async createMusica(musica) {
    const nome_musica = musica.nome_musica;
    const album_musica = musica.album_musica;
    const artista_musica = musica.artista_musica;
    const tempo_duracao = musica.tempo_duracao;

    await sql`INSERT INTO Musicas( nome_musica, album_musica, artista_musica, tempo_duracao) 
              values ( ${nome_musica}, ${album_musica}, ${artista_musica}, ${tempo_duracao})`;
  }

  async updateMusica(id, musica) {
   
    const nome_musica = musica.nome_musica;
    const album_musica = musica.album_musica;
    const artista_musica = musica.artista_musica;
    const tempo_duracao = musica.tempo_duracao;

     await sql`UPDATE Musicas SET
      nome_musica = ${nome_musica},
      album_musica = ${album_musica},
      artista_musica = ${artista_musica},
      tempo_duracao = ${tempo_duracao}
      where id_musica = ${id} 
     `;
  }

  async deleteMusica(id) {
     await sql`DELETE FROM Musicas WHERE id_musica = ${id}`
  }

}