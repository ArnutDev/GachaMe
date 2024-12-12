//add name tot search here json file
const namesToSearch = [ //7 common
    "Vagaborn Brown",
    "Luxury Sheep",
    "Invincible Honey",
    "Rocker ALICE",
    "Ruffian Brown",
    "Duck Car Sally",
    "Tree Stump Leonard",
    "HIME",
    "Mountain Boar Moon",
    "Balloon Rookie Cony",
    "Bad Boy Brown",
    "Cactus Sally",
    "Boatswain Hunt",
    "Vampire James",
    "Severin) Schooler",
    "Correspondent Moon",
    "Ice Sled Sally",
    "Magician Moon",
    "Keyboard Girl Cony",
    "Floating Brown",
    "Rocketeer Charles",
    "Pink Hood Cony",
    "Sky Rider Moon",
    "Drillmaster Brown",
    "Unpretty Mong",
    "Bubbly Cony",
    "Marine Moon.",
    "Mega Machine Sally",
    "Ballerina Lia wey",
    "Venus Cony",
    "Oak Barrel Edward",
    "Red Raptor Sally",
    "Duck Boat Cony",
    "Surfer Brown",
    "Robin Hood Moon",
    "Apple Kart Dennis",
    "Sentinel Mike",
    "Mage James",
    "Martial Artist Simon",
    "Lucky Cat Sally",
    "New Year Cony",
    "Frozen Daniel",
    "Shortcake Brown",
    "Champagne Cony",
    "Red Crab Edward",
    "Collector Brownie",
    "Novice Knight Moon",
    "Novice Priestess Jessica",
    "Chariot James",
    "Marshmallow Brown",
    "Girl Scout Merry",
    "Splish Splash Cony",
    "Dune Dood Pico"
];

const imageDetails = []; // อาร์เรย์เพื่อเก็บข้อมูลชื่อและ URL รูปภาพ

function searchNamesAutomatically(names) {
    const searchBox = document.querySelector("input[type='search']");

    if (!searchBox) {
        console.log("ไม่พบช่องค้นหา");
        return;
    }

    let index = 0;

    function performSearch() {
        if (index >= names.length) {
            console.log("ค้นหาครบทุกชื่อแล้ว");
            saveImageDetailsToFile();
            return;
        }

        searchBox.value = names[index];
        const event = new Event("input", {
            bubbles: true
        });
        searchBox.dispatchEvent(event);

        console.log(`ค้นหา: ${names[index]}`);

        // รอให้ผลลัพธ์โหลด
        setTimeout(() => {
            const nameElements = document.querySelectorAll("a[ui-sref]"); // ค้นหาเฉพาะแท็กที่มี ui-sref

            let found = false;

            nameElements.forEach((nameElement) => {
                const displayedName = nameElement.textContent.trim();

                if (displayedName === names[index]) { // ตรวจสอบชื่อแบบเป๊ะ
                    found = true;

                    // ดึงรหัส unitCode จาก ui-sref
                    const uiSref = nameElement.getAttribute("ui-sref");
                    const match = uiSref.match(/unitCode:'([^']*\d+e[^']*)'/); // ตรวจสอบ unitCode ที่มีตัวเลขตามด้วย 'e'

                    if (match) {
                        const unitCode = match[1];
                        // สร้างลิงก์รูปภาพในรูปแบบใหม่
                        const imageUrl = `https://rangers.lerico.net/res/${unitCode}/${unitCode}-thum.png`;

                        console.log(`ชื่อที่พบ: ${displayedName}`);
                        console.log(`ลิงก์รูปภาพ: ${imageUrl}`);

                        // บันทึกข้อมูลลงในอาร์เรย์
                        imageDetails.push({
                            Name: displayedName,
                            Image: imageUrl,
                            UnitCode: unitCode
                        });
                    }
                }
            });

            if (!found) {
                console.log(`ไม่พบชื่อ: ${names[index]}`);
                // เพิ่มชื่อที่ไม่พบใน JSON โดยเว้น UnitCode และ Image ไว้
                imageDetails.push({
                    Name: names[index],
                    Image: "",
                    UnitCode: ""
                });
            }

            index++; // เพิ่มค่า index หลังการค้นหาเสร็จสิ้น
            performSearch(); // ค้นหาชื่อถัดไป
        }, 1000); // รอ 1 วินาทีเพื่อให้โหลดผลลัพธ์
    }

    performSearch();
}

// ฟังก์ชันสำหรับดาวน์โหลดไฟล์ JSON ที่เก็บข้อมูล
function saveImageDetailsToFile() {
    const jsonBlob = new Blob([JSON.stringify(imageDetails, null, 2)], {
        type: 'application/json'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(jsonBlob);
    link.download = "7-common.json"; //fix name file here
    link.click();

    console.log("ข้อมูลทั้งหมดถูกดาวน์โหลดเป็นไฟล์ image_details.json");
}

// เรียกใช้ฟังก์ชัน
searchNamesAutomatically(namesToSearch);