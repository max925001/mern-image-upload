import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../Helpers/axiosinstance";
const initialState ={
isLoggedIn: localStorage.getItem('isLoggedIn') || false,
data: JSON.parse(localStorage.getItem('data') ) || {},
users: [],
getUserData:{}

}


export const createAccount = createAsyncThunk("/auth/signup" ,async(data) =>{
console.log(data)
try{
const res = axiosInstance.post("user/register" ,data)
toast.promise(res,{

    loading: "Wait creating your account",
    success: (data) =>{
       return data?. data?. message 
    },
    error: "Failed to create account"
})

return (await res).data

}catch(error){

toast.error(error?. response?. data?. message)
}

})



console.log(createAccount)


export const login = createAsyncThunk("/auth/login" ,async(data) =>{

    try{
    const res = axiosInstance.post("user/login" ,data)
    toast.promise(res,{
    
        loading: "Wait Authentication is in progress",
        success: (data) =>{
           return data?. data?. message 
        },
        error: "Failed to Login"
    })
    
    return (await res).data
    
    }catch(error){
    
    toast.error(error?. response?. data?. message)
    }
    
    })



export const logout = createAsyncThunk("/auth/logout" ,async () => {


try{


    const res = axiosInstance.post("user/logout")
    console.log("logout" ,res)
    toast.promise(res,{
    
        loading: "Wait Logout is in progress",
        success: (data) =>{
           return data?.data?.message 
        },
        error: "Failed to Logout"
    })
    
    return (await res).data



}catch(error){

toast.error(error?. response?. data?.message)


}


})












    export const updateProfile= createAsyncThunk("/user/update/profile" ,async (data) => {

console.log("datas",data)
        try{
        
        console.log("data",data[0])
        console.log("data",data[1])
            const res = axiosInstance.put(`user/update/${data[0]}` ,data[1])
            toast.promise(res,{
            
                loading: "Wait profile update is in progress",
                success: (data) =>{
                    
    
                   return data?.data?.message 
                },
                error: "Failed to update"
            })
            console.log(res)
            return (await res).data
        
        
        
        }catch(error){
        
        toast.error(error?. response?. data?.message)
        
        
        }
        
        
        })
        

        export const getUserData= createAsyncThunk("/user/details" ,async () => {


            try{
            
            
                const res =  await axiosInstance.get("user/me")
            
                
                return (await res).data
            
            
            
            }catch(error){
          
            toast.error(error.message)
            
            
            }
            
            
            })
        
            export const getAllUsers = createAsyncThunk('/user/getAllUsers', async () => {
                try {
                  const res = await axiosInstance.get('user/users'); // Replace with your endpoint
                  return res.data.data; // Assuming the response has users inside `data`
                } catch (error) {
                  toast.error(error?.response?.data?.message || "Failed to fetch users");
                  throw error; // Rethrow so it can be handled by Redux
                }
              });


              export const incrementProfileView = createAsyncThunk(
                'users/incrementProfileView',
                async (userId) => {
                    console.log("daa",userId)
                  try {
                    const response = await axiosInstance.put(`/user/profile/${userId}/view`);
                    toast.success('Profile view count incremented');
                    return response.data; // Assuming success message in response.data
                  } catch (error) {
                    toast.error("Failed to increment profile view count");
                    return rejectWithValue(error.response.data);
                  }
                }
              );

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers:(builder) =>{
        builder.addCase(login.fulfilled,(state ,action) =>{
            // ye method login ke fullfilled hone pe chalega
// aur fullfil hone pe hum ek reducer define kar sakte hai

localStorage.setItem("data" , JSON.stringify(action?. payload?.user))
localStorage.setItem("isLoggedIn" ,true)
state.isLoggedIn =true
state.data = action?.payload?.user


        })


// for logout
// ye ish liye kar rhe hai jab logout ho jayega to state phir se change karna hoga
//localstorage se data hatana hoga
.addCase(logout.fulfilled, (state ,action
    ) =>{
        localStorage.clear()
        state.data ={}
        state.isLoggedIn =false
      

    })


    .addCase(getUserData.fulfilled, (state,action) =>{
   
        if(!action?.payload?.user) return
    

        localStorage.setItem("data" , JSON.stringify(action?. payload?.user))
        localStorage.setItem("isLoggedIn" ,true)
        state.isLoggedIn =true
        state.data = action?.payload?.user
        
    
    })


    builder.addCase(getAllUsers.fulfilled, (state, action) => {
        state.users = action.payload; // Store fetched users in the state
      });

      builder.addCase(incrementProfileView.fulfilled, (state, action) => {
        state.getUserData = action.payload; // Store fetched users in the state
      });

    }
})


    



    


export const {} = authSlice.actions
export default authSlice.reducer