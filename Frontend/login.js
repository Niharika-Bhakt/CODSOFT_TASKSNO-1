const loginForm = document.getElementById('loginForm');

if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('loginName');
        const userName = nameInput ? nameInput.value : "Candidate";

        localStorage.setItem('loggedUserName', userName);

        window.location.href = 'candidate-dashboard.html';
    });
}