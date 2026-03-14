import { Link } from "react-router-dom"

export default function Layout({children}){
    return (
        <>
        <nav>
        <Link to="/">Hjem</Link>
        </nav>
        {children}
        </>
    )
}
{/*Tatt fra Rick And Morty cheat sheet*/} 