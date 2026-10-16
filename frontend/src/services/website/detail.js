import api from "../../api/api";

export const showMovie = async(id) => {
  try{
    const response = await api.get(`/movies/${id}`);
    return response
  }catch(err){
    return err
  }
}

export const listUserWatchList = async(id) => {
  try{
    const response = await api.get(`/get-userwatchlist/${id}`);
    return response
  }catch(err){
    return err
  }
}


export const SaveUserWatchList = async(data) => {
  try{
    const response = await api.post(`/userwatchlists`, data);
    return response
  }catch(err){
    return err
  }
}

export const DeleteUserWatchList = async(id) => {
  try{
    const response = await api.delete(`/userwatchlists/${id}`);
    return response
  }catch(err){
    return err
  }
}