import requests
from bs4 import BeautifulSoup

# URL ของเว็บไซต์ที่คุณต้องการ scraping
url = "URL_OF_THE_PAGE"

# ส่งคำขอ GET ไปยังเว็บไซต์
response = requests.get('https://rangers.lerico.net/en/rangers-book')
print(response.status_code)  # ตรวจสอบสถานะของการตอบรับ

# ตรวจสอบว่าการตอบรับจากเซิร์ฟเวอร์สมบูรณ์
if response.status_code == 200:
    # สร้าง BeautifulSoup object จากเนื้อหาของเว็บไซต์
    soup = BeautifulSoup(response.content, 'html.parser')
    
    # ดึงข้อมูลทั้งหมดที่อยู่ใน <td>
    td_elements = soup.find_all('td')
    
    # แสดงผลข้อมูลในแต่ละ <td>
    for td in td_elements:
        print(td.text.strip())  # .strip() เพื่อลบช่องว่างที่ไม่จำเป็น
else:
    print("ไม่สามารถเข้าถึงเว็บไซต์ได้")

print(soup.prettify())  # ดูโครงสร้าง HTML ทั้งหมด
