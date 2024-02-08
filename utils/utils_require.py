from functools import wraps

from utils.utils_request import request_failed
import re

MAX_CHAR_LENGTH = 255

# A decorator function for processing `require` in view function.
def CheckRequire(check_fn):
    @wraps(check_fn)
    def decorated(*args, **kwargs):
        try:
            return check_fn(*args, **kwargs)
        except Exception as e:
            # Handle exception e
            error_code = -2 if len(e.args) < 2 else e.args[1]
            return request_failed(error_code, e.args[0], 400)  # Refer to below
    return decorated


# Here err_code == -2 denotes "Error in request body"
# And err_code == -1 denotes "Error in request URL parsing"
def require(body, key, type="string", err_msg=None, err_code=-2):
    
    if key not in body.keys():
        raise KeyError(err_msg if err_msg is not None 
                       else f"参数错误。希望得到 `{key}`，但没有找到。", err_code)
    
    val = body[key]
    
    err_msg = f"参数错误。希望参数 `{key}` 为 `{type}` 类型。"\
                if err_msg is None else err_msg
    
    if type == "int":
        try:
            val = int(val)
            return val
        except:
            raise KeyError(err_msg, err_code)
    
    elif type == "float":
        try:
            val = float(val)
            return val
        except:
            raise KeyError(err_msg, err_code)
    
    elif type == "string":
        try:
            val = str(val)
            return val
        except:
            raise KeyError(err_msg, err_code)
    
    elif type == "list":
        try:
            assert isinstance(val, list)
            return val
        except:
            raise KeyError(err_msg, err_code)
        
    elif type == "email":
        try:
            val = str(val)
            pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}'
            match = re.search(pattern, val)
            assert match
            return val
        except:
            raise KeyError(err_msg, err_code)

    else:
        raise NotImplementedError(f"类型 `{type}` 未加入。", err_code)