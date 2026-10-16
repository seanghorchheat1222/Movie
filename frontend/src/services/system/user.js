import api from "../../api/api"

export const listUser = async(page, search) => {
  try{
    const response = await api.get(`/users??page=${page}&&search=${search}`);
    return response
  }catch(err){
    return err
  }
}