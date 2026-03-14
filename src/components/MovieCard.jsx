import { Link } from "react-router-dom"

export default function MovieCard({title, poster, year}) {
    const slug = title
    return (
        <article>
            <Link to={`/${slug}`} state={{title, poster, year}}>
            <h3>{title}</h3>
            <img src={poster} alt={title} />
            <p>Utgivelsesår: {year}</p>
            </Link>
        </article>
    )
} {/*Tatt fra Rick And Morty cheat sheet i tillegg til  */}