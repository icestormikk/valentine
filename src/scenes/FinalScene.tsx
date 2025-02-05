import {AnimatePresence, motion} from "framer-motion";
import {TypeAnimation} from "react-type-animation";
import React from "react";
import HeartsBackground from "../components/HeartsBackground.tsx";

enum FinalSceneStates {
    SUGGESTION = "SUGGESTION",
    YES = "YES",
    NO_0 = "NO_0",
    NO_1 = "NO_1",
    NO_2 = "NO_2",
    NO_3 = "NO_3",
    NO_4 = "NO_4",
    NO_5 = "NO_5",
}

function FinalScene() {
    const [state, setState] = React.useState<FinalSceneStates|null>(null);
    const [headerText, setHeaderText] = React.useState('Согласишься ли ты быть моей любовью до конца времён?')
    const [noButtonText, setNoButtonText] = React.useState<string>('Нет');
    const [gifPath, setGifPath] = React.useState('/valentine_suggestion.gif');
    const [showOverlay, setShowOverlay] = React.useState(false);

    const handleNoClick = React.useCallback(() => {
        switch (state) {
            case FinalSceneStates.SUGGESTION:
                setNoButtonText('Ты точно уверена? 🥺');
                setState(FinalSceneStates.NO_0);
                break;
            case FinalSceneStates.NO_0:
                setNoButtonText('Может, всё-таки да? 😘');
                setState(FinalSceneStates.NO_1);
                break;
            case FinalSceneStates.NO_1:
                setNoButtonText('Подумай ещё раз... 😏');
                setState(FinalSceneStates.NO_2);
                break;
            case FinalSceneStates.NO_2:
                setNoButtonText('Ну пожалуйста! 🥺👉👈');
                setState(FinalSceneStates.NO_3);
                break;
            case FinalSceneStates.NO_3:
                setNoButtonText('Ты разобьёшь мне сердце 💔');
                setState(FinalSceneStates.NO_4);
                break;
            case FinalSceneStates.NO_4:
                setNoButtonText('Всё... ты меня потеряла... 😭');
                setShowOverlay(true);
                setState(FinalSceneStates.NO_5);
                break;
        }
    }, [state]);

    React.useEffect(() => {
        switch (state) {
            case FinalSceneStates.SUGGESTION:
                setGifPath('/valentine_suggestion.gif');
                break;
            case FinalSceneStates.YES:
                setHeaderText('Ураааааа');
                setGifPath('/valentine_yes.gif');
                break;
            case FinalSceneStates.NO_0:
                setGifPath('/valentine_no.gif');
        }

    }, [state]);

    return (
        <motion.div id="final" className="app-container" initial={{opacity: 0}} animate={{opacity: 1}} transition={{duration: 0.5}} exit={{opacity: 0}}>
            <HeartsBackground />
            {
                state == FinalSceneStates.YES ? (
                    <h1>Я тебя люблю!💞<br/><br/>Ты сделал(-а) меня самым счастливым человеком! Вместе – до скончания веков!<br/><br/>Спасибо
                        тебе за то, что ты рядом!</h1>
                ) : (
                    <TypeAnimation
                        sequence={["3", 2000, "2", 2000, "1", 2000, () => setState(FinalSceneStates.SUGGESTION), headerText]}
                        cursor={false}
                        speed={50}
                        wrapper="h1"
                    />
                )
            }
            {
                (state && state != FinalSceneStates.YES) && (
                    <>
                        <motion.img initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} src={gifPath} alt="valentine_suggestion_gif"/>
                        <div className="buttons">
                            <button style={{background: '#049833'}} onClick={() => setState(FinalSceneStates.YES)} disabled={showOverlay}>Да</button>
                            <button style={{background: '#d32121'}} onClick={handleNoClick} disabled={showOverlay}>{noButtonText}</button>
                        </div>
                    </>
                )
            }
            <AnimatePresence>
                {showOverlay && (
                    <motion.div
                        className="overlay"
                        initial={{opacity: 0}}
                        animate={{opacity: 1}}
                        exit={{opacity: 0}}
                        transition={{duration: 1}}
                    >
                        <motion.p
                            className="text"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1, duration: 1 }}
                        >
                            Но я всё равно тебя люблю 💖
                        </motion.p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default FinalScene;
