import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { listUserWatchList } from '../../services/website/watchlist';
import { useNavigate } from 'react-router-dom';

function WatchList() {
  const user = useSelector((state) => state.user);
  const [watchLists, setWatchList] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  useEffect(() => {
    fetchWatchList()
  }, [])

  const fetchWatchList = async () => {
    try {
      setLoading(true)
      const response = await listUserWatchList(user.id);
      const data = response.data.data
      setWatchList(data)
    } finally {
      setLoading(false)
    }
  }

  const toDetail = (id) => {
    navigate(`/detail/${id}`)
  }

  return (
    <>
      {
        loading ? <>
          <div className='w-full h-[90vh] flex justify-center items-center flex-col gap-3'>
            <div className='border-l-2 border-t-2 boder-b-2 w-5 h-5  rounded-full animate-spin'></div>
            <div>Loading...</div>
          </div>
        </>
          :
          <>

            <div className='max-w-5xl mx-auto lg:px-0 px-2 mt-20'>
              <div className='border-b-2 border-b-[rgba(255,255,255,0.50)] pb-1'>
                <div className='font-semibold'>Your WatchLists</div>
              </div>
              <section className='mt-10 min-h-[90vh]'>
                {
                  watchLists?.watch_lists?.length === 0 ? <>
                    <div className='w-full flex justify-center items-center h-[80vh]'>
                      <div >
                        Opp, No WatchLists Display!
                      </div>
                    </div>

                  </> :
                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-6 mt-5 gap-3'>
                      {
                        watchLists?.watch_lists?.map((movie) =>
                          <button key={movie.movie.id} className='cursor-pointer group' onClick={() => toDetail(movie.movie.id)}>
                            <div key={movie.movie.id} className='w-full h-60 relative overflow-hidden'>
                              <img src={`${import.meta.env.VITE_IMAGE_API_URL}${movie.movie.poster}`} alt="" className='w-full h-full object-cover object-top' />
                              <div className='absolute w-full h-full -bottom-full left-0 bg-[rgba(0,0,0,0.50)] flex justify-center items-center group-hover:bottom-0 transition-all duration-300 ease-in-out px-1'>
                                <div>
                                  <h1 className='font-semibold text-1xl text-center'>
                                    {movie.movie.title}
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
            </div>


          </>
      }


    </>
  )
}

export default WatchList