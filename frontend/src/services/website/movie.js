import api from "../../api/api";


export const listGeneral = async() => {
  try{
    const response = await api.get(`/generals??per_page=99999999`);
    return response
  }catch(err){
    return err
  }
}

export const listMovie = async(page, general_id = 0) => {
  try{
    const response = await api.get(`/movies?page=${page}&&per_page=12&&category_id=1&&general_id=${general_id}`);
    return response
  }catch(err){
    return err
  }
}