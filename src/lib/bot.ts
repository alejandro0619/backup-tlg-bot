//Copyright © alejandro0619 alejandrolpz0619@gmail.com
//Code under MIT license.

import TlgBot from 'node-telegram-bot-api';
import { getAPIKEY } from './get_keys.js';
import { Options } from './optionsEnum.js';
import Controllers from './controller.js';

class Bot {
  private TOKEN: string = getAPIKEY() as string;
  private bot: TlgBot = new TlgBot(this.TOKEN, { polling: true });
  private Controller: Controllers = new Controllers();


  private updates() {
    this.bot.on('message', (msg: TlgBot.Message) => {
      switch (msg.text) {
        case Options['connect']:
          this.Controller.connect(this.bot, msg);

          this.bot.on('photo', (msg) => {
            if (msg.photo) {
              msg.photo.forEach(async p => {
                await this.bot.downloadFile(p.file_id, './photos')
              })
            }
          })
          break;
        case Options['upload']:
          this.bot.sendMessage(msg.chat.id, 'Working');
          break;
        case Options['fetch']:
          this.bot.sendMessage(msg.chat.id, 'Working fetch');
          break;
      }
    });
  }
  public run() {
    this.updates()
  }
}
let a = new Bot().run()