document.addEventListener("DOMContentLoaded", () => {
    loadProgress();
});

function toggleCheck(card) {
    card.classList.toggle('checked');
    const checkbox = card.querySelector('.checkbox');
    
    if (card.classList.contains('checked')) {
        checkbox.innerHTML = '✓';
    } else {
        checkbox.innerHTML = '';
    }
    saveProgress();
}

function setProfile(type) {
    // 1. Update Buttons
    const buttons = document.querySelectorAll('.toggle-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    
    if (type === 'w2') buttons[0].classList.add('active');
    else buttons[1].classList.add('active');

    // 2. Filter Lists
    const w2Items = document.querySelectorAll('.w2-only');
    const selfItems = document.querySelectorAll('.self-only');

    if (type === 'w2') {
        w2Items.forEach(item => item.classList.remove('hidden'));
        selfItems.forEach(item => item.classList.add('hidden'));
    } else {
        selfItems.forEach(item => item.classList.remove('hidden'));
        w2Items.forEach(item => item.classList.add('hidden'));
    }
}

function saveProgress() {
    const completedIds = [];
    document.querySelectorAll('.doc-card.checked').forEach(card => {
        completedIds.push(card.id);
    });
    localStorage.setItem('docChecklistProgress', JSON.stringify(completedIds));
}

function loadProgress() {
    const saved = JSON.parse(localStorage.getItem('docChecklistProgress'));
    if (saved) {
        saved.forEach(id => {
            const card = document.getElementById(id);
            if (card) {
                card.classList.add('checked');
                card.querySelector('.checkbox').innerHTML = '✓';
            }
        });
    }
}