from django.http import JsonResponse

def request_failed(info, status_code=400):
    return JsonResponse({
        "message": info
    }, status=status_code)


def request_success(data={}, need_cookie=False, delete_cookie=False, id=None, password=None):
    resp = JsonResponse({
        "status" : 200,
        "code": 0,
        "message": "Succeed",
        **data
    })
    resp.status_code = 200
    resp['Access-Control-Allow-Origin-Credentials'] = 'true'

    if need_cookie:
        resp.set_cookie('id', str(id), max_age=31536000)
        resp.set_cookie('password', password, max_age=31536000)

    if password != None:
        resp.set_cookie('password', password, max_age=31536000)
        
    if delete_cookie:
        resp.set_cookie('id', str(id), max_age=-1)
        resp.set_cookie('password', password, max_age=-1)
        
    return resp


def return_field(obj_dict, field_list):
    for field in field_list:
        assert field in obj_dict, f"Field `{field}` not found in object."

    return {
        k: v for k, v in obj_dict.items()
        if k in field_list
    }

BAD_METHOD = request_failed("Bad method")