import {create} from "zustand"
import axiosInstance from "../lib/axios"
import {toast} from "react-hot-toast"
import {useAuthStore} from "./useAuthStore"

export const useChatStore = create((set,get) => ({
    messages: [],
    users:[],
    selectedUser:null,
    isUsersLoading:false,
    isMessagesLoading:false,
    
    getUsers:async()=>{
        set({isUsersLoading:true})
        try {
            const response = await axiosInstance.get("/messages/users")
            set({users:response.data.filteredUsers})
        } catch (error) {
            toast.error("Failed to fetch users")
            console.log("Error in useChatStore getUsers",error )
        } finally {
            set({isUsersLoading:false})
        }
    },
    
    getMessages:async(userId)=>{
        set({isMessagesLoading:true})
        try {
            const response = await axiosInstance.get(`/messages/${userId}`)
            set({messages:response.data.messages})
        } catch (error) {
            toast.error("Failed to fetch messages")
            console.log("Error in useChatStore getMessages",error )
        } finally {
            set({isMessagesLoading:false})
        }
    },
    
    sendMessage:async(messageData)=>{
        const {selectedUser,messages} = get()
        try {
            const response = await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData)
            set({messages:[...messages,response.data.newMessage]})
        } catch (error) {
            toast.error("Failed to send message")
            console.log("Error in useChatStore sendMessage",error )
        }
    },
    subscribeToMessages: () => {
        const { selectedUser } = get();
        if (!selectedUser) return;
    
        const socket = useAuthStore.getState().socket;
    
        socket.on("newMessage", (newMessage) => {
          // Add all messages regardless of sender
          // Convert ObjectId to string for consistency if it exists
          const newMessageWithStringId = {
            ...newMessage,
            ...(newMessage.senderId && { senderId: newMessage.senderId.toString() })
          };
          
          set({
            messages: [...get().messages, newMessageWithStringId],
          });
        });
      },
    
      unsubscribeFromMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
      },



    setSelectedUser:(selectedUser)=>set({selectedUser:selectedUser}),   
    
}))
