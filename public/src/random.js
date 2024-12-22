let count = 0;
let u1 = 0;
let c1 = 0;
let u2 = 0;
let c2 = 0;
let u3 = 0;
let c3 = 0;
let u4 = 0;
let c4 = 0;

async function loadJSON(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Error fetching file: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Error loading JSON:', error);
        throw error;
    }
}

function getRandomRangers(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function getRandomPickRanger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function normalGacha() {
    const divSlots = document.querySelectorAll('.content-display'); // เลือก div ทั้ง 7 อัน
    divSlots.forEach(slot => (slot.innerHTML = '')); // ล้างข้อมูลเก่า
    const ultraCollabRate = 0.48;
    const commonCollabRate = 3.52;

    setTimeout(async () => {

        for (let i = 0; i < 7; i++) {
            const chance = getRandomRangers(1, 100);
            let rangersJson;
            let result;
            let grade;
            let collab = false;
            if (chance <= 3) {
                const collabGrade = getRandomRangers(0.01, 100.00);
                if (collabGrade <= ultraCollabRate) {
                    rangersJson = await loadJSON('scraping/8-ultra-collab.json');
                    collab = true;
                } else {
                    rangersJson = await loadJSON('scraping/8-ultra.json');
                }
                grade = "Ultra 8 star";
            } else if (chance <= 8) {
                rangersJson = await loadJSON('scraping/7-ultra.json');
                grade = "Ultra 7 star";
            } else if (chance <= 30) {
                const collabGrade = getRandomRangers(0.01, 100.00);
                if (collabGrade <= commonCollabRate) {
                    rangersJson = await loadJSON('scraping/8-common-collab.json');
                    collab = true;
                } else {
                    rangersJson = await loadJSON('scraping/8-common.json');
                }
                grade = "8 star";
            } else {
                rangersJson = await loadJSON('scraping/7-common.json');
                grade = "7 star";
            }

            const randomIndex = getRandomPickRanger(0, rangersJson.length - 1);
            result = rangersJson[randomIndex];


            // เพิ่มข้อมูลใน div
            if (divSlots[i]) {
                let border = ``;
                if (collab) {
                    border = `border border-success border-5`;
                    getStat(result);

                }
                divSlots[i].innerHTML = `
                <div class="p-2 ${border} rounded">
                    <div class="image-box d-flex justify-content-center align-items-center" style="height: 100px;">
                        <img src="${result.Image}" alt="${result.Name}" class="img-fluid" style="max-height: 80px;">
                    </div>
                    <p><strong>Grade:</strong> ${grade}</p>
                    <p class="mt-2"><strong>Name:</strong> ${result.Name}</p>
                </div>
            `;
            }

        }
        // อัปเดตจำนวนรวม
        document.getElementById("normal-count").innerHTML = ` ${count}, Ruby used: ${count * 300}`;

        document.getElementById("u-ranger-1").innerHTML = u1;
        document.getElementById("c-ranger-1").innerHTML = c1;
        document.getElementById("u-ranger-2").innerHTML = u2;
        document.getElementById("c-ranger-2").innerHTML = c2;
        document.getElementById("u-ranger-3").innerHTML = u3;
        document.getElementById("c-ranger-3").innerHTML = c3;
        document.getElementById("u-ranger-4").innerHTML = u4;
        document.getElementById("c-ranger-4").innerHTML = c4;
    }, 300);
    count++;

}
async function rateUp1() {
    const divSlots = document.querySelectorAll('.content-display'); // เลือก div ทั้ง 7 อัน
    divSlots.forEach(slot => (slot.innerHTML = '')); // ล้างข้อมูลเก่า
    const ultraCollabRate = 0.36;
    const commonCollabRate = 2.64;
    setTimeout(async () => {

        for (let i = 0; i < 7; i++) {
            const chance = getRandomRangers(1, 100);
            let rangersJson;
            let result;
            let grade;
            let collab = false;
            if (chance <= 3) {
                const collabGrade = getRandomRangers(0.01, 100.00);
                if (collabGrade <= ultraCollabRate) {
                    rangersJson = await loadJSON('scraping/rate-up1/8-ultra-collab.json');
                    collab = true;
                } else {
                    rangersJson = await loadJSON('scraping/8-ultra.json');
                }
                grade = "Ultra 8 star";
            } else if (chance <= 8) {
                rangersJson = await loadJSON('scraping/7-ultra.json');
                grade = "Ultra 7 star";
            } else if (chance <= 30) {
                const collabGrade = getRandomRangers(0.01, 100.00);
                if (collabGrade <= commonCollabRate) {
                    rangersJson = await loadJSON('scraping/rate-up1/8-common-collab.json');
                    collab = true;
                } else {
                    rangersJson = await loadJSON('scraping/8-common.json');
                }
                grade = "8 star";
            } else {
                rangersJson = await loadJSON('scraping/7-common.json');
                grade = "7 star";
            }
            const randomIndex = getRandomPickRanger(0, rangersJson.length - 1);
            result = rangersJson[randomIndex];


            // เพิ่มข้อมูลใน div
            if (divSlots[i]) {
                let border = ``;
                if (collab) {
                    border = `border border-success border-5`;
                    getStat(result);

                }
                divSlots[i].innerHTML = `
                <div class="p-2 ${border} rounded">
                    <div class="image-box d-flex justify-content-center align-items-center" style="height: 100px;">
                        <img src="${result.Image}" alt="${result.Name}" class="img-fluid" style="max-height: 80px;">
                    </div>
                    <p><strong>Grade:</strong> ${grade}</p>
                    <p class="mt-2"><strong>Name:</strong> ${result.Name}</p>
                </div>
            `;
            }

        }
        // อัปเดตจำนวนรวม
        document.getElementById("normal-count").innerHTML = ` ${count}, Ruby used: ${count * 300}`;

        document.getElementById("u-ranger-1").innerHTML = u1;
        document.getElementById("c-ranger-1").innerHTML = c1;
        document.getElementById("u-ranger-2").innerHTML = u2;
        document.getElementById("c-ranger-2").innerHTML = c2;
        document.getElementById("u-ranger-3").innerHTML = u3;
        document.getElementById("c-ranger-3").innerHTML = c3;
        document.getElementById("u-ranger-4").innerHTML = u4;
        document.getElementById("c-ranger-4").innerHTML = c4;
    }, 300);
    count++;

}

async function getStat(data) {
    const collabUltraJson = await loadJSON('scraping/8-ultra-collab.json');
    const collabCommonJson = await loadJSON('scraping/8-common-collab.json');

    // สร้างตัวแปรเก็บผลลัพธ์
    let result = -1; // ใช้ -1 เพื่อบ่งบอกว่าไม่พบค่าในตอนเริ่มต้น

    // ตรวจสอบว่า data.Name ตรงกับข้อมูลใน collabUltraJson หรือไม่
    for (let index = 0; index < collabUltraJson.length; index++) {
        if (collabUltraJson[index].Name === data.Name) {
            result = index; // ถ้าตรงกัน ให้เก็บ index ไว้ใน result
            break; // หยุดการวนลูปหากพบแล้ว
        }

    }
    if (result == 0) {
        u1++;
    } else if (result == 1) {
        u2++;
    } else if (result == 2) {
        u3++;
    } else if (result == 3) {
        u4++;
    }
    // ถ้ายังไม่พบ ให้ตรวจสอบกับ collabCommonJson
    if (result === -1) {
        for (let index = 0; index < collabCommonJson.length; index++) {
            if (collabCommonJson[index].Name === data.Name) {
                result = index; // ถ้าตรงกัน ให้เก็บ index ไว้ใน result
                console.log(result);
                break; // หยุดการวนลูปหากพบแล้ว

            }
        }
        if (result == 0) {
            c1++;
        } else if (result == 1) {
            c2++;
        } else if (result == 2) {
            c3++
        } else if (result == 3) {
            c4++
        }
    }

}



// Function to handle modal opening after closing it
function handleModalReopen() {
    // Get the modal element and modal object
    const myModalElement = document.getElementById('myModal');
    const modal = new bootstrap.Modal(myModalElement);

    // Add event listener for the "สุ่มอีกครั้ง" button
    document.getElementById('randomButton').addEventListener('click', function () {
        // Close the modal first
        modal.hide();

        // Immediately show the modal again after it has been hidden
        myModalElement.addEventListener('hidden.bs.modal', function () {
            modal.show();
        }, {
            once: true
        }); // Use { once: true } to ensure it only runs once after modal is hidden
    });
}

// Call the function to initialize the modal event
handleModalReopen();