import { useNavigate } from 'react-router-dom'
import logo from '../../../assets/images/logo.png'
import Nav from './Nav'

function Header() {
  const navigate = useNavigate();
  const toHome = () => {
    navigate('/')
  }
  return (
    <div className='w-full py-5 absolute top-0 z-10 '>
      <div className='flex justify-between max-w-5xl mx-auto px-2 lg:px-0'>
        <button className='cursor-pointer ' type='button' onClick={() => toHome()}>
          <div className='w-30 shrink-0 cursor-pointer ' >
            <img className='w-full h-full object-contain' src={logo} alt="" />
          </div>
        </button>

        <div>
          <Nav isTopBar={true}></Nav>
        </div>
      </div>
    </div>
  )
}

export default Header