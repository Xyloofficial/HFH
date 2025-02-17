// Open order modal when a service button is clicked
const serviceButtons = document.querySelectorAll('.service-button');
const orderModal = document.getElementById('order-modal');
const closeModal = document.querySelector('.close-modal');
const selectedService = document.getElementById('selected-service');
const orderForm = document.getElementById('order-form');

serviceButtons.forEach(button => {
  button.addEventListener('click', () => {
    selectedService.textContent = button.getAttribute('data-service');
    orderModal.style.display = 'flex';
  });
});

// Close modal
closeModal.addEventListener('click', () => {
  orderModal.style.display = 'none';
});

// Close modal if clicked outside of it
window.addEventListener('click', (event) => {
  if (event.target === orderModal) {
    orderModal.style.display = 'none';
  }
});

// Handle form submission
orderForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const service = selectedService.textContent;
  const discord = document.getElementById('discord').value;
  const twitter = document.getElementById('twitter').value;
  const email = document.getElementById('email').value;
  const comments = document.getElementById('comments').value;

  // Replace with your Discord webhook URL
  const webhookURL = ${{ secrets.WEBHOOK }}

  try {
    const response = await fetch(webhookURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content: `@everyone \nNew Order:\nService: ${service}\nDiscord: ${discord}\nTwitter: ${twitter}\nEmail: ${email}\nComments: ${comments}`
      })
    });

    if (response.ok) {
      alert('Order submitted successfully!');
      orderModal.style.display = 'none';
      orderForm.reset();
    } else {
      const errorData = await response.json(); // Log the error response
      console.error('Error Response:', errorData);
      alert('Failed to submit order. Please try again.');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('An error occurred. Please try again.');
  }
});
