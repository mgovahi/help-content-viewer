import  $ from 'jquery';
import cx from 'classnames';
import styles from '../styles/ContentTree.scss';


class ContentBody {
    constructor(options){
        this.options = options;
        this.$container = $(this.options.container);
    }
    loadeContent(){
      this.renderContentWrapper();
    }
    renderContentWrapper() {
        var $wrapper = $(`<div class=${cx(styles["content-wrapper"])}></div>`);
        var $head = this.options.contentTitle ?   $(`<h4>${this.options.contentTitle}</h4>`) : "";
        this.$container.append($head).append($wrapper);
        this.$contentWrapper = $wrapper;
    }
    setContent(content) {
        this.$contentWrapper.html(content);
    }
}

export default ContentBody;