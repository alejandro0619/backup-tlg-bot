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

    this.bot.onText( /\/connect/, (msg: TlgBot.Message): void => {
      this.Controller.connect(this.bot, msg);
          this.bot.on('photo', (msg: TlgBot.Message): void => {
            if (msg.photo) {
              msg.photo.forEach(async (p: TlgBot.PhotoSize): Promise<void> => {
                await this.bot.downloadFile(p.file_id, './photos')
              })
            }
          })
    });
  }
  public run() {
    this.updates()
  }
}
new Bot().run()