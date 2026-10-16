import React, { useEffect, useState } from 'react'
import { listUser } from '../../services/system/user';

function User() {
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('')
  
    useEffect(() => {
      fetchData()
    }, [])
  
    useEffect(() => {
      fetchData()
    }, [page])
  
    useEffect(() => {
      setTimeout(() => {
        fetchData()
      }, 1000);
    }, [search])
  
    const fetchData = async () => {
      try {
        setLoading(true)
        const response = await listUser(page, search);
        console.log(response)
        const data = response.data.data.data;
        const paginate = response.data.data
        setPagination(paginate);
        setUser(data)
      }
      finally {
        setLoading(false)
      }
    }
  

  return (
     <>
      {
        loading ?
          <>
            <div className='w-full h-[85vh] flex justify-center items-center flex-col gap-3'>
              <div className='border-l-2 border-t-2 boder-b-2 w-5 h-5  rounded-full animate-spin'></div>
              <div>Loading...</div>
            </div>
          </> :

          <>
            <div className='flex justify-between items-center flex-col-reverse md:flex-row gap-3'>
              <div className='w-full md:w-90'>
                <input type="text" className='border rounded-xl h-10 w-full pl-2' placeholder='Search name' name='search' value={search} onChange={(e) => setSearch(e.target.value)} />
              </div>
              <div className='flex justify-end w-full'>
                <button className='py-2 px-5 border rounded-full mt-1 cursor-pointer'>Search</button>
              </div>
            </div>

            <div className='border mt-2 p-3 rounded-md border-[rgba(255,255,255,0.50)]'>
              <div className='w-full overflow-auto'>
                <table className='w-full '>
                  <thead className='h-10'>
                    <tr>
                      <th className='px-4'>Id</th>
                      <th className='px-4'>Name</th>
                      <th className='px-4'>Email</th>
                      <th className='px-4'>Role</th>
                      <th className='px-4'>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      users.map((user) =>
                        <tr key={user.id} className='h-10'>
                          <td className='text-center'>{user.id}</td>
                          <td className='text-center'>{user.name}</td>
                          <td className='text-center'>{user.email}</td>
                          <td className='text-center text-nowrap'>{user.role}</td>
                          <td>
                            <div className='flex justify-center gap-2'>
                              <button className='py-1 px-3 border rounded-xl mt-1 cursor-pointer'>Active</button>
                            </div>
                          </td>
                        </tr>
                      )
                    }


                  </tbody>
                </table>
              </div>
            </div>
            <div className='flex gap-2 justify-end mt-2'>
              <button disabled={page === 1} className={`py-1 px-3 border rounded-xl mt-1 cursor-pointer ${page === 1 ? "text-[rgba(255,255,255,0.50)]" : "text-[rgba(255,255,255,100)]"}`} onClick={() => setPage(pagination.current_page - 1)}>Prev</button>
              <button disabled={page === pagination.last_page} className={`py-1 px-3 border rounded-xl mt-1 cursor-pointer ${page === pagination.last_page ? "text-[rgba(255,255,255,0.50)]" : "text-[rgba(255,255,255,100)]"}`} onClick={() => setPage(pagination.current_page + 1)}>Next</button>
            </div>
          </>
      }


    </>
  )
}

export default User