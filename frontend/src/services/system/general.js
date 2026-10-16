import api from "../../api/api"

export const listGeneral = async(page, search) => {
  try{
    const response = await api.get(`/generals??page=${page}&&search=${search}`);
    return response
  }catch(err){
    return err
  }
}

export const createGeneral= async(form) => {
  try{
    const response = await api.post('/generals', form);
    return response
  }catch(err){
    return err
  }
}

export const showGeneral = async(id) => {
  try{
    const response = await api.get(`/generals/${id}`);
    return response
  }catch(err){
    return err
  }
}

export const updateGeneral = async(id, form) => {
  try{
    const response = await api.put(`/generals/${id}`, form);
    return response
  }catch(err){
    return err
  }
}

export const deleteGeneral = async(id) => {
  try{
    const response = await api.delete(`/generals/${id}`);
    return response
  }catch(err){
    return err
  }
}