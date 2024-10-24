import { Link } from 'react-router-dom';


const IntroPage = (props)=>{
    
    return(
        <>
        <h1>Welcome</h1>
        <div>
            <Link to="/user">
            <button>User</button>
            </Link>
        </div>
        <div>
            <Link to="/admin">
            <button>Admin</button>
            </Link>
        </div>
        </>
    )
}

export default IntroPage;
