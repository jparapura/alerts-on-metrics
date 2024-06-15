from connection_manager import connect_to_wifi
from emitter import emit
from utils import log_error

try:
    connect_to_wifi()
    emit()
except Exception as ex:
    log_error(ex)