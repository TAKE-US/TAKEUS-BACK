import axios from "axios";
import _ from "lodash";
import config from "../config";

class Slack {

  static get Colors() {
    return {
      primary: '#007bff',
      info: '#17a2b8',
      success: '#28a745',
      warning: '#ffc107',
      danger: '#dc3545'
    };
  }

  static get Channels() {
    return {
      general: config.slackChannel
    };
  }

  static async sendMessage(message) {
    if (!message) {
      console.error('메시지 포멧이 없습니다.');
      return;
    }

    const data = {
      mrkdwn: true,
      text: '',
      attachments: []
    };

    if (_.isString(message)) {
      data.text = message;
    } else {
      if (!message.title && !message.text) {
        console.error('메시지 내용이 없습니다.');
        return;
      }

      message.ts = Math.floor(Date.now() / 1000);
      message.footer = `From 알림 서버 [${process.env.NODE_ENV}]`;
      data.attachments.push(message);
    }

    axios.post(this.Channels.general, data);
  }
}

export default Slack;