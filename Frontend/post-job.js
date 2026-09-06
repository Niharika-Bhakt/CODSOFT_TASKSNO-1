const jobForm = document.getElementById('jobForm');

if (jobForm) {
    jobForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const title = document.getElementById('jobTitle').value;
        const company = document.getElementById('companyName').value;
        
        alert(`Success! "${title}" vacancy at ${company} has been published successfully.`);
        window.location.href = 'index.html';
    });
}