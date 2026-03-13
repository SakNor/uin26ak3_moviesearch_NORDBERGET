export default function MovieCard({title, poster, year}) {
    return (
        <article>
            <h3>{title}</h3>
            {<img src={poster} alt={title}></img>}
            {<p>{year}</p>}
        </article>
    )
}