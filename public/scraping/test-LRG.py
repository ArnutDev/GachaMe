import requests
from bs4 import BeautifulSoup
import json

# กำหนด URL ของเว็บไซต์
url = 'https://rangers.lerico.net/en/rangers-book'

# ส่งคำขอ GET ไปยัง URL
response = requests.get(url)

# เช็คสถานะการตอบกลับ
if response.status_code == 200:
    # ใช้ BeautifulSoup ในการแปลง HTML
    soup = BeautifulSoup(response.text, 'html.parser')
    
    # ค้นหาแถวของตารางทั้งหมดที่มีข้อมูลในคอลัมน์ "Name"
    names = []
    
    # ค้นหาแท็กที่เป็นแถวของตาราง (tr) และภายในมีชื่ออยู่ในคอลัมน์ "Name"
    table_rows = soup.find_all('tr')
    for row in table_rows:
        # ค้นหาแต่ละคอลัมน์ภายในแถว
        columns = row.find_all('td')
        
        # ถ้าแถวนี้มีคอลัมน์ (td) อย่างน้อย 1 ตัว และคอลัมน์แรกคือ "Name"
        if len(columns) > 0:
            name_tag = columns[0].find('a')  # ค้นหาแท็ก <a> ที่อยู่ภายในคอลัมน์ "Name"
            if name_tag:
                names.append(name_tag.get_text().strip())  # เก็บข้อความที่อยู่ภายในแท็ก <a>
    
    # เก็บข้อมูลเป็นไฟล์ JSON
    with open('D:\\Arnut\\Github\\GachaMe\\public\\scraping\\names.json', 'w', encoding='utf-8') as json_file:
        json.dump(names, json_file, indent=4, ensure_ascii=False)
    print("ข้อมูลถูกบันทึกลงไฟล์ names.json เรียบร้อยแล้ว!")
else:
    print("ไม่สามารถเข้าถึงเว็บไซต์ได้, รหัสสถานะ:", response.status_code)
