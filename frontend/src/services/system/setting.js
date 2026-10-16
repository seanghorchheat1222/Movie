import api from "../../api/api"

export const signOut = async(token) => {
  try{
    const response = await api.post(`logout`, token);
    return response
  }catch(err){
    return err
  }
}