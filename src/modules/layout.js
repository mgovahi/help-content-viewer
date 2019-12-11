import cx from 'classnames';
import styles from '../styles/style.scss';
import WindowModal from "window-modal";

class Layout {
    // <div class='${cx(styles["topbar"])}'></div> 
    template = `
        <div class = '${cx(styles["wrapper"],"rtl")}' >

            <div class = '${cx(styles["body"])}' >
                <div class ='${cx(styles["sidebar"])}'></div>
                <div class = '${cx(styles["contentBody"])}'></div>
            </div>
        </div>
    `
    constructor(options){ 
        this.options = options;
        this.containerSeletor = options.container;
        this.container = document.querySelector(this.containerSeletor);
        this.container.innerHTML = this.template;
       
    }
    render() {
        if(this.container){
            this.container.innerHTML = this.template;
        }
        this.renderWindow();
        
    }
   get sidebar() {
       return document.querySelector(this.containerSeletor+ " ."+styles["sidebar"])
   }
   get contentBody() {
       return document.querySelector(this.containerSeletor + " ."+styles["contentBody"]);
   }
   renderWindow(){
        this.windowModal = new WindowModal({
            elementSelector:  this.containerSeletor,
            size: {x:900, y:500},
            pos : this.options.position || {x:50,y:50},
            hideMinimize: true,
            title: this.options.title
        });
   }
}

export default Layout;