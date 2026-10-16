import api from "../../api/api";

export const listMovie = async(page, search) => {
  try{
    const response = await api.get(`/movies?page=${page}&&search=${search}&&per_page=18`);
    return response
  }catch(err){
    return err
  }
}