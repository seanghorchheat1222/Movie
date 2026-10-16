import { useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MasterLayout from './components/layout/website/MasterLayout'
import Home from './pages/website/Home'
import AllMovie from './pages/website/AllMovie'
import Movie from './pages/website/Movie'
import TvSeries from './pages/website/TvSeries'
import Anime from './pages/website/Anime'
import History from './pages/website/History'
import WatchList from './pages/website/WatchList'
import Detail from './pages/website/Detail'
import NotFound from './404/NotFound'
import Dashboard from './pages/system/Dashboard'
import Movies from './pages/system/Movies'
import SystemLayout from './components/layout/system/SystemLayout'
import Category from './pages/system/Category'
import General from './pages/system/General'
import Actor from './pages/system/Actor'
import User from './pages/system/User'
import Setting from './pages/system/Setting'
import Auth from './auth/Auth'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MasterLayout></MasterLayout>}>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/all-movies' element={<AllMovie></AllMovie>}></Route>
            <Route path='/movies' element={<Movie></Movie>}></Route>
            <Route path='/tv-series' element={<TvSeries></TvSeries>}></Route>
            <Route path='/animes' element={<Anime></Anime>}></Route>
            <Route path='/historys' element={<History></History>}></Route>
            <Route path='/watchlists' element={<WatchList></WatchList>}></Route>
            <Route path='/detail/:id' element={<Detail></Detail>}></Route>
          </Route>

          <Route element={<Auth></Auth>}>
            <Route path='admin' element={<SystemLayout></SystemLayout>}>
              <Route path='' element={<Dashboard></Dashboard>}></Route>
              <Route path='movies' element={<Movies></Movies>}></Route>
              <Route path='categories' element={<Category></Category>}></Route>
              <Route path='generals' element={<General></General>}></Route>
              <Route path='actors' element={<Actor></Actor>}></Route>
              <Route path='users' element={<User></User>}></Route>
              <Route path='setting' element={<Setting></Setting>}></Route>
            </Route>
          </Route>

          <Route path='*' element={<NotFound></NotFound>}></Route>
         
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
