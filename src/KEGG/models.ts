namespace KEGG.brite {

    /**
     * The raw json tree of the kegg brite data
    */
    export interface IKEGGBrite {
        name: string;
        children: IKEGGBrite[];
    }

    /**
     * key-value mapping of [ID => names]
    */
    export class IDEntry {

        public get commonName(): string {
            return this.names[0];
        }

        public constructor(
            public id: string,
            public names: string[]) {
        };

        public toString(): string {
            return this.commonName;
        }
    }

    export interface IBriteEntry {
        entry: IDEntry;
        class_path: string[];
    }
}