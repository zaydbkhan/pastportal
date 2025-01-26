from django.http import JsonResponse, HttpResponse
import requests
import json
import socket 

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

#melissa api integration with email and location

#fetch api
#post, get, update, delete 
#post = frontend specifies a post to api, backend specifies the interaction

def verify_email(request):
    if request.method == "POST":
        data = json.loads(request.body) 
        user_email = data.get("email")
            
        if not user_email:
            return JsonResponse({"error": "Email is required"}, status=400)
            
        url = f"https://globalemail.melissadata.net/v4/WEB/GlobalEmail/doGlobalEmail?&id=B8Q3x8Fl8kxWpFRARigoDS**nSAcwXpxhQ0PC2lXxuDAZ-**&opt=VerifyMailbox:Express,DomainCorrection:OFF,TimeToWait:25&format=JSON&email={user_email}"
            
        headers = {
            "Accept": "application/json"
        }
            
        response = requests.get(url, headers=headers)
        out = response.json()
        if out.get("TotalRecords") != "1":
            return JsonResponse({"error": "Email record does not match"}, status=400)
            
        return JsonResponse({"message": "Email is valid"}, status=200)

    else:
        return JsonResponse({"error": "Invalid HTTP method. POST is required."}, status=405)

def return_location():
    try: 
        hostname = socket.gethostname()
        ip_address = socket.gethostbyname(hostname)
                
        if not ip_address:
            return JsonResponse({"error": "ZipCode is required"}, status=400)
                
        url = f"https://globalip.melissadata.net/v4/WEB/iplocation/doiplocation?id=########&t=CurlExample&opt=&ip={ip_address}"
            
        headers = {
            "Accept": "application/json"
        }
                
        response = requests.get(url, headers=headers)
        out = response.json()   
        lat = out.get("Latitude")  
        lot = out.get("Longtitude")        
        return JsonResponse({"latitude": lat, "longtitude": lat}, status=200)

    except:
        return JsonResponse({"error": "Invalid HTTP method. POST is required."}, status=405)