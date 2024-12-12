//add name tot search here json file
const namesToSearch = [ //8 ultra
    "Allfather Zeus Brown",
    "Destructor Ares Cony",
    "Wise Athena Jessica",
    "Inventor DaVinci Sally",
    "Conductor Mozart James",
    "Playwright Shakespeare Moon",
    "Hip Hop Dino Cony",
    "RedDinoBrown",
    "Afro Cave Sally",
    "Mochi Master Brown",
    "Beautiful Miko Cony",
    "Cutie Daruma Sally",
    "Liu Bei Xuande Moon",
    "Zhang Fei Yide BROWN",
    "Marching Band Moon",
    "Goose Car Sally",
    "Fan Club President Cony",
    "Ultra-Strict Ref Dane",
    "Fungus Fairy Sally",
    "Forest Fairy Leonard",
    "Sea God Susanoo Fishu",
    "Earth Kushinada Hime",
    "Piping Hot Brown",
    "Samurai Underboss",
    "Showy Clown Brown",
    "Balloon Master Cony",
    "Big Bad Brown",
    "Big Money Cony",
    "Black Mariachi Moon",
    "Food-Fight Sally",
    "Scary Croc Game Boss",
    "Pirate Hunt",
    "Black Magic Jiangshi Moon",
    "Cursed Vampire James",
    "Pine Tree Box Cony",
    "Middle Schooler Cony",
    "High Schooler Brown",
    "Mechanical Armor Edward",
    "Space Pirate Moon",
    "Super Dark Brown",
    "Super Blue Moon",
    "Megabrew Coffee Maker Steve",
    "Expert Barista Brown",
    "Shotgun Sally",
    "Pumpkin Witch Cony",
    "Snow Pro Cony",
    "Samoyed Sled Sally",
    "Angel Casino Dealer Sally",
    "Lucky 7 Moon",
    "White Queen Cony",
    "White Knight Sally",
    "Colorful Paint Moon",
    "Colorful Paint Roller Brown",
    "Remote Manager Moon",
    "Nonstop Train Leonard",
    "Pumpkin Candy Brown",
    "Little Reaper Sally",
    "Choco Banana Sally",
    "Penguin Elle",
    "Keyboard Star Cony",
    "Guitar Star Moon",
    "Tea Party & The Hatter Moon",
    "Ace Catcher Moon",
    "Ace Fencer Sheep",
    "Ace Gymnast Chichi",
    "Batter No. 3 Brown",
    "Brave Tin Bear Brown",
    "Cash Cat Sally",
    "Cheerful Lion & Sally",
    "Chef Tiger",
    "Coast Guard Cony",
    "Cursed Hand & Sally",
    "Death Machine Sally",
    "Daughter of the West Cony",
    "Devilodon Sally",
    "Drunken Fist Brown",
    "Dungeon Hunter Moon",
    "Explorer Brownie",
    "Festival Bazooka Cony",
    "Fire Suit Brown",
    "Giant Croc Moon",
    "Goddess Jessica",
    "Gold Champagne Cony",
    "Golden Goddess Cony",
    "Hard Rock Boss",
    "Musketeer Moon",
    "Immolator Daniel",
    "Kickboxer Simon",
    "King Crab Edward",
    "Lemon Kart Dennis",
    "Mermaid Cony",
    "Nature Sorcerer Brown",
    "Party Cake Brown",
    "Perfomer Brown",
    "Pirate Captain Moon",
    "Poseidon Brown",
    "Swordsman Musketeer James",
    "Scuba Diver Brown",
    "Special Force Member Mike",
    "Sunrise Dragon & Moon",
    "Snow Magician Cony",
    "Super Hero Moon",
    "Super Rocket Toti",
    "Suspicious Twins Cony",
    "Village Belle Cony",
    "Vocalist Cony",
    "Shape Shifter Sister Jessica",
    "Shaman Leonard",
    "Begone Bad Mojo Cherina",
    "Huge Musketeer Moon",
    "Sheriff of the West Moon",
    "Legendary Mage James",
    "Acolyte Jessica",
    "Bodyguard Somchai",
    "Beard Moon",
    "Legend Bob",
    "Paladin Moon",
    "Hero James",
    "Navy Merry",
    "Shish Kebab Brown",
    "Shining Sea Cony",
    "Starlit Sea Pico"
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
                    const match = uiSref.match(/unitCode:'([^']*\d+u[^']*)'/); // ตรวจสอบ unitCode ที่มีตัวเลขตามด้วย 'e'

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
    link.download = "8-ultra.json"; //fix name file here
    link.click();

    console.log("ข้อมูลทั้งหมดถูกดาวน์โหลดเป็นไฟล์ image_details.json");
}

// เรียกใช้ฟังก์ชัน
searchNamesAutomatically(namesToSearch);