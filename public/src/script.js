const characters = [
    "Brown", //buff
    "Cony",
    "Moon", //buff
    "Leonard",
    "KSM",
    "Boss",
    "Sally", //buff
    "James",
    "Edwards", //buff
    "Clara"
];

const equalAll = Math.floor(Math.random() * characters.length);

function normalGacha() {
    const randomIndex = Math.floor(Math.random() * characters.length);
    const result = characters[randomIndex];
    document.getElementById("normal-result").innerHTML = `You got: ${result}`;
}

function specialGacha(chestNumber) {
    // แก้ไขการดึงค่าจาก input box ให้ถูกต้อง
    const selectedCharacter1 = document.getElementById(`ranger1${chestNumber * 2 - 1}`).value.trim();
    const selectedCharacter2 = document.getElementById(`ranger2${chestNumber * 2}`).value.trim();

    if (!characters.includes(selectedCharacter1) || !characters.includes(selectedCharacter2)) {
        alert("กรุณาเลือกตัวละครที่มีในรายชื่อ");
        return;
    }

    // เพิ่มน้ำหนักให้กับตัวละครที่เลือก
    const weightedCharacters = [...characters, selectedCharacter1, selectedCharacter2];

    const randomIndex = Math.floor(Math.random() * weightedCharacters.length);
    const result = weightedCharacters[randomIndex];

    // แก้ไขการแสดงผลให้ถูกต้อง
    document.getElementById(`chest1${chestNumber}-result`).innerHTML = `คุณได้รับ: ${result}`;
}