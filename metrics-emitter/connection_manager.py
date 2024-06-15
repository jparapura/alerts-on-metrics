import network
import time
from utils import *
from config import config

def connect_to_wifi():
    debug_led_on()
    
    ssid = config['SSID']
    password = config['secrets']['WIFI_PASSWORD']
    connection_retries = config['WIFI_CONNECT_RETRIES']
    
    wlan = network.WLAN(network.STA_IF)
    wlan.active(True)
    wlan.connect(ssid, password)

    for _ in range(connection_retries):
        if wlan.isconnected() == False:
            time.sleep(1)
            continue
        
        debug_led_off()
        
        log_info(f'Successfully connected to {ssid}.')
        log_info(f'{ssid} configuration {wlan.ifconfig()}.')
        return

    raise Exception(f'Failed to connect to {ssid}.')