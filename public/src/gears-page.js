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

async function itemDisplay() {
    item = await loadJSON('json-data/gears/gears-info-special.json')

    //footer
    for (let i = 0; i < item.length; i++) {
        const imgId = `item-image${i + 1}`;
        const img = document.getElementById(imgId);
        if (img) {
            img.src = item[i].Image;
            img.alt = item[i].Name;
        }
    }
    const cards = document.querySelectorAll('.card-text');

    //box
    cards.forEach((card, cardIndex) => {
        for (let i = 0; i < item.length; i++) {
            const className = `item-name${i+1}`;
            const element = card.querySelector(`.${className}`);
            if (element) {
                element.textContent = `- ${item[i].Name}`;
            }
        }
    });
}

itemDisplay()