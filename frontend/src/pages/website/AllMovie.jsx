import React, { useEffect, useState } from 'react'
import prePoster from '../../assets/images/pre-poster.png'
import { listMovie } from '../../services/website/allmovie';
import { useNavigate } from 'react-router-dom';

function AllMovie() {
  const [movies, setMovie] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovie()
  }, [])

  useEffect(() => {
    fetchMovie()
  }, [page])

  useEffect(() => {
    setTimeout(() => {
      fetchMovie()
    }, 500);
  }, [search])

  const fetchMovie = async () => {
    try {
      setLoading(true)
      const response = await listMovie(page, search);
      const data = response.data.data.data;
      console.log(data)
      const paginate = response.data.data
      setPagination(paginate);
      setMovie(data)
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
      <div className='max-w-5xl mx-auto lg:px-0 px-2 mt-20'>
        <div className='mt-30'>
          <h1 className='font-bold text-2xl text-center'>Discover Your Next Favorite</h1>
          <div className='text-center text-[rgba(255,255,255,0.50)]'>Search through thousands of movies, TV shows, and anime series</div>
        </div>
        <div className='max-w-2xl mx-auto mt-10'>
          <div className='border border-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.05)] p-2 rounded-md flex gap-2 w-full flex-col mt-3'>
            <input value={search} onChange={(e) => setSearch(e.target.value)} className='border border-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.05)] h-10  rounded-md flex gap-2 w-full pl-2' placeholder='Typing here to search...' />
          </div>
        </div>
      </div>

      {
        loading ?
          <>
            <div className='w-full h-[60vh] flex justify-center items-center flex-col gap-3'>
              <div className='border-l-2 border-t-2 boder-b-2 w-5 h-5  rounded-full animate-spin'></div>
              <div>Loading...</div>
            </div>
          </>
          :
          <>
            <div className='max-w-5xl mx-auto lg:px-0 px-2 mt-20'>
              <section className='mt-10 min-h-[90vh]'>
                <div className='flex items-center gap-1'>
                  <div className='bg-[#814BA6] w-2 h-6 rounded-md'></div>
                  <h1 className='text-2xl font-semibole'>Trending Today</h1>
                </div>

                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 mt-5 gap-3'>
                  {
                    movies.map((movie) =>
                      <button className='cursor-pointer group' onClick={() => toDetail(movie.id)}>
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

export default AllMovie