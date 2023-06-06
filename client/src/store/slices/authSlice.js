import { createSlice } from "@reduxjs/toolkit";

const initialState={
    mode:"light",
    user:null,
    token:null,
    posts:[]
}

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setMode:(state,action)=>state.mode=state.mode==="light"?"dark":"light",
        setLogin:(state,action)=>{
            state.user=action.payload.user
            state.token=action.payload.token
        },
        setLogout:(state,action)=>{
            state.user=null
            state.token=null
        },
        setFriends:(state,action)=>{
            if(state.user){
                state.user.friends=action.payload.friends
            }else{
                console.log("user friends do not exist")
            }
        },
        setPosts:(state,action)=>{
            state.posts=action.payload.posts
        },
        setPost:(state,action)=>{
            const updatedPosts=state.posts.map((post)=>{
                if(post._id===action.payload.post._id) return action.payload
                return post
            })
            state.posts=updatedPosts
        }
    }
})

export const {setFriends , setLogin ,setLogout ,setMode ,setPost ,setPosts}=authSlice.actions
export const authReducer=authSlice.reducer