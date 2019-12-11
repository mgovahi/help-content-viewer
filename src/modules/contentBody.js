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
        this.$container.append($wrapper);
        this.$contentWrapper = $wrapper;
    }
    setContent(content) {
        this.$contentWrapper.html(content);
    }
}

export default ContentBody;