/* =====================================================
   CAREERHUB JOB PORTAL JAVASCRIPT
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =================================================
       ELEMENTS
       ================================================= */

    const keywordInput = document.getElementById("keywordInput");
    const locationInput = document.getElementById("locationInput");
    const searchBtn = document.getElementById("searchBtn");

    const jobList = document.getElementById("jobList");
    const jobCards = Array.from(document.querySelectorAll(".job-card"));
    const jobCount = document.getElementById("jobCount");
    const noResults = document.getElementById("noResults");

    const clearFilters = document.getElementById("clearFilters");
    const sortJobs = document.getElementById("sortJobs");

    const applyModal = document.getElementById("applyModal");
    const modalClose = document.getElementById("modalClose");
    const modalJobTitle = document.getElementById("modalJobTitle");
    const applicationForm = document.getElementById("applicationForm");

    const loginBtn = document.getElementById("loginBtn");
    const loginModal = document.getElementById("loginModal");
    const loginClose = document.getElementById("loginClose");
    const loginForm = document.getElementById("loginForm");

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");


    /* =================================================
       SEARCH + FILTER
       ================================================= */

    function filterJobs() {

        const keyword = keywordInput.value.toLowerCase().trim();
        const location = locationInput.value.toLowerCase().trim();

        const selectedTypes = [
            ...document.querySelectorAll(".job-type:checked")
        ].map(input => input.value);

        const selectedExperience = [
            ...document.querySelectorAll(".experience:checked")
        ].map(input => input.value);

        const selectedSalary = [
            ...document.querySelectorAll(".salary:checked")
        ].map(input => input.value);

        let visibleJobs = 0;

        jobCards.forEach(card => {

            const title = card.dataset.title.toLowerCase();
            const company = card.dataset.company.toLowerCase();
            const cardLocation = card.dataset.location.toLowerCase();

            const type = card.dataset.type;
            const experience = card.dataset.experience;
            const salary = card.dataset.salary;

            const keywordMatch =
                !keyword ||
                title.includes(keyword) ||
                company.includes(keyword);

            const locationMatch =
                !location ||
                cardLocation.includes(location);

            const typeMatch =
                selectedTypes.length === 0 ||
                selectedTypes.includes(type);

            const experienceMatch =
                selectedExperience.length === 0 ||
                selectedExperience.includes(experience);

            const salaryMatch =
                selectedSalary.length === 0 ||
                selectedSalary.includes(salary);

            const show =
                keywordMatch &&
                locationMatch &&
                typeMatch &&
                experienceMatch &&
                salaryMatch;

            if (show) {
                card.style.display = "grid";
                visibleJobs++;
            } else {
                card.style.display = "none";
            }
        });

        jobCount.textContent = visibleJobs;

        if (visibleJobs === 0) {
            noResults.style.display = "block";
        } else {
            noResults.style.display = "none";
        }
    }


    /* =================================================
       SEARCH BUTTON
       ================================================= */

    searchBtn.addEventListener("click", () => {
        filterJobs();

        document.getElementById("jobs").scrollIntoView({
            behavior: "smooth"
        });
    });


    /* Search while typing */

    keywordInput.addEventListener("input", filterJobs);
    locationInput.addEventListener("input", filterJobs);


    /* Enter key search */

    [keywordInput, locationInput].forEach(input => {

        input.addEventListener("keydown", event => {

            if (event.key === "Enter") {
                filterJobs();

                document.getElementById("jobs").scrollIntoView({
                    behavior: "smooth"
                });
            }

        });

    });


    /* =================================================
       FILTER CHECKBOXES
       ================================================= */

    document.querySelectorAll(
        ".job-type, .experience, .salary"
    ).forEach(checkbox => {

        checkbox.addEventListener("change", filterJobs);

    });


    /* =================================================
       CLEAR FILTERS
       ================================================= */

    clearFilters.addEventListener("click", () => {

        keywordInput.value = "";
        locationInput.value = "";

        document.querySelectorAll(
            ".job-type, .experience, .salary"
        ).forEach(checkbox => {
            checkbox.checked = false;
        });

        filterJobs();

    });


    /* =================================================
       POPULAR SEARCHES
       ================================================= */

    document.querySelectorAll(
        ".popular-searches button"
    ).forEach(button => {

        button.addEventListener("click", () => {

            keywordInput.value = button.dataset.keyword;

            filterJobs();

            document.getElementById("jobs").scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    /* =================================================
       CATEGORY FILTER
       ================================================= */

    document.querySelectorAll(".category-card").forEach(card => {

        card.addEventListener("click", () => {

            const category = card.dataset.category;

            jobCards.forEach(job => {

                if (
                    category === "Technology" &&
                    job.dataset.category === "Technology"
                ) {
                    job.style.display = "grid";
                } else if (
                    category !== "Technology" &&
                    job.dataset.category === category
                ) {
                    job.style.display = "grid";
                } else {
                    job.style.display = "none";
                }

            });

            const visible = jobCards.filter(
                job => job.style.display !== "none"
            ).length;

            jobCount.textContent = visible;

            noResults.style.display =
                visible === 0 ? "block" : "none";

            document.getElementById("jobs").scrollIntoView({
                behavior: "smooth"
            });

        });

    });


    /* =================================================
       SORT JOBS
       ================================================= */

    sortJobs.addEventListener("change", () => {

        const cards = [...jobCards];

        if (sortJobs.value === "salary") {

            cards.sort((a, b) => {

                return (
                    Number(b.dataset.salaryValue) -
                    Number(a.dataset.salaryValue)
                );

            });

        }

        if (sortJobs.value === "latest") {

            cards.sort((a, b) => {

                const aText =
                    a.querySelector(".posted").textContent;

                const bText =
                    b.querySelector(".posted").textContent;

                return getDays(aText) - getDays(bText);

            });

        }

        cards.forEach(card => {
            jobList.appendChild(card);
        });

        filterJobs();

    });


    function getDays(text) {

        text = text.toLowerCase();

        if (text.includes("today")) return 0;
        if (text.includes("1 day")) return 1;
        if (text.includes("2 days")) return 2;
        if (text.includes("3 days")) return 3;
        if (text.includes("4 days")) return 4;
        if (text.includes("5 days")) return 5;
        if (text.includes("week")) return 7;

        return 99;
    }


    /* =================================================
       BOOKMARK
       ================================================= */

    document.querySelectorAll(".bookmark").forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("saved");

            const icon = button.querySelector("i");

            if (button.classList.contains("saved")) {

                icon.classList.remove("fa-regular");
                icon.classList.add("fa-solid");

            } else {

                icon.classList.remove("fa-solid");
                icon.classList.add("fa-regular");

            }

        });

    });


    /* =================================================
       APPLY MODAL
       ================================================= */

    document.querySelectorAll(".apply-btn").forEach(button => {

        button.addEventListener("click", () => {

            const jobCard = button.closest(".job-card");
            const title =
                jobCard.querySelector("h3").textContent;

            modalJobTitle.textContent = title;

            applyModal.classList.add("show");

            document.body.style.overflow = "hidden";

        });

    });


    function closeApplyModal() {

        applyModal.classList.remove("show");
        document.body.style.overflow = "";

    }


    modalClose.addEventListener("click", closeApplyModal);


    applyModal.addEventListener("click", event => {

        if (event.target === applyModal) {
            closeApplyModal();
        }

    });


    /* =================================================
       APPLICATION FORM
       ================================================= */

    applicationForm.addEventListener("submit", event => {

        event.preventDefault();

        const name =
            document.getElementById("applicantName").value;

        alert(
            `Thank you ${name}! Your application has been submitted successfully.`
        );

        applicationForm.reset();

        closeApplyModal();

    });


    /* =================================================
       LOGIN MODAL
       ================================================= */

    loginBtn.addEventListener("click", () => {

        loginModal.classList.add("show");
        document.body.style.overflow = "hidden";

    });


    function closeLoginModal() {

        loginModal.classList.remove("show");
        document.body.style.overflow = "";

    }


    loginClose.addEventListener("click", closeLoginModal);


    loginModal.addEventListener("click", event => {

        if (event.target === loginModal) {
            closeLoginModal();
        }

    });


    loginForm.addEventListener("submit", event => {

        event.preventDefault();

        alert("Login successful!");

        loginForm.reset();

        closeLoginModal();

    });


    /* =================================================
       ESC KEY - CLOSE MODALS
       ================================================= */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            closeApplyModal();
            closeLoginModal();

        }

    });


    /* =================================================
       MOBILE MENU
       ================================================= */

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("mobile-active");

        const icon = menuToggle.querySelector("i");

        if (navMenu.classList.contains("mobile-active")) {

            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");

        } else {

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });


    /* Close mobile menu after clicking link */

    document.querySelectorAll(".nav-menu a").forEach(link => {

        link.addEventListener("click", () => {

            navMenu.classList.remove("mobile-active");

            const icon = menuToggle.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        });

    });


    /* =================================================
       NAVBAR ACTIVE LINK
       ================================================= */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop - 120;

            if (window.scrollY >= sectionTop) {
                current = section.id;
            }

        });

        document.querySelectorAll(".nav-menu a").forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === `#${current}`
            ) {
                link.classList.add("active");
            }

        });

    });


    /* =================================================
       INITIALIZE
       ================================================= */

    filterJobs();

});
