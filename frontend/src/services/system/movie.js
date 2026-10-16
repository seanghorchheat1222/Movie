import api from "../../api/api"

export const listGeneral = async() => {
  try{
    const response = await api.get(`/generals??per_page=99999999`);
    return response
  }catch(err){
    return err
  }
}


export const listCategory = async(page) => {
  try{
    const response = await api.get(`/categories??per_page=9999999`);
    return response
  }catch(err){
    return err
  }
}

export const listActor = async() => {
  try{
    const response = await api.get(`/actors??per_page=9999999`);
    return response
  }catch(err){
    return err
  }
}

export const listMovie = async(page, search) => {
  try{
    const response = await api.get(`/movies??page=${page}&&search=${search}`);
    return response
  }catch(err){
    return err
  }
}

export const createMovie= async(form) => {
  try{
    const response = await api.post('/movies', form);
    return response
  }catch(err){
    return err
  }
}

export const showMovie = async(id) => {
  try{
    const response = await api.get(`/movies/${id}`);
    return response
  }catch(err){
    return err
  }
}



export const deleteMovie = async(id) => {
  try{
    const response = await api.delete(`/movies/${id}`);
    return response
  }catch(err){
    return err
  }
}