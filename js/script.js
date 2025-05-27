let slideIndex = 1;
let autoSlideTimeout; // Biến để lưu trữ timeout tự động chuyển slide
const autoSlideInterval = 5000; // Thời gian tự động chuyển slide (5 giây)
const slides = document.getElementsByClassName("slide");
const totalSlides = slides.length;

// Chạy khi trang được tải
document.addEventListener('DOMContentLoaded', (event) => {
    showSlides(slideIndex);
    startAutoSlide(); // Bắt đầu tự động chuyển slide

    // Cập nhật tổng số slide trong text "1 / X"
    for (let i = 0; i < slides.length; i++) {
        let slideNumberText = slides[i].querySelector(".slide-number");
        if (slideNumberText) {
            slideNumberText.textContent = (i + 1) + " / " + totalSlides;
        }
    }

    // Xử lý nhạc nền
    const music = document.getElementById('backgroundMusic');
    const playPauseButton = document.getElementById('playPauseButton');
    let musicPlayedOnce = false; // Cờ để đảm bảo nhạc chỉ tự động phát lần đầu

    function toggleMusic() {
        if (music.paused) {
            music.play().then(() => {
                playPauseButton.textContent = "Tạm Dừng Nhạc";
            }).catch(error => {
                console.log("Lỗi phát nhạc: ", error);
                // Có thể trình duyệt chặn tự động phát nếu người dùng chưa tương tác
                playPauseButton.textContent = "Phát Nhạc (bị chặn)";
            });
        } else {
            music.pause();
            playPauseButton.textContent = "Phát Nhạc";
        }
    }

    playPauseButton.addEventListener('click', toggleMusic);

    // Cố gắng tự động phát nhạc khi người dùng đã vào trang (có thể bị chặn bởi trình duyệt)
    // Một cách tốt hơn là chờ người dùng tương tác (click) rồi mới phát
    // Hoặc bạn có thể bỏ nút play/pause và thêm thuộc tính `autoplay` vào thẻ <audio>
    // Tuy nhiên, `autoplay` thường bị trình duyệt chặn nếu không có tương tác người dùng trước.
    // Chúng ta sẽ thử phát khi trang tải xong, và người dùng có thể bấm nút nếu bị chặn.
    
    // Tự động phát nhạc khi vào trang chính
    // (Lưu ý: Chính sách autoplay của trình duyệt có thể ngăn điều này nếu không có tương tác trước)
    // Nếu muốn nhạc tự động phát ngay, thêm `autoplay` vào thẻ <audio> trong HTML
    // và bạn có thể bỏ phần music.play() ở đây.
    if (!musicPlayedOnce) {
         music.play().then(() => {
            playPauseButton.textContent = "Tạm Dừng Nhạc";
            musicPlayedOnce = true;
        }).catch(error => {
            console.log("Trình duyệt có thể đã chặn tự động phát nhạc. Người dùng cần nhấn nút.");
            playPauseButton.textContent = "Phát Nhạc";
        });
    }

    // Dừng tự động chuyển slide khi hover chuột vào slideshow
    const slideshowContainer = document.querySelector('.slideshow-container');
    if (slideshowContainer) {
        slideshowContainer.addEventListener('mouseenter', stopAutoSlide);
        slideshowContainer.addEventListener('mouseleave', startAutoSlide);
    }
});

// Hàm tự động chuyển slide
function startAutoSlide() {
    stopAutoSlide(); // Xóa timeout cũ nếu có
    autoSlideTimeout = setTimeout(() => {
        plusSlides(1); // Chuyển sang slide tiếp theo
        startAutoSlide(); // Lặp lại
    }, autoSlideInterval);
}

function stopAutoSlide() {
    clearTimeout(autoSlideTimeout);
}

// Next/previous controls
function plusSlides(n) {
    stopAutoSlide(); // Dừng tự động chuyển khi người dùng tương tác
    showSlides(slideIndex += n);
    startAutoSlide(); // Khởi động lại tự động chuyển sau khi người dùng tương tác
}

// Thumbnail image controls (nếu bạn có)
function currentSlide(n) {
    stopAutoSlide();
    showSlides(slideIndex = n);
    startAutoSlide();
}

function showSlides(n) {
    let i;
    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }

    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    // Đảm bảo slides[slideIndex-1] tồn tại
    if (slides[slideIndex-1]) {
        slides[slideIndex-1].style.display = "block";
        // Nếu bạn muốn thêm hiệu ứng khác khi slide xuất hiện, ví dụ slide-right
        // slides[slideIndex-1].classList.remove('slide-left-out'); // Xóa class out nếu có
        // slides[slideIndex-1].classList.add('slide-right'); // Thêm class vào
    }
}