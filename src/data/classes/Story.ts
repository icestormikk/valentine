abstract class Story {
    protected readonly id!: string;
    protected readonly title!: string;
    protected readonly shortTitle!: string;
    protected readonly chapters!: string[];

    getId(): string {
        return this.id;
    }

    getTitle(): string {
        return this.title;
    }

    getShortTitle(): string {
        return this.shortTitle;
    }

    getChapter(index: number) {
        if(index == undefined)
            return this.chapters.join("\n");

        if(index < 0 || index >= this.chapters.length)
            throw new Error(`oops, chapter must be at least zero and not more than ${this.chapters.length - 1}`);

        return this.chapters[index];
    }

    getLength(): number {
        return this.chapters.length;
    }
}

export default Story;
