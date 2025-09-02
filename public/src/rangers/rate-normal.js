let count = 0;
let freeBoxCount = 1;
let u1 = 0;
let u2 = 0;
let u3 = 0;

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
        // สุ่มค่าของ arr[6], arr[7]
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
    // return false; // คืนค่าเท็จเมื่อค่าไม่อยู่ในช่วง
}



function getRandomPickRanger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function normalGacha() {
    document.getElementById("randomButton").style.display = "block";
    const divSlots = document.querySelectorAll('.content-display'); // select 7 div
    divSlots.forEach(slot => (slot.innerHTML = '')); // clear old data

    setTimeout(async () => {

        for (let i = 0; i < 7; i++) {
            const chance = getRandomRangers(0, 100);
            let rangersJson;
            let specialJson;
            let grade;
            let special = false;
            if (chance <= 3) {
                rangersJson = await loadJSON('json-data/rangers/rate-normal/8u-info.json');
                special = true
                grade = "Ultra 8 star";
            } else if (chance <= 8) {
                rangersJson = await loadJSON('json-data/rangers/rate-normal/7u-info.json');
                grade = "Ultra 7 star";
            } else if (chance <= 30) {
                rangersJson = await loadJSON('json-data/rangers/rate-normal/8c-info.json');
                specialJson = await loadJSON('json-data/rangers/8c-info-special.json');
                rangersJson.push(specialJson[0]);
                special = true
                grade = "8 star";
            } else {
                rangersJson = await loadJSON('json-data/rangers/rate-normal/7c-info.json');
                grade = "7 star";
            }

            const randomIndex = getRandomPickRanger(0, rangersJson.length - 1);
            let rangers = rangersJson[randomIndex];


            // add data in div
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
        // update totall amount
        document.getElementById("normal-count").innerHTML = ` ${count}, Ruby used: ${count/6 * 300}`;
        document.getElementById("u-ranger-1").innerHTML = u1;
        document.getElementById("u-ranger-2").innerHTML = u2;
        document.getElementById("u-ranger-3").innerHTML = u3;
    }, 300);
    count += 6;
    if (count / 100 >= freeBoxCount) {
        freeBoxCount++;
        document.getElementById("btn-guarantee").style.display = "block";
    }
}
async function guarantee(type) {
    const divSlots = document.querySelectorAll('.content-display'); // select 7 div
    divSlots.forEach(slot => (slot.innerHTML = '')); // clear old data

    setTimeout(async () => {
        let specialJson;
        let grade = "8 star";
        let special = true;
        //rate-normal using the same rate like the others
        //add new special gears to this path first
        specialJson = await loadJSON('json-data/rangers/8c-info-special.json');

        const randomIndex = getRandomPickRanger(0, specialJson.length - 1);
        let rangers = specialJson[randomIndex];
        // เพิ่มข้อมูลใน div
        if (divSlots[5]) {
            let border = ``;
            if (special) {
                if (await getStat(rangers)) { //when use async function dont forget await
                    border = `border border-success border-5`;
                    special = false;
                }
            }
            divSlots[5].innerHTML = `
                <div class="p-2 ${border} rounded">
                    <div class="image-box d-flex justify-content-center align-items-center" style="height: 100px;">
                        <img src="${rangers.Image}" alt="${rangers.Name}" class="img-fluid" style="max-height: 80px;">
                    </div>
                    <p><strong>Grade:</strong> ${grade}</p>
                    <p class="mt-2"><strong>Name:</strong> ${rangers.Name}</p>
                </div>
            `;
        }
        // อัปเดตจำนวนรวม
        document.getElementById("normal-count").innerHTML = ` ${count}, Ruby used: ${count * 300}`;
        document.getElementById("u-ranger-1").innerHTML = u1;
        document.getElementById("u-ranger-2").innerHTML = u2;
        document.getElementById("u-ranger-3").innerHTML = u3;
        // document.getElementById("u-ranger-4").innerHTML = u4;
    }, 300);
    if (type == 1) {
        document.getElementById("btn-guarantee").style.display = "none";
    }
    document.getElementById("randomButton").style.display = "none";
}
async function getStat(data) {
    const collabUltraJson = await loadJSON('json-data/rangers/8u-info-special.json'); //comprehensive
    const collabCommonJson = await loadJSON('json-data/rangers/8c-info-special.json'); //comprehensive

    //use for store result
    let result = -1; // use -1 for not found any value when start check

    // ตรวจสอบว่า data.Name ตรงกับข้อมูลใน collabUltraJson หรือไม่
    for (let index = 0; index < collabUltraJson.length; index++) {
        if (collabUltraJson[index].Name === data.Name) {
            // if match then keep index value in result variable and +1 when even month has come 
            // and remove +1 when collabro come
            result = index + 1;
            break; // found stop the loop
        }
    }
    if (result == -1) {
        for (let index = 0; index < collabCommonJson.length; index++) {
            if (collabCommonJson[index].Name === data.Name) {
                result = index; // if match then keep index value in result variable 
                break; // found stop the loop
            }
        }
    }
    if (result == 0) { // light/dark | co-main1
        u1++;
    } else if (result == 1) { // sub1 | co-main2
        u2++;
    } else if (result == 2) { // sub2 | co-sub1
        u3++;
    } else if (result == 3) { // none | co-sub2
        u4++;
    } else {
        return false;
    }
    return true;
}



// Function to handle modal opening after closing it
function handleModalReopen() {
    // Get the modal element and modal object
    const myModalElement = document.getElementById('myModal');
    const modal = new bootstrap.Modal(myModalElement);

    // Add event listener for the "Random" button
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