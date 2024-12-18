// กำหนดโอกาสสุ่มของแต่ละระดับ
const levelChances = {
    A: 3, // ระดับ A 3%
    B: 5, // ระดับ B 5%
    C: 22, // ระดับ C 22%
    D: 70 // ระดับ D 70%
};

// ฟังก์ชันสุ่มระดับเรนเจอร์
function randomLevel() {
    const random = Math.random() * 100; // สุ่มตัวเลข 0-100
    let cumulativeChance = 0;

    for (const [level, chance] of Object.entries(levelChances)) {
        cumulativeChance += chance;
        if (random <= cumulativeChance) {
            return level;
        }
    }
}

// ฟังก์ชันสุ่มเรนเจอร์ในระดับที่กำหนด
function randomRanger(level, rangersData) {
    const rangers = rangersData[level];
    const random = Math.random() * 100;

    if (level === "A" || level === "B") {
        const specialChance = (level === "A" ? 0.12 : 0.88) * 4; // โอกาสพิเศษรวม
        if (random <= specialChance) {
            const specialIndex = Math.floor(random / (level === "A" ? 0.12 : 0.88));
            return rangers[specialIndex]; // คืนค่าเรนเจอร์พิเศษ
        }
        // สุ่มในกลุ่มทั่วไป
        const normalIndex = Math.floor((random - specialChance) / (level === "A" ? 0.02 : 0.14));
        return rangers[normalIndex + 4];
    }

    // ระดับ C และ D (โอกาสเท่ากันทั้งหมด)
    const normalIndex = Math.floor(random / (level === "C" ? 0.71 : 1.21));
    return rangers[normalIndex];
}

// ฟังก์ชันหลักสำหรับการสุ่ม
async function summonRanger() {
    const response = await fetch("rangers.json"); // โหลดไฟล์ JSON
    const rangersData = await response.json();

    const level = randomLevel();
    const ranger = randomRanger(level, rangersData);
    return `You got ${ranger.Name} (${level}): ${ranger.Image}`;
}

// ตัวอย่างการสุ่ม
summonRanger().then(result => console.log(result));