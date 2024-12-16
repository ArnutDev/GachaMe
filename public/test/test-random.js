let modal; // ประกาศตัวแปร modal

// ฟังก์ชันในการเปิด modal ใหม่
function openModal() {
    if (!modal) {
        modal = new bootstrap.Modal(document.getElementById("gachaModal"));
    }
    modal.show(); // เปิด modal
}

// ฟังก์ชันในการปิด modal
function closeModal() {
    if (modal) {
        modal.hide(); // ปิด modal
    }
}

async function loadJSON(filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) {
            throw new Error(`Error fetching file: ${response.statusText}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error loading JSON:', error);
        throw error;
    }
}

function getRandomRangers(min, max) {
    const random = Math.random() * (max - min) + min;
    return parseFloat(random.toFixed(2));
}

function getRandomCommonRangers(min, max) {
    const random = Math.floor(Math.random() * (max - min + 1)) + min;
    return random;
}
let count = 0;

async function normalGacha() {
    const Grade = getRandomRangers(0.01, 100.00);
    const resultContainer = document.getElementById("normal-result");

    let rangersJson;
    if (Grade <= 3.00) {
        const subGrade = getRandomRangers(0.01, 3.00);
        if (subGrade >= 0.01 && subGrade <= 0.48) {
            rangersJson = await loadJSON('/public/scraping/8-ultra-collab.json');
            alert('Congratulation u got collabro rangers!');
        } else {
            rangersJson = await loadJSON('/public/scraping/8-ultra.json');
        }
        resultContainer.innerHTML = `Grade: =★★★=`;
    } else if (Grade <= 8.00) {
        rangersJson = await loadJSON('/public/scraping/7-ultra.json');
        resultContainer.innerHTML = `Grade: =★★=`;
    } else if (Grade <= 30.00) {
        const subGrade = getRandomRangers(0.01, 30.00);
        if (subGrade >= 0.01 && subGrade <= 3.52) {
            rangersJson = await loadJSON('/public/scraping/8-common-collab.json');
            alert('Congratulation u got collabro rangers!');
        } else {
            rangersJson = await loadJSON('/public/scraping/8-common.json');
        }
        resultContainer.innerHTML = `Grade: ★★★`;
    } else {
        rangersJson = await loadJSON('/public/scraping/7-common.json');
        resultContainer.innerHTML = `Grade: ★★`;
    }

    const randomIndex = getRandomCommonRangers(0, rangersJson.length - 1);
    const result = rangersJson[randomIndex];
    count += 1;

    // Populate modal content
    document.getElementById("normal-result2").innerHTML = `Name: ${result.Name}`;
    document.getElementById("normal-result3").innerHTML = `UnitCode: ${result.UnitCode}`;
    document.getElementById("normal-result4").innerHTML = `<img src="${result.Image}" alt="${result.Name}" style="max-width: 150px; height: 100px;">`;
    document.getElementById("normal-result5").innerHTML = `Round: ${count} , Gacha-coupon used: ${count*5}`;

    // Show the modal
    openModal();
}