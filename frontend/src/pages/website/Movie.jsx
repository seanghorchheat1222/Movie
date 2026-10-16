import React, { useEffect, useState } from 'react'
import { listGeneral, listMovie } from '../../services/website/movie'
import { useNavigate } from 'react-router-dom'
import prePoster from '../../assets/images/pre-poster.png'

function Movie() {
  const [generals, setGeneral] = useState([])
  const [movies, setMovie] = useState([])
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const [idGeneral, setIdGeneral] = useState(0);

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    fetchData()
  }, [idGeneral])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await listMovie(page, idGeneral);
      const responseGeneral = await listGeneral();
      const dataGeneral = responseGeneral.data.data.data;
      const data = response.data.data.data;
      console.log(response)
      const paginate = response.data.data
      setPagination(paginate);
      setMovie(data);
      setGeneral(dataGeneral)
    }
    finally {
      setLoading(false)
    }
  }

  const toDetail = (id) => {
    navigate(`/detail/${id}`)
  }


  return (
    <>
      {
        loading ?
          <>
            <div className='w-full h-[90vh] flex justify-center items-center flex-col gap-3'>
              <div className='border-l-2 border-t-2 boder-b-2 w-5 h-5  rounded-full animate-spin'></div>
              <div>Loading...</div>
            </div>
          </>
          :
          <>
            <div className='max-w-5xl mx-auto lg:px-0 px-2 mt-20'>
              <div className='flex gap-5 py-1 overflow-auto scrollbar-none relative z-1 border-b-2 border-b-[rgba(255,255,255,0.50)] shrink-0'>
                <button className='cursor-pointer relative px-2 z-20' onClick={() => setIdGeneral(0)}>
                  <div className='whitespace-nowrap'>
                    All
                  </div>
                  <div className={`absolute w-full h-0.5 z-20 rounded-full -bottom-1  left-0 ${idGeneral === 0 ? 'bg-[#814BA6]' : 'bg-transparent'}`}></div>
                </button>
                {
                  generals.map((general) =>
                    <button key={general.id} className='cursor-pointer relative px-2' onClick={() => setIdGeneral(general.id)}>
                      <div className='whitespace-nowrap'>
                        {general.name}
                      </div>
                      <div className={`w-full h-0.5 z-20 rounded-full absolute -bottom-1 left-0 ${idGeneral === general.id ? 'bg-[#814BA6]' : 'bg-transparent'}`}></div>
                    </button>)
                }
              </div>

              <section className='mt-10 min-h-[90vh]'>
                <div className='flex items-center gap-1'>
                  <div className='bg-[#814BA6] w-2 h-6 rounded-md'></div>
                  <h1 className='text-2xl font-semibole'>Trending Today</h1>
                </div>

                {
                  movies.length === 0 ? <>
                    <div className='w-full flex justify-center items-center h-[50vh]'>
                      <div >
                        Opp, No Movies with general type!
                      </div>
                    </div>

                  </> :
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 mt-5 gap-3'>
                      {
                        movies.map((movie) =>
                          <button key={movie.id} className='cursor-pointer group' onClick={() => toDetail(movie.id)}>
                            <div key={movie.id} className='w-full h-60 relative overflow-hidden'>
                              <img src={`${import.meta.env.VITE_IMAGE_API_URL}${movie.poster}`} alt="" className='w-full h-full object-cover object-top' />
                              <div className='absolute w-full h-full -bottom-full left-0 bg-[rgba(0,0,0,0.50)] flex justify-center items-center group-hover:bottom-0 transition-all duration-300 ease-in-out px-1'>
                                <div>
                                  <h1 className='font-semibold text-1xl text-center'>
                                    {movie.title}
                                  </h1>
                                </div>
                              </div>
                            </div>
                          </button>
                        )
                      }

                    </div>
                }
              </section>
              <div className='flex gap-2 justify-end mt-2'>
                <button disabled={page === 1} className={`py-1 px-3 border rounded-xl mt-1 cursor-pointer ${page === 1 ? "text-[rgba(255,255,255,0.50)]" : "text-[rgba(255,255,255,100)]"}`} onClick={() => setPage(pagination.current_page - 1)}>Prev</button>
                <button disabled={page === pagination.last_page} className={`py-1 px-3 border rounded-xl mt-1 cursor-pointer ${page === pagination.last_page ? "text-[rgba(255,255,255,0.50)]" : "text-[rgba(255,255,255,100)]"}`} onClick={() => setPage(pagination.current_page + 1)}>Next</button>
              </div>
            </div>
          </>
      }
    </>
  )
}

export default Movie