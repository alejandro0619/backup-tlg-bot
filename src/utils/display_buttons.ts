//Copyright © alejandro0619 alejandrolpz0619@gmail.com
//Code under MIT license.

import TlgBot from 'node-telegram-bot-api';
import ExecuteScript from './buttons_controllers.js';
import IConfig from '../interfaces/Iconfig.js';
const Script: ExecuteScript = new ExecuteScript();

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

// display buttons and trigger a controller on event
export function displayButtons(bot: TlgBot, msg: TlgBot.Message): void {
  const chatId: number = msg.chat.id;

  bot.sendMessage(chatId, 'Choose and option:', buttons);
  
  bot.on('callback_query',  async (action: TlgBot.CallbackQuery): Promise<void> => {

    const data: string | undefined = action.data;
    switch (data) {
      case 'local':
        console.log('local')
        break;

      case 'MegaFiles':
        console.log('mega files')
        break;
      
      case 'uploadToLocal':
        console.log('Upload to local')
        break;
      
      case 'uploadToMega':

        const opt: TlgBot.AnswerCallbackQueryOptions = {
          show_alert: false,
          text: 'Testing'

        }
        await bot.answerCallbackQuery(action.id , opt);

        bot.on('document', async (msg: TlgBot.Message) => {
          const fileID: string | undefined = msg.document?.file_id;
          const fileName: string | undefined = msg.document?.file_name;
          if (fileID && fileName) {
            const cfg: IConfig = {
              fileID: fileID,
              fileName: fileName
            }
            Script.downloadFromTlg(bot, cfg);
            
            bot.sendMessage(chatId, 'Worked')
            
          } else {
            bot.sendMessage(chatId, 'err')
          }
          
        });
        break;

      default:
        bot.sendMessage(chatId, 'Please select an option below');
        
    }
  })
}

