import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import BottomBar from './BottomBar'
import Header from './header'


function MasterLayout() {
  return (
    <>
      <Header></Header>
      <main className='mb-10'>
        <Outlet></Outlet>
      </main>
      <Footer></Footer>
      <BottomBar></BottomBar>
    </>
  )
}

export default MasterLayout