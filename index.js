"use strict";

const form = document.getElementById('contactForm');
const API_ENDPOINT = 'https://6716204033bc2bfe40bc7cbb.mockapi.io/ContactInformation';

form.addEventListener('submit', (event) => {
    event.preventDefault();

    // Collect form data
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const contact = document.getElementById('contact').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    // validation
    if (!name || !email || !contact || !subject || !message) {
        alert('All fields are required.');
        return;
    }

    // email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email.');
        return;
    }

    // data
    const formData = {
        name,
        email,
        contactnumber: contact,
        subject,
        message
    };

    console.log('Form Data:', formData);

    //  XMLHttpRequest
    const xhr = new XMLHttpRequest();
    xhr.open('POST', API_ENDPOINT, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 201 || xhr.status === 200) {
                console.log('Form Submitted Successfully!', xhr.responseText);
                showSuccessMessage(); 
                form.reset(); 
            } else {
                console.error('Submission failed:', xhr.responseText);
                alert(`Submission failed. Please try again. Error: ${xhr.responseText}`);
            }
        }
    };

    xhr.onerror = function () {
        console.error('Request failed');
        alert('Network error or CORS issue occurred.');
    };

    xhr.send(JSON.stringify(formData));
});


function showSuccessMessage() {
    const messageContainer = document.createElement('div');
    messageContainer.style.width = '100%';
    messageContainer.style.height = '100%';
    messageContainer.style.position = 'fixed';
    messageContainer.style.top = '0';
    messageContainer.style.left = '0';
    messageContainer.style.display = 'flex';
    messageContainer.style.alignItems = 'center';
    messageContainer.style.justifyContent = 'center';
    messageContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    messageContainer.innerHTML = `
        <div style="background-color: white; padding: 20px; border-radius: 10px; text-align: center;">
            <img src="https://www.guvi.in/assets/green-checkmark.png" alt="Success" style="width: 50px; height: 50px;">
            <h2>Your Submission is Successful</h2>
            <p>Our team will reach out to you shortly!</p>
            <button id="backButton" style="padding: 10px 20px; background-color: green; color: white; border: none; border-radius: 5px;">Back</button>
        </div>
    `;
    document.body.appendChild(messageContainer);

  
    document.getElementById('backButton').addEventListener('click', () => {
        messageContainer.remove();
    });
}
