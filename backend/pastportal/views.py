from django.http import HttpResponse
import requests
import json

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")

url = f"https://globalemail.melissadata.net/v4/WEB/GlobalEmail/doGlobalEmail?&id=B8Q3x8Fl8kxWpFRARigoDS**nSAcwXpxhQ0PC2lXxuDAZ-**&opt=VerifyMailbox:Express,DomainCorrection:OFF,TimeToWait:25&format=JSON&email=test@melissa.com"
headers = {
    "Accept": "application/json",
}

response = requests.get(url, headers=headers)
out = response.json() #dictionary
print(out["TotalRecords"])

# if (out["TotalRecords"] == 1):
#     print("valid output")
