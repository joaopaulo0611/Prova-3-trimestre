import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import { FaXmark } from "react-icons/fa6";
import viteLogo from '/vite.svg'
import './App.css'
import { IoIosHourglass } from "react-icons/io";
import axios from   "axios"
import { FaMusic } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";

function App() {
  const [idMusica, setIdMusica] = useState('');
  const [nomeMusica, setNomeMusica] = useState('');
const [albumMusica, setAlbumMusica] = useState('');
const [artistaMusica, setArtistaMusica] = useState('');
const [duracaoMusica, setDuracaoMusica] = useState('');
  const [duracao, setDuracao] = useState('');
  const [loading, setLoading] = useState(false);
  const [musicas, setMusicas] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const nomeInputRef = useRef(null);
  

  const fetchMusicas = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8080/musicas`)
      console.log(response.data)
      setMusicas(response.data)
      console.log(`musicas: `,musicas)
    } catch (error){
      console.error(error)
    }
    finally {
      setLoading(false);
    }
  };
  useEffect(() =>{
    fetchMusicas()
  },[])

  const adicionarMusica = async () => {
    setLoading(false);
    try{
      const response = await axios.post(`http://localhost:8080/musicas`, {
        nome_musica: nomeMusica,
        album_musica: albumMusica,
        artista_musica: artistaMusica,
        tempo_duracao: duracaoMusica,
      })
      fetchMusicas()

      setNomeMusica('');
      setAlbumMusica('');
      setArtistaMusica('');
      setDuracaoMusica('');
    }catch (error){
      console.error('Erro ao adicionar música:', error);
    }finally{
      setLoading(false);
    }
  }

  const formatarTempo = (value) => {
    let valor = value.replace(/\D/g, '');
    if (valor.length > 4) {
      valor = valor.slice(0, 4);
    }
    if (valor.length > 2) {
      valor = valor.slice(0, 2) + ':' + valor.slice(2, 4);
    }
    return valor;
  };

  const deletarMusica = async (id) => {
    try{
      const response = await axios.delete(`http://localhost:8080/musicas/${id}`)
      fetchMusicas();
    }
    catch (erro){
      console.error("Erro ao deletar música:", erro)
    }
  }

  const preencherMusica = (musica) => {
    
    setIsEdit(true);
    setIdMusica(musica.id_musica);
    setNomeMusica(musica.nome_musica);
    setAlbumMusica(musica.album_musica);
    setArtistaMusica(musica.artista_musica);
    setDuracaoMusica(musica.tempo_duracao); 

    setTimeout(() => {
      nomeInputRef.current.focus();
    }, 0);
  }
  
  const editarMusica  = async () => {
    try{
      const response = await axios.put(`http://localhost:8080/musicas/${idMusica}`, {
        nome_musica: nomeMusica,
        album_musica: albumMusica,
        artista_musica: artistaMusica,
        tempo_duracao: duracaoMusica,
      })
      setIdMusica('');
      setNomeMusica('');
      setAlbumMusica('');
      setArtistaMusica('');
      setDuracaoMusica('');
      setIsEdit(false);
      fetchMusicas();
    }
    catch (erro){
      console.error("Erro ao editar música: ", erro)
    }
  }

  return (
    <>
      
      <div className='flex flex-col justify-center items-center gap-4 w-[80%] m-auto '>
        <div className='mt-20 lilita-one-regular text-2xl'>
          <h1>CRUD Músicas</h1>
        </div>
        <div className='w-40 h-40 bg-black flex items-center justify-center rounded-[100%]  mb-14'>
          <div className='bg-lime-500 h-20 w-20 text-base p-1 rounded-full flex items-center justify-center'>
            <FaMusic color='white' className='text-4xl mr-1' />
          </div>
        </div>
        <div className='flex '>
        <input
            className='border-2 mx-6 font text-gray-800 placeholder:text-gray-400 hover:border-y-lime-500 rounded-sm   focus:border-y-lime-500 transition-all  duration-500 p-1 rounded-xs border-x-lime-500 border-y-transparent'
            type='hidden'
            disabled
            name='nome'
            value={idMusica}
            onChange={(e) => setIdMusica(e.target.value)}
            placeholder='Nome da Música'
          />
          <input
            className='border-2 mx-6 font text-gray-800 placeholder:text-gray-400 hover:border-y-lime-500 rounded-sm   focus:border-y-lime-500 transition-all  duration-500 p-1 rounded-xs border-x-lime-500 border-y-transparent'
            type='text'
            name='nome'
            ref={nomeInputRef}
            value={nomeMusica}
            onChange={(e) => setNomeMusica(e.target.value)}
            placeholder='Nome da Música'
          />
          <input
            className='border-2 mx-6 font text-gray-800 placeholder:text-gray-400 hover:border-y-lime-500 rounded-sm   focus:border-y-lime-500 transition-all duration-500 p-1 rounded-xs border-x-lime-500 border-y-transparent'
            type='text'
            name='album'
            value={albumMusica}
            onChange={(e) => setAlbumMusica(e.target.value)}
            placeholder='Álbum' />
          <input
            className='border-2 mx-6 font text-gray-800 placeholder:text-gray-400 hover:border-y-lime-500 rounded-sm   focus:border-y-lime-500 transition-all duration-500 p-1 rounded-xs border-x-lime-500 border-y-transparent'
            type='text'
            name='artista'
            value={artistaMusica}
            onChange={(e) => setArtistaMusica(e.target.value)}
            placeholder='Artista' />
          <input
            className='text-center border-2 mx-6 font text-gray-800 placeholder:text-gray-400 hover:border-y-lime-500 rounded-sm   focus:border-y-lime-500 transition-all duration-500 p-1 rounded-xs border-x-lime-500 border-y-transparent '
            type="text"
            id="duracao"
            name="duracao"
            
            value={duracaoMusica}
            maxLength="5"
            placeholder="Tempo de Duração"
            onChange={(e) => setDuracaoMusica(formatarTempo(e.target.value))}
          />


        </div>
        <div className='flex items-end w-full justify-end '> 
          {isEdit?(<button onClick={editarMusica} className=' px-4 py-1 text-slate-800 font font-  bg-lime-500 mr-40 '>Editar Música</button>):(
          <button onClick={adicionarMusica} className=' px-4 py-1 text-slate-800 font font-  bg-lime-500 mr-40 '>Adicionar Música</button>
          )}
        </div>

        <div className=' border-b border-0 border-lime-500 h-10 w-full'></div>
        <h1 className='font text-4xl'>Minhas Músicas</h1>
        {loading ? (
        <div className="flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-blue-500 border-solid rounded-full border-t-transparent animate-spin"></div>
        </div>
      ): (
        <>
        <div className='flex gap-4'>
        {musicas.map((musica) => (
          <div key={musica.id_musica} className='flex  border border-black/40 rounded-sm items-center justify-center p-4 relative'>
            <FaXmark onClick={() => deletarMusica(musica.id_musica)} title='exluir' className='absolute text-red-500 top-2 right-2' />
            <FaPen onClick={() => preencherMusica(musica)} title='editar' size={12} className='absolute text-yellow-500 top-2.5 right-7' />
            <div className='w-20 h-20 bg-black flex items-center justify-center rounded-[100%]  '>
              <div className='bg-lime-500 h-10 w-10 text-base p-1 rounded-full flex items-center justify-center'>
                <FaMusic color='white' className='text-xl ' />
              </div>
            </div>
            <div className='gap-3 ml-3 justify-center flex item-center'>
              <div className='flex flex-col justify-center  text-left'>
                <p className='text-left font text-gray-800'>{musica.nome_musica} </p>
                <p className='text-left text-xs font text-gray-500'>{musica.album_musica} </p>
              </div>
              <div className='flex flex-col justify-center '>
                <p className='font text-xs underline underline-offset-1 text-lime-700'>{musica.artista_musica}</p>
                <p className='font text-xs flex items-center'> <IoIosHourglass size={10} />{musica.tempo_duracao}</p>
              </div>
            </div>
          </div>
          ))}
        </div>
        </>   
      )}
        

      </div>
    </>
  )
}

export default App
