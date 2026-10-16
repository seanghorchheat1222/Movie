import React, { useEffect, useState } from 'react'
import { createMovie, deleteMovie, listActor, listCategory, listGeneral, listMovie, showMovie } from '../../services/system/movie';
import PlayIcon from '../../components/ui/PlayIcon';



function Movies() {
  const [addOpen, setAddOpen] = useState(false);
  const [viewOpen, setViewOpen] = useState(false);
  const [actors, setActor] = useState([]);
  const [categories, setCategory] = useState([]);
  const [generals, setGeneral] = useState([]);
  const [movies, setMovie] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addForm, setAddForm] = useState({
    category_id: '',
    title: '',
    release_date: '',
    runtime: '',
    description: ''
  })


  const [preActor, setPreActor] = useState([])
  const [preGeneral, setPreGeneral] = useState([])

  const handleSelectActor = (actorId) => {
    setPreActor((prev) =>
      prev.some((actor) => actor.actor_id === actorId) ? prev.filter((actor) => actor.actor_id !== actorId) : [...prev, { actor_id: actorId }]
    )
  }

  const handleSelectGeneral = (generalId) => {
    setPreGeneral((prev) =>
      prev.some((general) => general.general_id === generalId) ? prev.filter((general) => general.general_id !== generalId) : [...prev, { general_id: generalId }]
    )
  }

  const [viewForm, setViewForm] = useState({})
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')
  const [posterInput, setPosterInput] = useState(null);
  const [posterPreview, setPosterPreview] = useState('')
  const [bannerInput, setBannerInput] = useState(null);
  const [bannerPreview, setBannerPreview] = useState('')
  const [actorDropDown, setActorDropDown] = useState(false);
  const [generalDropDown, setGeneralDropDown] = useState(false);
  const [videos, setVideo] = useState([])


  useEffect(() => {
    fetchMovie()
  }, [])

  useEffect(() => {
    fetchMovie()
  }, [page])

  useEffect(() => {
    setTimeout(() => {
      fetchMovie()
    }, 1000);
  }, [search])

  const fetchMovie = async () => {
    try {
      setLoading(true)
      const response = await listMovie(page, search);
      const responseActor = await listActor();
      const responsecategory = await listCategory();
      const responseGeneral = await listGeneral();
      const data = response.data.data.data;
      const dataActor = responseActor.data.data.data;
      const dataCategory = responsecategory.data.data.data;
      const dataGenernal = responseGeneral.data.data.data;
      const paginate = response.data.data
      setPagination(paginate);
      setMovie(data)
      setActor(dataActor)
      setCategory(dataCategory)
      setGeneral(dataGenernal);
    }
    finally {
      setLoading(false);
    }
  }

  const toggleAddOpen = () => {
    setAddOpen(!addOpen)
  }

  const closeAddOpen = () => {
    setAddOpen(false)
    setImageInput(null);
    setImagePreview('')
  }

  const toggleActorDropDown = () => {
    setActorDropDown(!actorDropDown)
  }

  const toggleGeneralDropDown = () => {
    setGeneralDropDown(!generalDropDown)
  }

  const handleVideoInput = (e) => {
    const file = e.target.files[0];

    if (file) {
      setVideo((prev) => [
        ...prev, {
          video: file,
          preview: URL.createObjectURL(file),
        },
      ]);
    }

    e.target.value = '';
  }

  const handlePosterInput = (e) => {
    const file = e.target.files?.[0] ?? null;
    setPosterInput(file);
    setPosterPreview(file ? URL.createObjectURL(file) : '')
  }

  const handleBannerInput = (e) => {
    const file = e.target.files?.[0] ?? null;
    setBannerInput(file);
    setBannerPreview(file ? URL.createObjectURL(file) : '')
  }

  const handleAddInput = (e) => {
    const { name, value } = e.target;

    setAddForm({
      ...addForm, [name]: value
    })
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('category_id', addForm.category_id);
    formData.append('title', addForm.title);
    formData.append('runtime', addForm.runtime);
    formData.append('release_date', addForm.release_date)
    formData.append('description', addForm.description);

    if (posterInput) {
      formData.append('poster', posterInput);
    }

    if (bannerInput) {
      formData.append('banner', bannerInput);
    }

    preActor.forEach((actor, index) => {
      formData.append(`actors[${index}][actor_id]`, actor.actor_id)
    })

    preGeneral.forEach((general, index) => {
      formData.append(`generals[${index}][general_id]`, general.general_id)
    })


    videos.forEach((video, index) => {
      formData.append(`videos[${index}][video]`, video.video)
    })

    const response = await createMovie(formData)
    console.log("movies-create" + response)
    fetchMovie()
    setAddForm({
      category_id: '',
      title: '',
      release_date: '',
      runtime: '',
      description: ''
    })
    setPosterInput(null)
    setPosterPreview('')
    setBannerInput(null)
    setBannerPreview('')
    setVideo([])
    setPreActor([])
    setPreGeneral([])
    setAddOpen(false)
  }

  const toggleViewOpen = async (id) => {
    const response = await showMovie(id);
    const data = response.data.data
    setViewForm(data);
    setViewOpen(!viewOpen)
  }


  const handleDelete = async (id) => {
    const response = await deleteMovie(id);
    console.log(response)
    fetchMovie()
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
                <button className='py-2 px-5 border rounded-full mt-1 cursor-pointer' onClick={() => toggleAddOpen()}>Add New Movie</button>
              </div>
            </div>

            <div className='border mt-2 p-3 rounded-md border-[rgba(255,255,255,0.50)]'>
              <div className='w-full overflow-auto'>
                <table className='w-full '>
                  <thead className='h-10'>
                    <tr>
                      <th className='px-4'>Id</th>
                      <th className='px-4'>Poster</th>
                      <th className='px-4'>Title</th>
                      <th className='px-4'>Category</th>
                      <th className='px-4'>Release_date</th>
                      <th className='px-4'>Runtime</th>
                      <th className='px-4'>Description</th>
                      <th className='px-4'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      movies.map((movie) =>
                        <tr key={movie.id} className='h-10'>
                          <td className='text-center'>{movie.id}</td>
                          <td className='text-center'>
                            <div className='flex justify-center'>
                              <div className='w-25 h-30 shrink-0 p-2'>
                                <img src={`${import.meta.env.VITE_IMAGE_API_URL}${movie.poster}`} alt="" className='w-full h-full object-cover' />
                              </div>
                            </div>
                          </td>
                          <td className='text-center whitespace-nowrap px-2'>{movie.title}</td>
                          <td className='text-center whitespace-nowrap px-2'>{movie.category.name}</td>
                          <td className='text-center'>{movie.release_date}</td>
                          <td className='text-center'>{movie.runtime}mins</td>
                          <td className='text-center px-2'>
                            <div>
                              <div className='line-clamp-2 '>
                                {movie.description}
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className='flex justify-center gap-2'>
                              <button className='py-1 px-3 border rounded-xl mt-1 cursor-pointer' onClick={() => toggleViewOpen(movie.id)} type='button'>Detail</button>
                              <button className='py-1 px-3 border rounded-xl mt-1 cursor-pointer' onClick={() => handleDelete(movie.id)}>Delete</button>
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

            {
              addOpen &&
              <div className='fixed bg-[rgba(0,0,0,0.20)] w-full h-full top-0 left-0 z-20 backdrop-blur-[2px] flex justify-center items-center'>
                <div className='border mt-2 p-3 rounded-md border-[rgba(255,255,255,0.50)] w-[90%] md:w-[60%] bg-[#020202] relative h-[97%] overflow-auto'>
                  <div className='mb-2 font-semibold text-[#814BA6]'>
                    Add New Movie
                  </div>
                  <form action="" className='mt-3' onSubmit={handleAddSubmit}>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                      <div className='flex gap-2 mt-2 flex-col'>
                        <label htmlFor="">Title</label>
                        <input type="text" className='border rounded-xl h-10 w-full pl-2' placeholder='Enter Title' name='title' onChange={handleAddInput} value={addForm.title} />
                      </div>

                      <div className='flex gap-2 mt-2 flex-col '>
                        <label htmlFor="">Category</label>
                        <div className='border rounded-xl h-10 w-full px-2'>
                          <select type="text" placeholder='Enter Name' name='category_id' className='w-full border-none h-full outline-0' onChange={handleAddInput} >
                            <option value=" " className='text-[#020202]'>Select Category</option>
                            {
                              categories.map((category) =>
                                <option key={category.id} value={category.id} className='text-[#020202]'>{category.name}</option>
                              )
                            }
                          </select>
                        </div>

                      </div>
                    </div>


                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                      <div className='flex gap-2 mt-2 flex-col'>
                        <label htmlFor="">Actor</label>
                        <div className='flex relative ' >
                          <input type="text" readOnly className='border rounded-xl h-10 w-full pl-2' placeholder='Enter Name' name='name' value={'Select Actor'} />
                          <button type='button' className='absolute right-1 top-[50%] translate-y-[-50%] cursor-pointer  p-0.5' onClick={() => toggleActorDropDown()}>
                            <div className={`w-6 h-6 shrink-0  ${actorDropDown ? 'rotate-90' : 'rotate-30'} `}>
                              <PlayIcon className='fill-[rgba(255,255,255,100)]'></PlayIcon>
                            </div>
                          </button>
                          <div className={`bg-[rgba(255,255,255,100)] w-full absolute left-0 top-[100%] rounded-md p-2 z-20 ${actorDropDown ? 'block' : 'hidden'} `}>
                            {
                              actors.map((actor) =>
                                <button type='button' key={actor.id} className=' w-full'>
                                  <div className='border border-[#020202] flex gap-2 px-2 py-1 rounded-md'>
                                    <input type="checkbox" checked={preActor.some((item) => item.actor_id === actor
                                      .id)} onChange={() => handleSelectActor(actor.id)} />
                                    <div className='text-[#020202]'>{actor.name}</div>
                                  </div>
                                </button>
                              )
                            }
                          </div>
                        </div>
                        <div>
                        </div>
                      </div>
                      <div className='flex gap-2 mt-2 flex-col'>
                        <label htmlFor="">General</label>
                        <div className='flex relative ' >
                          <input type="text" readOnly className='border rounded-xl h-10 w-full pl-2' placeholder='Enter Name' name='name' value={'Select General'} />
                          <button type='button' className='absolute right-1 top-[50%] translate-y-[-50%] cursor-pointer  p-0.5' onClick={() => toggleGeneralDropDown()}>
                            <div className={`w-6 h-6 shrink-0  ${generalDropDown ? 'rotate-90' : 'rotate-30'} `}>
                              <PlayIcon className='fill-[rgba(255,255,255,100)]'></PlayIcon>
                            </div>
                          </button>
                          <div className={`bg-[rgba(255,255,255,100)] w-full absolute left-0 top-[100%] rounded-md p-2 z-20 ${generalDropDown ? 'block' : 'hidden'} `}>
                            {
                              generals.map((general) =>
                                <button type='button' key={general.id} className='cursor-pointer w-full'>
                                  <div className='border border-[#020202] flex gap-2 px-2 py-1 rounded-md'>
                                    <input type="checkbox" checked={preGeneral.some((item) => item.general_id === general.id)} onChange={() => handleSelectGeneral(general.id)} />
                                    <div className='text-[#020202]'>{general.name}</div>
                                  </div>
                                </button>
                              )
                            }
                          </div>
                        </div>
                        <div>
                        </div>
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                      <div>
                        <label htmlFor="">Poster Preview</label>
                        <div className='flex justify-center mt-2'>
                          <div className='border border-dashed h-50 w-40 rounded-md relative'>
                            <img src={posterPreview} alt="select img" className='w-full h-full object-cover' />
                            <input name='poster' onChange={handlePosterInput} type="file" className='w-full h-full absolute top-0 opacity-0' />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="">Banner Preview</label>
                        <div className='flex justify-center mt-2'>
                          <div className='border border-dashed h-50 w-70 rounded-md relative'>
                            <img src={bannerPreview} alt="select img" className='w-full h-full object-cover' />
                            <input name='banner' onChange={handleBannerInput} type="file" className='w-full h-full absolute top-0 opacity-0' />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='flex gap-2 mt-4 flex-col'>
                      <div className='flex justify-between'>
                        <label htmlFor="">Videos</label>
                        <div>
                          <button className='px-5 py-1  border rounded-xl mt-1 cursor-pointer relative' >
                            Add Video
                            <input type="file" name="" id="" className='absolute top-0 left-0 w-full h-full opacity-0 z-0 cursor-pointer' onChange={handleVideoInput} /></button>
                        </div>
                      </div>
                      <div className='border rounded-xl h-auto w-full p-2 '>
                        {/* display video here as preview */}
                        {
                          videos.length !== 0 ? <>
                            {
                              videos.map((video, index) =>
                                <div key={index} className='border border-[rgba(255,255,255,0.50)] mb-2 h-max w-full rounded-xl flex flex-col-reverse md:flex-row gap-2'>
                                  <div className='w-50 h-30 '>
                                    <video
                                      key={index}
                                      src={video.preview}
                                      controls
                                      className="w-full rounded-xl"
                                    />
                                  </div>
                                  <div className='mt-1 font-bold'>
                                    Video #{index}
                                  </div>
                                </div>
                              )
                            }
                          </>
                            :
                            <div>
                              Not Video Upload yet!
                            </div>
                        }
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                      <div className='flex gap-2 mt-2 flex-col'>
                        <label htmlFor="">Release_date</label>
                        <input type="date" className='border rounded-xl h-10 w-full pl-2  [&::-webkit-calendar-picker-indicator]:invert pr-2' name='release_date' onChange={handleAddInput} value={addForm.release_date} />
                      </div>
                      <div className='flex gap-2 mt-2 flex-col'>
                        <label htmlFor="">Runtime</label>
                        <input type="number" className='border rounded-xl h-10 w-full pl-2 ' placeholder='Enter Runtime' onChange={handleAddInput} name='runtime' value={addForm.runtime} />
                      </div>
                    </div>

                    <div className='flex gap-2 mt-2 flex-col'>
                      <label htmlFor="">Description</label>
                      <textarea type="text" className='border rounded-xl h-30 w-full pl-2 pt-2' placeholder='Enter Description' name='description' onChange={handleAddInput} value={addForm.description} />
                    </div>

                    <div className='flex justify-end gap-2 mt-2' >
                      <button className='py-2 px-5 border rounded-full mt-1 cursor-pointer' onClick={() => closeAddOpen()}>Cancel</button>
                      <button className='py-2 px-5 border rounded-full mt-1 cursor-pointer' type='submit'>Add</button>
                    </div>

                  </form>
                  <div className='flex flex-col gap-1 absolute top-3 right-3 cursor-pointer' onClick={() => closeAddOpen()}>
                    <span className='inline-block w-7 h-0.75 bg-[rgba(255,255,255,100)] rotate-45 mt-3'></span>
                    <span className='inline-block w-7 h-0.75 bg-[rgba(255,255,255,100)] -rotate-45 -mt-1.5'></span>
                  </div>
                </div>
              </div>
            }

            {
              viewOpen &&
              <div className='fixed bg-[rgba(0,0,0,0.20)] w-full h-full top-0 left-0 z-20 backdrop-blur-[2px] flex justify-center items-center'>
                <div className='border mt-2 p-3 rounded-md border-[rgba(255,255,255,0.50)] w-[90%] md:w-[60%] bg-[#020202] relative h-[97%] overflow-auto'>
                  <div className='mb-2 font-semibold text-[#814BA6]'>
                    Detail Movie
                  </div>
                  <form action="" className='mt-3' onSubmit={handleAddSubmit}>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                      <div className='flex gap-2 mt-2 flex-col'>
                        <label htmlFor="">Title</label>
                        <input type="text" className='border rounded-xl h-10 w-full pl-2' placeholder='Enter Name' name='title' value={viewForm?.title} />
                      </div>

                      <div className='flex gap-2 mt-2 flex-col '>
                        <label htmlFor="">Category</label>
                        <input type="text" className='border rounded-xl h-10 w-full pl-2' placeholder='Enter Name' name='title' value={viewForm?.category?.name} />
                      </div>
                    </div>


                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                      <div className='flex gap-2 mt-2 flex-col '>
                        <label htmlFor="">Actor</label>
                        <div className='border rounded-xl h-10 w-full px-2'>
                          <select type="text" placeholder='Enter Name' name='category_id' className='w-full border-none h-full outline-0'  >
                            <option value=" " className='text-[#020202]'>View Actor</option>
                            {
                              viewForm?.movie_actors?.map((actor) =>
                                <option key={actor.id} value={actor.id} className='text-[#020202]'>{actor.actor.name}</option>
                              )
                            }
                          </select>
                        </div>

                      </div>
                      <div className='flex gap-2 mt-2 flex-col '>
                        <label htmlFor="">General</label>
                        <div className='border rounded-xl h-10 w-full px-2'>
                          <select type="text" placeholder='Enter Name' name='category_id' className='w-full border-none h-full outline-0'  >
                            <option value=" " className='text-[#020202]'>View General</option>
                            {
                              viewForm?.movie_generals?.map((general) =>
                                <option key={general.id} value={general.id} className='text-[#020202]'>{general.general.name}</option>
                              )
                            }
                          </select>
                        </div>

                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                      <div>
                        <label htmlFor="">Poster Preview</label>
                        <div className='flex justify-center mt-2'>
                          <div className='border border-dashed h-50 w-40 rounded-md relative'>
                            <img src={`${import.meta.env.VITE_IMAGE_API_URL}${viewForm?.poster}`} alt="select img" className='w-full h-full object-cover' />
                            <input name='poster' onChange={handlePosterInput} type="file" className='w-full h-full absolute top-0 opacity-0' />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label htmlFor="">Banner Preview</label>
                        <div className='flex justify-center mt-2'>
                          <div className='border border-dashed h-50 w-70 rounded-md relative'>
                            <img src={`${import.meta.env.VITE_IMAGE_API_URL}${viewForm?.banner}`} alt="select img" className='w-full h-full object-cover' />
                            <input name='banner' onChange={handleBannerInput} type="file" className='w-full h-full absolute top-0 opacity-0' />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='flex gap-2 mt-4 flex-col'>
                      <div className='flex justify-start'>
                        <label htmlFor="">Videos</label>
                      </div>
                      <div className='border rounded-xl h-auto w-full p-2 '>
                        {/* display video here as preview */}
                        {
                          viewForm?.movie_videos?.length !== 0 ? <>
                            {
                              viewForm?.movie_videos?.map((video, index) =>
                                <div key={index} className='border border-[rgba(255,255,255,0.50)] mb-2 h-full w-full rounded-xl flex flex-col-reverse md:flex-row gap-2'>
                                  <div className='w-50 h-30 '>
                                    <video
                                      key={index}
                                      src={`${import.meta.env.VITE_IMAGE_API_URL}${video.video}`}
                                      controls
                                      className="w-full h-full rounded-xl"
                                    />
                                  </div>
                                  <div className='mt-1 font-bold'>
                                    Video #{index}
                                  </div>
                                </div>
                              )
                            }
                          </>
                            :
                            <div>
                              No Video Upload yet!
                            </div>
                        }
                      </div>
                    </div>

                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                      <div className='flex gap-2 mt-2 flex-col'>
                        <label htmlFor="">Release_date</label>
                        <input type="date" className='border rounded-xl h-10 w-full pl-2  [&::-webkit-calendar-picker-indicator]:invert pr-2' name='release_date' value={viewForm?.release_date} />
                      </div>
                      <div className='flex gap-2 mt-2 flex-col'>
                        <label htmlFor="">Runtime</label>
                        <input type="number" className='border rounded-xl h-10 w-full pl-2 ' placeholder='Enter Runtime' name='runtime' value={viewForm?.runtime} />
                      </div>
                    </div>

                    <div className='flex gap-2 mt-2 flex-col'>
                      <label htmlFor="">Description</label>
                      <textarea type="text" className='border rounded-xl h-30 w-full pl-2 pt-2' placeholder='Enter Description' name='description' value={viewForm?.description} />
                    </div>

                    <div className='flex justify-end gap-2 mt-2' >
                      <button className='py-2 px-5 border rounded-full mt-1 cursor-pointer' onClick={() => setViewOpen(false)}>Close</button>
                    </div>

                  </form>
                  <div className='flex flex-col gap-1 absolute top-3 right-3 cursor-pointer' onClick={() => setViewOpen(false)}>
                    <span className='inline-block w-7 h-0.75 bg-[rgba(255,255,255,100)] rotate-45 mt-3'></span>
                    <span className='inline-block w-7 h-0.75 bg-[rgba(255,255,255,100)] -rotate-45 -mt-1.5'></span>
                  </div>
                </div>
              </div>
            }
          </>
      }


    </>
  )
}

export default Movies