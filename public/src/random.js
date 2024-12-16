let count = 0;
async function loadJSON(filePath) {
    try {
        const response = await fetch(filePath); // รอการโหลดไฟล์ JSON
        if (!response.ok) {
            throw new Error(`Error fetching file: ${response.statusText}`); // หากไฟล์มีปัญหา ให้โยนข้อผิดพลาด
        }
        const data = await response.json(); // แปลง JSON String เป็น JavaScript Object
        return data; // ส่งคืนข้อมูล JSON
    } catch (error) {
        console.error('Error loading JSON:', error); // แสดงข้อผิดพลาดในคอนโซล
        throw error; // ส่งข้อผิดพลาดกลับไปให้ผู้เรียกใช้ฟังก์ชันจัดการ
    }
}

function getRandomRangers(min, max) {
    const random = Math.random() * (max - min) + min; // สุ่มตัวเลขระหว่าง min และ max
    return parseFloat(random.toFixed(2)); // ปัดเศษให้เป็นทศนิยม 2 ตำแหน่ง
}

function getRandomCommonRangers(min, max) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min; // สุ่มจำนวนเต็มระหว่าง min และ max
    return random;
}


function getRandomNewRangers(min, max) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min; // สุ่มจำนวนเต็มระหว่าง min และ max
    return random;
}
async function normalGacha() {
    const Grade = getRandomRangers(0.01, 100.00);
    const resultContainer = document.getElementById("normal-result");


    let rangersJson;
    if (Grade <= 3.00) {
        const subGrade = getRandomRangers(0.01, 3.00);

        if (subGrade >= 0.01 && subGrade <= 0.48) {
            // โหลดไฟล์ JSON อื่นเมื่อค่าที่สุ่มได้อยู่ระหว่าง 0.01 - 0.48
            rangersJson = await loadJSON('scraping/8-ultra-collab.json');
            alert('Congratulation u got collabro rangers!');
        } else {
            rangersJson = await loadJSON('scraping/8-ultra.json');
        }
        resultContainer.innerHTML = `Grade: =★★★=`;
    } else if (Grade <= 8.00) {
        rangersJson = await loadJSON('scraping/7-ultra.json');
        resultContainer.innerHTML = `Grade: =★★=`;
    } else if (Grade <= 30.00) {
        const subGrade = getRandomRangers(0.01, 30.00);
        if (subGrade >= 0.01 && subGrade <= 3.52) {
            // โหลดไฟล์ JSON อื่นเมื่อค่าที่สุ่มได้อยู่ระหว่าง 0.01 -3.52
            rangersJson = await loadJSON('scraping/8-common-collab.json');
            alert('Congratulation u got collabro rangers!');
        } else {
            rangersJson = await loadJSON('scraping/8-common.json');
        }
        resultContainer.innerHTML = `Grade: ★★★`;
    } else {
        rangersJson = await loadJSON('scraping/7-common.json');
        resultContainer.innerHTML = `Grade: ★★`;
    }

    const randomIndex = getRandomCommonRangers(0, rangersJson.length - 1);
    const result = rangersJson[randomIndex];
    count += 1;
    // แสดงข้อมูลตัวละครในหน้าจอ
    document.getElementById("normal-result2").innerHTML = `Name: ${result.Name}`;
    document.getElementById("normal-result3").innerHTML = `UnitCode: ${result.UnitCode}`;
    document.getElementById("normal-result4").innerHTML = `<img src="${result.Image}" alt="${result.Name}" style="max-width: 150px; height: auto;">`;
    document.getElementById("normal-result5").innerHTML = `Round: ${count} , Gacha-coupon used: ${count*5}`;
}