const urlParams = new URLSearchParams(window.location.search);
const keyword = (urlParams.get('keyword') || '').trim().toLowerCase();
const locationVal = urlParams.get('location') || 'Remote / Any City';

document.getElementById('jobTitleHeading').innerText = keyword ? keyword.toUpperCase() : "All Jobs";
document.getElementById('searchSummary').innerHTML = `Showing verified openings in <b>${locationVal}</b>`;

const detailsContainer = document.getElementById('jobDetailsContainer');
const cleanKey = keyword.replace(/\s+/g, '');

const jobDatabase = {
    // --- Original 9 Jobs ---
    "uiuxdesigner": {
        title: "Senior Product UI/UX Designer",
        company: "PixelCraft Studio",
        salary: "$8,500 - $11,000 / month",
        timing: "Full Time (Remote Option)",
        description: "Design intuitive high-fidelity user interfaces, user research flows, and scalable enterprise design systems."
    },
    "fullstack": {
        title: "Full Stack Web Developer",
        company: "TechScale Systems",
        salary: "$10,000 - $13,500 / month",
        timing: "Full Time (New York, NY)",
        description: "Architect scalable modern web apps, high-speed REST API services, and responsive client dashboards."
    },
    "dataanalytics": {
        title: "Senior Data Analytics Engineer",
        company: "MetricsEdge Analytics",
        salary: "$9,200 - $12,000 / month",
        timing: "Full Time (Austin, TX)",
        description: "Manage end-to-end data pipelines, statistical reporting metrics, and automated executive dashboards."
    },
    "cybersecurity": {
        title: "Security Operations Specialist",
        company: "SecureGuard Networks",
        salary: "$11,000 - $14,000 / month",
        timing: "Full Time (Washington, DC)",
        description: "Monitor network vulnerabilities, defend against threat vectors, and execute penetration testing protocols."
    },
    "backend": {
        title: "Senior Node.js Backend Engineer",
        company: "DataScale Labs",
        salary: "$11,500 - $15,000 / month",
        timing: "Full Time (San Francisco, CA)",
        description: "Architect low-latency microservice clusters, database query indexing, and event-driven backends."
    },
    "frontenddeveloper": {
        title: "React.js Frontend Engineer",
        company: "Vivid Web Solutions",
        salary: "$9,000 - $12,500 / month",
        timing: "Full Time (Remote Worldwide)",
        description: "Build fast, accessible, interactive components using React 18, Tailwind CSS, and Next.js framework."
    },
    "ai": {
        title: "Artificial Intelligence Expert",
        company: "NeuralCore AI",
        salary: "$13,000 - $17,000 / month",
        timing: "Full Time (Boston, MA)",
        description: "Train Large Language Models, generative AI pipelines, and computer vision neural networks."
    },
    "cloud": {
        title: "AWS Cloud Architect",
        company: "CloudScale Systems",
        salary: "$10,500 - $14,000 / month",
        timing: "Full Time (Seattle, WA)",
        description: "Design serverless multi-cloud infrastructures, automated deployment templates, and cloud security protocols."
    },
    "devops": {
        title: "DevOps Automation Specialist",
        company: "DevPulse Automation",
        salary: "$11,000 - $14,500 / month",
        timing: "Full Time (Chicago, IL)",
        description: "Build automated CI/CD pipelines, container orchestration, and server infrastructure monitoring."
    },

    // --- Newly Added 10 Jobs ---
    "mobiledeveloper": {
        title: "React Native Mobile Developer",
        company: "AppCraft Technologies",
        salary: "$9,500 - $12,500 / month",
        timing: "Full Time (San Jose, CA)",
        description: "Build high-performance cross-platform mobile apps for iOS and Android using React Native and native bridges."
    },
    "productmanager": {
        title: "Senior Technical Product Manager",
        company: "InnoVenture Labs",
        salary: "$12,000 - $16,000 / month",
        timing: "Full Time (New York, NY)",
        description: "Drive product strategy, roadmap execution, and cross-functional feature delivery for enterprise SaaS platforms."
    },
    "qaautomation": {
        title: "Senior QA Automation Engineer",
        company: "BugFree Systems",
        salary: "$8,500 - $11,000 / month",
        timing: "Full Time (Remote Worldwide)",
        description: "Design automated end-to-end testing frameworks, regression pipelines, and performance validation suites."
    },
    "blockchain": {
        title: "Web3 Solidity Developer",
        company: "CryptoScale Protocol",
        salary: "$12,500 - $16,500 / month",
        timing: "Full Time (Miami, FL)",
        description: "Write secure smart contracts, decentralized finance (DeFi) protocols, and DApp integration layers."
    },
    "dba": {
        title: "Principal Database Administrator",
        company: "DataCore Enterprise",
        salary: "$11,000 - $14,500 / month",
        timing: "Full Time (Dallas, TX)",
        description: "Manage PostgreSQL/MongoDB clusters, query performance tuning, replication setups, and backup strategies."
    },
    "mlops": {
        title: "MLOps Production Engineer",
        company: "IntelliScale AI",
        salary: "$13,500 - $17,500 / month",
        timing: "Full Time (Seattle, WA)",
        description: "Deploy machine learning models into high-scale production, monitor model drift, and optimize inference pipelines."
    },
    "sysadmin": {
        title: "Enterprise Linux Systems Administrator",
        company: "ServerGrid Infrastructure",
        salary: "$9,000 - $12,000 / month",
        timing: "Full Time (Denver, CO)",
        description: "Maintain core Linux server fleets, patch management, identity access management, and hardware infrastructure."
    },
    "technicalwriter": {
        title: "Senior Technical Documentation Writer",
        company: "DocuTech Solutions",
        salary: "$8,000 - $10,500 / month",
        timing: "Full Time (Remote Option)",
        description: "Author comprehensive API documentation, SDK guides, developer portals, and internal engineering wikis."
    },
    "businessanalyst": {
        title: "Agile Business Systems Analyst",
        company: "Optima Process Corp",
        salary: "$9,500 - $12,000 / month",
        timing: "Full Time (Atlanta, GA)",
        description: "Bridge business requirements with engineering sprints, user story mapping, and functional specification documents."
    },
    "gamedeveloper": {
        title: "Senior Unity/Unreal Game Developer",
        company: "PixelForge Interactive",
        salary: "$10,000 - $14,000 / month",
        timing: "Full Time (Los Angeles, CA)",
        description: "Develop interactive 3D simulations, real-time rendering pipelines, and multiplayer gameplay architecture."
    }
};

