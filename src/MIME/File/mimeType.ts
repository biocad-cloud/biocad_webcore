namespace BioCAD.MIME {

    /**
     * 对文件格式信息的简要描述
    */
    export class mimeType {

        /**
         * 这种文件格式在数据库之中的唯一编号
        */
        public classID: number;
        /**
         * 对文件内容的摘要描述信息
        */
        public contentType: string;
        /**
         * 详细的描述信息
        */
        public description: string;

        constructor(data: object) {
            this.classID = data["id"];
            this.contentType = data["content_type"];
            this.description = data["description"];
        }

        public toString(): string {
            return this.contentType;
        }
    }
}