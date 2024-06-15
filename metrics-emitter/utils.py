import machine

led_pin = machine.Pin("LED", machine.Pin.OUT)

def log_info(message):
    print(f'[INFO] {message}')

def log_error(message):
    print(f'[ERROR] {message}')
    
def log_debug(message):
    print(f'[DEBUG] {message}')
    
def __set_debug_led(state):
    led_pin.value(state)

def debug_led_on():
    __set_debug_led(1)
    
def debug_led_off():
    __set_debug_led(0)