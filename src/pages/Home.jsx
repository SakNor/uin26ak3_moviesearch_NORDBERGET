import { useState, useEffect } from 'react'
import History from '/src/components/History'


export default function Home() {
    const [search, setSearch] = useState()
    const storedHistory = localStorage.getItem("search")
    const [focused, setFocused] = useState(false)

    const [history, setHistory] = useState(storedHistory ? JSON.parse(storedHistory) : [])

    console.log("Bii", storedHistory)

    const baseUrl = `http://www.omdbapi.com/?apikey=`

    const apiKey = import.meta.env.VITE_APP_API_KEY 

    useEffect(() => {
        localStorage.setItem("search", JSON.stringify (history))
    }, [history])

    const getMovies = async () => {
        try {
            const response = await fetch(`${baseUrl}${apiKey}&s=${search}`)
            const data = await response.json()
            console.log(data)

        }
        catch (err) {
            console.error(err);
        }
    }

    const handleChange = (e)=>{
        setSearch(e.target.value)
        
        if (e.target.value.length >=4) {
            getMovies(e.target.value)
        } else {
            setError("Søket trenger minimum tre tegn")
        }
    }

    const handleSubmit = (e)=>{
        e.preventDefault()
        e.target.reset()

        setHistory((prev) => [...prev, search])
    }


    return (<main>
        <h1>Forside</h1>
        <form onSubmit={handleSubmit}>
            <label>
                Søk etter film
            <input type="search" placeholder="James Bond" onChange={handleChange} onFocus={()=> setFocused(true)} /*onBlur={() => setFocused(false)}></input> */ />
            </label>
             <button onClick={getMovies}>Søk</button>
        </form>
        {
            focused ? 
                <History history={history} setSearch={setSearch} />:null}
    </main>
    )
}