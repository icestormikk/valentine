import Heart from "./Heart.tsx";

function HeartsBackground() {
    const numberOfHearts = 20;

    return (
        <div className="hearts-background">
            {Array.from({ length: numberOfHearts }).map((_, index) => (
                <Heart key={index}/>
            ))}
        </div>
    );
}

export default HeartsBackground;
