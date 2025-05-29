document.addEventListener('DOMContentLoaded', function() {
    // Set birthday person's name
    const birthdayPerson = "Mahalaxmi"; // Change this to the birthday person's name
    document.getElementById('birthday-person').textContent = birthdayPerson;
    
    // Countdown timer
    function updateCountdown() {
        // Set the birthday date (month is 0-indexed, so 11 = December)
        const birthdayDate = new Date(new Date().getFullYear(), 5, 1); // Change to the actual birthday date
        const now = new Date();
        
        // If birthday has passed this year, set for next year
        if (now > birthdayDate) {
            birthdayDate.setFullYear(birthdayDate.getFullYear() + 1);
        }
        
        const diff = birthdayDate - now;
        
        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = days.toString().padStart(2, '0');
        document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
        document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
        document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Blow out candles functionality
    const wishBtn = document.getElementById('wish-btn');
    const candle = document.querySelector('.candle');
    const flame = document.querySelector('.flame');
    const modal = document.getElementById('birthday-modal');
    const closeModal = document.querySelector('.close-modal');
    const audio = document.getElementById('birthday-audio');
    const musicToggle = document.getElementById('music-toggle');
    
    wishBtn.addEventListener('click', function() {
        // Blow out candle
        flame.style.display = 'none';
        candle.style.backgroundColor = '#ccc';
        
        // Show smoke effect
        const smoke = document.createElement('div');
        smoke.className = 'smoke';
        smoke.style.position = 'absolute';
        smoke.style.width = '5px';
        smoke.style.height = '20px';
        smoke.style.backgroundColor = '#888';
        smoke.style.borderRadius = '50%';
        smoke.style.top = '-20px';
        smoke.style.left = '50%';
        smoke.style.transform = 'translateX(-50%)';
        smoke.style.opacity = '0.8';
        candle.appendChild(smoke);
        
        // Animate smoke
        let pos = -20;
        const smokeInterval = setInterval(() => {
            pos -= 1;
            smoke.style.top = pos + 'px';
            smoke.style.opacity = (parseFloat(smoke.style.opacity) - 0.02).toString();
            
            if (parseFloat(smoke.style.opacity) <= 0) {
                clearInterval(smokeInterval);
                smoke.remove();
            }
        }, 30);
        
        // Show modal after delay
        setTimeout(() => {
            modal.style.display = 'block';
            createConfetti();
            audio.play();
        }, 1000);
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        // Reset candle
        flame.style.display = 'block';
        candle.style.backgroundColor = '#fff';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            // Reset candle
            flame.style.display = 'block';
            candle.style.backgroundColor = '#fff';
        }
    });
    
    // Music toggle
    let isPlaying = false;
    
    musicToggle.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            musicToggle.innerHTML = '<i class="fas fa-music"></i>';
        } else {
            audio.play();
            musicToggle.innerHTML = '<i class="fas fa-pause"></i>';
        }
        isPlaying = !isPlaying;
    });
    
    // Message form
    const messageForm = document.getElementById('message-form');
    const messagesContainer = document.querySelector('.messages-container');
    
    messageForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const message = document.getElementById('message').value;
        
        if (name && message) {
            const messageItem = document.createElement('div');
            messageItem.className = 'message-item';
            messageItem.innerHTML = `
                <h4>${name}</h4>
                <p>${message}</p>
                <small>${new Date().toLocaleString()}</small>
            `;
            
            messagesContainer.prepend(messageItem);
            
            // Clear form
            messageForm.reset();
            
            // Show thank you message
            alert('Thank you for your birthday message!');
        }
    });
    
    // Create some sample messages
    const sampleMessages = [
        { name: 'Manohar', message: 'Wishing you an amazing birthday filled with joy and laughter!' },
        { name: 'Aneesha', message: 'Wish you a many happy returns of the day! Have a great year ahead and hope you enjoy every little moment in your life.' },
        { name: 'Pooja', message: 'Another year wiser! Have a fantastic celebration!' }
    ];
    
    sampleMessages.forEach(msg => {
        const messageItem = document.createElement('div');
        messageItem.className = 'message-item';
        messageItem.innerHTML = `
            <h4>${msg.name}</h4>
            <p>${msg.message}</p>
            <small>${new Date().toLocaleString()}</small>
        `;
        messagesContainer.appendChild(messageItem);
    });
    
    // Confetti effect
    function createConfetti() {
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#ff9ff3', '#feca57', '#5f27cd'];
        const container = document.querySelector('.confetti-container');
        
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            const size = Math.random() * 10 + 5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            const left = Math.random() * 100;
            const animationDuration = Math.random() * 3 + 2;
            const delay = Math.random() * 5;
            
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            confetti.style.backgroundColor = color;
            confetti.style.left = `${left}%`;
            confetti.style.animationDuration = `${animationDuration}s`;
            confetti.style.animationDelay = `${delay}s`;
            
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, (animationDuration + delay) * 1000);
        }
    }
    
    // Gallery item click effect
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            this.classList.toggle('zoom');
        });
    });
});
