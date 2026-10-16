import React, { useEffect, useState } from 'react'
import MovieIcon from '../../components/ui/MovieIcon'
import CategoryIcon from '../../components/ui/CategoryIcon'
import ProfileIcon from '../../components/ui/ProfileIcon'
import ReactApexChart from 'react-apexcharts'
import { listGeneral, listMovie, listUser } from '../../services/system/dashboard'
function Dashboard() {
  const [users, setUser] = useState([]);
  const [totalMovies, setTotalMovie] = useState(0);
  const [totalGenerals, setTotalGeneral] = useState(0);
  const [totalUsers, setTotalUser] = useState(0);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await listUser();
      const responseMovie = await listMovie();
      const responseGeneral = await listGeneral();
      const data = response.data.data.data;
      const userTotal = response.data.data.total;
      const movieTotal = responseMovie.data.data.total;
      const generalTotal = responseGeneral.data.data.total;
      setTotalUser(userTotal)
      setTotalMovie(movieTotal)
      setTotalGeneral(generalTotal)
      setUser(data)
    }
    finally {
      setLoading(false)
    }
  }

  const series = {
    monthDataSeries1: [
      { date: '2026-01-01', users: 100 },
      { date: '2026-02-01', users: 200 },
      { date: '2026-03-01', users: 150 },
      { date: '2026-04-01', users: 300 },
      { date: '2026-05-01', users: 250 },
      { date: '2026-06-01', users: 400 },
    ],
  }

  const [state, setState] = useState({
    series: [

      {
        name: 'Users',
        data: series.monthDataSeries1.map((item) => ({
          x: new Date(item.date).getTime(),
          y: item.users,

        })),

      },
    ],
    options: {
      chart: {
        type: 'area',
        height: 350,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
        foreColor: '#FFFFFF',
      },

      colors: ['#814BA6'],
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
        width: 2,
      },
      xaxis: {
        type: 'datetime',
        labels: {
          format: 'MMM yyyy',
        },
      },
      legend: {
        horizontalAlign: 'left',

      },
    },
  })

  return (
    <>
      {
        loading ? <>
          <div className='w-full h-[85vh] flex justify-center items-center flex-col gap-3'>
            <div className='border-l-2 border-t-2 boder-b-2 w-5 h-5  rounded-full animate-spin'></div>
            <div>Loading...</div>
          </div>
        </> :

          <>


            <div className='grid grid-cols-1 md:grid-cols-3 gap-3'>
              <div className='border mt-2 p-3 rounded-md border-[rgba(255,255,255,0.50)] flex gap-5'>
                <div>
                  <div className='w-7 h-7 shrink-0'>
                    <MovieIcon className={`fill-[#FFFFFF]`}></MovieIcon>
                  </div>
                  <div className='mt-4'>
                    <span className='font-bold text-4xl'>{totalMovies}</span>
                  </div>
                </div>
                <div className='text-[12px] text-[rgba(255,255,255,0.50)]'>
                  All Movies
                </div>
              </div>

              <div className='border mt-2 p-3 rounded-md border-[rgba(255,255,255,0.50)] flex gap-5'>
                <div>
                  <div className='w-7 h-7 shrink-0'>
                    <CategoryIcon className={`fill-[#FFFFFF]`}></CategoryIcon>
                  </div>
                  <div className='mt-4'>
                    <span className='font-bold text-4xl'>{totalGenerals}</span>
                  </div>
                </div>
                <div className='text-[12px] text-[rgba(255,255,255,0.50'>
                  All Generals
                </div>
              </div>

              <div className='border mt-2 p-3 rounded-md border-[rgba(255,255,255,0.50)] flex gap-5'>
                <div>
                  <div className='w-7 h-7 shrink-0'>
                    <ProfileIcon className={`fill-[#FFFFFF]`}></ProfileIcon>
                  </div>
                  <div className='mt-4'>
                    <span className='font-bold text-4xl'>{totalUsers}</span>
                  </div>
                </div>
                <div className='text-[12px] text-[rgba(255,255,255,0.50'>
                  All Users
                </div>
              </div>
            </div>

            <div className='w-full h-115 p-2 rounded-md border border-[rgba(255,255,255,0.50)] mt-3 '>
              <div className='text-[12px] text-[rgba(255,255,255,0.50)]'>
                User Monthns Overview
              </div>
              <div className='mt-3'>
                <div id="chart">
                  <ReactApexChart
                    options={state.options}
                    series={state.series}
                    type="area"
                    height={400}
                  />
                </div>
              </div>
            </div>

            <div className='border mt-2 p-3 rounded-md border-[rgba(255,255,255,0.50)]'>
              <div className='text-[12px] text-[rgba(255,255,255,0.50)]'>
                New User
              </div>
              <div className='w-full overflow-auto mt-3'>
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
          </>
      }
    </>
  )
}

export default Dashboard