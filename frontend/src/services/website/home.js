import api from "../../api/api";

export const bannerMovie = async() => {
  try{
    const response = await api.get(`/movies/19`);
    return response
  }catch(err){
    return err
  }
}

export const topMovie = async() => {
  try{
    const response = await api.get(`/movies?per_page=9`);
    return response
  }catch(err){
    return err
  }
}

export const listHorror = async() => {
  try{
    const response = await api.get(`/movies?per_page=10&&general_id=3`);
    return response
  }catch(err){
    return err
  }
}

export const listAction = async() => {
  try{
    const response = await api.get(`/movies?per_page=10&&general_id=1`);
    return response
  }catch(err){
    return err
  }
}

export const listScifi = async() => {
  try{
    const response = await api.get(`/movies?per_page=10&&general_id=5`);
    return response
  }catch(err){
    return err
  }
}

export const listAdventure = async() => {
  try{
    const response = await api.get(`/movies?per_page=10&&general_id=8`);
    return response
  }catch(err){
    return err
  }
}


