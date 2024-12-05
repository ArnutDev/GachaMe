import requests
from bs4 import BeautifulSoup
import json

# URL ของเว็บไซต์ที่ต้องการดึงข้อมูล
url = 'https://www.typingstudy.com/speedtest'

# ส่งคำขอ GET เพื่อดึงข้อมูล HTML
web_data = requests.get(url)

# ตรวจสอบสถานะการตอบกลับ
if web_data.status_code == 200:
    print("Successfully fetched the webpage!")
else:
    print(f"Failed to retrieve the webpage. Status code: {web_data.status_code}")
    exit()

# แปลงข้อมูล HTML เป็น BeautifulSoup object
soup = BeautifulSoup(web_data.text, 'html.parser')

# ค้นหา <li> ที่มี class "menu_new"
find_word = soup.find_all("li", {"class": "menu_new"})

# เก็บข้อมูลที่ดึงมาในรูปแบบ list
items_list = []

for item in find_word:
    name = item.text.strip()  # ดึงข้อความและลบช่องว่าง
    items_list.append({"name": name})
    print(item)

# บันทึกข้อมูลเป็นไฟล์ JSON
with open('D:\Arnut\Github\GachaMe\public\scraping\scraping.json', 'w', encoding='utf-8') as f:
    json.dump(items_list, f, indent=4, ensure_ascii=False)  # ensure_ascii=False สำหรับข้อความภาษาอื่น

print("Data has been saved to 'scraped_data.json'")
