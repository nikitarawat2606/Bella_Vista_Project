document.addEventListener("DOMContentLoaded", () => {

    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById("mobileToggle");
    const navLinks = document.getElementById("navLinks");

    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            const icon = mobileToggle.querySelector("i");
            if (navLinks.classList.contains("active")) {
                icon.className = "fa-solid fa-xmark";
            } else {
                icon.className = "fa-solid fa-bars";
            }
        });
    }

    // Close menu when clicking link (Mobile)
    document.querySelectorAll(".nav-item").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            if (mobileToggle) {
                mobileToggle.querySelector("i").className = "fa-solid fa-bars";
            }
        });
    });

    // 2. Menu Category Filtering
    const tabButtons = document.querySelectorAll(".tab-btn");
    const menuCards = document.querySelectorAll(".menu-card");

    tabButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            tabButtons.forEach(btn => btn.classList.remove("active"));
            // Add active class to clicked button
            button.classList.add("active");

            const selectedCategory = button.getAttribute("data-category");

            menuCards.forEach(card => {
                const cardCategory = card.getAttribute("data-category");
                if (selectedCategory === "all" || selectedCategory === cardCategory) {
                    card.style.display = "block";
                    card.style.animation = "fadeInUp 0.5s ease forward";
                } else {
                    card.style.display = "none";
                }
            });
        });
    });

    // 3. Form Submission Toast Feedback
    const reservationForm = document.getElementById("reservationForm");
    const toast = document.getElementById("toastNotification");
    const toastMessage = document.getElementById("toastMessage");

    if (reservationForm) {
        reservationForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("fullName").value;
            const guests = document.getElementById("guestCount").value;
            const date = document.getElementById("resDate").value;

            // Trigger Toast Notification
            toastMessage.textContent = `Thank you ${name}! Table for ${guests} reserved for ${date}.`;
            toast.classList.add("show");

            // Reset Form
            reservationForm.reset();

            // Hide Toast after 4 seconds
            setTimeout(() => {
                toast.classList.remove("show");
            }, 4000);
        });
    }

    // Set Min Date in Reservation Input to Today
    const dateInput = document.getElementById("resDate");
    if (dateInput) {
        const today = new Date().toISOString().split("T")[0];
        dateInput.setAttribute("min", today);
    }
});