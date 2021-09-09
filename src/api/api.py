# Copyright © alejandro0619 alejandrolpz0619@gmail.com
# Code under MIT license.
from mega import Mega
from os import path

class API:
  def __init__(self, usr, pswd):
    self.usr = usr
    self.pswd = pswd

  cwd = path.dirname(__file__)
  temp_path = path.join(cwd, 'temp')

  mega = Mega()

  def connect(self) -> Mega:
    return self.mega.login(self.usr, self.pswd)

  def get_info(self):
    a = self.connect()
    return a.get_user()

  def get_all_files(self):
    a = self.connect()
    return a.get_files()

  def get_file(self, name):
    a = self.connect()
    return a.find(name)

  def download(self) -> dict[str, str]:
    
    try:
      a = self.connect()
      url = ''
      a.download_url(url, self.temp_path, 'what.pdf')
      return {
        "response" : "completed without problems.",
        "response_status" : "OK"
      }
    

    except PermissionError:
      return {
        "response" : "completed with problems.",
        "response_status" : "Completed not OK"
      }
    except Exception as e: 
      print(e)
      return {
        "response": "An error just ocurred.",
        "response_status": "Error"
      }



api = API('XXXX@gmail.com', 'PASSWORD');
print(api.download())
