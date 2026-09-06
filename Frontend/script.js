document.addEventListener('DOMContentLoaded', () => {
    const settingsBtn = document.querySelector('.settings-btn');
    const settingsMenu = document.getElementById('settingsMenu');

    if (settingsBtn && settingsMenu) {
        settingsBtn.addEventListener('click', (e) => {
            e.stopPropagation(); 
            settingsMenu.style.display = (settingsMenu.style.display === 'block') ? 'none' : 'block';
        });

        settingsMenu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    window.addEventListener('click', () => {
        if (settingsMenu) {
            settingsMenu.style.display = 'none';
        }
    });

    const themeToggleBtn = document.getElementById('themeToggleBtn');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const icon = themeToggleBtn.querySelector('i');
            if (document.body.classList.contains('dark-theme')) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i> Toggle Light Mode';
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
                themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i> Toggle Dark Mode';
            }
        });
    }

    const applyBtns = document.querySelectorAll('.btn-apply');
    applyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            
        });
    });

    const bookmarkBtns = document.querySelectorAll('.bookmark-btn');
    bookmarkBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const icon = btn.querySelector('i');
            if (icon.classList.contains('fa-regular')) {
                icon.classList.remove('fa-regular');
                icon.classList.add('fa-solid');
                icon.style.color = '#2563eb';
                showToast("Job saved to your bookmarks!");
            } else {
                icon.classList.remove('fa-solid');
                icon.classList.add('fa-regular');
                icon.style.color = '';
                showToast("Job removed from bookmarks.");
            }
        });
    });

    const pillBtns = document.querySelectorAll('.pill-btn');
    const jobCards = document.querySelectorAll('.job-card');

    pillBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            pillBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterText = btn.textContent.trim().toLowerCase();

            jobCards.forEach(card => {
                const badgeText = card.querySelector('.badge').textContent.toLowerCase();
                const locationText = card.querySelector('.job-location').textContent.toLowerCase();

                if (filterText.includes('all jobs')) {
                    card.style.display = 'flex';
                } else if (filterText.includes('remote') && locationText.includes('remote')) {
                    card.style.display = 'flex';
                } else if (badgeText.includes(filterText.replace(' only', '')) || filterText.includes(badgeText)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'flex'; 
                }
            });
        });
    });

    // Updated Search Button Logic to redirect to jobs-result.html smoothly
    const searchBtn = document.querySelector('.search-btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            const searchInputs = document.querySelectorAll('.hero-search-box input');
            let keyword = searchInputs[0] ? searchInputs[0].value.trim() : "";
            let locationVal = searchInputs[1] ? searchInputs[1].value.trim() : "";
            
            if(keyword !== "" || locationVal !== "") {
                window.location.href = `jobs-result.html?keyword=${encodeURIComponent(keyword)}&location=${encodeURIComponent(locationVal)}`;
            } else {
                showToast("Please enter a keyword or location to search!");
            }
        });
    }

    const roleSelect = document.getElementById('role-select');
    const expSelect = document.getElementById('exp-select');
    const resultAmount = document.querySelector('.result-amount');

    const salaryData = {
        "Full Stack Developer": { "Junior (1-3 Years)": "$7,500", "Mid-Level (3-5 Years)": "$11,200", "Senior (5-8 Years)": "$14,500", "Lead / Principal (8+ Years)": "$18,000" },
        "AI / Machine Learning Engineer": { "Junior (1-3 Years)": "$9,000", "Mid-Level (3-5 Years)": "$13,000", "Senior (5-8 Years)": "$16,800", "Lead / Principal (8+ Years)": "$21,000" },
        "UI/UX Product Designer": { "Junior (1-3 Years)": "$6,500", "Mid-Level (3-5 Years)": "$9,500", "Senior (5-8 Years)": "$12,500", "Lead / Principal (8+ Years)": "$15,500" },
        "Cyber Security Specialist": { "Junior (1-3 Years)": "$8,000", "Mid-Level (3-5 Years)": "$11,800", "Senior (5-8 Years)": "$15,000", "Lead / Principal (8+ Years)": "$19,000" },
        "Cloud / DevOps Engineer": { "Junior (1-3 Years)": "$7,800", "Mid-Level (3-5 Years)": "$11,000", "Senior (5-8 Years)": "$14,200", "Lead / Principal (8+ Years)": "$17,500" }
    };

    function updateSalaryEstimation() {
        if (roleSelect && expSelect && resultAmount) {
            const selectedRole = roleSelect.value;
            const selectedExp = expSelect.value;
            
            if (salaryData[selectedRole] && salaryData[selectedRole][selectedExp]) {
                const amount = salaryData[selectedRole][selectedExp];
                resultAmount.innerHTML = `${amount} <span class="per-month">/ month</span>`;
            }
        }
    }

    if (roleSelect && expSelect) {
        roleSelect.addEventListener('change', updateSalaryEstimation);
        expSelect.addEventListener('change', updateSalaryEstimation);
    }
});

const uploadCvBtn = document.getElementById('uploadCvBtn');
const cvFileInput = document.getElementById('cvFileInput');
const fileNameDisplay = document.getElementById('fileNameDisplay');

if (uploadCvBtn && cvFileInput) {
    uploadCvBtn.addEventListener('click', () => {
        cvFileInput.click();
    });

    cvFileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const fileName = e.target.files[0].name;
            if (fileNameDisplay) {
                fileNameDisplay.textContent = `Selected: ${fileName}`;
            }
            showToast(`CV "${fileName}" successfully uploaded!`);
        }
    });
}

// Professional Toast Notification Function (replaces alert popups)
function showToast(message) {
    let existingToast = document.querySelector('.custom-toast-notification');
    if (existingToast) existingToast.remove();

    const toast = document.createElement('div');
    toast.className = 'custom-toast-notification';
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 25px;
        right: 25px;
        background: #0f172a;
        color: #ffffff;
        padding: 12px 20px;
        border-radius: 8px;
        font-family: 'Plus Jakarta Sans', sans-serif;
        font-size: 0.9rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.2);
        z-index: 9999;
        transition: opacity 0.3s ease;
        opacity: 0;
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => toast.style.opacity = '1', 10);

    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}