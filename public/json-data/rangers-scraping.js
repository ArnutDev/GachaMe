const targetNames = [
    "High Schooler Taiyo",
    "Genius Hacker Shion",
    "Aikido Master Futaba",
    "Weapons Expert Shinzo"
];
/*
"High Schooler Taiyo",
    "Genius Hacker Shion",
    "Aikido Master Futaba",
    "Weapons Expert Shinzo"
*/
const data = [];

function searchAndStoreData(queries) {
    const data = [];
    const searchInput = document.querySelector("input[type='search']");

    if (searchInput) {
        let currentQueryIndex = 0;

        // ฟังก์ชันสำหรับการค้นหาคำแต่ละคำใน queries
        function searchNextQuery() {
            if (currentQueryIndex < queries.length) {
                const query = queries[currentQueryIndex];
                searchInput.value = query; // ใส่ค่าคำค้นหาลงในช่อง input
                const event = new Event('input', {
                    bubbles: true
                });
                searchInput.dispatchEvent(event); // ส่ง event 'input' เพื่อให้ระบบทำการค้นหา

                // รอให้การค้นหาผลลัพธ์เสร็จ
                setTimeout(() => {
                    // เก็บข้อมูลเมื่อค้นหาคำเสร็จ
                    document.querySelectorAll("a[ui-sref]").forEach(a => {
                        const name = a.innerText.trim();
                        const uiSrefValue = a.getAttribute("ui-sref");
                        const unitCodeMatch = uiSrefValue.match(/unitCode:'(.*?)'/);
                        console.log(`กำลังค้นหาคำ: ${query} และเจอ ${name}`);
                        if (unitCodeMatch) {
                            const unitCode = unitCodeMatch[1];

                            // ตรวจสอบว่าชื่อตรงกับ targetNames และ unitCode มีตัวอักษร 'e','u' หลังชุดตัวเลข
                            if (targetNames.includes(name) && /\d+u/.test(unitCode)) {
                                console.log(`เก็บ: ${query}`)
                                data.push({
                                    Name: name,
                                    Image: `https://rangers.lerico.net/res/${unitCode}/${unitCode}-thum.png`,
                                    UnitCode: unitCode
                                });
                            }
                        }
                    });

                    // หลังจากค้นหาเสร็จ จะไปยังคำถัดไป
                    currentQueryIndex++;

                    // ถ้ายังมีคำค้นหาต่อไปก็ทำการค้นหาคำถัดไป
                    searchNextQuery();
                }, 500); // รอ 2 วินาที เพื่อให้การค้นหาเสร็จสมบูรณ์
            } else {
                // เมื่อค้นหาครบแล้ว จะทำการดาวน์โหลดข้อมูล
                if (data.length > 0) {
                    downloadJSON(data);
                } else {
                    console.log("ไม่พบข้อมูลที่ตรงกับคำค้นหาของคุณ");
                }
            }
        }

        // เริ่มต้นการค้นหาคำแรก
        searchNextQuery();
    }
}

// ฟังก์ชันดาวน์โหลดไฟล์ JSON
function downloadJSON(data, filename = "8u-info-special.json") { // 8c,8u
    const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json"
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = filename;
    a.click();
    URL.revokeObjectURL(a.href);
}

// ตัวอย่างการใช้การค้นหาหลายคำและเก็บข้อมูลลง JSON
searchAndStoreData(targetNames); // ส่งอาเรย์ของคำค้นหาที่ต้องการ