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

function generateRandomRange(min, max, eachRate, amount) {
    let arr = [];
    let countArr = 0;

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
    if (countArr < amount) {
        // สุ่มค่าของ arr[0], arr[1]
        let pair1 = getValidPair();
        arr[0] = pair1[0];
        arr[1] = pair1[1];
        countArr++;
    }
    if (countArr < amount) {
        // สุ่มค่าของ arr[2], arr[3]
        let pair2 = getValidPair();
        arr[2] = pair2[0];
        arr[3] = pair2[1];
        countArr++;
    }
    if (countArr < amount) {
        // สุ่มค่าของ arr[4], arr[5]
        let pair3 = getValidPair();
        arr[4] = pair3[0];
        arr[5] = pair3[1];
        countArr++;
    }
    if (countArr < amount) {
        // สุ่มค่าของ arr[6], arr[7]
        let pair4 = getValidPair();
        arr[6] = pair4[0];
        arr[7] = pair4[1];
        countArr++;
    }

    // ตรวจสอบว่าแต่ละช่วงไม่ทับกันและห่างกันไม่เกิน eachRate
    for (let i = 0; i < arr.length; i += 2) {
        for (let j = i + 2; j < arr.length; j += 2) {
            // ตรวจสอบว่าช่วงทับกันหรือล้ำกัน
            if ((arr[i] >= arr[j] && arr[i] <= arr[j + 1]) || (arr[j] >= arr[i] && arr[j] <= arr[i + 1]) || (arr[i + 1] - arr[i] > eachRate) || (arr[j + 1] - arr[j] > eachRate)) {
                // ถ้าช่วงทับกันหรือห่างเกิน eachRate ให้สุ่มใหม่
                return generateRandomRange(min, max, eachRate, amount);
            }
        }
    }

    // ลูปแสดงผลค่าอาเรย์ตำแหน่งที่ 1-0, 2-3, 4-5, 6-7
    // for (let i = 0; i < arr.length; i += 2) {
    //     alert(`arr[${i}] - arr[${i + 1}] = ${arr[i]} - ${arr[i + 1]}`);
    // }

    return arr;
}

function checkValueInRange(value, arr) {
    // ลูปตรวจสอบค่าที่กำหนดว่าอยู่ในช่วงไหน
    for (let i = 0; i < arr.length; i += 2) {
        if (value > arr[i] && value <= arr[i + 1]) {
            // ถ้าค่าอยู่ในช่วงระหว่าง arr[i] และ arr[i+1]
            // alert(`Value ${value} is within the range of arr[${i}] - arr[${i + 1}] ${arr[i]}> ${value} <${arr[i+1]}`);
            return true; // คืนค่าจริงเมื่อค่าอยู่ในช่วง
        }
    }
    // ถ้าค่าที่กำหนดไม่อยู่ในช่วงใดๆ
    // alert(`Value ${value} is not within any range.`);
    // คืนค่าเท็จเมื่อค่าไม่อยู่ในช่วง
    return false;
}



