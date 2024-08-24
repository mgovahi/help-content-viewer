import Layout from "./modules/layout";
import ContentTree from "./modules/contentTree";
import ContentBody from "./modules/contentBody";


class Viewer {
    constructor(options) {
        this.options = options;
        this.layout = new Layout(options);
        this.init();
        
    }
    init() {
        this.layout.render();
        this.contentTree = new ContentTree({
            container : this.layout.sidebar,
            data:this.options.data,
            links: this.options.links,
            linksTitle : this.options.linksTitle,
            treeTitle : this.options.treeTitle,
            treeNodeSelect: this.options.onTreeNodeSelect
        });
        this.contentBody = new ContentBody({container : this.layout.contentBody, contentTitle:this.options.contentTitle});
        this.contentTree.loadContent();
        this.contentBody.loadeContent();
        
    }
    setContent(content) {
        this.contentBody.setContent(content);
    }
    search(keyword) {
        this.contentTree.searchTree(keyword);
    }
    reset(){
        this.contentTree.searchTree("");
    }

}

export default Viewer;