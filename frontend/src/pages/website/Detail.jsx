import React, { useEffect, useState } from 'react'
import PlayIcon from '../../components/ui/PlayIcon'
import CalenderIcon from '../../components/ui/CalenderIcon'
import StarIcon from '../../components/ui/StarIcon'
import { useParams } from 'react-router-dom'
import { DeleteUserWatchList, listUserWatchList, SaveUserWatchList, showMovie } from '../../services/website/detail'
import { useSelector } from 'react-redux'

function Detail() {
  const [isPlay, setIsPlay] = useState(false);
  const [isPlayTvSeries, setIsPlayTvSeries] = useState(null)
  const { id } = useParams()
  const [viewDetail, setViewDetail] = useState({})
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);
  const [watchLists, setWatchList] = useState({});

  useEffect(() => {
    scrollTo(0, 0);
    fetchMoviesDetail()
  }, [])

  const toggleisPlay = () => {
    setIsPlay(!isPlay)
  }

  const toggleisPlayTvSeries = (video) => {
    setIsPlayTvSeries(video);
    setIsPlay(true)
    scrollTo(0, 0);
  }


  const fetchMoviesDetail = async () => {
    try {
      setLoading(true)
      const response = await showMovie(id);
      const responseWatchList = await listUserWatchList(user.id);
      const data = response.data.data;
      setViewDetail(data)
      if (user.token) {
        const dataWatchList = responseWatchList.data.data
        setWatchList(dataWatchList)
      }

    }
    finally {
      setLoading(false)
    }
  }


  const handleSaveWatchList = async () => {
    setLoading(true)
    const finalData = {
      user_id: user.id,
      movie_id: viewDetail.id
    }
    await SaveUserWatchList(finalData)
    fetchMoviesDetail()
  }

  const handleDeleteWatchList = async (id) => {
    setLoading(true)
    await DeleteUserWatchList(id)
    fetchMoviesDetail()
  }




  return (
    <>
      {
        loading ?
          <>
            <div className='w-full h-[99vh] flex justify-center items-center flex-col gap-3'>
              <div className='border-l-2 border-t-2 boder-b-2 w-5 h-5  rounded-full animate-spin'></div>
              <div>Loading...</div>
            </div>
          </>
          : <>
            {
              viewDetail?.category?.name === "Movie" || viewDetail?.category?.name === "Anime" ?
                <>
                  {
                    isPlay ?
                      (
                        <div className='h-[80vh] w-full '>
                          {
                            viewDetail?.movie_videos?.map((video, index) =>
                              <video key={index} src={`${import.meta.env.VITE_IMAGE_API_URL}${video.video}`}
                                controls className='w-full h-full'>
                              </video>
                            )
                          }
                        </div>
                      )
                      :
                      (
                        <div className='h-[80vh] w-full relative flex items-end'>
                          <img src={`${import.meta.env.VITE_IMAGE_API_URL}${viewDetail?.banner}`} className='w-full h-full absolute z-0 object-cover object-top' alt="" />
                          <div className='absolute bottom-0 w-full h-[50%]   bg-[linear-gradient(to_top,rgba(0,0,0,0.50)_33%,rgba(0,0,0,0)_100%)]'></div>
                          <div className='w-5xl mx-auto lg:px-0 px-2 relative z-1 mb-6 flex flex-col items-start justify-end '>
                            <h2 className='text-3xl font-bold'>{viewDetail?.title}</h2>
                            <div className='flex flex-wrap gap-2 mt-8'>
                              <div className='flex items-center gap-1 bg-[rgba(255,255,255,0.20)] w-max p-0.5 px-2 rounded-full'>
                                <div className='w-4 h-4 shrink-0'>
                                  <StarIcon className={'fill-[#FFC404] w-full h-full'}></StarIcon>
                                </div>
                                <div>
                                  8/10
                                </div>
                              </div>

                              <div className='flex items-center gap-1 bg-[rgba(255,255,255,0.20)] w-max p-0.5 px-2 rounded-full '>
                                <div className='w-4 h-4 shrink-0'>
                                  <CalenderIcon className={'fill-[#FFFFFF] w-full h-full'}></CalenderIcon>
                                </div>
                                <div>
                                  {new Date(viewDetail?.release_date).getFullYear()}
                                </div>
                              </div>
                              {
                                viewDetail?.movie_generals?.map((general) =>
                                  <div key={general.id} className='flex items-center gap-1 bg-[rgba(255,255,255,0.20)] w-max p-0.5 px-2 rounded-full'>
                                    <div>
                                      {general.general.name}
                                    </div>
                                  </div>
                                )
                              }

                            </div>
                            <div className='mt-2 line-clamp-2 md:line-clamp-none'>
                              {viewDetail?.description}
                            </div>
                            <div className='mt-2 flex gap-3'>
                              <button className='flex items-center gap-2 bg-[#FFFFFF] rounded-md px-5 cursor-pointer' onClick={() => toggleisPlay()}>
                                <div className='w-10 h-10 shrink-0'>
                                  <PlayIcon className={'fill-[#814BA6] w-full h-full'}></PlayIcon>

                                </div>
                                <div className='font-bold text-[#814BA6]'>
                                  Play
                                </div>
                              </button>

                              {
                                user?.token ?
                                  <>
                                    {
                                      watchLists?.watch_lists.some((watchList) => watchList.movie.id === viewDetail.id) ?

                                        <button disabled={loading} type='button' className='flex items-center rounded-full cursor-pointer w-10 h-10 justify-center border border-[#FFFFFF]  bg-[#814BA6]' onClick={() => handleDeleteWatchList(watchLists?.watch_lists.find((watchList) => watchList.movie.id === viewDetail.id).id)} >
                                          <div className='font-bold text-[#FFFFFF] text-[23px] -mt-1 '>
                                            +
                                          </div>
                                        </button>
                                        :
                                        <button type='button' disabled={loading} className='flex items-center rounded-full cursor-pointer w-10 h-10 justify-center border border-[#FFFFFF] bg-[rgba(255,255,255,0.05)]' onClick={() => handleSaveWatchList()}>
                                          <div className='font-bold text-[#FFFFFF] text-[23px] -mt-1'>
                                            +
                                          </div>
                                        </button>
                                    }
                                  </>

                                  : <>
                                  </>

                              }


                            </div>
                          </div>
                        </div>
                      )
                  }

                  <div className='max-w-5xl mx-auto lg:px-0 px-2 mt-4'>
                    <div className='flex items-center gap-1'>
                      <div className='bg-[#814BA6] w-2 h-6 rounded-md'></div>
                      <h1 className='text-2xl font-semibole'>Actors</h1>
                    </div>

                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2'>
                      {
                        viewDetail?.movie_actors?.map((actor) =>
                          <div key={actor.id} className='border border-[#FFFFFF] bg-[rgba(255,255,255,0.05)] sm:h-30 px-4 pt-4 rounded-md flex gap-2  flex-col-reverse sm:flex-row'>
                            <div className='h-full w-20 shrink-0'>
                              <img src={`${import.meta.env.VITE_IMAGE_API_URL}${actor.actor.image}`} alt="" className='w-full h-full object-cover rounded-t-md' />
                            </div>
                            <div className=''>{actor.actor.name}</div>
                          </div>
                        )
                      }


                    </div>
                  </div>
                </>
                :
                <>
                  {
                    isPlay ?
                      (
                        <div className='h-[80vh] w-full '>
                          <video src={isPlayTvSeries} controls className='w-full h-full'></video>
                        </div>
                      )
                      :
                      (
                        <div className='h-[80vh] w-full relative flex items-end '>
                          <img src={`${import.meta.env.VITE_IMAGE_API_URL}${viewDetail?.banner}`} className='w-full h-full absolute z-0 object-cover object-top' alt="" />
                          <div className='absolute bottom-0 w-full h-[50%]   bg-[linear-gradient(to_top,rgba(0,0,0,0.50)_33%,rgba(0,0,0,0)_100%)]'></div>
                          <div className='w-5xl mx-auto lg:px-0 px-2 relative z-1 mb-6 '>
                            <h2 className='text-3xl font-bold'>{viewDetail?.title}</h2>
                            <div className='flex flex-wrap gap-4 mt-8'>
                              <div className='flex items-center gap-1 bg-[rgba(255,255,255,0.20)] w-max p-0.5 px-2 rounded-full'>
                                <div className='w-4 h-4 shrink-0'>
                                  <StarIcon className={'fill-[#FFC404] w-full h-full'}></StarIcon>
                                </div>
                                <div>
                                  8/10
                                </div>
                              </div>

                              <div className='flex items-center gap-1 bg-[rgba(255,255,255,0.20)] w-max p-0.5 px-2 rounded-full '>
                                <div className='w-4 h-4 shrink-0'>
                                  <CalenderIcon className={'fill-[#FFFFFF] w-full h-full'}></CalenderIcon>
                                </div>
                                <div>
                                  {new Date(viewDetail.release_date).getFullYear()}
                                </div>
                              </div>
                              {
                                viewDetail?.movie_generals?.map((general) =>
                                  <div key={general.id} className='flex items-center gap-1 bg-[rgba(255,255,255,0.20)] w-max p-0.5 px-2 rounded-full'>
                                    <div>
                                      {general.general.name}
                                    </div>
                                  </div>
                                )
                              }
                            </div>
                            <div className='mt-2 line-clamp-2 md:line-clamp-none'>
                              {viewDetail?.description}
                            </div>
                            <div className='mt-2 flex gap-3'>
                              <button className='flex items-center rounded-full cursor-pointer w-10 h-10 justify-center border border-[#FFFFFF] bg-[rgba(255,255,255,0.05)]'>
                                <div className='font-bold text-[#FFFFFF] text-[23px] -mt-1'>
                                  +
                                </div>
                              </button>
                            </div>
                          </div>
                        </div>
                      )
                  }

                  <div className='max-w-5xl mx-auto lg:px-0 px-2 mt-4'>
                    <div className='flex items-center gap-1'>
                      <div className='bg-[#814BA6] w-2 h-6 rounded-md'></div>
                      <h1 className='text-2xl font-semibole'>Episodes</h1>
                    </div>

                    <div className='border border-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.05)] p-3 rounded-md flex gap-2 w-full flex-col mt-3'>

                      {
                        viewDetail?.movie_videos?.map((video, index) =>
                          <div key={video.id} className='border border-[rgba(255,255,255,0.50)] bg-[rgba(255,255,255,0.05)] md:h-30  rounded-md flex gap-2 w-full cursor-pointer flex-col-reverse md:flex-row' onClick={() => toggleisPlayTvSeries(
                            `${import.meta.env.VITE_IMAGE_API_URL}${video.video}`
                          )}>
                            <div className='h-full w-50'>
                              <img src={`${import.meta.env.VITE_IMAGE_API_URL}${viewDetail?.banner}`} alt="" className='w-full h-full object-cover' />
                            </div>
                            <div className='mt-2 ml-1'>Episodes #{index + 1}</div>
                          </div>
                        )
                      }
                    </div>

                  </div>

                  <div className='max-w-5xl mx-auto lg:px-0 px-2 mt-4'>
                    <div className='flex items-center gap-1'>
                      <div className='bg-[#814BA6] w-2 h-6 rounded-md'></div>
                      <h1 className='text-2xl font-semibole'>Actors</h1>
                    </div>


                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2'>
                      {
                        viewDetail?.movie_actors?.map((actor) =>
                          <div key={actor.id} className='border border-[#FFFFFF] bg-[rgba(255,255,255,0.05)] sm:h-30 px-4 pt-4 rounded-md flex gap-2  flex-col-reverse sm:flex-row'>
                            <div className='h-full w-20 shrink-0'>
                              <img src={`${import.meta.env.VITE_IMAGE_API_URL}${actor.actor.image}`} alt="" className='w-full h-full object-cover rounded-t-md' />
                            </div>
                            <div className=''>{actor.actor.name}</div>
                          </div>
                        )
                      }
                    </div>
                  </div>
                </>
            }
          </>
      }


    </>
  )
}

export default Detail