const currentJob = jobDatabase[cleanKey];

if (!currentJob) {
    detailsContainer.innerHTML = `
        <div style="background: #ffffff; padding: 50px; text-align: center; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 30px;">
            <h3 style="color: #ef4444; font-size: 22px; margin-bottom: 10px;">No Results Found</h3>
            <p style="color: #64748b; font-size: 15px; margin-bottom: 20px;">We couldn't find any job openings matching "<b>${keyword}</b>". Try searching for valid roles like Mobile Developer, Product Manager, MLOps, Blockchain, UI/UX, Full Stack, Backend, DevOps, etc.</p>
            <a href="index.html" style="background: #2563eb; color: white; text-decoration: none; padding: 10px 20px; border-radius: 8px; font-weight: 600; font-size: 14px;">Back to Home</a>
        </div>
    `;
} else {
    detailsContainer.innerHTML = `
        <div style="background: #f8fafc; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0; margin-bottom: 30px;">
            <h3 style="color: #2563eb; font-size: 20px; margin-bottom: 15px;"><i class="fa-solid fa-building"></i> ${currentJob.company}</h3>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px; margin-bottom: 20px;">
                <div style="font-size: 15px; color: #475569;"><b>Role:</b> ${currentJob.title}</div>
                <div style="font-size: 15px; color: #475569;"><b>Location:</b> ${locationVal}</div>
                <div style="font-size: 15px; color: #16a34a; font-weight: 600;"><b>Salary:</b> ${currentJob.salary}</div>
                <div style="font-size: 15px; color: #d97706;"><b>Timing:</b> ${currentJob.timing}</div>
            </div>
            <hr style="border: 0; border-top: 1px solid #cbd5e1; margin: 20px 0;">
            <p style="color: #334155; line-height: 1.6; font-size: 15px; margin-bottom: 25px;"><b>About the Role:</b><br>${currentJob.description}</p>
            <button id="openApplyModalBtn" style="background: #2563eb; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 15px; cursor: pointer;">
                Apply For This Job Now
            </button>
        </div>

        <!-- Application Tracking Section -->
        <div style="background: #ffffff; padding: 25px; border-radius: 12px; border: 1px solid #e2e8f0;">
            <h3 style="font-size: 18px; color: #0f172a; margin-bottom: 15px;"><i class="fa-solid fa-clipboard-list" style="color: #2563eb;"></i> Track Your Applied Jobs & Status</h3>
            <div id="trackedApplicationsList"></div>
        </div>

        <!-- Application Modal -->
        <div id="jobApplyModal" style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 1000; justify-content: center; align-items: center;">
            <div style="background: white; padding: 30px; border-radius: 16px; width: 100%; max-width: 500px; box-shadow: 0 15px 30px rgba(0,0,0,0.2); position: relative;">
                <button type="button" id="closeApplyModal" style="position: absolute; top: 20px; right: 20px; background: none; border: none; font-size: 20px; cursor: pointer; color: #64748b;">
                    <i class="fa-solid fa-xmark"></i>
                </button>
                
                <div style="margin-bottom: 20px;">
                    <h2 style="font-size: 22px; color: #0f172a; margin-bottom: 8px;">Apply for ${currentJob.title}</h2>
                    <p style="font-size: 14px; color: #64748b;">Fill in your details, upload your CV, and submit your application.</p>
                </div>

                <form id="jobApplyForm">
                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px; color: #334155;">Full Name</label>
                        <input type="text" id="applicantName" placeholder="Enter your full name" required style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 14px;">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px; color: #334155;">Email Address</label>
                        <input type="email" id="applicantEmail" placeholder="name@example.com" required style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 14px;">
                    </div>

                    <div style="margin-bottom: 15px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px; color: #334155;">Upload Resume / CV</label>
                        <input type="file" id="applicantCv" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" required style="width: 100%; font-size: 13px; color: #64748b;">
                    </div>

                    <div style="margin-bottom: 20px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; margin-bottom: 5px; color: #334155;">Why should we hire you?</label>
                        <textarea id="applicantReason" rows="3" placeholder="Briefly explain your relevant experience..." required style="width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; outline: none; font-size: 14px; resize: none;"></textarea>
                    </div>

                    <button type="submit" style="width: 100%; background: #2563eb; color: white; border: none; padding: 12px; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 15px;">
                        Submit Application
                    </button>
                </form>
            </div>
        </div>
    `;

    const applyBtn = document.getElementById('openApplyModalBtn');
    const applyModal = document.getElementById('jobApplyModal');
    const closeApplyModal = document.getElementById('closeApplyModal');
    const jobApplyForm = document.getElementById('jobApplyForm');

    if (applyBtn && applyModal) {
        applyBtn.addEventListener('click', () => {
            applyModal.style.display = 'flex';
        });
    }

    if (closeApplyModal && applyModal) {
        closeApplyModal.addEventListener('click', () => {
            applyModal.style.display = 'none';
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === applyModal) {
            applyModal.style.display = 'none';
        }
    });

    if (jobApplyForm) {
        jobApplyForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('applicantName').value;
            const cvInput = document.getElementById('applicantCv').files[0];
            const cvName = cvInput ? cvInput.name : "Resume.pdf";
            
            const statuses = ['Pending Review', 'Approved'];
            const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

            const newApplication = {
                jobTitle: currentJob.title,
                company: currentJob.company,
                applicantName: name,
                cvFileName: cvName,
                date: new Date().toLocaleDateString(),
                status: randomStatus
            };

            let applications = JSON.parse(localStorage.getItem('myJobApplications')) || [];
            applications.unshift(newApplication);
            localStorage.setItem('myJobApplications', JSON.stringify(applications));

            alert(`Success, ${name}! Your application for ${currentJob.title} has been submitted.`);
            jobApplyForm.reset();
            applyModal.style.display = 'none';
            loadTrackedApplications();
        });
    }
}

