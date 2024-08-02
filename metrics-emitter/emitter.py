import requests
import time
from config import config
from debug import log_emission_response, log_connection_error

def emit():
    aom_service = config['AOM_SERVICE']
    service_name = config['SERVICE_NAME']
    service_status = {
        'status': 'ok',
        'source': service_name
    }
    emission_cooldown = config['EMISSION_COOLDOWN']
    
    while True:
        try:
            http_response = requests.post(aom_service, json=service_status)
            response = http_response.json()
            
            log_emission_response(response)
        except OSError as e:
            log_connection_error(e)
            
        time.sleep(emission_cooldown)