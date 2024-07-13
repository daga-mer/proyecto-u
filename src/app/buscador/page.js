"use client"
import Link from 'next/link';
import { memo } from 'react';
import { useRouter } from 'next/navigation';
import "./buscador.css";
import { useCallback, useEffect, useState } from 'react';


export default function Home() {
    const router = useRouter();
    const [user, setUser] = useState(null);
    const [pokemons, setPokemons] = useState([]);
    const [urlApi, setUrlApi] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const [pokeName, setPokeName] = useState("");


    useEffect(() => {
        if (sessionStorage.getItem('user') == null) {
            router.push('/');
            return;
        }

        if (user == null) {
            setUser(JSON.parse(sessionStorage.getItem('user')));
            if (pokemons.length == 0) {
                fetch('https://pokeapi.co/api/v2/pokemon?limit=30&offset=0', {
                    method: 'GET',
                }).then(res => res.json())
                    .then(async data => {
                        //console.log("data: ", data);
                        setUrlApi(data.next)
                        let dataPokemon = await Promise.all(data.results.map(async pokemon => {
                            return await fetch(pokemon["url"], { method: 'GET' }).then(res1 => res1.json())
                                .then(data1 => data1)
                                .catch(err1 => console.error(err1))
                        }))
                        //console.log("data.next: ", data.next);
                        setPokemons(dataPokemon);
                    })
                    .catch(err => {
                        console.error(err);
                    })
            }
        }
    }, []);

    const handleScroll = useCallback(() => {
        if (pokemons.length > 0 && window.innerHeight + document.documentElement.scrollTop >= document.documentElement.scrollHeight - 100 && hasMore) {
            setHasMore(false);
            fetch(urlApi, { method: 'GET' }).then(res => res.json())
                .then(async data => {
                    //console.log("data: ", data);
                    let dataPokemon = await Promise.all(data.results.map(async pokemon => {
                        return await fetch(pokemon["url"], { method: 'GET' }).then(res1 => res1.json())
                            .then(data1 => data1)
                            .catch(err1 => console.error(err1))
                    }))

                    //console.log("dataPokemon: ", dataPokemon);

                    setUrlApi(data.next)
                    setPokemons(prevPokemons => [...prevPokemons, ...dataPokemon]);
                    setHasMore(true);
                })
                .catch(err => {
                    console.error(err);
                })
        }
    }, [hasMore, pokemons, urlApi]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        user != null ?
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%", height: "100%" }}>
                <nav>
                    <img src="data:image/png;base64,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"></img>

                    <Link href="/home">
                        Home
                    </Link>

                    <Link className="Selected" href="/buscador">
                        Buscador
                    </Link>

                    <div style={{ display: "flex", alignItems: "center" }} onClick={() => {
                        sessionStorage.removeItem('user');
                        router.push('/');
                    }}>
                        <div className="pokeball unselected">
                            <div className="upper-half"> </div>
                            <div className="lower-half"> </div>
                            <div className="base"> </div>
                            <div className="inner-circle"> </div>
                            <div className="indicator visible"> </div>
                            <div className="indicator-inner"> </div>
                        </div>
                        <div style={{ margin: "0 0.2rem" }}>Salir</div>
                    </div>
                </nav>

                <div style={{ marginTop: "2rem", width: "40%", display: "flex", alignItems: "center", justifyContent: "space-evenly" }}>
                    <input value={pokeName} onChange={(e) => setPokeName(e.target.value)} type="text" placeholder="Ingrese el Numero o nombre del pokemon..." />


                    <div onClick={() => {
                        fetch(pokeName.length > 0 ? `https://pokeapi.co/api/v2/pokemon/${pokeName}` : 'https://pokeapi.co/api/v2/pokemon?limit=30&offset=0',
                            { method: 'GET' }).then(res => res.json())
                            .then(async data => {

                                //console.log("dataPokemon: ", dataPokemon);

                                if (pokeName.length == 0) {
                                    //console.log("data: ", data);
                                    let dataPokemon = await Promise.all(data.results.map(async pokemon => {
                                        return await fetch(pokemon["url"], { method: 'GET' }).then(res1 => res1.json())
                                            .then(data1 => data1)
                                            .catch(err1 => console.error(err1))
                                    }))

                                    setPokemons(dataPokemon);
                                    setUrlApi(data.next)
                                    setHasMore(true);
                                } else {
                                    setPokemons([data]);
                                }
                            })
                            .catch(err => {
                                console.error(err);
                            })
                    }} style={{ display: "flex", alignItems: "center" }}>
                        <div className="pokeball unselected">
                            <div className="upper-half"> </div>
                            <div className="lower-half"> </div>
                            <div className="base"> </div>
                            <div className="inner-circle"> </div>
                            <div className="indicator visible"> </div>
                            <div className="indicator-inner"> </div>
                        </div>
                        <div style={{ margin: "0 0.2rem" }}>Buscar</div>
                    </div>
                </div>

                <hr style={{ width: "90%" }} />

                <div className='pokemonsList'>
                    {
                        pokemons.map(pokemon => {
                            //console.log("pokemon: ", pokemon);
                            return (
                                <div className="card" key={pokemon.name}>
                                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                                    <p>{pokemon.name}</p>
                                </div>
                            )
                        })
                    }
                    {(pokeName.length == 0 && hasMore) && 
                    <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "width": "100%", "height": "100%"}}>
                        <p>Loading more items...</p>
                    </div>}
                </div>
            </div>
            : 
            <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "width": "100%", "height": "100%"}}>
                <h1>Loading...</h1>
            </div>
    )
}