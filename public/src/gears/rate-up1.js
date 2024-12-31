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

function getRandomGears(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

function generateRandomRange(min, max, eachRate) {
    let arr = [];

    function getValidRandomValue() {
        let randomValue = (Math.random() * (max - min) + min).toFixed(2); // ใช้ toFixed(2) เพื่อให้ได้ 2 ตำแหน่ง
        return parseFloat(randomValue);
    }

    // ฟังก์ชันตรวจสอบและสุ่มค่าที่ไม่เกินช่วง
    function getValidPair() {
        let num1 = getValidRandomValue();
        let num2 = (num1 + eachRate).toFixed(2); // ใช้ toFixed(2) เพื่อให้ num2 มี 2 ตำแหน่ง
        num2 = parseFloat(num2);

        // ตรวจสอบว่า num2 ไม่เกิน max และ num1 ยังไม่เกิน min
        if (num2 > max) {
            num1 = (max - eachRate).toFixed(2); // ใช้ toFixed(2) เพื่อให้ num1 มี 2 ตำแหน่ง
            num1 = parseFloat(num1);
            num2 = max;
        }

        // ตรวจสอบว่า num1 ยังอยู่ในช่วง min ถึง max
        if (num1 < min) {
            num1 = min; // ถ้า num1 ต่ำกว่า min, ตั้งให้ num1 เป็น min
            num2 = (num1 + eachRate).toFixed(2); // ใช้ toFixed(2) เพื่อให้ num2 มี 2 ตำแหน่ง
            num2 = parseFloat(num2);
        }

        return [num1, num2];
    }

    // สุ่มค่าของ arr[0], arr[1]
    let pair1 = getValidPair();
    arr[0] = pair1[0];
    arr[1] = pair1[1];

    // ตรวจสอบว่าแต่ละช่วงไม่ทับกันและห่างกันไม่เกิน eachRate
    // for (let i = 0; i < arr.length; i += 2) {
    //     for (let j = i + 2; j < arr.length; j += 2) {
    //         // ตรวจสอบว่าช่วงทับกันหรือล้ำกัน
    //         if ((arr[i] >= arr[j] && arr[i] <= arr[j + 1]) || (arr[j] >= arr[i] && arr[j] <= arr[i + 1]) || (arr[i + 1] - arr[i] > eachRate) || (arr[j + 1] - arr[j] > eachRate)) {
    //             // ถ้าช่วงทับกันหรือห่างเกิน eachRate ให้สุ่มใหม่
    //             return generateRandomRange(min, max, eachRate);
    //         }
    //     }
    // }

    // ลูปแสดงผลค่าอาเรย์ตำแหน่งที่ 0-1, 2-3
    // for (let i = 0; i < arr.length; i += 2) {
    //     alert(`arr[${i}] - arr[${i + 1}] = ${arr[i]} - ${arr[i + 1]} = ${(arr[i + 1] - arr[i]).toFixed(2)}`);
    // }

    return arr;
}

function checkValueInRange(value, arr) {
    // ลูปตรวจสอบค่าที่กำหนดว่าอยู่ในช่วงไหน
    for (let i = 0; i < arr.length; i += 2) {
        if (value > arr[i] && value <= arr[i + 1]) {
            // ถ้าค่าอยู่ในช่วงระหว่าง arr[i] และ arr[i+1]
            // alert(`arr[${i}] - arr[${i + 1}] ${arr[i]}> ${value} <${arr[i+1]} range = ${(arr[i+1] -arr[i]).toFixed(2)}`);
            return true; // คืนค่าจริงเมื่อค่าอยู่ในช่วง
        }
    }
    // // ถ้าค่าที่กำหนดไม่อยู่ในช่วงใดๆ
    // alert(`Value ${value} is not within any range.`);
    return false; // คืนค่าเท็จเมื่อค่าไม่อยู่ในช่วง
}



function getRandomPickGears(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function rateUp1() {
    const divSlots = document.querySelectorAll('.content-display1'); // เลือก div ทั้ง 7 อัน
    divSlots.forEach(slot => (slot.innerHTML = '')); // ล้างข้อมูลเก่า

    setTimeout(async () => {

        for (let i = 0; i < 6; i++) {
            const chance = getRandomGears(0, 100); ///
            let gearsJson;
            let grade;
            let special = false;
            if (chance <= 1) {
                let eachRate = 0.60;
                let range = generateRandomRange(0.01, 1.00, eachRate);
                let value = getRandomGears(0.01, 1.00); //x>[0] && x<=[1]
                let result = checkValueInRange(value, range);
                if (result) {
                    gearsJson = await loadJSON('json-data/gears/rate-up1/8c-info-special.json');
                } else {
                    gearsJson = await loadJSON('json-data/gears/rate-up1/8c-info.json');
                }
                special = true;
                grade = "8 star";
            } else if (chance <= 3) {
                let eachRate = 1.23;
                let range = generateRandomRange(0.01, 2.00, eachRate);
                let value = getRandomGears(0.01, 2.00); //x>[0] && x<=[1]
                let result = checkValueInRange(value, range);
                if (result) {
                    gearsJson = await loadJSON('json-data/gears/rate-up1/7c-info-special.json');
                } else {
                    gearsJson = await loadJSON('json-data/gears/rate-up1/7c-info.json');
                }
                // special = true;
                grade = "7 star";
            } else if (chance <= 50) { //6 star
                gearsJson = await loadJSON('json-data/gears/rate-normal/6c-info.json');
                grade = "6 star";
            } else { //5 star
                gearsJson = await loadJSON('json-data/gears/rate-normal/5c-info.json');
                grade = "5 star";
            }

            const randomIndex = getRandomPickGears(0, gearsJson.length - 1);
            let gears = gearsJson[randomIndex];


            // เพิ่มข้อมูลใน div
            if (divSlots[i]) {
                let border = ``;
                if (special) {
                    if (await getStat(gears)) { //when use async function dont forget await
                        border = `border border-success border-5`;
                        special = false;
                    }
                }
                divSlots[i].innerHTML = `
                <div class="p-2 ${border} rounded">
                    <div class="image-box d-flex justify-content-center align-items-center" style="height: 100px;">
                        <img src="${gears.Image}" alt="${gears.Name}" class="img-fluid" style="max-height: 80px;">
                    </div>
                    <p><strong>Grade:</strong> ${grade}</p>
                    <p class="mt-2"><strong>Name:</strong> ${gears.Name}</p>
                </div>
            `;
            }

        }
        // อัปเดตจำนวนรวม
        document.getElementById("normal-count1").innerHTML = ` ${count}, Ruby used: ${count * 200}`;
        //Add this by amount in statistics
        document.getElementById("u-ranger-1").innerHTML = u1;
        document.getElementById("u-ranger-2").innerHTML = u2;
        document.getElementById("u-ranger-3").innerHTML = u3;
        document.getElementById("u-ranger-4").innerHTML = u4;
    }, 300);
    count++;

}

// Function to handle modal opening after closing it
function handleModalReopen() {
    // Get the modal element and modal object
    const myModalElement = document.getElementById('myModal1');
    const modal = new bootstrap.Modal(myModalElement);

    // Add event listener for the "สุ่มอีกครั้ง" button
    document.getElementById('randomButton1').addEventListener('click', function () {
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