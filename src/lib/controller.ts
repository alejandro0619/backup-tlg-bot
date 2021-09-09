//Copyright © alejandro0619 alejandrolpz0619@gmail.com
//Code under MIT license.

import TlgBot from 'node-telegram-bot-api';
import { checkPassword } from '../utils/check_password.js';
import { displayButtons } from '../utils/display_buttons.js';
export default class Controllers {

  public connect(bot: TlgBot ,msg: TlgBot.Message ) {
    bot.sendMessage(msg.chat.id, 'Welcome, please enter a /password [password] to be able to access to all the features of this bot.')
    bot.onText(/\/password (.+)/, (msg: TlgBot.Message, match: RegExpExecArray | null) => {
      if (match !== null) {
        if (checkPassword(match[1])) {
          return displayButtons(bot, msg)
        } else {
          bot.sendMessage(msg.chat.id, 'Enter de correct answer.');
        }
      } else {
        bot.sendMessage(msg.chat.id, 'You cannot send me a empty message.');
      }
    });
  }
}