/* =====================================================
   CAREERHUB ADMIN PANEL JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
       ================================================= */

    const sidebar = document.getElementById("sidebar");
    const menuBtn = document.getElementById("menuBtn");
    const sidebarClose = document.getElementById("sidebarClose");
    const sidebarOverlay = document.getElementById("sidebarOverlay");

    const addJobBtn = document.getElementById("addJobBtn");
    const jobModal = document.getElementById("jobModal");
    const modalClose = document.getElementById("modalClose");
    const cancelJob = document.getElementById("cancelJob");

    const jobForm = document.getElementById("jobForm");
    const jobsTableBody = document.getElementById("jobsTableBody");

    const deleteModal = document.getElementById("deleteModal");
    const cancelDelete = document.getElementById("cancelDelete");
    const confirmDelete = document.getElementById("confirmDelete");

    const globalSearch = document.getElementById("globalSearch");

    let rowToDelete = null;


    /* =================================================
       SIDEBAR
       ================================================= */

    function openSidebar() {

        sidebar.classList.add("open");
        sidebarOverlay.classList.add("show");

    }


    function closeSidebar() {

        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("show");

    }


    menuBtn.addEventListener("click", openSidebar);

    sidebarClose.addEventListener("click", closeSidebar);

    sidebarOverlay.addEventListener("click", closeSidebar);


    /* =================================================
       SIDEBAR NAVIGATION
       ================================================= */

    document.querySelectorAll(".nav-item").forEach(item => {

        item.addEventListener("click", event => {

            const href = item.getAttribute("href");

            if (!href || href === "#") {
                return;
            }

            document.querySelectorAll(".nav-item")
                .forEach(nav => nav.classList.remove("active"));

            item.classList.add("active");

            if (window.innerWidth <= 850) {
                closeSidebar();
            }

        });

    });


    /* =================================================
       ADD JOB MODAL
       ================================================= */

    function openJobModal() {

        jobModal.classList.add("show");
        document.body.style.overflow = "hidden";

    }


    function closeJobModal() {

        jobModal.classList.remove("show");
        document.body.style.overflow = "";

    }


    addJobBtn.addEventListener("click", openJobModal);

    modalClose.addEventListener("click", closeJobModal);

    cancelJob.addEventListener("click", closeJobModal);


    jobModal.addEventListener("click", event => {

        if (event.target === jobModal) {
            closeJobModal();
        }

    });


    /* =================================================
       ADD NEW JOB
       ================================================= */

    jobForm.addEventListener("submit", event => {

        event.preventDefault();

        const title =
            document.getElementById("jobTitle").value.trim();

        const company =
            document.getElementById("jobCompany").value.trim();

        const location =
            document.getElementById("jobLocation").value.trim();

        const type =
            document.getElementById("jobType").value;

        const salary =
            document.getElementById("jobSalary").value.trim();

        if (!title || !company || !location || !type || !salary) {

            alert("Please fill all required fields.");

            return;

        }


        const row = document.createElement("tr");

        let logoClass = "purple-logo";
        let icon = "fa-code";

        if (type === "Remote") {
            logoClass = "blue-logo";
            icon = "fa-house";
        }

        if (type === "Internship") {
            logoClass = "orange-logo";
            icon = "fa-graduation-cap";
        }


        row.innerHTML = `

            <td>
                <div class="job-cell">

                    <div class="table-logo ${logoClass}">
                        <i class="fa-solid ${icon}"></i>
                    </div>

                    <div>
                        <strong>${escapeHTML(title)}</strong>
                        <span>Posted just now</span>
                    </div>

                </div>
            </td>

            <td>${escapeHTML(company)}</td>

            <td>
                <i class="fa-solid fa-location-dot table-icon"></i>
                ${escapeHTML(location)}
            </td>

            <td>
                <span class="type-badge ${
                    type === "Remote" ? "remote" : "fulltime"
                }">
                    ${escapeHTML(type)}
                </span>
            </td>

            <td>0</td>

            <td>
                <span class="status-badge published-badge">
                    Published
                </span>
            </td>

            <td>
                <div class="action-buttons">

                    <button class="edit-btn">
                        <i class="fa-solid fa-pen"></i>
                    </button>

                    <button class="delete-btn">
                        <i class="fa-solid fa-trash"></i>
                    </button>

                </div>
            </td>
        `;


        jobsTableBody.insertBefore(
            row,
            jobsTableBody.firstElementChild
        );


        /* Update job count */

        const totalJobs =
            document.getElementById("totalJobs");

        const currentJobs =
            parseInt(totalJobs.textContent.replace(/,/g, ""));

        totalJobs.textContent =
            (currentJobs + 1).toLocaleString();


        /* Close form */

        jobForm.reset();

        closeJobModal();

        attachRowActions(row);

        alert("Job published successfully!");

    });


    /* =================================================
       DELETE JOB
       ================================================= */

    function openDeleteModal(row) {

        rowToDelete = row;

        deleteModal.classList.add("show");

        document.body.style.overflow = "hidden";

    }


    function closeDeleteModal() {

        deleteModal.classList.remove("show");

        document.body.style.overflow = "";

        rowToDelete = null;

    }


    cancelDelete.addEventListener(
        "click",
        closeDeleteModal
    );


    confirmDelete.addEventListener("click", () => {

        if (!rowToDelete) {
            return;
        }


        rowToDelete.remove();


        const totalJobs =
            document.getElementById("totalJobs");

        const currentJobs =
            parseInt(totalJobs.textContent.replace(/,/g, ""));

        totalJobs.textContent =
            Math.max(currentJobs - 1, 0).toLocaleString();


        closeDeleteModal();

    });


    deleteModal.addEventListener("click", event => {

        if (event.target === deleteModal) {
            closeDeleteModal();
        }

    });


    /* =================================================
       ROW ACTIONS
       ================================================= */

    function attachRowActions(row) {

        const deleteButton =
            row.querySelector(".delete-btn");

        const editButton =
            row.querySelector(".edit-btn");


        deleteButton.addEventListener("click", () => {

            openDeleteModal(row);

        });


        editButton.addEventListener("click", () => {

            const title =
                row.querySelector(".job-cell strong").textContent;

            const company =
                row.children[1].textContent.trim();

            alert(
                `Edit functionality selected for "${title}" at ${company}.`
            );

        });

    }


    /* Attach existing rows */

    document
        .querySelectorAll("#jobsTableBody tr")
        .forEach(row => {

            attachRowActions(row);

        });


    /* =================================================
       GLOBAL SEARCH
       ================================================= */

    globalSearch.addEventListener("input", () => {

        const search =
            globalSearch.value.toLowerCase().trim();

        const rows =
            document.querySelectorAll("#jobsTableBody tr");

        rows.forEach(row => {

            const text =
                row.textContent.toLowerCase();

            if (text.includes(search)) {
                row.style.display = "";
            } else {
                row.style.display = "none";
            }

        });

    });


    /* =================================================
       ESC KEY
       ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") {
            return;
        }

        closeJobModal();
        closeDeleteModal();
        closeSidebar();

    });


    /* =================================================
       LOGOUT
       ================================================= */

    document
        .getElementById("logoutBtn")
        .addEventListener("click", () => {

            const confirmLogout =
                confirm("Are you sure you want to logout?");

            if (confirmLogout) {

                alert("Logged out successfully.");

            }

        });


    /* =================================================
       VIEW ALL JOBS
       ================================================= */

    document
        .getElementById("viewAllJobs")
        .addEventListener("click", () => {

            document
                .getElementById("jobs")
                .scrollIntoView({
                    behavior: "smooth"
                });

        });


    /* =================================================
       CHART FILTER
       ================================================= */

    document
        .getElementById("chartFilter")
        .addEventListener("change", event => {

            const bars =
                document.querySelectorAll(".bar");

            const selected =
                event.target.value;

            if (selected === "Last 12 months") {

                bars.forEach((bar, index) => {

                    bar.style.height =
                        `${35 + index * 7}%`;

                });

            } else if (selected === "This year") {

                bars.forEach((bar, index) => {

                    bar.style.height =
                        `${45 + index * 6}%`;

                });

            } else {

                const heights =
                    [42, 57, 48, 72, 66, 84];

                bars.forEach((bar, index) => {

                    bar.style.height =
                        `${heights[index]}%`;

                });

            }

        });


    /* =================================================
       ESCAPE HTML
       ================================================= */

    function escapeHTML(value) {

        const div = document.createElement("div");

        div.textContent = value;

        return div.innerHTML;

    }

});
