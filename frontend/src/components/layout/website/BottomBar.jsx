import Nav from "./Nav"


function BottomBar() {
  return (
    <>
      <div className='w-full py-2 bg-[#020202] justify-center fixed bottom-0 left-0 flex md:hidden z-9'>
        <div className='w-[90%] px-2 lg:px-0'>
          <div className="w-full ">
            <Nav isTopBar={false}></Nav>
          </div>
        </div>
      </div>
    </>
  )
}

export default BottomBar