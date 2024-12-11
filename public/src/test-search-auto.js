const namesToSearch = [ //should use fetch to import Json file
    // "Lucky 7 Moon",
    // "White Queen Cony",
    // "White Knight Sally",
    // "Colorful Paint Moon",
    // "Colorful Paint Roller Brown",
    // "Remote Manager Moon",
    // "Nonstop Train Leonard",
    // "Pumpkin Candy Brown",
    // "Little Reaper Sally",
    // "Choco Banana Sally",
    // "Penguin Elle",
    // "Keyboard Star Cony",
    // "Guitar Star Moon",
    // "Tea Party & The Hatter Moon",
    // "Showy Clown Brown",
    // "Balloon Master Cony",
    // "Big Bad Brown",
    // "Big Money Cony",
    // "Black Mariachi Moon",
    // "Food-Fight Sally",
    // "Scary Croc Game Boss",
    // "Pirate Hunt",
    // "Black Magic Jiangshi Moon",
    // "Cursed Vampire James",
    // "Pine Tree Box Cony",
    // "Middle Schooler Cony",
    // "High Schooler Brown",
    // "Mechanical Armor Edward",
    // "Space Pirate Moon",
    // "Super Dark Brown",
    // "Super Blue Moon",
    // "Megabrew Coffee Maker Steve",
    // "Expert Barista Brown",
    // "Shotgun Sally",
    // "Pumpkin Witch Cony",
    // "Snow Pro Cony",
    // "Samoyed Sled Sally",
    // "Angel Casino Dealer Sally",
    // "★8 Ultra Leonard",
    // "Allfather Zeus Brown",
    // "Destructor Ares Cony",
    // "Wise Athena Jessica",
    // "Inventor DaVinci Sally",
    // "Conductor Mozart James",
    // "Playwright Shakespeare Moon",
    // "Hip Hop Dino Cony",
    // "RedDinoBrown",
    // "Afro Cave Sally",
    // "Mochi Master Brown",
    // "Beautiful Miko Cony",
    // "Cutie Daruma Sally",
    // "Liu Bei Xuande Moon",
    // "Zhang Fei Yide BROWN",
    // "Marching Band Moon",
    // "Goose Car Sally",
    // "Fan Club President Cony",
    // "Ultra-Strict Ref Dane",
    // "Fungus Fairy Sally",
    // "Forest Fairy Leonard",
    // "Sea God Susanoo Fishu",
    // "Earth Kushinada Hime",
    // "Piping Hot Brown",
    // "Samurai Underboss"
];

const imageUrls = []; // อาร์เรย์เพื่อเก็บ URL รูปภาพ

function searchNamesAutomatically(names) {
    const searchBox = document.querySelector("input[type='search']");

    if (!searchBox) {
        console.log("ไม่พบช่องค้นหา");
        return;
    }

    let index = 0;

    function performSearch() {
        if (index < names.length) {
            searchBox.value = names[index];
            const event = new Event("input", {
                bubbles: true
            });
            searchBox.dispatchEvent(event);

            console.log(`ค้นหา: ${names[index]}`);
            index++;

            // รอให้ผลการค้นหามาแล้วดึงลิงก์ของรูปภาพ
            setTimeout(() => {
                const imageElement = document.querySelector("img"); // ค้นหาภาพในหน้าเว็บ
                if (imageElement) {
                    const imageUrl = imageElement.src; // ดึง URL ของรูปภาพ
                    console.log("ลิงก์รูปภาพ:", imageUrl);

                    // เก็บลิงก์รูปภาพลงในอาร์เรย์
                    imageUrls.push(imageUrl);

                    // เช็คว่าเมื่อค้นหาครบทุกชื่อแล้วจะสร้างไฟล์
                    if (index === names.length) {
                        saveImageUrlsToFile();
                    }
                }
            }, 2000); // รอ 2 วินาทีเพื่อให้ผลลัพธ์ขึ้นมา

            setTimeout(performSearch, 1000); // ค้นหาทุก 2 วินาที
        } else {
            console.log("ค้นหาครบทุกชื่อแล้ว");
        }
    }

    performSearch();
}

// ฟังก์ชันสำหรับดาวน์โหลดไฟล์ที่เก็บลิงก์รูปภาพ
function saveImageUrlsToFile() {
    const blob = new Blob([imageUrls.join("\n")], {
        type: 'text/plain'
    });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = "image_urls.txt"; // ชื่อไฟล์ที่ดาวน์โหลด
    link.click(); // เรียกใช้เพื่อดาวน์โหลดไฟล์

    console.log("ลิงก์ทั้งหมดถูกดาวน์โหลดเป็นไฟล์ image_urls.txt");
}

// เรียกใช้ฟังก์ชัน
searchNamesAutomatically(namesToSearch);