function getRandomPickRanger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function rateUp2() {
    const divSlots = document.querySelectorAll('.content-display2'); // เลือก div ทั้ง 7 อัน
    divSlots.forEach(slot => (slot.innerHTML = '')); // ล้างข้อมูลเก่า

    setTimeout(async () => {

        for (let i = 0; i < 7; i++) {
            const chance = getRandomRangers(0, 100); //change rate
            let rangersJson = [];
            let specialJson;
            let grade;
            let special = false;
            if (chance <= 3) {
                specialJson = await loadJSON('json-data/rangers/8u-info-special.json');
                let amount = 2;
                let eachRate = 0.22; //already changed
                let range = generateRandomRange(0.01, 3.00, eachRate, amount); //1 cuz rate-up only 1 rangers
                let value = getRandomRangers(0.01, 3.00); //x>[0] && x<=[1]
                // console.log('u: ' + value);
                let result = checkValueInRange(value, range);
                if (result) {
                    //j= 0 to 1 is rate-up main1 ,sub1
                    for (let j = 2; j < 4; j++) {
                        rangersJson.push(specialJson[j]); //ใช้ตำแหน่งอาเรย์ในการบอกเรนเจอร์พิเศษ จะได้ใช้pathเดียวกันเลย ไม่ต้องก็อปวางหลายๆอัน
                    }
                    // for (let a = 0; a < rangersJson.length; a++) {
                    //     console.log(rangersJson[a].Name);
                    // }
                } else {
                    rangersJson = await loadJSON('json-data/rangers/rate-normal/8u-info.json');
                    for (let j = 0; j < 2; j++) {
                        rangersJson.push(specialJson[j]); //ใช้ตำแหน่งอาเรย์ในการบอกเรนเจอร์พิเศษ จะได้ใช้pathเดียวกันเลย ไม่ต้องก็อปวางหลายๆอัน
                    }
                    // for (let a = 0; a < rangersJson.length; a++) {
                    //     console.log(rangersJson[a].Name);
                    // }
                }
                special = true;
                grade = "Ultra 8 star";
            } else if (chance <= 8) {
                rangersJson = await loadJSON('json-data/rangers/rate-normal/7u-info.json');
                grade = "Ultra 7 star";
            } else if (chance <= 30) {
                specialJson = await loadJSON('json-data/rangers/8c-info-special.json');
                let amount = 2;
                let eachRate = 1.50; //already changed
                let range = generateRandomRange(0.01, 22.00, eachRate, amount); //2 cuz rate-up only 2 common rangers
                let value = getRandomRangers(0.01, 22.00); //x>[0] && x<=[1]
                // console.log('c: ' + value);
                let result = checkValueInRange(value, range);
                if (result) {
                    //j= 0 to 1 is rate-up main1 ,sub1
                    for (let j = 2; j < 4; j++) {
                        rangersJson.push(specialJson[j]); //ใช้ตำแหน่งอาเรย์ในการบอกเรนเจอร์พิเศษ จะได้ใช้pathเดียวกันเลย ไม่ต้องก็อปวางหลายๆอัน
                    }
                    // for (let a = 0; a < rangersJson.length; a++) {
                    //     console.log(rangersJson[a].Name);
                    // }
                } else {
                    rangersJson = await loadJSON('json-data/rangers/rate-normal/8c-info.json');
                    for (let j = 0; j < 2; j++) {
                        rangersJson.push(specialJson[j]); //ใช้ตำแหน่งอาเรย์ในการบอกเรนเจอร์พิเศษ จะได้ใช้pathเดียวกันเลย ไม่ต้องก็อปวางหลายๆอัน
                    }
                    // for (let a = 0; a < rangersJson.length; a++) {
                    //     console.log(rangersJson[a].Name);
                    // }
                }
                special = true;
                grade = "8 star";
            } else {
                rangersJson = await loadJSON('json-data/rangers/rate-normal/7c-info.json');
                grade = "7 star";
            }

            const randomIndex = getRandomPickRanger(0, rangersJson.length - 1);
            let rangers = rangersJson[randomIndex];


            // เพิ่มข้อมูลใน div
            if (divSlots[i]) {
                let border = ``;
                if (special) {
                    if (await getStat(rangers)) { //when use async function dont forget await
                        border = `border border-success border-5`;
                        special = false;
                    }
                }
                divSlots[i].innerHTML = `
                <div class="p-2 ${border} rounded">
                    <div class="image-box d-flex justify-content-center align-items-center" style="height: 100px;">
                        <img src="${rangers.Image}" alt="${rangers.Name}" class="img-fluid" style="max-height: 80px;">
                    </div>
                    <p><strong>Grade:</strong> ${grade}</p>
                    <p class="mt-2"><strong>Name:</strong> ${rangers.Name}</p>
                </div>
            `;
            }

        }
        // อัปเดตจำนวนรวม
        document.getElementById("normal-count2").innerHTML = ` ${count}, Free box: ${guaranteeCount}/${maxGuarantee}, Ruby used: ${count * 300}`;
        document.getElementById("u-ranger-1").innerHTML = u1;
        document.getElementById("u-ranger-2").innerHTML = u2;
        document.getElementById("u-ranger-3").innerHTML = u3;
        document.getElementById("u-ranger-4").innerHTML = u4;
    }, 300);
    count++;

    if (guaranteeCount < 15) {
        guaranteeCount++;
    }

    if (guaranteeCount == 7) {
        maxGuarantee = 15;
    }

    if (count * 300 == 2100) {
        document.getElementById("btn-guarantee").style.display = "block";
    } else if (count * 300 == 4500) {
        document.getElementById("btn-guarantee1").style.display = "block";
    }
}

// Function to handle modal opening after closing it
function handleModalReopen() {
    // Get the modal element and modal object
    const myModalElement = document.getElementById('myModal2');
    const modal = new bootstrap.Modal(myModalElement);

    // Add event listener for the "สุ่มอีกครั้ง" button
    document.getElementById('randomButton2').addEventListener('click', function () {
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