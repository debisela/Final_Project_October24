import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const IntroPage = (props)=>{
    const navigate = useNavigate();

    const handleNavigateUser = ()=>{
        navigate('/user')
    }

    const handleNavigateAdmin = ()=>{
        navigate('/admin')
    }


    return(
        <>
        <button onClick={handleNavigateUser}>User</button>
        <button onClick={handleNavigateAdmin}>Admin</button>
        </>
    )
}

export default IntroPage;
