namespace MIME {

    /**
     * The fasta sequence parser and data model
    */
    export interface FastaSeq {

        headers: string[];
        sequence: string;
         
    }

    export function ParseFasta(stream: string): FastaSeq[] {
        const seq: FastaSeq[] = [];
        // 使用正则表达式进行切割并去除空白行
        const lines: string[] = $from(stream.split(/\n/))
            .Where(l => !Strings.Empty(l, true))
            .ToArray();

        let header: string;
        let seqBuffer: string = "";

        const isnull = function () {
            return Strings.Empty(header) && Strings.Empty(seqBuffer);
        } 

        for (let i: number = 0; i < lines.length; i++) {
            const line: string = lines[i];

            if (line.charAt(0) == ">") {
                // 是新的序列起始
                if (!isnull()) {
                    seq.push(<FastaSeq>{
                        headers: header.split("|"),
                        sequence: seqBuffer
                    });
                }

                header = line.substr(1);
                seqBuffer = "";
            } else {
                seqBuffer = seqBuffer + line;
            }
        }

        if (!isnull()) {
            seq.push(<FastaSeq>{
                headers: header.split("|"),
                sequence: seqBuffer
            });
        }

        return seq;
    }
}