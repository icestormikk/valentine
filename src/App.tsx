import './app.css'
import WelcomeScene from "./scenes/WelcomeScene.tsx";
import {Route, Routes, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import StoryScene from "./scenes/StoryScene.tsx";
import StoriesContext from "./data/context/StoriesContext.ts";
import React from "react";
import FinalScene from "./scenes/FinalScene.tsx";

function App() {
    const location = useLocation();
    const locationArr = location.pathname?.split("/") ?? [];

    const [readStoryIds, setReadStoryIds] = React.useState<string[]>([]);

    return (
        <AnimatePresence mode="wait">
            <StoriesContext.Provider value={{ readStoryIds: readStoryIds, setReadStoryIds: setReadStoryIds }}>
                <Routes location={location} key={locationArr[1]}>
                    <Route path="/" element={<WelcomeScene/>} />
                    <Route path="/story" element={<StoryScene/>} />
                    <Route path="/final" element={<FinalScene/>} />
                </Routes>
            </StoriesContext.Provider>
        </AnimatePresence>
    )
}

export default App
