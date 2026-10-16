import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  id: '',
  name: '',
  email: '',
  role: '',
  token: '',
}

const userSlice = createSlice(
  {
    name: 'user',
    initialState,
    reducers: {
      setToken: (state, action) => {
        state.token = action.payload
      },

      setUser: (state, action) => {
        state.id = action.payload.id,
        state.name = action.payload.name,
        state.email = action.payload.email,
        state.role = action.payload.role
      },
      
      clearUser: () => initialState,
    }
  }
)

export const { setUser, setToken, clearUser } = userSlice.actions;
export default userSlice.reducer;