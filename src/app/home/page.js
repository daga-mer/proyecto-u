"use client"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "./home.css";
import { useEffect, useState } from 'react';


export default () => {
    const router = useRouter();
    const [user, setUser ] = useState(null);


    useEffect(() => {
        console.log(JSON.parse(sessionStorage.getItem('user')));

        if (sessionStorage.getItem('user') == null) {
            router.push('/');
            return;
        }
        setUser(JSON.parse(sessionStorage.getItem('user')));
    }, []);
    
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
                    Bienvenido {user && user['full_name']}
                </div>
            </div>
            :
            router.push('/')
    )
}