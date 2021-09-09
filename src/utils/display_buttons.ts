//Copyright © alejandro0619 alejandrolpz0619@gmail.com
//Code under MIT license.

import TlgBot from 'node-telegram-bot-api';
import ExecuteScript from './buttons_controllers.js';

const buttons = {
  reply_markup: {
    inline_keyboard: [
      [
        { text: '⤵ Get local files', callback_data: 'local' },
      ],
      [
        { text: '⤵ Get files from MEGA', callback_data: 'MegaFiles' }
      ],
      [
        { text: '⤴ Upload files to local', callback_data: 'uploadToLocal' },
      ],
      [
        { text: '⤴ Upload to MEGA', callback_data: 'uploadToMega'}
      ]
    ]
  }
}

export function displayButtons(bot: TlgBot, msg: TlgBot.Message): void {

  bot.sendMessage(msg.chat.id, 'Choose and option:', buttons )
  bot.on('callback_query', (action: TlgBot.CallbackQuery): void => {

    const data = action.data;
    switch (data) {
      case 'local':
        const aa = new ExecuteScript().run();
        break;

      case 'MegaFiles':

        break;
      
      case 'uploadToLocal':
        
        break;
      
      case 'uploadtoMega':

        break;
    }
  })
}

