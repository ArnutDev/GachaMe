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

function getRandomGrade() {
    const Grade = Math.round(Math.random() * 99);
    return Grade; // ปัดเศษให้เป็นทศนิยม 2 ตำแหน่ง
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
    const Grade = getRandomGrade();
    if (Grade <= 3) { //8+
        document.getElementById("normal-result").innerHTML = `Grade: 8+`;
        const rangersJson = await loadJSON('scraping/8-ultra.json'); // โหลดไฟล์ JSON
        console.log('Loaded JSON:', rangersJson);
        const rangerIndex = getRandomRangers(0.01, 3.01);
        document.getElementById("normal-result2").innerHTML = `Rate: ${rangerIndex}`;
        if (rangerIndex > 0.48) {
            const commonIndex = getRandomCommonRangers(0, 125);
            document.getElementById("normal-result3").innerHTML = `Common: ${commonIndex}`;
            const result = rangersJson[commonIndex];
            document.getElementById("normal-result4").innerHTML = `Name: ${result.Name}`;

        } else {
            const newIndex = getRandomNewRangers(126, 129);
            document.getElementById("normal-result3").innerHTML = `Collab: ${newIndex}`;
            const result = rangersJson[newIndex];
            document.getElementById("normal-result4").innerHTML = `Name: ${result.Name}`;
        }
    } else if (Grade <= 5) { //8

    } else if (Grade <= 22) { //7+

    } else { //7
        document.getElementById("normal-result").innerHTML = `Grade: ${Grade}`;
    }
}