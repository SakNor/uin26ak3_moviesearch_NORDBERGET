//Koden min er en fortsettelse av det Ann Charlott har vist i forelesningene, 
// og basert på forelesningene vi har hatt om Rick And Morty API. Jeg har også brukt LMS'et for å få en forståelse.
//Jeg har også fått god hjelp av stud.ass og fått hjelp med å løse småtteri av andre studenter.
//I tillegg har jeg brukt AI som hjelpemiddel for å smårettinger når jeg ikke har klart å feilsøke selv.
//De viktige samtalene vil bli kommentert der det har blitt brukt. 

import { useState, useEffect } from 'react'
import History from '../components/History'
import MovieCard from '../components/MovieCard'


export default function Home() {
    const [search, setSearch] = useState("")
    const [movies, setMovies]  = useState([])
    const storedHistory = localStorage.getItem("history")
    const [focused, setFocused] = useState(false) 
    const [error, setError] = useState("")
    
    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])

    const baseUrl = `https://www.omdbapi.com/?apikey=`

    const apiKey = import.meta.env.VITE_APP_API_KEY 

    useEffect(() => { localStorage.setItem("history", JSON.stringify (history)) })

    useEffect(() => {getMovies("james bond")}, [])

    
    const getMovies = async (search) => {
        try {
            const response = await fetch(`${baseUrl}${apiKey}&s=${search}`)
            const data = await response.json()

            setMovies(data.Search)

        }
        catch (err) {
            console.error(err)
        }
    }   

    const handleChange = (e)=>{
        const value = e.target.value
        setSearch(value)
        
        if (value.length >=3) {
           setError("")
           
        } else {
            setError("Minst tre tegn for å søke")
        }
    }
//Jeg slet lenge med hele søkefunksjonen, etter en del krangling med AI ble det greit. https://chatgpt.com/share/69b5b0c6-b540-8005-916a-8c3aee40397a  

    const handleSubmit = (e) => {
        e.preventDefault()

        if (search.length < 3) {
            setError("Minst tre tegn for å søke")
            return
    }

        setError("")
        getMovies(search)
        setHistory((prev) => [...prev, search])
}

    return (<main>
        <h1>Forside</h1>
        <form onSubmit={handleSubmit}>
                Søk etter film:
            <input type="search" placeholder="James Bond" onChange={handleChange} onFocus={()=> setFocused(true)} />
            {error && <p>{error}</p>}
             <button type="submit">Søk</button>
        </form>
        {
            focused ? 
                <History history={history} setSearch={setSearch} />:null}
        <section>
            {movies?.map(movie => (
                <MovieCard
                key={movie.imdbID}
                title={movie.Title}
                poster={movie.Poster} //Prøvde først movie.Image, men det ville ikke funke. Fikk tips av en annen student om at det er movie.Poster
                year={movie.Year}
                />
            ))}
        </section>
    </main>
    )
}
//*Trengte hjelp med å sjekke om alle kravene for oppgaven var oppfylt https://chatgpt.com/share/69b5b755-4d40-8005-9802-90de91b7cfbd