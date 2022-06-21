import { useAuth } from "../contexts/AuthContext";


const Home = () => {
    const { logIn, logOut, user } = useAuth();

    return (
        <>
            <button onClick={logIn}>Login</button>
            <button onClick={logOut}>Logout</button>
        </>
    )
}

export default Home;