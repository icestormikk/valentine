import { motion } from "framer-motion";
import React, {useContext} from "react";
import {TypeAnimation} from "react-type-animation";
import {useNavigate, useSearchParams} from "react-router-dom";
import Story from "../data/classes/Story.ts";
import GoldAppleStory from "../data/classes/GoldAppleStory.ts";
import MoonPrincessStory from "../data/classes/MoonPrincessStory.ts";
import MagicBlueprintStory from "../data/classes/MagicBlueprintStory.ts";
import StoriesContext from "../data/context/StoriesContext.ts";

function StoryScene() {
    const { readStoryIds, setReadStoryIds } = useContext(StoriesContext);

    const [visibleChapters, setVisibleChapters] = React.useState<string[]>([]);
    const [currentChapter, setCurrentChapter] = React.useState<number>(0);
    const [isTypingComplete, setIsTypingComplete] = React.useState(true);

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const story: Story = React.useMemo(() => {
        const id = searchParams.get('type');
        switch (id) {
            case 'gold_apple':
                return new GoldAppleStory();
            case 'moon_princess':
                return new MoonPrincessStory();
            case 'magic_blueprint':
                return new MagicBlueprintStory();
            default:
                throw new Error(`Unknown story id: ${id}`);
        }
    }, [searchParams]);

    const onNextParagraph = React.useCallback(() => {
        if (currentChapter < story.getLength()) {
            setVisibleChapters((prev) => [...prev, story.getChapter(currentChapter)]);
            setCurrentChapter(currentChapter + 1);
            setIsTypingComplete(false);
        }
    }, [currentChapter, story]);

    const onFinish = React.useCallback(() => {
        const storyId = story.getId();
        if(readStoryIds.includes(storyId))
            return;
        
        setReadStoryIds((prev) => [...prev, storyId]);
        navigate('/');
    }, [navigate, readStoryIds, setReadStoryIds, story])

    return (
        <motion.div id="story" className="app-container" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}} exit={{opacity: 0}}>
            <b className="title">{story.getTitle()}</b>
            <div className="text">
                {visibleChapters.map((chapter, index) => (
                    <div key={index} className="chapter">
                        <TypeAnimation
                            sequence={[() => setIsTypingComplete(false), chapter, () => setIsTypingComplete(true)]}
                            speed={99}
                            cursor={false}
                            style={{ whiteSpace: 'pre-line', fontSize: '18px', textAlign: 'left' }}
                        />
                    </div>
                ))}
            </div>
            <div className="buttons">
                {currentChapter < story.getLength() && (
                    <button onClick={onNextParagraph} disabled={!isTypingComplete}>
                        {currentChapter === 0 ? 'Начать сказку' : (isTypingComplete ? 'Далее' : 'мяу-мяу-мяу..')}
                    </button>
                )}
                {
                    currentChapter === story.getLength() && (
                        <button onClick={onFinish}>Вернуться</button>
                    )
                }
            </div>
        </motion.div>
    )
}

export default StoryScene;
