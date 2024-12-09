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
    // random Grade 0-99
    const Grade = getRandomRangers(0.01, 100.00);
    if (Grade >= 0.01 && Grade <= 3.00) { //8+ 3%
        document.getElementById("normal-result").innerHTML = `Grade: 8+ 0.01%-3.00%`;
        const rangersJson = await loadJSON('scraping/8-ultra.json'); // โหลดไฟล์ JSON
        console.log('Loaded JSON:', rangersJson);
        const rangerIndex = getRandomRangers(0.01, 3.00);
        document.getElementById("normal-result2").innerHTML = `Rate: ${rangerIndex}%`;
        if (rangerIndex > 0.48) {
            const commonIndex = getRandomCommonRangers(0, 125);
            document.getElementById("normal-result3").innerHTML = `Common: ${commonIndex+1}`;
            const result = rangersJson[commonIndex];
            document.getElementById("normal-result4").innerHTML = `Name: ${result.Name}, ${result.Grade}, ${result.Type}`;

        } else {
            const newIndex = getRandomNewRangers(126, 129);
            document.getElementById("normal-result3").innerHTML = `Collab: ${newIndex+1}`;
            const result = rangersJson[newIndex];
            document.getElementById("normal-result4").innerHTML = `Name: ${result.Name}, ${result.Grade}, ${result.Type}`;
        }
    } else if (Grade >= 3.01 && Grade <= 8.00) { //7+ 5%
        document.getElementById("normal-result").innerHTML = `Grade: 7+`;
        const rangersJson = await loadJSON('scraping/7-ultra.json'); // โหลดไฟล์ JSON
        console.log('Loaded JSON:', rangersJson);
        const commonIndex = getRandomCommonRangers(0, 6);
        const result = rangersJson[commonIndex];
        document.getElementById("normal-result2").innerHTML = `Rate: 0.71%`;
        document.getElementById("normal-result3").innerHTML = `Common: ${commonIndex+1}`;
        document.getElementById("normal-result4").innerHTML = `Name: ${result.Name}, ${result.Grade}, ${result.Type}`;
    } else if (Grade >= 8.01 && Grade <= 30.00) { //8 22%
        document.getElementById("normal-result").innerHTML = `Grade: 8 0.01-22.00%`;
        const rangersJson = await loadJSON('scraping/8-common.json'); // โหลดไฟล์ JSON
        console.log('Loaded JSON:', rangersJson);
        const rangerIndex = getRandomRangers(0.01, 22.00);
        document.getElementById("normal-result2").innerHTML = `Rate: ${rangerIndex}%`;
        if (rangerIndex > 3.52) {
            const commonIndex = getRandomCommonRangers(0, 131);
            document.getElementById("normal-result3").innerHTML = `Common: ${commonIndex+1}`;
            const result = rangersJson[commonIndex];
            document.getElementById("normal-result4").innerHTML = `Name: ${result.Name}, ${result.Grade}, ${result.Type}`;

        } else {
            const newIndex = getRandomNewRangers(132, 135);
            document.getElementById("normal-result3").innerHTML = `Collab: ${newIndex+1}`;
            const result = rangersJson[newIndex];
            document.getElementById("normal-result4").innerHTML = `Name: ${result.Name}, ${result.Grade}, ${result.Type}`;
        }
    } else { //7 70%
        document.getElementById("normal-result").innerHTML = `Grade: 7`;
        const rangersJson = await loadJSON('scraping/7-common.json'); // โหลดไฟล์ JSON
        console.log('Loaded JSON:', rangersJson);
        const commonIndex = getRandomCommonRangers(0, 56);
        const result = rangersJson[commonIndex];
        document.getElementById("normal-result2").innerHTML = `Rate: 1.21%`;
        document.getElementById("normal-result3").innerHTML = `Common: ${commonIndex+1}`;
        document.getElementById("normal-result4").innerHTML = `Name: ${result.Name}, ${result.Grade}, ${result.Type}`;
    }
}