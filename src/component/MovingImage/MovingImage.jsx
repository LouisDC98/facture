import React, { useEffect, useRef, useState } from 'react';
import gifYoyo from "../../assets/gifYoyo.png";

const MovingImage = () => {
    const [isVisible, setIsVisible] = useState(true);
    const imageRef = useRef(null);

    useEffect(() => {
        // Positionner initialement au centre de la page
        if (imageRef.current) {
            const initialX = (window.innerWidth - 100) / 2; // 100 = largeur de l'image
            const initialY = (window.innerHeight - 100) / 2; // 100 = hauteur de l'image
            imageRef.current.style.transform = `translate(${initialX}px, ${initialY}px)`;
        }

        const moveImage = () => {
            if (imageRef.current) {
                // Générer des coordonnées aléatoires tout en restant à l'intérieur de la fenêtre
                const x = Math.random() * (window.innerWidth - 100); // Largeur de l'image
                const y = Math.random() * (window.innerHeight - 100); // Hauteur de l'image
                imageRef.current.style.transform = `translate(${x}px, ${y}px)`;
            }
        };

        const intervalId = setInterval(moveImage, 100); // Déplacer toutes les 0.1 seconde

        const timer = setTimeout(() => {
            setIsVisible(false);
            clearInterval(intervalId);
        }, 5000);

        return () => {
            clearInterval(intervalId);
            clearTimeout(timer);
        };
    }, []);

    return (
        <>
            {isVisible && (
                <img
                    ref={imageRef}
                    src={gifYoyo}
                    alt="Imae"
                    style={{
                        position: 'fixed', 
                        top: 0, 
                        left: 0, 
                        zIndex: 9999,
                        transition: 'transform 0.5s ease-in-out',
                    }}
                />
            )}
        </>
    );
};

export default MovingImage;