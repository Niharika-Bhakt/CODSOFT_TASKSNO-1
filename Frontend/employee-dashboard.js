emailjs.init("MqOapsRM9Ldr2hPqS");

document.addEventListener('DOMContentLoaded', () => {
    loadRecruiterApplications();
    setupEventListeners();
});

function loadRecruiterApplications() {
    const tableBody = document.getElementById('applicationsTableBody');
    if (!tableBody) return;

    let applications = JSON.parse(localStorage.getItem('myApplications')) || [
        { id: 1, name: 'Rahul Sharma', title: 'Senior Product UI/UX Designer', email: 'rahul@example.com', status: 'Pending', date: '2026-06-04' },
        { id: 2, name: 'Priya Verma', title: 'Full Stack Web Developer', email: 'priya@example.com', status: 'Shortlisted', date: '2026-06-03' }
    ];

    tableBody.innerHTML = '';

    if (applications.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; padding: 25px; color: #64748b;">No candidate applications found.</td></tr>`;
        return;
    }

    applications.forEach((app, index) => {
        const row = document.createElement('tr');
        
        let badgeClass = 'badge-pending';
        if (app.status === 'Shortlisted') badgeClass = 'badge-success';
        if (app.status === 'Rejected') badgeClass = 'badge-danger';
        if (app.status === 'Hired') badgeClass = 'badge-primary';

        row.innerHTML = `
            <td><strong>${app.name || 'Candidate'}</strong><br><small style="color: #64748b;">${app.email || 'N/A'}</small></td>
            <td>${app.title}</td>
            <td>${app.date || '2026-06-04'}</td>
            <td><span class="status-badge ${badgeClass}">${app.status}</span></td>
            <td>
                <select class="status-select" data-index="${index}">
                    <option value="Pending" ${app.status === 'Pending' ? 'selected' : ''}>Pending</option>
                    <option value="Shortlisted" ${app.status === 'Shortlisted' ? 'selected' : ''}>Shortlisted</option>
                    <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                    <option value="Hired" ${app.status === 'Hired' ? 'selected' : ''}>Hired</option>
                </select>
            </td>
            <td>
                <button type="button" class="btn-action view-cv-btn" data-index="${index}">View CV</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function setupEventListeners() {
    const tableBody = document.getElementById('applicationsTableBody');
    if (!tableBody) return;

    tableBody.addEventListener('change', (e) => {
        if (e.target.classList.contains('status-select')) {
            const index = e.target.getAttribute('data-index');
            const newStatus = e.target.value;
            updateApplicationStatus(index, newStatus);
        }
    });

    tableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-cv-btn')) {
            const index = e.target.getAttribute('data-index');
            let applications = JSON.parse(localStorage.getItem('myApplications')) || [];
            const app = applications[index];
            alert(`Opening resume for ${app ? app.name : 'Candidate'}...`);
        }
    });
}

function updateApplicationStatus(index, newStatus) {
    let applications = JSON.parse(localStorage.getItem('myApplications')) || [];
    
    if (applications[index]) {
        const candidateEmail = applications[index].email || 'candidate@example.com';
        const jobTitle = applications[index].title;
        const candidateName = applications[index].name || 'Candidate';

        applications[index].status = newStatus;
        localStorage.setItem('myApplications', JSON.stringify(applications));

        sendEmailNotification(candidateEmail, candidateName, jobTitle, newStatus);
        loadRecruiterApplications();
    }
}

function sendEmailNotification(email, name, jobTitle, status) {
    const serviceID = 'service_gzn8n5l';
    const templateID = 'template_m33pugb';

    const templateParams = {
        to_email: email,
        to_name: name,
        job_title: jobTitle,
        application_status: status,
        message: `Hello ${name}, your application status for the position of "${jobTitle}" has been updated to: ${status}.`
    };

    if (typeof emailjs !== 'undefined') {
        emailjs.send(serviceID, templateID, templateParams)
            .then((response) => {
                console.log('Email notification sent successfully to ' + email, response.status, response.text);
            })
            .catch((error) => {
                console.error('Failed to send email notification:', error);
            });
    }
}