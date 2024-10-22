const form = document.getElementById('contactForm') as HTMLFormElement;


const API_ENDPOINT = 'https://6716204033bc2bfe40bc7cbb.mockapi.io/ContactInformation';

form.addEventListener('submit', async (event: Event) => {
    event.preventDefault(); 

    
    const name = (document.getElementById('name') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const contact = (document.getElementById('contact') as HTMLInputElement).value.trim();
    const subject = (document.getElementById('subject') as HTMLInputElement).value.trim();
    const message = (document.getElementById('message') as HTMLTextAreaElement).value.trim();

 
    if (!name || !email || !contact || !subject || !message) {
        alert('All fields are required.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email.');
        return;
    }

   
    const formData = {
        name,
        email,
        contactnumber: contact,
        subject,
        message,
    };

    try {
      
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            alert('Form Submitted Successfully!');
            form.reset(); 
        } else {
            const errorResponse = await response.json();
            alert(`Submission failed: ${errorResponse.message || 'Unknown error'}`);
        }
    } catch (error) {
        alert('Submission Failed. Please try again.');
        console.error('Error:', error);
    }
});
