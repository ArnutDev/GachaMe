async function loadChangelog() {
    try {
        // ดึงข้อมูล JSON
        const response = await fetch('assets/change-log.json');
        const data = await response.json();

        // อ้างอิง DOM ที่จะแสดง Changelog
        const cardContainer = document.getElementById('card-container');

        // เรียงลำดับ changelog (ล่าสุดขึ้นก่อน)
        const sortedChangelog = data.changelog.sort((a, b) => new Date(b.date) - new Date(a.date));

        // วนลูปแสดง changelog
        sortedChangelog.forEach(entry => {
            // สร้าง card แต่ละเวอร์ชัน
            const card = document.createElement('div');
            card.className = 'card mb-4';

            // Header ของ card
            const cardHeader = document.createElement('div');
            cardHeader.className = 'card-header bg-dark text-white';
            cardHeader.innerHTML = `<h3>${entry.version} - <small class="text-light">${entry.date}</small></h3>`;
            card.appendChild(cardHeader);

            // Body ของ card
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            const ul = document.createElement('ul');
            entry.changes.forEach(change => {
                const li = document.createElement('li');
                li.textContent = change;
                ul.appendChild(li);
            });

            cardBody.appendChild(ul);
            card.appendChild(cardBody);

            // เพิ่ม card ไปยัง container
            cardContainer.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading changelog:', error);
    }
}

// เรียกใช้งานฟังก์ชัน
loadChangelog();