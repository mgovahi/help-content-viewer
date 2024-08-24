import  $ from 'jquery';
import jstree from 'jstree/dist/jstree';
import 'jstree/dist/themes/default/style.min.css';
import cx from 'classnames';
import styles from '../styles/ContentTree.scss';


class ContentTree {
    constructor(options){
        this.data = options.data;
        this.links = options.links;
        /* [
            'Simple root node',
            {
                'id' :"12345",
            'text' : 'Root node 2 <i style="display:none;">3333</i>',
              'state' : {
                'opened' : true,
                'selected' : true
              },
              'children' : [
                { 'text' : 'Child 1<i style="display:none;">5555</i>', 'id' :"1234567" },
                'Child 2'
              ]
           }
         ];*/
         this.options = options;
         this.$container = $(options.container);
    }
    loadContent() {
        this.renderBottomBar();
        this.renderTopbar();
       
        this.renderTreeWrapper();
        this.renderTree();
        
        
    }
    renderTopbar() {
        let topbar = `<div class=${cx(styles["cnt-tree-topbar"])}></div>`;
        this.$topbar = $(topbar)
        if(this.options && this.options.treeTitle){
            let $ttl = $("<h4>"+this.options.treeTitle+"</h4>");
            this.$topbar.append($ttl);

        }
        let $input = $(`<input type="text" >`);
      
        this.$topbar.append($input)
                    .appendTo(this.$container);
        var to = false;
        var instance = this;
        $input.on("keyup",(eve)=>{
            instance.searchTree(eve.target.value);
        })

    }
    renderTreeWrapper() {
        let $wrapper = $(`<div class=${cx(styles["cnt-tree-wrapper"])}></div>`);
      
        this.$container.append($wrapper);
        this.$treeWrapper = $wrapper;
      
    }
    renderBottomBar(){
        let $bottomBar = $(`<div class=${cx(styles["cnt-bottom-bar"])}></div>`);
          if(this.options && this.options.linksTitle){
            let $ttl = $("<h4>"+this.options.linksTitle+"</h4>");
            $bottomBar.append($ttl);

        }
        for(let i=0 ;i < this.links.length;i++){
            let $atag = $(`<a href=${this.links[i].url} target="_blank">${this.links[i].title}</a>`);
            $bottomBar.append($atag);
        }
        this.$container.append($bottomBar);
    }
    renderTree() {
        console.log( this.$treeWrapper);
        $.jstree.defaults.search.show_only_matches = true;
        this.$treeWrapper.jstree({
            core : {
                data : this.data
            },
            "plugins": ["search"]
        }).on("select_node.jstree",(node, selected, event) => {
            console.log(node,selected);
           if (typeof this.options.treeNodeSelect == "function" ) {
                this.options.treeNodeSelect(selected.node);
           }
        });
    }
    searchTree(v) {
        this.$treeWrapper.jstree(true).search(v);
    }


}

export default ContentTree;