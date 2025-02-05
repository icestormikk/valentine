import {TypeAnimation} from "react-type-animation";
import React, {useContext} from "react";
import WelcomeMessages from "../data/WelcomeMessages.ts";
import { motion } from "framer-motion";
import {useNavigate} from "react-router-dom";
import Story from "../data/classes/Story.ts";
import GoldAppleStory from "../data/classes/GoldAppleStory.ts";
import MoonPrincessStory from "../data/classes/MoonPrincessStory.ts";
import MagicBlueprintStory from "../data/classes/MagicBlueprintStory.ts";
import StoriesContext from "../data/context/StoriesContext.ts";

function WelcomeScene() {
    const { readStoryIds } = useContext(StoriesContext);
    const navigate = useNavigate();

    const message = React.useMemo(() => {
        const messages = WelcomeMessages;
        const randomIndex = Math.floor(Math.random() * messages.length);

        return messages[randomIndex];
    }, []);
    const stories: Story[] = React.useMemo(() => {
        return [new GoldAppleStory(), new MoonPrincessStory(), new MagicBlueprintStory()]
    },[]);

    const [countdown, setCountdown] = React.useState(3);
    const [buttonText, setButtonText] = React.useState<string>('Начать приключение');
    const [isStarted, setIsStarted] = React.useState(false);
    const [selectedStory, setSelectedStory] = React.useState<string|undefined>();

    const handleClick = React.useCallback((storyId: string) => {
        if (!isStarted) {
            setIsStarted(true);
            setCountdown(2);
            setSelectedStory(storyId);
        }
    }, [isStarted]);

    React.useEffect(() => {
        if (isStarted && countdown > 0) {
            const interval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 2000);
            return () => clearInterval(interval);
        }
    }, [countdown, isStarted]);

    React.useEffect(() => {
        if (countdown === 3)
            setButtonText('Начать приключение');
        else
            setButtonText(`Приключение начнётся через ${countdown + 1}`);

        if(countdown === 0)
            navigate(`/story?type=${selectedStory}`);
    }, [countdown, navigate, selectedStory]);

    return (
        <motion.div className="app-container" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}}
                    exit={{opacity: 0}}>
            <TypeAnimation
                sequence={[message]}
                wrapper="span"
                speed={50}
                style={{fontSize: '2em', display: 'inline-block'}}
                repeat={1}
                cursor={false}
            />
            <img src="/cat_welcome.gif" alt="cat_welcome_gif"/>
            <b style={{fontSize: '20px'}}>Для тебя есть особое послание! Но для начала тебе нужно прочитать три очень
                затягивающие истории</b>
            <div className="stories">
                {
                    stories.map((story, index) => (
                        <button key={index} type="button" onClick={() => handleClick(story.getId())} disabled={countdown < 3 || readStoryIds.includes(story.getId())}>
                            <span>{isStarted && (selectedStory == story.getId()) ? buttonText : story.getShortTitle()}</span>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="paw" width="25px"
                                 height="25px">
                                <path fill="#f5f5f5"
                                      d="M226.5 92.9c14.3 42.9-.3 86.2-32.6 96.8s-70.1-15.6-84.4-58.5s.3-86.2 32.6-96.8s70.1 15.6 84.4 58.5zM100.4 198.6c18.9 32.4 14.3 70.1-10.2 84.1s-59.7-.9-78.5-33.3S-2.7 179.3 21.8 165.3s59.7 .9 78.5 33.3zM69.2 401.2C121.6 259.9 214.7 224 256 224s134.4 35.9 186.8 177.2c3.6 9.7 5.2 20.1 5.2 30.5l0 1.6c0 25.8-20.9 46.7-46.7 46.7c-11.5 0-22.9-1.4-34-4.2l-88-22c-15.3-3.8-31.3-3.8-46.6 0l-88 22c-11.1 2.8-22.5 4.2-34 4.2C84.9 480 64 459.1 64 433.3l0-1.6c0-10.4 1.6-20.8 5.2-30.5zM421.8 282.7c-24.5-14-29.1-51.7-10.2-84.1s54-47.3 78.5-33.3s29.1 51.7 10.2 84.1s-54 47.3-78.5 33.3zM310.1 189.7c-32.3-10.6-46.9-53.9-32.6-96.8s52.1-69.1 84.4-58.5s46.9 53.9 32.6 96.8s-52.1 69.1-84.4 58.5z"/>
                            </svg>
                        </button>
                    ))
                }
            </div>
            {
                (readStoryIds.length === stories.length) && (
                    <div className="final">
                        <button onClick={() => navigate('/final')}>Прочитать послание</button>
                    </div>
                )
            }
        </motion.div>
    )
}

export default WelcomeScene;
