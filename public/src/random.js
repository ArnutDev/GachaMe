let count = 0;

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


    setTimeout(async () => {

        for (let i = 0; i < 7; i++) {
            const chance = getRandomRangers(1, 100);
            let rangersJson;
            let result;
            let grade;
            let type;
            if (chance <= 3) {
                const collabGrade = getRandomRangers(0.01, 100.00);
                if (collabGrade <= 0.48) {
                    rangersJson = await loadJSON('scraping/8-ultra-collab.json');
                    type = "collab";
                } else {
                    rangersJson = await loadJSON('scraping/8-ultra.json');
                }
                grade = "Ultra 8 star";
            } else if (chance <= 8) {
                rangersJson = await loadJSON('scraping/7-ultra.json');
                grade = "Ultra 7 star";
            } else if (chance <= 30) {
                const collabGrade = getRandomRangers(0.01, 100.00);
                if (collabGrade <= 3.52) {
                    rangersJson = await loadJSON('scraping/8-common-collab.json');
                    type = "collab";
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
                if (type === "collab") {
                    border = `border border-success border-5`;
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
        document.getElementById("normal-count").innerHTML = `Count: ${count}, Ruby used: ${count * 300}`;
    }, 300);
    count++;

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