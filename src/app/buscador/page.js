"use client"
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "./buscador.css";
import { useEffect, useState } from 'react';


export default function Home() {
    const router = useRouter();
    const [user, setUser ] = useState(null);
    const [pokemons, setPokemons] = useState([]);
    const [url, setUrl] = useState(null);



    useEffect(() => {
        if (sessionStorage.getItem('user') == null) {
            router.push('/');
            return;
        }

        if (user == null) {
            setUser(JSON.parse(sessionStorage.getItem('user')));
            if (pokemons.length == 0) {
                console.log('hola');
                fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0', {
                    method: 'GET',
                }).then(res => res.json())
                .then(data => {
                    //console.log("data: ", data);
                    setUrl(data.next)
                    setPokemons(data.results);
                })
                .catch(err => {
                    console.error(err);
                })
            }
        }

    }, []);

    useEffect(() => {
        if (url != null && scrollY > 0) {
            fetch(url, {
                method: 'GET',
            }).then(res => res.json())
            .then(data => {
                //console.log("data: ", data);
                setUrl(data.next)
                setPokemons(data.results);
            })
            .catch(err => {
                console.error(err);
            })
        }
    }), [pokemons];
    
    return (
        sessionStorage.getItem('user') != null ?
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%", height: "100%" }}>
                <nav style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <Link href="/home">
                        Home
                    </Link>
                    <Link href="/buscador">
                        Buscador
                    </Link>
                </nav>

                <div style={{ marginTop: "2rem" }}>
                    <input type="text" placeholder="Buscar..." />
                </div>

                <hr style={{ width: "90%" }}/>

                <div style={{ display: "flex", flexWrap: "wrap" }}>
                    {
                        pokemons.length > 0 ? 
                            pokemons.map(pokemon => {
                                //console.log("pokemon[url]: ", pokemon["url"]);
                                let pokemonData = null;
                                
                                fetch(pokemon["url"], { method: 'GET' }).then(res1 => res1.json())
                                .then(data1 => {
                                    console.log("data1: ", data1);
                                    pokemonData = data1
                                })
                                .catch(err1 => {
                                    console.error(err1);
                                })
                                
                                console.log('pokemon: ', pokemon, pokemonData);
                                if (pokemonData != null) {
                                    return (
                                        <div style={{ padding: '1rem', background: 'transparent', color: 'white', flexWrap: "wrap" }} key={pokemon.name}>
                                            <p>{pokemon.name}</p>
                                        </div>
                                    )
                                }
                            }
                        )
                        : "loading..."
                    }
                </div>
            </div>
            :
            router.push('/')
    )
}