import requests
import time
from config import config
from debug import log_emission_response

def emit():
    aom_service = config['AOM_SERVICE']
    service_name = config['SERVICE_NAME']
    service_status = {
        'status': 'ok',
        'source': service_name
    }
    emission_cooldown = config['EMISSION_COOLDOWN']
    
    while True:
        http_response = requests.post(aom_service, json=service_status)
        response = http_response.json()

        log_emission_response(response)
            
        time.sleep(emission_cooldown)