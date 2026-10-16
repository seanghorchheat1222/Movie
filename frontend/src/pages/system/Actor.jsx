import React, { useEffect, useState } from 'react'
import { createActor, deleteActor, listActor, showActor, updateActor } from '../../services/system/actor';
import { Form } from 'react-router-dom';

function Actor() {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [actors, setActor] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    age: '',
    description: ''
  })

  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    age: '',
    description: '',
    image: ''
  })
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('')
  const [imageInput, setImageInput] = useState(null);
  const [imagePreview, setImagePreview] = useState('')

  useEffect(() => {
    fetchActor()
  }, [])

  useEffect(() => {
    fetchActor()
  }, [page])

  useEffect(() => {
    setTimeout(() => {
      fetchActor()
    }, 1000);
  }, [search])

  const fetchActor = async () => {
    try {
      setLoading(true)
      const response = await listActor(page, search);
      console.log(response)
      const data = response.data.data.data;
      const paginate = response.data.data
      setPagination(paginate);
      setActor(data)
    }
    finally {
      setLoading(false)
      setImageInput(null)
      setImagePreview('')
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

  const handleImageInput = (e) => {
    const file = e.target.files?.[0] ?? null;
    setImageInput(file);
    setImagePreview(file ? URL.createObjectURL(file) : '')
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
    formData.append('name', addForm.name);
    formData.append('age', addForm.age);
    formData.append('description', addForm.description);

    if (imageInput) {
      formData.append('image', imageInput);
    }

    await createActor(formData)
    fetchActor()
    setAddForm({
      name: '',
      age: '',
      description: ''
    })
    setAddOpen(false)
  }

  const toggleEditOpen = async (id) => {
    const response = await showActor(id);
    const data = response.data.data
    setEditForm(data);
    setEditOpen(!editOpen)
  }

  const handleEditInput = (e) => {
    const { name, value } = e.target;

    setEditForm({
      ...editForm, [name]: value
    })
  }

  const closeEditOpen = () => {
    setEditOpen(false)
    setImageInput(null);
    setImagePreview('')
  }

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData()
    formData.append('name', editForm.name);
    formData.append('age', editForm.age);
    formData.append('description', editForm.description);
    if (imageInput) {
      formData.append('image', imageInput);
    }
    await updateActor(editForm.id, formData);
    fetchActor()
    setEditOpen(false)
  }

  const handleDelete = async (id) => {
    await deleteActor(id);
    fetchActor()
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
                <button className='py-2 px-5 border rounded-full mt-1 cursor-pointer' onClick={() => toggleAddOpen()}>Add New Actor</button>
              </div>
            </div>

            <div className='border mt-2 p-3 rounded-md border-[rgba(255,255,255,0.50)]'>
              <div className='w-full overflow-auto'>
                <table className='w-full '>
                  <thead className='h-10'>
                    <tr>
                      <th className='px-4'>Id</th>
                      <th className='px-4'>Image</th>
                      <th className='px-4'>Name</th>
                      <th className='px-4'>Age</th>
                      <th className='px-4'>Description</th>
                      <th className='px-4'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      actors.map((actor) =>
                        <tr key={actor.id} className='h-10'>
                          <td className='text-center'>{actor.id}</td>
                          <td className='text-center'>
                            <div className='flex justify-center'>
                              <div className='w-30 h-30 shrink-0 p-2'>
                                <img src={`${import.meta.env.VITE_IMAGE_API_URL}${actor.image}`} alt="" className='w-full h-full object-cover' />
                              </div>
                            </div>
                          </td>
                          <td className='text-center whitespace-nowrap px-2'>{actor.name}</td>
                          <td className='text-center'>{actor.age}</td>
                          <td className='text-center text-nowrap'>{actor.description}</td>
                          <td>
                            <div className='flex justify-center gap-2'>
                              <button className='py-1 px-3 border rounded-xl mt-1 cursor-pointer' onClick={() => toggleEditOpen(actor.id)}>Edit</button>
                              <button className='py-1 px-3 border rounded-xl mt-1 cursor-pointer' onClick={() => handleDelete(actor.id)}>Delete</button>
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
                <div className='border mt-2 p-3 rounded-md border-[rgba(255,255,255,0.50)] w-[90%] md:w-[60%] bg-[#020202] relative'>
                  <div className='mb-2 font-semibold text-[#814BA6]'>
                    Add New Actor
                  </div>
                  <form action="" className='mt-3' onSubmit={handleAddSubmit}>
                    <div className='flex gap-2 mt-2 flex-col'>
                      <label htmlFor="">Name</label>
                      <input type="text" className='border rounded-xl h-10 w-full pl-2' placeholder='Enter Name' name='name' onChange={handleAddInput} value={addForm.name} />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                      <div className='flex gap-2 mt-2 flex-col'>
                        <label htmlFor="">Age</label>
                        <input type="number" className='border rounded-xl h-10 w-full pl-2' placeholder='Enter Age' name='age' onChange={handleAddInput} value={addForm.age} />
                      </div>
                      <div>
                        <label htmlFor="">Image Preview</label>
                        <div className='flex justify-center mt-2'>
                          <div className='border border-dashed h-50 w-50 rounded-md relative'>
                            <img src={imagePreview} alt="select img" className='w-full h-full object-cover' />
                            <input name='image' onChange={handleImageInput} type="file" className='w-full h-full absolute top-0 opacity-0' />
                          </div>
                        </div>
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
              editOpen &&
              <div className='fixed bg-[rgba(0,0,0,0.20)] w-full h-full top-0 left-0 z-20 backdrop-blur-[2px] flex justify-center items-center'>
                <div className='border mt-2 p-3 rounded-md border-[rgba(255,255,255,0.50)] w-[90%] md:w-[60%] bg-[#020202] relative'>
                  <div className='mb-2 font-semibold text-[#814BA6]'>
                    Edit Actor
                  </div>
                  <form action="" className='mt-3' onSubmit={handleUpdateSubmit}>
                    <div className='flex gap-2 mt-2 flex-col'>
                      <label htmlFor="">Name</label>
                      <input type="text" className='border rounded-xl h-10 w-full pl-2' placeholder='Enter Name' name='name' onChange={handleEditInput} value={editForm.name} />
                    </div>
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mt-4'>
                      <div className='flex gap-2 mt-2 flex-col'>
                        <label htmlFor="">Age</label>
                        <input type="number" className='border rounded-xl h-10 w-full pl-2' placeholder='Enter Age' name='age' onChange={handleEditInput} value={editForm.age} />
                      </div>
                      <div>
                        <label htmlFor="">Image Preview</label>
                        <div className='flex justify-center mt-2'>
                          <div className='border border-dashed h-50 w-50 rounded-md relative'>
                            <img src={imagePreview !== '' ? imagePreview : `${import.meta.env.VITE_IMAGE_API_URL}${editForm.image}`} alt="select img" className='w-full h-full object-cover' />
                            <input name='image' onChange={handleImageInput} type="file" className='w-full h-full absolute top-0 opacity-0' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='flex gap-2 mt-2 flex-col'>
                      <label htmlFor="">Description</label>
                      <textarea type="text" className='border rounded-xl h-30 w-full pl-2 pt-2' placeholder='Enter Description' name='description' value={editForm.description} onChange={handleEditInput} />
                    </div>

                    <div className='flex justify-end gap-2 mt-2' >
                      <button className='py-2 px-5 border rounded-full mt-1 cursor-pointer' onClick={() => closeEditOpen()}>Cancel</button>
                      <button className='py-2 px-5 border rounded-full mt-1 cursor-pointer' type='submit'>Confirm</button>
                    </div>

                  </form>
                  <div className='flex flex-col gap-1 absolute top-3 right-3 cursor-pointer' onClick={() => closeEditOpen()}>
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

export default Actor