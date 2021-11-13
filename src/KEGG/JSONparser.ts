/**
 * The kegg brite index file parser
 * 
 * https://www.kegg.jp/kegg/brite.html
*/
namespace KEGG.brite {

    /**
     * 将目标brite json文件或者对象解析为对象entry枚举
    */
    export function parse(briteText: string | IKEGGBrite): IEnumerator<IBriteEntry> {
        const tree: IKEGGBrite = typeof briteText == "string" ? JSON.parse(briteText) : briteText;
        const list = new List<IBriteEntry>();

        for (let node of tree.children) {
            list.AddRange(treeTravel(node));
        }

        return list;
    }

    /**
     * 进行递归构建
    */
    function treeTravel(Class: IKEGGBrite, class_path: string[] = [], list: IBriteEntry[] = []): IBriteEntry[] {
        if (isLeaf(Class)) {
            list.push({
                entry: parseIDEntry(Class.name),
                class_path: [...class_path]
            });
        } else {
            class_path = [...class_path];
            // there is a child count number in class name
            // removes this count number tags
            //
            // example as: Prokaryotes (5639)
            class_path.push(Class.name.replace(/\s+[(]\d+[)]/ig, ""));

            Class.children.forEach(node => treeTravel(node, class_path, list));
        }

        return list;
    }

    export function parseIDEntry(text: string): IDEntry {
        const list: string[] = text.split(/\s{2,}/g);

        if (text.indexOf(" ") == -1) {
            return new IDEntry(text, text);
        }

        if (list.length > 1) {
            const id: string = list[0];
            const names: string[] = $from(list)
                .Skip(1)
                .Select(s => s.split(/;\s*/g))
                .Unlist(x => x)
                .ToArray();

            return new IDEntry(id, names);
        } else {
            const id: string = text.match(/\d{4,}\s/ig)[0];
            const name: string = text.substr(id.length);

            return new IDEntry(Strings.Trim(id, " "), Strings.Trim(name, " "));
        }
    }

    function isLeaf(node: IKEGGBrite): boolean {
        return $ts.isNullOrEmpty(node.children);
    }
}