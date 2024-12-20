import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  _id: "",
  username: "",
  onlineUsers: [] as Array<string>,
  socketConnection: null,
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state._id = action.payload.id
      state.username = action.payload.username
    },
    logOut: (state) => {
      state._id = ""
      state.username = ""
    },
    setOnlineUsers: (state, action) => {
      state.onlineUsers = action.payload
    },
    setSocketConnection: (state, action) => {
      state.socketConnection = action.payload
    },
  },
})

export const { setOnlineUsers, setSocketConnection, setUser, logOut } = userSlice.actions

export default userSlice.reducer
