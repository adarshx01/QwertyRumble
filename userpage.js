document.getElementById("storeName").addEventListener("click", function(event) {
    const name = document.getElementById("PlayerName").value;
    const phonenum = document.getElementById("Phone").value;

    if (name === "") {
        document.getElementById("PlayerName").placeholder = "⚠️ Please fill in your Name";
        event.preventDefault(); // Prevent the form from submitting
    } else {
        localStorage.setItem("userName", name);
        localStorage.setItem("PhoneNumber", phonenum);
    }
    if (phonenum === "") {
        document.getElementById("Phone").placeholder = "⚠️ Please fill in your Phone Number";
        event.preventDefault(); // Prevent the form from submitting
    } else {
        document.getElementById("Phone").placeholder = "Enter your Phone Number"; // Reset the placeholder
        localStorage.setItem("PhoneNumber", phonenum);
    }
});
