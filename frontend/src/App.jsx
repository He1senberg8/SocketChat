import {useEffect} from "react"
import Navbar from "./components/Navbar"
import {Routes , Route} from "react-router"
import HomePage from "./pages/HomePage"
import SignupPage from "./pages/SignupPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import {useAuthStore} from "./store/useAuthStore"
import {useThemeStore} from "./store/useThemeStore"
import {Loader} from "lucide-react"
import {Navigate} from "react-router"
import {Toaster} from "react-hot-toast"

const App = () => {
    const {authUser,checkAuth,isCheckingAuth,onlineUsers} = useAuthStore()
    const {theme} = useThemeStore()
    console.log(onlineUsers)
    useEffect(() => {
        checkAuth()
    },[checkAuth])

    if(isCheckingAuth && !authUser){
        return (
        <div className="flex items-center justify-center h-screen">
            <Loader className="size-10 animate-spin"/>
        </div>
        )
    }

    return (
        <div data-theme={theme}>
            <Navbar/>

            <Routes>
                <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
                <Route path="/signup" element={authUser ? <Navigate to="/" /> : <SignupPage />} />
                <Route path="/login" element={authUser ? <Navigate to="/" /> : <LoginPage />} />  
                <Route path="/settings" element={<SettingsPage />} />  
                <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
            </Routes>

            <Toaster position="top-center" reverseOrder={false}/>

        </div>
    )
}

export default App