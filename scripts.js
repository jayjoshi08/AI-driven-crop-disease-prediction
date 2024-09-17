// Language selection
document.addEventListener("DOMContentLoaded", function() {
    const langButtons = document.querySelectorAll(".lang");
    langButtons.forEach(function(button) {
        button.addEventListener("click", function() {
            const lang = button.id;
            // Toggle language
            if (lang === "english") {
                document.body.lang = "en";
            } else {
                document.body.lang = "hi";
            }
        });
    });
});

// Sign In functionality
document.getElementById("login-btn").addEventListener("click", function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    // Validate email and password
    if (email && password) {
        // Call API to authenticate user
        fetch("/api/authenticate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.authenticated) {
                // Redirect to dashboard
                window.location.href = "/dashboard";
            } else {
                document.getElementById("error-msg").innerHTML = "Invalid email or password";
            }
        })
        .catch(error => console.error(error));
    } else {
        document.getElementById("error-msg").innerHTML = "Please enter email and password";
    }
});

// Image upload functionality
document.getElementById("upload-btn").addEventListener("click", function(event) {
    event.preventDefault();
    const imageUpload = document.getElementById("image-upload");
    const file = imageUpload.files[0];
    // Validate file type
    if (file.type.match("image.*")) {
        // Call API to upload image
        fetch("/api/upload", {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data"
            },
            body: new FormData(document.getElementById("upload-form"))
        })
        .then(response => response.json())
        .then(data => {
            // Display image preview
            const imagePreview = document.getElementById("image-preview");
            imagePreview.innerHTML = `<img src="${data.imageUrl}" alt="Uploaded Image">`;
            // Call API to diagnose disease
            fetch("/api/diagnose", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ imageUrl: data.imageUrl })
            })
            .then(response => response.json())
            .then(data => {
                // Display disease diagnosis result
                const resultMsg = document.getElementById("result-msg");
                resultMsg.innerHTML = `Disease diagnosed: ${data.disease}`;
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    } else {
        alert("Please select an image file");
    }
});