// --- Variabel Warna ---
const ACCENT_COLOR = '#3f51b5'; // Biru default
const RESET_COLOR = '#ef5350';   // Merah lembut untuk reset

// --- Bagian 1: Dynamic List ---
const itemInput = document.getElementById('itemInput');
const addItemButton = document.getElementById('addItemButton');
const dynamicList = document.getElementById('dynamicList');

addItemButton.addEventListener('click', () => {
    const itemText = itemInput.value.trim();

    if (itemText !== "") {
        const listItem = document.createElement('li');
        listItem.textContent = itemText;
        
        // Atur posisi awal untuk animasi masuk
        listItem.style.opacity = '0';
        listItem.style.transform = 'translateY(10px)'; 

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Hapus';
        
        deleteButton.addEventListener('click', function() {
            // Pemicu efek tekan pada tombol Hapus
            this.classList.add('btn-pressed');
            
            // Animasi menghilang
            listItem.style.opacity = '0';
            listItem.style.transform = 'translateX(-100%)'; 
            
            // Hapus dari DOM setelah durasi transisi (500ms)
            setTimeout(() => {
                dynamicList.removeChild(listItem); 
            }, 500); 
        });

        listItem.appendChild(deleteButton);
        dynamicList.appendChild(listItem);
        
        // Pemicu animasi masuk
        setTimeout(() => {
            listItem.style.opacity = '1';
            listItem.style.transform = 'translateY(0)'; 
        }, 10);
        
        itemInput.value = '';
        itemInput.focus();
    }
});

// --- Bagian 2: Ubah Warna Background Secara Dinamis ---
function changeBackgroundColor(newBgColor) {
    // 1. Ubah warna latar belakang body utama (sudah ada transisi di CSS)
    document.body.style.backgroundColor = newBgColor;

    // 2. Ubah variabel CSS --bg-color agar komponen Neumorphism ikut berubah warna dasar
    document.documentElement.style.setProperty('--bg-color', newBgColor);
}


// --- Bagian 3: Counter dengan DOM Manipulation ---
const counterValueSpan = document.getElementById('counterValue');
const incrementButton = document.getElementById('incrementButton');
const decrementButton = document.getElementById('decrementButton');
const resetButton = document.getElementById('resetButton');

let counter = 0;

// Fungsi untuk memicu efek tekan pada tombol kontrol (visual)
function pressButtonEffect(button) {
    button.classList.add('btn-pressed');
    setTimeout(() => {
        button.classList.remove('btn-pressed');
    }, 150);
}

function updateCounter(change) {
    counter += change;
    counterValueSpan.textContent = counter;
    
    // Pemicu animasi scale kecil pada nilai
    counterValueSpan.style.transform = 'scale(1.1)';
    setTimeout(() => {
        counterValueSpan.style.transform = 'scale(1)';
    }, 100);
}

incrementButton.addEventListener('click', () => {
    pressButtonEffect(incrementButton);
    updateCounter(1);
});

decrementButton.addEventListener('click', () => {
    pressButtonEffect(decrementButton);
    updateCounter(-1);
});

resetButton.addEventListener('click', () => {
    pressButtonEffect(resetButton);
    counter = 0; 
    counterValueSpan.textContent = counter;

    // Pemicu warna reset
    counterValueSpan.style.color = RESET_COLOR; 
    counterValueSpan.style.transform = 'scale(1.2)';

    setTimeout(() => {
        // Kembalikan ke warna aksen utama
        counterValueSpan.style.color = ACCENT_COLOR; 
        counterValueSpan.style.transform = 'scale(1)';
    }, 300);
});


// --- Bagian 4: Toggle Show/Hide Element ---
const toggleButton = document.getElementById('toggleButton');
const toggleContainer = document.getElementById('toggleContainer');

toggleButton.addEventListener('click', () => {
    pressButtonEffect(toggleButton);
    
    // Toggle kelas 'hidden-content'
    const isHidden = toggleContainer.classList.toggle('hidden-content');

    // Ubah teks tombol
    if (isHidden) {
        toggleButton.textContent = 'TAMPILKAN INFO';
    } else {
        toggleButton.textContent = 'SEMBUNYIKAN INFO';
    }
});