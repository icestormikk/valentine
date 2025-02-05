import React from "react";

function Heart() {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        setPosition({ x, y });
    }, []);

    return (
        <div className="heart" style={{ left: `${position.x}px`, top: `${position.y}px`, animationDelay: `${Math.random() * 2}s` }}>❤️</div>
    );
}

export default Heart;
