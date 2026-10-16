import api from "../../api/api";

export const listUser = async() => {
  try{
    const response = await api.get(`/users`);
    return response
  }catch(err){
    return err
  }
}

export const listMovie = async() => {
  try{
    const response = await api.get(`/movies`);
    return response
  }catch(err){
    return err
  }
}


export const listGeneral = async() => {
  try{
    const response = await api.get(`/generals`);
    return response
  }catch(err){
    return err
  }
}