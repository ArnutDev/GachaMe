fetch('https://api.rangers.lerico.net/data') // URL ของ API
    .then(response => response.json())
    .then(data => {
        console.log(data); // แสดงข้อมูลที่ได้รับจาก API
    })
    .catch(error => console.error('Error:', error));