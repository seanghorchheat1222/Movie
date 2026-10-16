import api from "../../api/api"

export const listCategory = async(page) => {
  try{
    const response = await api.get(`/categories??page=${page}`);
    return response
  }catch(err){
    return err
  }
}

export const createCategory = async(form) => {
  try{
    const response = await api.post('/categories', form);
    return response
  }catch(err){
    return err
  }
}

export const showCategory = async(id) => {
  try{
    const response = await api.get(`/categories/${id}`);
    return response
  }catch(err){
    return err
  }
}

export const updateCategory = async(id, form) => {
  try{
    const response = await api.put(`/categories/${id}`, form);
    return response
  }catch(err){
    return err
  }
}

export const deleteCategory = async(id) => {
  try{
    const response = await api.delete(`/categories/${id}`);
    return response
  }catch(err){
    return err
  }
}