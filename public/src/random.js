let count = 0;
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

function getRandomPickRanger(min, max) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min; // สุ่มจำนวนเต็มระหว่าง min และ max
    return random;
}

async function normalGacha() {
    const Grade = getRandomRangers(0.01, 100.00);
    const resultContainer = document.getElementById("normal-result");

    let rangersJson;
    //test sum rangers
    let sum = 0;
    if (Grade <= 3.00) {
        const subGrade = getRandomRangers(0.01, 3.00);

        if (subGrade >= 0.01 && subGrade <= 0.48) {
            // โหลดไฟล์ JSON อื่นเมื่อค่าที่สุ่มได้อยู่ระหว่าง 0.01 - 0.48
            rangersJson = await loadJSON('scraping/8-ultra-collab.json');

            alert('Congratulation u got collabro rangers!');
        } else {
            rangersJson = await loadJSON('scraping/8-ultra.json');
            console.log(rangersJson.length); //full 122/122
        }
        resultContainer.innerHTML = `Ultra 8 star`;
    } else if (Grade <= 8.00) {
        rangersJson = await loadJSON('scraping/7-ultra.json');
        resultContainer.innerHTML = `Ultra 7 star`;
        console.log(rangersJson.length); //full 7/7
    } else if (Grade <= 30.00) {
        const subGrade = getRandomRangers(0.01, 30.00);
        if (subGrade >= 0.01 && subGrade <= 3.52) {
            // โหลดไฟล์ JSON อื่นเมื่อค่าที่สุ่มได้อยู่ระหว่าง 0.01 -3.52
            rangersJson = await loadJSON('scraping/8-common-collab.json');
            alert('Congratulation u got collabro rangers!');
        } else {
            rangersJson = await loadJSON('scraping/8-common.json');
            console.log(rangersJson.length); // full 132/132
        }
        resultContainer.innerHTML = `8 star`;
    } else {
        rangersJson = await loadJSON('scraping/7-common.json');
        resultContainer.innerHTML = `7 star`;
        console.log(rangersJson.length); // full 58/58
    }

    const randomIndex = getRandomPickRanger(0, rangersJson.length - 1);
    const result = rangersJson[randomIndex];
    count += 1;
    setTimeout(() => {
        // แสดงข้อมูลตัวละครในหน้าจอหลังจาก delay
        document.getElementById("normal-result2").innerHTML = `${result.Name}`;
        document.getElementById("normal-result4").innerHTML = `<img src="${result.Image}" alt="${result.Name}" style="max-width: 150px; height: 100px;">`;
        document.getElementById("normal-result5").innerHTML = `${count} , Gacha-coupon used: ${count*5}`;
    }, 300);
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