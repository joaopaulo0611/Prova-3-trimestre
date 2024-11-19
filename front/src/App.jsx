import { useState } from 'react'
import reactLogo from './assets/react.svg'
import { FaXmark } from "react-icons/fa6";
import viteLogo from '/vite.svg'
import './App.css'
import { IoIosHourglass } from "react-icons/io";
import { FaMusic } from "react-icons/fa6";
import { FaPen } from "react-icons/fa";

function App() {
  const [duracao, setDuracao] = useState('');

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

  const handleChange = (e) => {
    const valorFormatado = formatarTempo(e.target.value);
    setDuracao(valorFormatado);
  };

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
            type='text'
            name='nome'
            placeholder='Nome da Música'
          />
          <input
            className='border-2 mx-6 font text-gray-800 placeholder:text-gray-400 hover:border-y-lime-500 rounded-sm   focus:border-y-lime-500 transition-all duration-500 p-1 rounded-xs border-x-lime-500 border-y-transparent'
            type='text'
            name='album'
            placeholder='Álbum' />
          <input
            className='border-2 mx-6 font text-gray-800 placeholder:text-gray-400 hover:border-y-lime-500 rounded-sm   focus:border-y-lime-500 transition-all duration-500 p-1 rounded-xs border-x-lime-500 border-y-transparent'
            type='text'
            name='artista'
            placeholder='Artista' />
          <input
            className='text-center border-2 mx-6 font text-gray-800 placeholder:text-gray-400 hover:border-y-lime-500 rounded-sm   focus:border-y-lime-500 transition-all duration-500 p-1 rounded-xs border-x-lime-500 border-y-transparent '
            type="text"
            id="duracao"
            name="duracao"
            value={duracao}
            maxLength="5"
            placeholder="Tempo de Duração"
            onChange={handleChange}
          />


        </div>
        <div className='flex items-end w-full justify-end '>
          <button className=' px-4 py-1 text-slate-800 font font-  bg-lime-500 mr-40 '>Adicionar musica</button>
        </div>

        <div className=' border-b border-0 border-lime-500 h-10 w-full'></div>
        <h1 className='font text-4xl'>Minhas musicas</h1>
        <div className='flex gap-4'>
        <div className='flex  border border-black/40 rounded-sm items-center justify-center p-4 relative'>
        <FaXmark onClick={() => alert("Deletar")} title='exluir' className='absolute text-red-500 top-2 right-2' />
        <FaPen onClick={() => alert("Editar")} title='editar' size={12} className='absolute text-yellow-500 top-2.5 right-7'/>
          <div className='w-20 h-20 bg-black flex items-center justify-center rounded-[100%]  '>
            <div className='bg-lime-500 h-10 w-10 text-base p-1 rounded-full flex items-center justify-center'>
              <FaMusic color='white' className='text-xl ' />
            </div>
          </div>
          <div className='gap-3 ml-3 justify-center flex item-center'>
            <div className='flex flex-col justify-center  text-left'>
              <p className='text-left font text-gray-800'>Crack com mucilom </p>
              <p className='text-left text-xs font text-gray-500'>333 salve todos </p>
            </div>
            <div className='flex flex-col justify-center '>
              <p className='font text-xs underline underline-offset-1 text-lime-700'>Matuê</p>
              <p className='font text-xs flex items-center'> <IoIosHourglass size={10} />02:30</p>
            </div>
          </div>
        </div>
        </div>
        
      </div>
    </>
  )
}

export default App
