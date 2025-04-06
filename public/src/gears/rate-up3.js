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

function generateRandomRange(min, max, eachRate, amount) {
    let arr = [];
    let countArr = 0;

    function getValidRandomValue() {
        let randomValue = (Math.random() * (max - min) + min).toFixed(2); // use toFixed(2) for 2 decimal
        return parseFloat(randomValue);
    }

    //check and random value not over range
    function getValidPair() {
        let num1 = getValidRandomValue();
        let num2 = (num1 + eachRate).toFixed(2); // use toFixed(2) for num2 2 decimal
        num2 = parseFloat(num2);

        // ตรวจสอบว่า num2 ไม่เกิน max และ num1 ยังไม่เกิน min
        if (num2 > max) {
            num1 = (max - eachRate).toFixed(2); // use toFixed(2) for num1 2 decimal
            num1 = parseFloat(num1);
            num2 = max;
        }

        // ตรวจสอบว่า num1 ยังอยู่ในช่วง min ถึง max
        if (num1 < min) {
            num1 = min; // ถ้า num1 ต่ำกว่า min, ตั้งให้ num1 เป็น min
            num2 = (num1 + eachRate).toFixed(2); // use toFixed(2) for num2 2 decimal
            num2 = parseFloat(num2);
        }

        return [num1, num2];
    }
    if (countArr < amount) {
        // random value of arr[0], arr[1]
        let pair1 = getValidPair();
        arr[0] = pair1[0];
        arr[1] = pair1[1];
        countArr++;
    }
    if (countArr < amount) {
        //  random value of arr[2], arr[3]
        let pair2 = getValidPair();
        arr[2] = pair2[0];
        arr[3] = pair2[1];
        countArr++;
    }
    if (countArr < amount) {
        //  random value of arr[4], arr[5]
        let pair3 = getValidPair();
        arr[4] = pair3[0];
        arr[5] = pair3[1];
        countArr++;
    }
    if (countArr < amount) {
        //  random value of arr[6], arr[7]
        let pair4 = getValidPair();
        arr[6] = pair4[0];
        arr[7] = pair4[1];
        countArr++;
    }

    for (let i = 0; i < arr.length; i += 2) {
        for (let j = i + 2; j < arr.length; j += 2) {
            //check for each range not overlap and have space not over eachRate
            if ((arr[i] >= arr[j] && arr[i] <= arr[j + 1]) || (arr[j] >= arr[i] && arr[j] <= arr[i + 1]) || (arr[i + 1] - arr[i] > eachRate) || (arr[j + 1] - arr[j] > eachRate)) {
                // if it overlap then random until not overlap
                return generateRandomRange(min, max, eachRate);
            }
        }
    }

    // display array position: 1-0, 2-3, 4-5, 6-7
    // for (let i = 0; i < arr.length; i += 2) {
    //     alert(`arr[${i}] - arr[${i + 1}] = ${arr[i]} - ${arr[i + 1]}`);
    // }

    return arr;
}

function checkValueInRange(value, arr) {
    // ลูปตรวจสอบค่าที่กำหนดว่าอยู่ในช่วงไหน check if the given value is in the range.
    for (let i = 0; i < arr.length; i += 2) {
        if (value > arr[i] && value <= arr[i + 1]) {
            // if value between arr[i] and arr[i+1] then display
            // alert(`Value ${value} is within the range of arr[${i}] - arr[${i + 1}] ${arr[i]}> ${value} <${arr[i+1]}`);
            return true; // return true if in range
        }
    }
    //if the given value not in any range
    // alert(`Value ${value} is not within any range.`);
    return false; // คืนค่าเท็จเมื่อค่าไม่อยู่ในช่วง
}



