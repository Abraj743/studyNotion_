import {createSlice} from "@reduxjs/toolkit"
// localStorage isliye use kr rhe taaki agr bychance user ka tab close ho jaye toh usko dobara login na krna pdhe localstorage se uska token mil jayega ki ye login hai
const initialState={
    // interview ko batana jb woh puche kaha fasha the tho bolna pehle hmne user ko null mark kr rkha tha toh dobara load krne pr user null ho ja rha the toh fir local storage ki importance smjhi ki load krne pr pehle local storage se user nikalo agr na mile fir null mark kro
    // user:null,
    user:localStorage.getItem("user")?JSON.parse(localStorage.getItem("user")):null,
    loading:false,
};
const profileSlice=createSlice({
    name:"profile",
    initialState:initialState,
    reducers:{
        setUser(state,value){
            state.user=value.payload;
        },
        setLoading(state, value) {
            state.loading = value.payload;
          },
    },
});
export const{setUser, setLoading}=profileSlice.actions;
export default profileSlice.reducer;