document.addEventListener("DOMContentLoaded", function () {
    // Function to handle form submission
    const handleFormSubmit = (form) => {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = new FormData(form);
            const actionUrl = form.getAttribute("action");

            fetch(actionUrl, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        alert("Form submitted successfully!");
                        form.reset();
                    } else {
                        alert("Error submitting form: " + data.message);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("An error occurred while submitting the form.");
                });
        });
    };

    // Apply form submission handler to contact form
    const contactForm = document.querySelector(".contact-form");
    if (contactForm) {
        handleFormSubmit(contactForm);
    }

    // Admin login form submission handler
    const adminLoginForm = document.querySelector(".login-form");
    if (adminLoginForm) {
        handleFormSubmit(adminLoginForm);
    }

    // Admin actions (e.g., managing quotes, invoices)
    const adminForms = document.querySelectorAll(".admin-form");
    adminForms.forEach((form) => {
        handleFormSubmit(form);
    });

    // Dynamic content loading for blog or other sections (AJAX example)
    const loadContent = (url, targetElement) => {
        fetch(url)
            .then((response) => response.text())
            .then((html) => {
                targetElement.innerHTML = html;
            })
            .catch((error) => {
                console.error("Error:", error);
                targetElement.innerHTML = "Error loading content.";
            });
    };

    // Example usage for loading blog content dynamically
    const blogLinks = document.querySelectorAll(".blog-link");
    const blogContent = document.querySelector("#blog-content");

    blogLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const url = link.getAttribute("href");
            if (blogContent) {
                loadContent(url, blogContent);
            }
        });
    });

    // Handling file uploads (example for admin dashboard)
    const fileUploadForm = document.querySelector(".file-upload-form");
    if (fileUploadForm) {
        fileUploadForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = new FormData(fileUploadForm);
            const actionUrl = fileUploadForm.getAttribute("action");

            fetch(actionUrl, {
                method: "POST",
                body: formData,
            })
                .then((response) => response.json())
                .then((data) => {
                    if (data.success) {
                        alert("File uploaded successfully!");
                        fileUploadForm.reset();
                    } else {
                        alert("Error uploading file: " + data.message);
                    }
                })
                .catch((error) => {
                    console.error("Error:", error);
                    alert("An error occurred while uploading the file.");
                });
        });
    }
});
