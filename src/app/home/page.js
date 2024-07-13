"use client"
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import "./home.css";
import { useEffect, useState } from 'react';


export default () => {
    const router = useRouter();
    const [user, setUser ] = useState(null);


    useEffect(() => {
        //console.log(sessionStorage.getItem('user'), JSON.parse(sessionStorage.getItem('user')));
        if (sessionStorage.getItem('user') == null) {
            router.push('/');
            return;
        }
        setUser(JSON.parse(sessionStorage.getItem('user')));
    }, []);
    
    return (
        user != null ?
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: "100%", height: "100%" }}>
                <nav>
                    <img src="data:image/png;base64,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"></img>

                    <Link href="/home" className="Selected">
                        Home
                    </Link>

                    <Link href="/buscador">
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

                <div style={{ width: "95%", marginTop: "2rem", display: "flex", alignItems: "center" }}>
                    <img src="data:image/png;base64,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"></img>
                    <h3>
                        Bienvenido Maestro {user && user['full_name']}
                    </h3>
                </div>
            </div>
            : 
            <div style={{"display": "flex", "flexDirection": "column", "alignItems": "center", "width": "100%", "height": "100%"}}>
                <h1>Loading...</h1>
            </div>
    )
}