window.addEventListener('DOMContentLoaded', () => {
    loadProfileData();
    loadApplicationsData();
});

// Profile Save karne ka function
function saveProfile(event) {
    event.preventDefault();

    const name = document.getElementById('profileName').value;
    const title = document.getElementById('profileTitle').value;
    const exp = document.getElementById('profileExp').value;
    const skills = document.getElementById('profileSkills').value;
    const resumeInput = document.getElementById('profileResume');

    const profileData = {
        name,
        title,
        exp,
        skills,
        resumeName: resumeInput.files.length > 0 ? resumeInput.files[0].name : (localStorage.getItem('savedResume') || "No file uploaded")
    };

    localStorage.setItem('candidateProfile', JSON.stringify(profileData));
    if (resumeInput.files.length > 0) {
        localStorage.setItem('savedResume', resumeInput.files[0].name);
    }

    alert('Profile updated successfully!');
    loadProfileData();
}

// Profile Data Load karne ke liye
function loadProfileData() {
    const saved = localStorage.getItem('candidateProfile');
    if (saved) {
        const profile = JSON.parse(saved);
        document.getElementById('profileName').value = profile.name || '';
        document.getElementById('profileTitle').value = profile.title || '';
        document.getElementById('profileExp').value = profile.exp || '';
        document.getElementById('profileSkills').value = profile.skills || '';
        document.getElementById('candidateNameDisplay').innerText = profile.name || 'Candidate';
        
        if (profile.resumeName) {
            document.getElementById('resumeStatus').innerText = "Current CV: " + profile.resumeName;
        }
    }
}

// Applied Jobs aur Offers Load karne ke liye
function loadApplicationsData() {
    const applications = JSON.parse(localStorage.getItem('myApplications')) || [];
    const appliedListContainer = document.getElementById('appliedJobsList');
    const offerListContainer = document.getElementById('offerLettersList');

    if (applications.length > 0) {
        // Applied Jobs render karein
        appliedListContainer.innerHTML = applications.map((app, index) => `
            <div class="item-card">
                <div>
                    <h3>${app.title}</h3>
                    <p><strong>Company:</strong> ${app.company}</p>
                    <p class="date-text">Applied on: ${app.date}</p>
                </div>
                <div>
                    <span class="status-badge ${app.status.toLowerCase().replace(' ', '-')}">${app.status}</span>
                </div>
            </div>
        `).join('');

        // Agar kisi ka status "Offer Received" ya mock offer hai
        const offers = applications.filter(app => app.status === "Offer Received" || app.isOffer);
        if (offers.length > 0) {
            offerListContainer.innerHTML = offers.map(offer => `
                <div class="item-card offer-card">
                    <div>
                        <h3>🎉 Offer from ${offer.company}</h3>
                        <p>Role: <strong>${offer.title}</strong></p>
                    </div>
                    <button class="btn-success" onclick="alert('Downloading offer letter from ${offer.company}...')">Download Offer Letter</button>
                </div>
            `).join('');
        } else {
            // Demo ke taur par ek sample offer dikha sakte hain agar chahein, ya blank rakhein
            offerListContainer.innerHTML = `<p class="empty-text">Responses and company offer letters will appear here once reviewed.</p>`;
        }
    }
}