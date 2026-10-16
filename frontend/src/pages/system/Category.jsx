import React, { useEffect, useState } from 'react'
import { createCategory, deleteCategory, listCategory, showCategory, updateCategory } from '../../services/system/category';

function Category() {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addForm, setAddForm] = useState({
    name: '',
    description: ''
  })

  const [editForm, setEditForm] = useState({
    id: '',
    name: '',
    description: ''
  })
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [page])

  const fetchCategories = async () => {
    try {
      setLoading(true)
      const response = await listCategory(page);
      const data = response.data.data.data;
      const paginate = response.data.data
      setPagination(paginate);
      setCategories(data)
    } finally {
      setLoading(false)
    }
  }

  const toggleAddOpen = () => {
    setAddOpen(!addOpen)
  }

  const handleAddInput = (e) => {
    const { name, value } = e.target;

    setAddForm({
      ...addForm, [name]: value
    })
  }

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await createCategory(addForm)
    fetchCategories()
    setAddOpen(false)
  }

  const toggleEditOpen = async (id) => {
    const response = await showCategory(id);
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

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    await updateCategory(editForm.id, editForm);
    fetchCategories()
    setEditOpen(false)
  }

  const handleDelete = async (id) => {
    await deleteCategory(id);
    fetchCategories()
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
            <div className='flex justify-end'>
              <button className='py-2 px-5 border rounded-full mt-1 cursor-pointer' onClick={() => toggleAddOpen()}>Add New Category</button>
            </div>

            <div className='border mt-2 p-3 rounded-md border-[rgba(255,255,255,0.50)]'>
              <div className='w-full overflow-auto'>
                <table className='w-full '>
                  <thead className='h-10'>
                    <tr>
                      <th className='px-4'>Id</th>
                      <th className='px-4'>Name</th>
                      <th className='px-4'>Description</th>
                      <th className='px-4'>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      categories.map((category) =>
                        <tr key={category.id} className='h-10'>
                          <td className='text-center'>{category.id}</td>
                          <td className='text-center'>{category.name}</td>
                          <td className='text-center text-nowrap'>{category.description}</td>
                          <td>
                            <div className='flex justify-center gap-2'>
                              <button className='py-1 px-3 border rounded-xl mt-1 cursor-pointer' onClick={() => toggleEditOpen(category.id)}>Edit</button>
                              <button className='py-1 px-3 border rounded-xl mt-1 cursor-pointer' onClick={() => handleDelete(category.id)}>Delete</button>
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
                    Add New Category
                  </div>
                  <form action="" className='mt-3' onSubmit={handleAddSubmit}>
                    <div className='flex gap-2 mt-2 flex-col'>
                      <label htmlFor="">Name</label>
                      <input type="text" className='border rounded-xl h-10 w-full pl-2' placeholder='Enter Name' name='name' onChange={handleAddInput} value={addForm.name} />
                    </div>
                    <div className='flex gap-2 mt-2 flex-col'>
                      <label htmlFor="">Description</label>
                      <textarea type="text" className='border rounded-xl h-30 w-full pl-2 pt-2' placeholder='Enter Description' name='description' onChange={handleAddInput} value={addForm.description} />
                    </div>

                    <div className='flex justify-end gap-2 mt-2' >
                      <button className='py-2 px-5 border rounded-full mt-1 cursor-pointer' onClick={() => setAddOpen(false)}>Cancel</button>
                      <button className='py-2 px-5 border rounded-full mt-1 cursor-pointer' type='submit'>Add</button>
                    </div>

                  </form>
                  <div className='flex flex-col gap-1 absolute top-3 right-3 cursor-pointer' onClick={() => setAddOpen(false)}>
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
                    Edit Category
                  </div>
                  <form action="" className='mt-3' onSubmit={handleUpdateSubmit}>
                    <div className='flex gap-2 mt-2 flex-col'>
                      <label htmlFor="">Name</label>
                      <input type="text" className='border rounded-xl h-10 w-full pl-2' placeholder='Enter Name' name='name' value={editForm.name} onChange={handleEditInput} />
                    </div>
                    <div className='flex gap-2 mt-2 flex-col'>
                      <label htmlFor="">Description</label>
                      <textarea type="text" className='border rounded-xl h-30 w-full pl-2 pt-2' placeholder='Enter Description' name='description' value={editForm.description} onChange={handleEditInput} />
                    </div>

                    <div className='flex justify-end gap-2 mt-2' >
                      <button className='py-2 px-5 border rounded-full mt-1 cursor-pointer' onClick={() => setEditOpen(false)}>Cancel</button>
                      <button className='py-2 px-5 border rounded-full mt-1 cursor-pointer' type='submit'>Confirm</button>
                    </div>

                  </form>
                  <div className='flex flex-col gap-1 absolute top-3 right-3 cursor-pointer' onClick={() => setEditOpen(false)}>
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

export default Category