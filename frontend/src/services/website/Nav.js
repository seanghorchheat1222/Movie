import api from "../../api/api";

export const signIn = async (form) => {
    try{
      const reponse = await api.post('login', form);
      const data = reponse
      return data
    }catch(err){
      return err;
    }
}

export const currenUser = async () => {
  try{
    const reponse = await api.get('current-user');
    const data = reponse;
    return data;
  }catch(err){
    return err;
  }
}

export const signOut = async(token) => {
  try{
    const response = await api.post(`logout`, token);
    return response
  }catch(err){
    return err
  }
}


export const signUp = async (form) => {
    try{
      const reponse = await api.post('/create-account', form);
      const data = reponse
      return data
    }catch(err){
      return err;
    }
}
