// --- Variabel Konstan dari CSS ---
// Digunakan di JS agar warna tetap konsisten tanpa mengambil dari :root setiap saat
const NEON_ACCENT = '#ff00ff'; 
const NEON_ERROR = '#ff3333';
const NEON_CYAN = '#00ffff';

// --- Bagian 1: Dynamic List ---
const itemInput = document.getElementById('itemInput');
const addItemButton = document.getElementById('addItemButton');
const dynamicList = document.getElementById('dynamicList');

addItemButton.addEventListener('click', () => {
    const itemText = itemInput.value.trim();

    if (itemText !== "") {
        const listItem = document.createElement('li');
        listItem.textContent = `> ${itemText} | STATUS: ONLINE`;
        
        // Atur posisi awal untuk animasi masuk (Fade In + Slide Down)
        listItem.style.opacity = '0';
        listItem.style.transform = 'translateY(10px)'; 

        const deleteButton = document.createElement('button');
        deleteButton.textContent = '[DEL]';
        
        deleteButton.addEventListener('click', () => {
            // Pemicu animasi glitch saat menghapus
            deleteButton.classList.add('glitch-active');

            // Mulai animasi fade out/slide
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
function changeBackgroundColor(colorCode) {
    const defaultDarkBg = '#1f1f2e';
    
    // 1. Ubah warna latar belakang body (background utama)
    document.body.style.backgroundColor = defaultDarkBg; // Tetap gelap agar kontras

    // 2. Ubah warna aksen CSS Variable untuk efek global
    document.documentElement.style.setProperty('--text-neon', colorCode);
    
    // Perbarui intensitas shadow glow
    const shadowIntensity = `0 0 5px, 0 0 10px, 0 0 20px, 0 0 40px ${colorCode}`;
    document.documentElement.style.setProperty('--shadow-intensity', shadowIntensity);
}


// --- Bagian 3: Counter dengan DOM Manipulation ---
const counterValueSpan = document.getElementById('counterValue');
const incrementButton = document.getElementById('incrementButton');
const decrementButton = document.getElementById('decrementButton');
const resetButton = document.getElementById('resetButton');

let counter = 0;

function updateCounter(change) {
    counter += change;
    counterValueSpan.textContent = counter;
    
    // Pemicu animasi Glitch singkat
    counterValueSpan.classList.remove('glitch-active');
    // Memaksa reflow sebelum menambahkan kelas kembali untuk me-restart animasi
    void counterValueSpan.offsetWidth; 
    counterValueSpan.classList.add('glitch-active');

    // Hapus kelas glitch setelah animasi selesai (sekitar 300ms)
    setTimeout(() => {
        counterValueSpan.classList.remove('glitch-active');
    }, 300);
}

incrementButton.addEventListener('click', () => {
    updateCounter(1);
});

decrementButton.addEventListener('click', () => {
    updateCounter(-1);
});

resetButton.addEventListener('click', () => {
    counter = 0; 
    counterValueSpan.textContent = counter;

    // Pemicu animasi Glitch + Warna Error saat Reset
    counterValueSpan.style.color = NEON_ERROR; 
    
    counterValueSpan.classList.add('glitch-active');
    
    setTimeout(() => {
        // Kembalikan ke warna aksen utama setelah 500ms
        counterValueSpan.style.color = 'var(--accent-neon)'; 
        counterValueSpan.classList.remove('glitch-active');
    }, 500);
});


// --- Bagian 4: Toggle Show/Hide Element ---
const toggleButton = document.getElementById('toggleButton');
const toggleContainer = document.getElementById('toggleContainer');
const toggleParagraph = document.getElementById('toggleParagraph');

toggleButton.addEventListener('click', () => {
    // Toggle kelas 'hidden-content' pada container
    const isHidden = toggleContainer.classList.toggle('hidden-content');

    // Ubah teks dan status
    if (isHidden) {
        toggleButton.textContent = 'LOAD DATA';
        toggleButton.style.color = 'var(--text-neon)';
        toggleParagraph.textContent = 'ACCESS DENIED. DATA OFFLINE.';
    } else {
        toggleButton.textContent = 'HIDE DATA';
        toggleButton.style.color = 'var(--accent-neon)';
        toggleParagraph.textContent = 'ACCESS GRANTED. SYSTEM ONLINE.';
        
        // Pemicu animasi Glitch pada paragraf yang baru muncul
        toggleParagraph.classList.add('glitch-active');
        setTimeout(() => {
            toggleParagraph.classList.remove('glitch-active');
        }, 300);
    }
});