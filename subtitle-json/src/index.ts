export type SubtitleJSON = {
    version: string;
    // metadata
    title: string;
    duration: number;
    timing_unit: "seconds" | "frames";
    languages: string[];
    // body
    styles: SubtitleStyle[];
    tracks: SubtitleTrack[];
    combinations: {
        [key: string]: SubtitleCombination
    };
}

type SubtitleStyle = {
    fonts: string[]; // everything after the first font is a fallback
    fontSize: number;
    primaryColor: string; // hex color
    secondaryColor: string; // hex color
    outlineColor: string; // hex color
    backgroundColor: string; // hex color
};

type SubtitleEntry = {
    start: number;
    end: number;
    text: string;
};
type SubtitleTrackPosition = {};
type SubtitleTrack = {
    style: number;
    position: SubtitleTrackPosition;
    entries: SubtitleEntry[];
};

type SubtitleCombination = number[];


export class SubtitleBuilder {
    readonly title: string;
    
    constructor(title: string) {
        this.title = title;
    }
}

export class SubtitleConverter {
    private readonly subtitleJSON: SubtitleJSON;
    private constructor(subtitleJSON: SubtitleJSON) {
        this.subtitleJSON = subtitleJSON;
    }
    
    static fromJSON(json: SubtitleJSON | string): SubtitleConverter {
        if (typeof json === "string") {
            return new SubtitleConverter(JSON.parse(json));
        }
        else {
            return new SubtitleConverter(json); // TODO: might need to clone the object
        }
    }
}
