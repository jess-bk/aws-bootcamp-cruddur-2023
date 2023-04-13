# from datetime import datetime, timedelta, timezone
# from aws_xray_sdk.core import xray_recorder
from lib.db import db

class UserActivities:
  def run(user_handle):
    # # try:
    #   model = {
    #     'errors': None,
    #     'data': None
    #   }

    #   now = datetime.now(timezone.utc).astimezone()

    #   if user_handle == None or len(user_handle) < 1:
    #     model['errors'] = ['blank_user_handle']
    #   else:
    #     now = datetime.now()
    #     results = [{
    #       'uuid': '248959df-3079-4947-b847-9e0892d1bab4',
    #       'handle':  'Andrew Brown',
    #       'message': 'Cloud is fun!',
    #       'created_at': (now - timedelta(days=1)).isoformat(),
    #       'expires_at': (now + timedelta(days=31)).isoformat()
    #     }]
    #     model['data'] = results
        
    #   subsegment = xray_recorder.begin_subsegment('mock-data')
    #   # xray ---
    #   dict = {
    #     "now": now.isoformat(),
    #     "results-size": len(model['data'])
    #   }
    #   subsegment.put_metadata('key', dict, 'namespace')
    #   xray_recorder.end_subsegment()
    # finally:  
    #   # Close the segment
    #     xray_recorder.end_subsegment()
        #try:
      model = {
        'errors': None,
        'data': None
      }
      if user_handle == None or len(user_handle) < 1:
        model['errors'] = ['blank_user_handle']
      else:
        print("else:")
        sql = db.template('users','show')
        results = db.query_object_json(sql,{'handle': user_handle})
        model['data'] = results
        
      return model