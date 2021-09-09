//Copyright © alejandro0619 alejandrolpz0619@gmail.com
//Code under MIT license.
import dotenv from 'dotenv';

const api_key = dotenv.config();

export function getAPIKEY(): string | Error | undefined {
  if (api_key['parsed']) {
    return api_key['parsed']['TELEGRAM_BOT_API_KEY']
  } else {

    return api_key['error'];
  }
}

export function getPassword(): string | Error | undefined {
  if (api_key['parsed']) {
    return api_key['parsed']['PASSWORD']
  } else {

    return api_key['error'];
  }
}

 