function loadTrackedApplications() {
    const trackerContainer = document.getElementById('trackedApplicationsList');
    if (!trackerContainer) return;
    
    let applications = JSON.parse(localStorage.getItem('myJobApplications')) || [];

    if (applications.length === 0) {
        trackerContainer.innerHTML = `<p style="color: #64748b; font-size: 14px;">You haven't applied to any roles yet. Click 'Apply For This Job Now' above to start tracking!</p>`;
        return;
    }

    let html = '<div style="display: flex; flex-direction: column; gap: 10px;">';
    applications.forEach((app, index) => {
        let badgeColor = '#d97706';
        let statusText = 'Pending Review';
        if (app.status === 'Approved') {
            badgeColor = '#16a34a';
            statusText = 'Approved 🎉';
        }

        html += `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px;">
                <div>
                    <h4 style="font-size: 15px; color: #0f172a; margin-bottom: 2px;">${app.jobTitle}</h4>
                    <p style="font-size: 13px; color: #64748b;">Company: <b>${app.company}</b> | Applied on: ${app.date}</p>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <span style="background: ${badgeColor}15; color: ${badgeColor}; padding: 5px 12px; border-radius: 20px; font-size: 12px; font-weight: 600;">${statusText}</span>
                    <button onclick="removeApplication(${index})" style="background: none; border: none; color: #94a3b8; cursor: pointer; font-size: 14px;" title="Remove"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    });
    html += '</div>';
    trackerContainer.innerHTML = html;
}

window.removeApplication = function(index) {
    let applications = JSON.parse(localStorage.getItem('myJobApplications')) || [];
    applications.splice(index, 1);
    localStorage.setItem('myJobApplications', JSON.stringify(applications));
    loadTrackedApplications();
};

loadTrackedApplications();