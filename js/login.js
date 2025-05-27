console.log("Login.js loaded successfully");

function checkAnswer() {
    const answer = document.getElementById('answerInput').value.trim();
    const errorMessageElement = document.getElementById('errorMessage');
    const loginBox = document.querySelector('.login-box');

    console.log("Người dùng nhập: '" + answer + "'");
    console.log("Current page:", window.location.href);

    if (answer === "99") {
        console.log("Đáp án đúng! Chuẩn bị chuyển trang...");

        // Hiệu ứng khi đúng
        if (loginBox) {
            loginBox.style.boxShadow = "0 0 30px rgba(46, 213, 115, 0.5)";
            loginBox.style.transform = "scale(1.02)";
        }
        
        // Hiệu ứng fade-out
        document.body.style.transition = "opacity 0.8s ease";
        document.body.style.opacity = "0";
        
        // Chuyển đến main.html với timeout để hiệu ứng hoàn thành
        setTimeout(() => {
            console.log("Đang chuyển đến main.html...");
            console.log("Attempting to redirect to:", "main.html");
            
            // Thử nhiều cách chuyển trang
            try {
                window.location.href = "main.html";
            } catch (error) {
                console.error("Error redirecting:", error);
                // Backup method
                window.location.replace("main.html");
            }
        }, 800);

    } else {
        console.log("Đáp án sai:", answer);
        
        // Hiển thị thông báo lỗi
        if (errorMessageElement) {
            errorMessageElement.textContent = "Sai rồi nè! Thử lại nha tình yêu ❤️";
            errorMessageElement.style.animation = "shake 0.5s ease-in-out";
        }
       
        // Xóa input và focus lại
        const answerInput = document.getElementById('answerInput');
        if (answerInput) {
            answerInput.value = "";
            answerInput.focus();
            answerInput.style.borderColor = "#ff6b6b";
            
            // Reset border color after 2 seconds
            setTimeout(() => {
                answerInput.style.borderColor = "";
            }, 2000);
        }
        
        // Hiệu ứng rung lắc
        if (loginBox) {
            loginBox.classList.add('shake');
            setTimeout(() => {
                loginBox.classList.remove('shake');
            }, 500);
        }
    }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, setting up event listeners");
    
    const answerInput = document.getElementById('answerInput');
    const loginButton = document.querySelector('.login-btn');
    
    if (answerInput) {
        console.log("Answer input found, setting up events");
        
        // Tự động focus vào ô input khi trang load
        answerInput.focus();
        
        // Cho phép nhấn Enter để đăng nhập
        answerInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault();
                console.log("Enter key pressed, calling checkAnswer");
                checkAnswer();
            }
        });
        
        // Clear error message when typing
        answerInput.addEventListener('input', function() {
            const errorMessageElement = document.getElementById('errorMessage');
            if (errorMessageElement) {
                errorMessageElement.textContent = "";
            }
        });
    } else {
        console.error("Answer input not found!");
    }
    
    // Event listener cho nút đăng nhập
    if (loginButton) {
        console.log("Login button found, setting up click event");
        
        loginButton.addEventListener('click', function(event) {
            event.preventDefault();
            console.log("Login button clicked, calling checkAnswer");
            checkAnswer();
        });
        
        // Add ripple effect
        loginButton.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.classList.add('ripple-effect');
            
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    } else {
        console.error("Login button not found!");
    }
    
    // Add floating hearts effect
    createFloatingHearts();
});

// Floating hearts effect
function createFloatingHearts() {
    setInterval(() => {
        if (document.querySelectorAll('.floating-heart').length < 3) {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '💖';
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 4) + 's';
            
            document.body.appendChild(heart);
            
            setTimeout(() => {
                if (heart.parentNode) {
                    heart.remove();
                }
            }, 7000);
        }
    }, 3000);
}

// Add some extra debugging
window.addEventListener('beforeunload', function() {
    console.log("Page is about to unload");
});

window.addEventListener('load', function() {
    console.log("Page fully loaded");
});