import api from "../../api/api";

export const listUserWatchList = async(id) => {
  try{
    const response = await api.get(`/get-userwatchlist/${id}`);
    return response
  }catch(err){
    return err
  }
}


