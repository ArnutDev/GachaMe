const namesToSearch = [ //change this data for search 8 common
    "Zeus Brown",
    "Ares Cony",
    "Athena Jessica",
    "DaVinci Sally",
    "Mozart James",
    "Shakespeare Moon",
    "Dino Cony",
    "DinoBrown",
    "Cave Sally",
    "Mochi Apprentice Brown",
    "Miko Cony",
    "Daruma Sally",
    "Liu Bei Moon",
    "Zhang Fei Brown",
    "Toy Soldier Moon",
    "Chicken Car Sally",
    "Fan Cony",
    "Red Card Dane",
    "Mini Mushroom Sally",
    "Tree Spirit Leonard",
    "Susanoo Fishu",
    "Kushinada Hime",
    "Kotatsu Brown",
    "Wayward Traveler Moon",
    "Clown Brown",
    "Balloon Expert Cony",
    "Big Bully Brown",
    "Make It Rain Cony",
    "Mariachi Moon",
    "Percussion Sally",
    "Croc Game Boss",
    "Chief Mate Hunt",
    "Jiangshi Moon",
    "Iron Vampire James",
    "Wooden Box Cony",
    "Elementary Schooler Cony",
    "Middle Schooler Brown",
    "Alien Edward",
    "Pirate Moon",
    "Black Jersey Brown",
    "Blue Jersey Moon",
    "Coffee Maker Steve",
    "Barista Brown",
    "Little Red Riding Hood Sally",
    "Apprentice Witch Cony",
    "Board Cony",
    "Sled Sally",
    "Casino Dealer Sally",
    "Sawed-In-Half",
    "Magician Moon",
    "Chess Queen Cony",
    "Chess Knight Sally",
    "Paint Gunner Moon",
    "Paint Roller Brown",
    "Remote Worker Moon",
    "Commuter Train Leonard",
    "Wolf Candy Brown",
    "Little Devil Sally",
    "Sweet Grape Sally",
    "Seal Elle",
    "Keyboardist Cony",
    "Guitarist Moon",
    "The Hatter Moon",
    "Alice Cony",
    "Horus Sally",
    "Bastet Jessica",
    "Indie Film Edward",
    "Slate Sally",
    "Tuna Brown",
    "Spaceman Charles",
    "Gunkan-Maki Sally",
    "Exercise Sally",
    "Balance Ball Boss",
    "Catcher Moon",
    "Batter Brown",
    "Tycoon's Daughter Cony",
    "Croc Prince Moon",
    "Tin Bear Brown",
    "Cowardly Lion & Sally",
    "Little Mage Leonard",
    "Quest Hunter Moon",
    "Twins Cony",
    "Mystery Hand & Sally",
    "Blue Dragon & Moon",
    "Water Thrower Cherina",
    "Trainee Brown",
    "Trainee Cony",
    "Musketeer James",
    "Musketeer Moon",
    "Fencer Sheep",
    "Gymnast Chichi",
    "Sheriff Moon",
    "Japanese Inn Daughter Cony",
    "Sister Jessica",
    "Sorcerer Brown",
    "Bath Goddess Cony",
    "Commander Moon",
    "Ultra Machine Sally",
    "T-Rex Sally",
    "Unicorn Cony",
    "Motor Boat Brown",
    "Gladiator Moon",
    "Watermelon Kart Dennis",
    "Rocket Toti",
    "Gourmet Tiger",
    "Garrison Mike",
    "White Mage James",
    "Cowboy Jessica",
    "Diver Brown",
    "Lifeguard Cony",
    "Martial Artist Brown",
    "Ice Suit Brown",
    "Heavy Metal Boss",
    "Fighter Simon",
    "Luck-Bringer Sally",
    "Dumpling Cony",
    "Electro Daniel",
    "Choco Cake Brown",
    "Pink Champagne Cony",
    "Sea Crab Edward",
    "Fire Magician Cony",
    "Adventurer Brownie",
    "Agent Somchai",
    "Eye Patch Moon",
    "Champion Bob",
    "Senior Knight Moon",
    "Senior Priestess Jessica",
    "Winged Chariot James",
    "Corn Brown",
    "Sailor Merry",
    "Summer Vacay Cony",
    "Sit Back & Sea Pico"
];
//
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

                if (displayedName.includes(names[index])) {
                    found = true;

                    // ดึงรหัส unitCode จาก ui-sref
                    const uiSref = nameElement.getAttribute("ui-sref");
                    const match = uiSref.match(/unitCode:'([^']+)'/);

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
    link.download = "image_details.json";
    link.click();

    console.log("ข้อมูลทั้งหมดถูกดาวน์โหลดเป็นไฟล์ image_details.json");
}

// เรียกใช้ฟังก์ชัน
searchNamesAutomatically(namesToSearch);