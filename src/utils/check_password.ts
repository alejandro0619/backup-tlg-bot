//Copyright © alejandro0619 alejandrolpz0619@gmail.com
//Code under MIT license.
import { getPassword } from './../lib/get_keys.js';

const password: string = getPassword() as string;

export function checkPassword(pswd: string): boolean {
  if (pswd === password) {
    return true
  } else {
    return false
  }
}