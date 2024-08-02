from utils import log_debug
import gc

debug_emission_response = False
debug_connection_error = False

def print_mem_info():
    log_debug(f'mem_alloc: {gc.mem_alloc()}, mem_free: {gc.mem_free()}')
    
def log_emission_response(response):
    if debug_emission_response == False:
        return
    
    log_debug(f'Emission response: {response}')
    
def log_connection_error(error):
    if debug_connection_error == False:
        return
    
    log_debug(f'Connection error: {error}')