function getRandomPickGear(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function rateUp3() {
    const divSlots = document.querySelectorAll('.content-display3'); // select 7 div
    divSlots.forEach(slot => (slot.innerHTML = '')); // clear old data

    setTimeout(async () => {

        for (let i = 0; i < 6; i++) {
            const chance = getRandomGears(0, 100); //change rate
            let gearsJson = [];
            let specialJson;
            let grade;
            let special = false;
            if (chance <= 1) {
                specialJson = await loadJSON('json-data/gears/gears-info-special.json');
                let amount = 1;
                let eachRate = 0.60; //already changed
                let range = generateRandomRange(0.01, 1.00, eachRate, amount); // 1 cuz rate-up 8 star special only have 1 of them
                let value = getRandomGears(0.01, 1.00); //x>[0] && x<=[1]
                // console.log('c: ' + value);
                let result = checkValueInRange(value, range);
                if (result) {
                    //j= 2 is 8 special have 3 of them
                    for (let j = 2, k = 0; j < 3; j++, k++) {
                        gearsJson.push(specialJson[j]); //ใช้ตำแหน่งอาเรย์ในการบอกเรนเจอร์พิเศษ จะได้ใช้pathเดียวกันเลย ไม่ต้องก็อปวางหลายๆอัน
                        // alert('sp> ' + gearsJson[k].Name);
                    }
                    // for (let a = 0; a < gearsJson.length; a++) {
                    //     console.log(gearsJson[a].Name);
                    // }
                } else {
                    gearsJson = await loadJSON('json-data/gears/rate-normal/8c-info.json');
                    //j= 1 to 2 is 2 of them that not rate-up now then move to none special
                    for (let j = 0; j < 2; j++) {
                        // if (j == 2) { //skip rate-up
                        //     continue;
                        // }
                        gearsJson.push(specialJson[j]); //ใช้ตำแหน่งอาเรย์ในการบอกเรนเจอร์พิเศษ จะได้ใช้pathเดียวกันเลย ไม่ต้องก็อปวางหลายๆอัน
                        // alert(gearsJson[gearsJson.length - 1].Name); //last position of gearsJson
                    }
                    // for (let a = 0; a < gearsJson.length; a++) {
                    //     console.log(gearsJson[a].Name);
                    // }
                }
                special = true;
                grade = "8 star";
            } else if (chance <= 3) {
                specialJson = await loadJSON('json-data/gears/gears-info-special.json');
                let amount = 1;
                let eachRate = 1.25; //already changed
                let range = generateRandomRange(0.01, 2.00, eachRate, amount); // 1 cuz 7 star special only have rate-up 1 of them
                let value = getRandomGears(0.01, 2.00); //x>[0] && x<=[1]
                // console.log('c: ' + value);
                let result = checkValueInRange(value, range);
                if (result) {
                    //j= 4 is 7 special have rate-up 1 of them
                    for (let j = 4, k = 0; j < 5; j++, k++) {
                        gearsJson.push(specialJson[j]); //ใช้ตำแหน่งอาเรย์ในการบอกเรนเจอร์พิเศษ จะได้ใช้pathเดียวกันเลย ไม่ต้องก็อปวางหลายๆอัน
                        // alert('sp> ' + gearsJson[k].Name);
                    }
                    for (let a = 0; a < gearsJson.length; a++) {
                        // console.log(gearsJson[a].Name);
                    }
                } else {
                    gearsJson = await loadJSON('json-data/gears/rate-normal/7c-info.json');
                    //j= 3 is 1 of them that not rate-up now then move to none special
                    for (let j = 3; j < 4; j++) {
                        gearsJson.push(specialJson[j]); //ใช้ตำแหน่งอาเรย์ในการบอกเรนเจอร์พิเศษ จะได้ใช้pathเดียวกันเลย ไม่ต้องก็อปวางหลายๆอัน
                        // alert(gearsJson[gearsJson.length - 1].Name); //last position of gearsJson
                    }
                    for (let a = 0; a < gearsJson.length; a++) {
                        // console.log(gearsJson[a].Name);
                    }
                }
                special = true;
                grade = "7 star";
            } else if (chance <= 50) {
                specialJson = await loadJSON('json-data/gears/gears-info-special.json');
                gearsJson = await loadJSON('json-data/gears/rate-normal/6c-info.json');
                //j= 5 is 6 star that not rate-up now then move to none special
                for (let j = 5; j < 6; j++) {
                    gearsJson.push(specialJson[j]); //ใช้ตำแหน่งอาเรย์ในการบอกเรนเจอร์พิเศษ จะได้ใช้pathเดียวกันเลย ไม่ต้องก็อปวางหลายๆอัน
                    // alert(gearsJson[gearsJson.length - 1].Name); //last position of gearsJson
                }
                for (let a = 0; a < gearsJson.length; a++) {
                    // console.log(gearsJson[a].Name);
                }
                special = true;
                grade = "6 star";
            } else {
                gearsJson = await loadJSON('json-data/gears/rate-normal/5c-info.json');
                grade = "5 star";
            }

            const randomIndex = getRandomPickGear(0, gearsJson.length - 1);
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
        document.getElementById("normal-count3").innerHTML = ` ${count}, Free box: ${guaranteeCount}/${maxGuarantee}, Ruby used: ${count * 200}`;
        document.getElementById("u-gear-1").innerHTML = u1;
        document.getElementById("u-gear-2").innerHTML = u2;
        document.getElementById("u-gear-3").innerHTML = u3;
        document.getElementById("u-gear-4").innerHTML = u4;
        document.getElementById("u-gear-5").innerHTML = u5;
        document.getElementById("u-gear-6").innerHTML = u6;
    }, 300);
    count++;
    if (guaranteeCount < 25) {
        guaranteeCount++;
    }

    if (guaranteeCount == 15) {
        maxGuarantee = 25;
    }
    if (count * 200 == 3000) {
        document.getElementById("btn-guarantee").style.display = "block";
    } else if (count * 200 == 5000) {
        document.getElementById("btn-guarantee1").style.display = "block";
    }
}

// Function to handle modal opening after closing it
function handleModalReopen() {
    // Get the modal element and modal object
    const myModalElement = document.getElementById('myModal3');
    const modal = new bootstrap.Modal(myModalElement);

    // Add event listener for the "Random" button
    document.getElementById('randomButton3').addEventListener('click', function () {
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