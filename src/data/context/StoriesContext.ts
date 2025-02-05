import React, {createContext} from "react";

type StoriesContextProps = {
    readStoryIds: string[];
    setReadStoryIds: React.Dispatch<React.SetStateAction<string[]>>;
}

const StoriesContext = createContext<StoriesContextProps>({
    readStoryIds: [],
    setReadStoryIds: function (_value: React.SetStateAction<string[]>): void {
        throw new Error("Function not implemented.");
    }
});

export default StoriesContext;
