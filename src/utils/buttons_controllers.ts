//Copyright © alejandro0619 alejandrolpz0619@gmail.com
//Code under MIT license.

import { PythonShell, PythonShellError } from "python-shell";
import { dirname, join } from 'path';
import { URL } from 'url';
import TlgBot from 'node-telegram-bot-api';
import IConfig from '../interfaces/Iconfig.js';
import DownloadFromTlgResponse from '../interfaces/Iresponse_json.js';
import { rename } from 'fs/promises';


const __dirname: string = dirname(new URL(import.meta.url).pathname);


export default class ExecuteScript {
  private scriptPath: string = join(__dirname, '../api/api.py').substring(1);
  private pyShell: PythonShell = new PythonShell(this.scriptPath);
  private tempPath = join(__dirname, '../api/temp').substring(1)

  public runScript() {
    try {
      this.pyShell.send(JSON.stringify([1, 1, 1]));
      this.pyShell.on('message', msg => {
        console.log('Nodejs:',msg)
      });

      this.pyShell.end((err: PythonShellError) => {
        if (err) throw err;
        else {
          console.log('Working')
        }
      });
    } catch (e) {
      console.error(e)
    }
  }

  public async downloadFromTlg(bot: TlgBot, cfg: IConfig): Promise<DownloadFromTlgResponse> {
    const { fileID, fileName } = cfg;
    try {
      const oldPathToFile = await bot.downloadFile(fileID, this.tempPath);
      const newPathToFile = join(this.tempPath, fileName)
      await rename(oldPathToFile, newPathToFile);
      return {
        message: 'Completed',
        status: 0,

      }
    } catch (e) {
      return {
        message: 'No completed',
        status: 0,
        err: e
      }
    }
    
  }

}