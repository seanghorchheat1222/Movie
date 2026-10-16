import React, { useEffect, useState } from 'react'
import preBanner from '../../assets/images/pre-banner.png'
import prePoster from '../../assets/images/pre-poster.png'
import StarIcon from '../../components/ui/StarIcon'
import CalenderIcon from '../../components/ui/CalenderIcon'
import PlayIcon from '../../components/ui/PlayIcon'
import { useNavigate } from 'react-router-dom'
import { bannerMovie, listAction, listAdventure, listHorror, topMovie } from '../../services/website/home'
import { listAnime } from '../../services/website/anime'

function Home() {
  const [banner, setBanner] = useState({});
  const [topMovies, setTopMovie] = useState([]);
  const [horrorMovies, setHorrorMovie] = useState([])
  const [actionMovies, setActionMovie] = useState([])
  const [animationMovies, setAnimationMovie] = useState([])
  const [adventureMovies, setAdventureMovie] = useState([])
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const toDetail = (id) => {
    navigate(`/detail/${id}`)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await bannerMovie();
      const responseTopMoves = await topMovie();
      const responseHorrorMoves = await listHorror();
      const responseActionMoves = await listAction();
      const responseAnimationMoves = await listAnime();
      const responseAdventureMoves = await listAdventure();
      const data = response.data.data;
      const dataTopMovies = responseTopMoves.data.data.data
      const dataHorrorMovies = responseHorrorMoves.data.data.data
      const dataActionMoves = responseActionMoves.data.data.data
      const dataAnimationMoves = responseAnimationMoves.data.data.data
      const dataAdventureMoves = responseAdventureMoves.data.data.data
      setBanner(data)
      setTopMovie(dataTopMovies)
      setHorrorMovie(dataHorrorMovies)
      setActionMovie(dataActionMoves)
      setAnimationMovie(dataAnimationMoves)
      setAdventureMovie(dataAdventureMoves)
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      {
        loading ? <>
          <div className='w-full h-[99vh] flex justify-center items-center flex-col gap-3'>
            <div className='border-l-2 border-t-2 boder-b-2 w-5 h-5  rounded-full animate-spin'></div>
            <div>Loading...</div>
          </div>
        </> :
          <>
            <div className='h-[80vh] w-full relative flex items-end'>
              <img src={`${import.meta.env.VITE_IMAGE_API_URL}${banner?.banner}`} className='w-full h-full absolute z-0 object-cover object-top' alt="" />
              <div className='absolute bottom-0 w-full h-[50%]   bg-[linear-gradient(to_top,rgba(0,0,0,0.50)_33%,rgba(0,0,0,0)_100%)]'></div>
              <div className='w-5xl mx-auto lg:px-0 px-2 relative z-1 mb-6 flex flex-col items-start justify-end '>
                <h2 className='text-3xl font-bold'>{banner?.title}</h2>
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
                      {new Date(banner?.release_date).getFullYear()}
                    </div>
                  </div>
                  {
                    banner?.movie_generals?.map((general) =>
                      <div key={general.id} className='flex items-center gap-1 bg-[rgba(255,255,255,0.20)] w-max p-0.5 px-2 rounded-full'>
                        <div>
                          {general.general.name}
                        </div>
                      </div>
                    )
                  }

                </div>
                <div className='mt-2 line-clamp-2 md:line-clamp-none'>
                  {banner?.description}
                </div>
                <div className='mt-2 flex gap-3'>
                  <button className='flex items-center gap-2 bg-[#FFFFFF] rounded-md px-5 cursor-pointer' onClick={() => toDetail(19)}>
                    <div className='w-10 h-10 shrink-0'>
                      <PlayIcon className={'fill-[#814BA6] w-full h-full'}></PlayIcon>

                    </div>
                    <div className='font-bold text-[#814BA6]'>
                      Watch Now
                    </div>
                  </button>

                </div>
              </div>
            </div>

            <div className='max-w-5xl mx-auto lg:px-0 px-2'>
              <section className='mt-5'>
                <div className='flex items-center gap-1'>
                  <h1 className='text-[64px] font-bold text-transparent [-webkit-text-stroke:1px_#814BA6]'>TOP 9</h1>
                  <span className='text-[12px]'>BEST<br></br> MOVIES</span>
                </div>

                <div className='h-60 w-full shrink-0 flex overflow-x-auto topmovies-carousel'>
                  {
                    topMovies.map((item, index) =>

                      <div className='relative w-50 overflow-hidden group cursor-pointer shrink-0 flex justify-end' onClick={() => toDetail(item.id)}>
                        <div className='text-[92px] font-bold text-transparent [-webkit-text-stroke:1px_#814BA6] absolute -bottom-2 group-hover:text-[#814BA6] left-0 m-0 p-0 w-max h-max'>{index + 1}</div>
                        <div className='w-40 h-full ml-9 relative overflow-hidden'>
                          <img src={`${import.meta.env.VITE_IMAGE_API_URL}${item.poster}`} alt="" className='w-full h-full object-cover' />
                          <div className='absolute w-full h-full -bottom-full left-0 bg-[rgba(0,0,0,0.50)] flex justify-center items-center group-hover:bottom-0 transition-all duration-300 ease-in-out px-1 '>
                            <div>
                              <h1 className='font-semibold text-1xl text-center'>
                                {item.title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </section>

              <section className='mt-10'>
                <div className='flex items-center gap-1'>
                  <div className='bg-[#814BA6] w-2 h-6 rounded-md'></div>
                  <h1 className='text-2xl font-semibole'>Horros</h1>
                </div>

                <div className='h-60 w-full shrink-0 flex overflow-x-auto horrormovies-carousel gap-3 mt-2 '>
                  {
                    horrorMovies.map((item) =>
                      <div key={item.id} className='relative  w-40 overflow-hidden group cursor-pointer shrink-0 flex justify-end' onClick={() => toDetail(item.id)}>
                        <div className='w-40 h-full relative overflow-hidden'>
                          <img src={`${import.meta.env.VITE_IMAGE_API_URL}${item.poster}`} alt="" className='w-full h-full object-cover' />
                          <div className='absolute w-full h-full -bottom-full left-0 bg-[rgba(0,0,0,0.50)] flex justify-center items-center group-hover:bottom-0 transition-all duration-300 ease-in-out px-1 '>
                            <div>
                              <h1 className='font-semibold text-1xl text-center'>
                                {item.title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </section>


              <section className='mt-10'>
                <div className='flex items-center gap-1'>
                  <div className='bg-[#814BA6] w-2 h-6 rounded-md'></div>
                  <h1 className='text-2xl font-semibole'>Actions</h1>
                </div>

                <div className='h-60 w-full shrink-0 flex overflow-x-auto actionmovies-carousel gap-3 mt-2' >
                  {
                    actionMovies.map((item) =>
                      <div key={item.id} className='relative  w-40 overflow-hidden group cursor-pointer shrink-0 flex justify-end' onClick={() => toDetail(item.id)}>
                        <div className='w-40 h-full relative overflow-hidden'>
                          <img src={`${import.meta.env.VITE_IMAGE_API_URL}${item.poster}`} alt="" className='w-full h-full object-cover' />
                          <div className='absolute w-full h-full -bottom-full left-0 bg-[rgba(0,0,0,0.50)] flex justify-center items-center group-hover:bottom-0 transition-all duration-300 ease-in-out px-1 '>
                            <div>
                              <h1 className='font-semibold text-1xl text-center'>
                                {item.title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </section>



              <section className='mt-10'>
                <div className='flex items-center gap-1'>
                  <div className='bg-[#814BA6] w-2 h-6 rounded-md'></div>
                  <h1 className='text-2xl font-semibole'>Animations</h1>
                </div>

                <div className='h-60 w-full shrink-0 flex overflow-x-auto animationmovies-carousel gap-3 mt-2'>
                  {
                    animationMovies.map((item) =>
                      <div key={item.id} className='relative  w-40 overflow-hidden group cursor-pointer shrink-0 flex justify-end' onClick={() => toDetail(item.id)}>
                        <div className='w-40 h-full relative overflow-hidden'>
                          <img src={`${import.meta.env.VITE_IMAGE_API_URL}${item.poster}`} alt="" className='w-full h-full object-cover' />
                          <div className='absolute w-full h-full -bottom-full left-0 bg-[rgba(0,0,0,0.50)] flex justify-center items-center group-hover:bottom-0 transition-all duration-300 ease-in-out px-1 '>
                            <div>
                              <h1 className='font-semibold text-1xl text-center'>
                                {item.title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </section>

              <section className='mt-10'>
                <div className='flex items-center gap-1'>
                  <div className='bg-[#814BA6] w-2 h-6 rounded-md'></div>
                  <h1 className='text-2xl font-semibole'>Adventures</h1>
                </div>
                <div className='h-60 w-full shrink-0 flex overflow-x-auto tvseries-carousel gap-3 mt-2'>
                  {
                    adventureMovies.map((item) =>
                      <div key={item.id} className='relative  w-40 overflow-hidden group cursor-pointer shrink-0 flex justify-end' onClick={() => toDetail(item.id)}>
                        <div className='w-40 h-full relative overflow-hidden'>
                          <img src={`${import.meta.env.VITE_IMAGE_API_URL}${item.poster}`} alt="" className='w-full h-full object-cover' />
                          <div className='absolute w-full h-full -bottom-full left-0 bg-[rgba(0,0,0,0.50)] flex justify-center items-center group-hover:bottom-0 transition-all duration-300 ease-in-out px-1 '>
                            <div>
                              <h1 className='font-semibold text-1xl text-center'>
                                {item.title}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  }
                </div>
              </section>
            </div>
          </>
      }


    </>
  )
}

export default Home