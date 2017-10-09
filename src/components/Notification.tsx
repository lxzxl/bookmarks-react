import Notification from 'rc-notification';
import 'rc-notification/assets/index.css';

function notice(content: string) {
    let instance = Notification.newInstance();
    instance.notice({
        content: content
    });
}

export default {
    show(content: string) {
        notice(content);
    }
};
