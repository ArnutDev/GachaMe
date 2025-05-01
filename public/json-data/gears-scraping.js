const targetNames = [
    "Croc King's Sword",
    "Belle Cony's Hairpin",
    "Queen Sally's Glove"
];

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
                        const ItemCodeMatch = uiSrefValue.match(/itemCode:'(.*?)'/);
                        console.log(`กำลังค้นหาคำ: ${query} และเจอ ${name}`);
                        if (ItemCodeMatch) {
                            const ItemCode = ItemCodeMatch[1];

                            // ถ้าชื่อใน targetNames ตรงกับคำค้นหาที่กรอก
                            if (queries.some(query => name.includes(query))) {
                                console.log(`เก็บ: ${query}`)
                                data.push({
                                    Name: name,
                                    Image: `https://rangers.lerico.net/res/gear_icon/${ItemCode}_icon.png`,
                                    ItemCode: ItemCode
                                });
                            }
                        }
                    });

                    // หลังจากค้นหาเสร็จ จะไปยังคำถัดไป
                    currentQueryIndex++;

                    // ถ้ายังมีคำค้นหาต่อไปก็ทำการค้นหาคำถัดไป
                    searchNextQuery();
                }, 500); // รอ 0.5 วินาที เพื่อให้การค้นหาเสร็จสมบูรณ์
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
function downloadJSON(data, filename = "gears-info-special.json") {
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