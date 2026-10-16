import logo from '../../../assets/images/logo.png'
function Footer() {
  return (
    <div className='flex justify-between max-w-5xl mx-auto px-2 lg:px-0 flex-col gap-2 py-2 mb-17 md:mb-0'>
      <div className='w-30 shrink-0'>
        <img className='w-full h-full object-contain' src={logo} alt="" />
      </div>
      <div>
        Discover your next favorite movie and enjoy every moment with us. Sit back, relax, and let the adventure begin, Contact @Movie!
      </div>
    </div>
  )
}

export default Footer