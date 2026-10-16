import React, { useState } from 'react'
import { data, NavLink, useLocation, useNavigate } from 'react-router-dom'
import HomeIcon from '../../ui/HomeIcon'
import SearchIcon from '../../ui/SearchIcon'
import ProfileIcon from '../../ui/ProfileIcon'
import MovieIcon from '../../ui/MovieIcon'
import TvIcon from '../../ui/TvIcon'
import AnimeIcon from '../../ui/AnimeIcon'
import HistoryIcon from '../../ui/HistoryIcon'
import FavoriteIcon from '../../ui/FavoriteIcon'
import LockIcon from '../../ui/LockIcon'
import EmailIcon from '../../ui/EmailIcon'
import MenuIcon from '../../ui/MenuIcon'
import { currenUser, signIn, signOut, signUp } from '../../../services/website/Nav'
import { clearUser, setToken, setUser } from '../../../store/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import LogoutIcon from '../../ui/LogoutIcon'

function Nav(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const user = useSelector((state) => state.user);

  const [browseOpen, setBrowseOpen] = useState(false);
  const [signin, setSignin] = useState(true);
  const [signinOpen, setSigninOpen] = useState(false);
  const [signinForm, setSigninForm] = useState({
    email: '',
    password: '',
  })

  const [signUpForm, setSignUpForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  const dispatch = useDispatch()

  const handleSigninInput = (e) => {
    const { name, value } = e.target;

    setSigninForm({
      ...signinForm, [name]: value
    })

  }

  const handleSignUpInput = (e) => {
    const { name, value } = e.target;

    setSignUpForm({
      ...signUpForm, [name]: value
    })

  }

  const toggleBrowseOpen = () => {
    setBrowseOpen(prev => {
      console.log('Previous:', prev, 'Next:', !prev);
      return !prev
    });
    setSigninOpen(false)
  }

  const toggleSigninOpen = () => {
    setSigninOpen(!signinOpen)
    setBrowseOpen(false)
  }

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      const data = await signIn(signinForm)
      const token = data.data.token
      dispatch(setToken(token))
      if (data.token !== '') {
        const response = await currenUser();
        const data = response.data;
        dispatch(setUser(
          {
            id: data.id,
            name: data.name,
            email: data.email,
            role: data.role
          }
        ))
        navigate('/admin');
      }
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }


  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await signUp(signUpForm)
    } finally {
      setLoading(false)
      setSignin(true)
    }
  }

  const handleSignOut = async () => {
    try {
      setLoading(true)
      const response = await signOut(user.token)
      if (response.status === 204) {
        navigate('/');
        dispatch(clearUser())
      }
    } finally {
      setLoading(false)
    }
  }

  const toWatchList = () => {
    if (user?.token) {
      navigate('/watchlists');
      return;
    }
    setSigninOpen(true)

  }

  return (
    <>
      {
        props.isTopBar ?
          (
            <nav>
              <ul className='flex gap-10'>
                <li className='hidden md:block'>
                  <NavLink to='/' className={`flex items-center h-full bg-transpart hover:bg-[rgba(255,255,255,0.20)] p-1 rounded-sm gap-1`}>
                    <div className='w-6 h-6 shrink-0'>
                      <HomeIcon className={`${location.pathname === '/' ? 'fill-[#814BA6]' : 'fill-[#FFFFFF]'}  w-full h-full`}></HomeIcon>
                    </div>
                    <div className={`${location.pathname === '/' ? 'text-[#814BA6]' : 'text-[#FFFFFF]'}`}>
                      Home
                    </div>
                  </NavLink>
                </li>
                <li className='relative hidden md:block'>
                  <NavLink className={'flex items-center h-full bg-transpart hover:bg-[rgba(255,255,255,0.20)] p-1 rounded-sm '} onClick={() => toggleBrowseOpen()}>
                    <div className={`${location.pathname === '/movies' || location.pathname === '/tv-series' || location.pathname === '/animes' || location.pathname === '/historys' || location.pathname === '/watchlists' ? 'text-[#814BA6]' : 'text-[#FFFFFF]'}`}>
                      Browse
                    </div>
                  </NavLink>

                  <div className={`absolute w-90 h-auto bg-[rgba(0,0,0,0.80)] right-0 top-10 rounded-xl p-2 ${browseOpen ? 'block' : 'hidden'}`}>
                    <div className='text-center py-1 text-md font-semibold'>Menu</div>
                    <span className='block w-full h-px bg-[rgba(255,255,255,0.50)]'></span>
                    <div className='p-2'>
                      <div className='text-[12px] text-[rgba(255,255,255,0.50)]'>CONTENT</div>
                      <div className='px-5 mt-4'>
                        <ul className='flex justify-between gap-5'>
                          <li>
                            <NavLink to='/movies' className={'flex flex-col items-center'}>
                              <div className='w-12 h-12 shrink-00'>
                                <MovieIcon className={`${location.pathname === '/movies' ? 'fill-[#814BA6]' : 'fill-[#FFFFFF]'}  w-full h-full`}></MovieIcon>
                              </div>
                              <div>Movies</div>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to='/tv-series' className={'flex flex-col items-center'}>
                              <div className='w-12 h-12 shrink-00'>
                                <TvIcon className={`${location.pathname === '/tv-series' ? 'fill-[#814BA6]' : 'fill-[#FFFFFF]'}  w-full h-full`}></TvIcon>
                              </div>
                              <div>Tv Series</div>
                            </NavLink>
                          </li>
                          <li>
                            <NavLink to='/animes' className={'flex flex-col items-center'}>
                              <div className='w-12 h-12 shrink-00'>
                                <AnimeIcon className={`${location.pathname === '/animes' ? 'fill-[#814BA6]' : 'fill-[#FFFFFF]'}  w-full h-full`}></AnimeIcon>
                              </div>
                              <div>Anime</div>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className='p-2'>
                      <div className='text-[12px] text-[rgba(255,255,255,0.50)]'>PERSONAL</div>
                      <div className='mt-4'>
                        <ul className='flex justify-between gap-3'>
                          <li className='w-full'>
                            <NavLink to='/historys' className={'flex flex-col items-center bg-[rgba(0,0,0,100)] rounded-md border border-[rgba(255,255,255,0.50)] py-3'}>
                              <div className='w-12 h-12 shrink-00'>
                                <HistoryIcon className={`${location.pathname === '/historys' ? 'fill-[#814BA6]' : 'fill-[rgba(255,255,255,0.50)]'}  w-full h-full`}></HistoryIcon>
                              </div>
                              <div className={`${location.pathname === '/historys' ? 'text-[#814BA6]' : 'text-[rgba(255,255,255,0.50)]'}`}>Historys</div>
                            </NavLink>
                          </li>

                          <li className='w-full'>
                            <NavLink onClick={() => toWatchList()} className={'flex flex-col items-center bg-[rgba(0,0,0,100)] rounded-md border border-[rgba(255,255,255,0.50)] py-3'}>
                              <div className='w-12 h-12 shrink-00'>
                                <FavoriteIcon className={`${location.pathname === '/watchlists' ? 'fill-[#814BA6]' : 'fill-[rgba(255,255,255,0.50)]'}  w-full h-full`}></FavoriteIcon>
                              </div>
                              <div className={`${location.pathname === '/watchlists' ? 'text-[#814BA6]' : 'text-[rgba(255,255,255,0.50)]'}`}>Favorites</div>
                            </NavLink>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </li>


                <li className='hidden md:block'>
                  <NavLink to='/all-movies' className={'flex items-center h-full bg-transpart hover:bg-[rgba(255,255,255,0.20)] p-1 rounded-sm '}>
                    <div className='w-6 h-6 shrink-0'>
                      <SearchIcon className={`${location.pathname === '/all-movies' ? 'fill-[#814BA6]' : 'fill-[#FFFFFF]'}  w-full h-full`}></SearchIcon>
                    </div>
                  </NavLink>
                </li>

                {
                  user?.token ?
                    <li>
                      <NavLink className={'flex items-center h-full bg-transpart hover:bg-[rgba(255,255,255,0.20)] p-1 rounded-sm '} onClick={() => handleSignOut()}>
                        <div className='w-6 h-6 shrink-0'  >
                          {
                            loading ? <div className='border-l-2 border-t-2 boder-b-2 w-5 h-5  rounded-full animate-spin'></div> : <LogoutIcon className={"fill-[#FFFFFF] w-full h-full"}></LogoutIcon>
                          }
                        </div>
                      </NavLink>
                    </li>
                    :
                    <li>
                      <NavLink className={'flex items-center h-full bg-transpart hover:bg-[rgba(255,255,255,0.20)] p-1 rounded-sm '}>
                        <div className='w-6 h-6 shrink-0' onClick={() => toggleSigninOpen()}>
                          <ProfileIcon className={"fill-[#FFFFFF] w-full h-full"}></ProfileIcon>
                        </div>
                      </NavLink>
                    </li>

                }



                <div className={`bg-[rgba(0,0,0,0.20)] fixed top-0 left-0 w-full h-full z-10 backdrop-blur-[2px] items-center justify-center ${signinOpen ? 'flex ' : 'hidden'}`}>
                  <div className='h-auto w-[90%] md:w-120 p-3 bg-[rgba(0,0,0,100)] rounded-lg'>
                    <div className='flex justify-between'>
                      <div className='flex gap-5'>
                        <button className={`cursor-pointer border-b-2 ${signin ? 'border-b-[#814BA6]' : 'border-b-transparent'} `} onClick={() => setSignin(true)}>
                          Sign in
                        </button>
                        <button className={`cursor-pointer border-b-2 ${signin ? 'border-b-transparent' : 'border-b-[#814BA6]'} `} onClick={() => setSignin(false)} >
                          Sign up
                        </button>
                      </div>
                      <div className='h-max w-max cursor-pointer' onClick={() => toggleSigninOpen()}>
                        <div className='flex flex-col gap-1'>
                          <span className='inline-block w-7 h-0.75 bg-[rgba(255,255,255,100)] rotate-45 mt-3'></span>
                          <span className='inline-block w-7 h-0.75 bg-[rgba(255,255,255,100)] -rotate-45 -mt-1.5'></span>
                        </div>
                      </div>
                    </div>

                    {
                      signin ?
                        <form action="" className='mt-7' onSubmit={handleSignin}>
                          <div className='border border-[rgba(255,255,255,0.50)] rounded-md p-2 flex gap-2'>
                            <div className='w-6 h-6 shrink-0'>
                              <EmailIcon className={'fill-[rgba(255,255,255,0.50)] w-full h-full'}></EmailIcon>
                            </div>
                            <input type="text" name='email' value={signinForm.email} onChange={handleSigninInput} className='w-full h-fulll outline-none' placeholder='Email' />
                          </div>
                          <div className='border border-[rgba(255,255,255,0.50)] rounded-md p-2 flex gap-2 mt-2'>
                            <div className='w-6 h-6 shrink-0'>
                              <LockIcon className={'fill-[rgba(255,255,255,0.50)] w-full h-full'}></LockIcon>
                            </div>
                            <input type="password" name='password' value={signinForm.password} onChange={handleSigninInput} className='w-full h-fulll outline-none' placeholder='Password' />
                          </div>

                          <div className='flex justify-center mt-5 mb-5'>
                            <button className='text-[rgba(255,255,255,0.50)] cursor-pointer'>Forget your password?</button>
                          </div>

                          <div className='flex justify-between gap-3 mb-1'>
                            <button disabled={loading} className='bg-[#814BA6] rounded-md w-full py-2 cursor-pointer h-11 flex justify-center items-center' type='submit'>
                              {
                                loading ?
                                  <div className='border-l-2 border-t-2 boder-b-2 w-5 h-5  rounded-full animate-spin'></div>
                                  : <div>
                                    Sign in
                                  </div>
                              }

                            </button>
                            <button className=' rounded-md w-full py-2 border border-[rgba(255,255,255,0.50)] cursor-pointer h-11' type='button' onClick={() => setSigninOpen(false)}>
                              Cancel
                            </button>
                          </div>
                        </form> :
                        <form action="" className='mt-7' onSubmit={handleSignUp}>
                          <div className='border border-[rgba(255,255,255,0.50)] rounded-md p-2 flex gap-2'>
                            <div className='w-6 h-6 shrink-0'>
                              <ProfileIcon className={'fill-[rgba(255,255,255,0.50)] w-full h-full'}></ProfileIcon>
                            </div>
                            <input type="text" className='w-full h-fulll outline-none' placeholder='Name' name='name' value={signUpForm.name} onChange={handleSignUpInput} />
                          </div>

                          <div className='border border-[rgba(255,255,255,0.50)] rounded-md p-2 flex gap-2 mt-2'>
                            <div className='w-6 h-6 shrink-0'>
                              <EmailIcon className={'fill-[rgba(255,255,255,0.50)] w-full h-full'}></EmailIcon>
                            </div>
                            <input type="text" className='w-full h-fulll outline-none' placeholder='Email' name='email' value={signUpForm.email} onChange={handleSignUpInput} />
                          </div>

                          <div className='border border-[rgba(255,255,255,0.50)] rounded-md p-2 flex gap-2 mt-2'>
                            <div className='w-6 h-6 shrink-0'>
                              <LockIcon className={'fill-[rgba(255,255,255,0.50)] w-full h-full'}></LockIcon>
                            </div>
                            <input className='w-full h-fulll outline-none' placeholder='Password' name='password' value={signUpForm.password} onChange={handleSignUpInput} />
                          </div>

                          <div className='flex justify-center mt-5 mb-5'>
                            <button className='text-[rgba(255,255,255,0.50)] cursor-pointer'>Forget your password?</button>
                          </div>

                          <div className='flex justify-between gap-3 mb-1'>
                             <button disabled={loading} className='bg-[#814BA6] rounded-md w-full py-2 cursor-pointer h-11 flex justify-center items-center' type='submit'>
                              {
                                loading ?
                                  <div className='border-l-2 border-t-2 boder-b-2 w-5 h-5  rounded-full animate-spin'></div>
                                  : <div>
                                    Sign up
                                  </div>
                              }

                            </button>
                            <button type='button' className=' rounded-md w-full py-2 border border-[rgba(255,255,255,0.50)] cursor-pointer' onClick={() => setSigninOpen(false)}>
                              Cancel
                            </button>
                          </div>
                        </form>
                    }

                  </div>
                </div>
              </ul>
            </nav>
          )

          :

          (
            <nav className='w-full'>
              <ul className='flex justify-between w-full'>
                <li >
                  <NavLink to='/' className={`flex flex-col items-center h-full bg-transpart rounded-sm`}>
                    <div className='w-6 h-6 shrink-0'>
                      <HomeIcon className={`${location.pathname === '/' ? 'fill-[#814BA6]' : 'fill-[#FFFFFF]'}  w-full h-full`}></HomeIcon>
                    </div>
                    <div className={`${location.pathname === '/' ? 'text-[#814BA6]' : 'text-[#FFFFFF]'}`}>
                      Home
                    </div>
                  </NavLink>
                </li>

                <li>
                  <NavLink to='/all-movies' className={`flex flex-col items-center h-full bg-transpart rounded-sm`}>
                    <div className='w-6 h-6 shrink-0'>
                      <SearchIcon className={`${location.pathname === '/all-movies' ? 'fill-[#814BA6]' : 'fill-[#FFFFFF]'}  w-full h-full`}></SearchIcon>
                    </div>
                    <div className={`${location.pathname === '/all-movies' ? 'text-[#814BA6]' : 'text-[#FFFFFF]'}`}>
                      Search
                    </div>
                  </NavLink>
                </li>

                <li>
                  <button type="button" className={`flex flex-col items-center h-full bg-transpart  rounded-sm cursor-pointer`} onClick={toggleBrowseOpen}>
                    <div className='w-6 h-6 shrink-0'>
                      <MenuIcon className={`${location.pathname === '/movies' || location.pathname === '/tv-series' || location.pathname === '/animes' || location.pathname === '/historys' || location.pathname === '/watchlists' ? 'fill-[#814BA6]' : 'fill-[#FFFFFF]'}  w-full h-full`}></MenuIcon>
                    </div>
                    <div className={`${location.pathname === '/movies' || location.pathname === '/tv-series' || location.pathname === '/animes' || location.pathname === '/historys' || location.pathname === '/watchlists' ? 'text-[#814BA6]' : 'text-[#FFFFFF]'}`}>
                      Menu
                    </div>
                  </button>
                </li>

                <div className={`fixed w-[90%] md:w-90 h-auto bg-[rgba(0,0,0,0.80)] right-5 bottom-17 rounded-xl p-2 ${browseOpen ? 'block' : 'hidden'}`}>
                  <div className='text-center py-1 text-md font-semibold'>Menu</div>
                  <span className='block w-full h-px bg-[rgba(255,255,255,0.50)]'></span>
                  <div className='p-2'>
                    <div className='text-[12px] text-[rgba(255,255,255,0.50)]'>CONTENT</div>
                    <div className='px-5 mt-4'>
                      <ul className='flex justify-between gap-5'>
                        <li>
                          <NavLink to='/movies' className={'flex flex-col items-center'}>
                            <div className='w-12 h-12 shrink-00'>
                              <MovieIcon className={`${location.pathname === '/movies' ? 'fill-[#814BA6]' : 'fill-[#FFFFFF]'}  w-full h-full`}></MovieIcon>
                            </div>
                            <div>Movies</div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to='/tv-series' className={'flex flex-col items-center'}>
                            <div className='w-12 h-12 shrink-00'>
                              <TvIcon className={`${location.pathname === '/tv-series' ? 'fill-[#814BA6]' : 'fill-[#FFFFFF]'}  w-full h-full`}></TvIcon>
                            </div>
                            <div>Tv Series</div>
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to='/animes' className={'flex flex-col items-center'}>
                            <div className='w-12 h-12 shrink-00'>
                              <AnimeIcon className={`${location.pathname === '/animes' ? 'fill-[#814BA6]' : 'fill-[#FFFFFF]'}  w-full h-full`}></AnimeIcon>
                            </div>
                            <div>Anime</div>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className='p-2'>
                    <div className='text-[12px] text-[rgba(255,255,255,0.50)]'>PERSONAL</div>
                    <div className='mt-4'>
                      <ul className='flex justify-between gap-3'>
                        <li className='w-full'>
                          <NavLink to='/historys' className={'flex flex-col items-center bg-[rgba(0,0,0,100)] rounded-md border border-[rgba(255,255,255,0.50)] py-3'}>
                            <div className='w-12 h-12 shrink-00'>
                              <HistoryIcon className={`${location.pathname === '/historys' ? 'fill-[#814BA6]' : 'fill-[rgba(255,255,255,0.50)]'}  w-full h-full`}></HistoryIcon>
                            </div>
                            <div className={`${location.pathname === '/historys' ? 'text-[#814BA6]' : 'text-[rgba(255,255,255,0.50)]'}`}>Historys</div>
                          </NavLink>
                        </li>

                        <li className='w-full'>
                          <NavLink onClick={() => toWatchList()} className={'flex flex-col items-center bg-[rgba(0,0,0,100)] rounded-md border border-[rgba(255,255,255,0.50)] py-3'}>
                            <div className='w-12 h-12 shrink-00'>
                              <FavoriteIcon className={`${location.pathname === '/watchlists' ? 'fill-[#814BA6]' : 'fill-[rgba(255,255,255,0.50)]'}  w-full h-full`}></FavoriteIcon>
                            </div>
                            <div className={`${location.pathname === '/watchlists' ? 'text-[#814BA6]' : 'text-[rgba(255,255,255,0.50)]'}`}>Favorites</div>
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </ul>
            </nav>


          )

      }
    </>


  )
}

export default Nav