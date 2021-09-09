//Copyright © alejandro0619 alejandrolpz0619@gmail.com
//Code under MIT license.

import { PythonShell, Options, PythonShellError } from "python-shell";
import { dirname, join } from 'path';
import { URL } from 'url';

const __dirname: string = dirname(new URL(import.meta.url).pathname);


export default class ExecuteScript {
  private scriptPath: string = join(__dirname, '../api/api.py').substr(1);
  private pyShell: PythonShell = new PythonShell(this.scriptPath);


  public run() {
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
      })
    } catch (e) {
      console.error(e)
    }
  }

}