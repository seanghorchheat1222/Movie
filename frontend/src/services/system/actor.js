import api from "../../api/api"

export const listActor = async(page, search) => {
  try{
    const response = await api.get(`/actors??page=${page}&&search=${search}`);
    return response
  }catch(err){
    return err
  }
}

export const createActor = async(form) => {
  try{
    const response = await api.post('/actors', form);
    return response
  }catch(err){
    return err
  }
}

export const showActor = async(id) => {
  try{
    const response = await api.get(`/actors/${id}`);
    return response
  }catch(err){
    return err
  }
}

export const updateActor = async(id, form) => {
  try{
    const response = await api.put(`/actors/${id}`, form);
    return response
  }catch(err){
    return err
  }
}

export const deleteActor = async(id) => {
  try{
    const response = await api.delete(`/actors/${id}`);
    return response
  }catch(err){
    return err
  }
}