import React, { useState, useEffect } from "react";
import "./Home.css";

export function Home() {
    const [translation, setTranslation] = useState("");

    useEffect(() => {
        // Replace with your backend API endpoint
        const fetchTranslation = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/translation");
                if (response.ok) {
                    const data = await response.json();
                    setTranslation(data.translation); // Assuming the backend returns { translation: "text" }
                } else {
                    console.error("Failed to fetch translation");
                }
            } catch (error) {
                console.error("Error fetching translation:", error);
            }
        };

        fetchTranslation();
    }, []);

    return (
        <>

        <div className="home">
            <h1>Traduccion en vivo</h1>
            <div className="translation-box">
                {translation ? translation : "Cargando traducción..."}
            </div>
            <button className="clear">Iniciar Nueva Traduccion</button>
        </div>
        </>
    );
}