function checkAnswer() {
    const answer = document.getElementById('answerInput').value;
    const errorMessageElement = document.getElementById('errorMessage');
    const loginBox = document.querySelector('.login-box');

    console.log("Đang kiểm tra đáp án: " + answer); // Thêm dòng debug này

    if (answer === "99") {
        console.log("Đáp án đúng, đang chuẩn bị chuyển trang..."); // Debug
        // Hiệu ứng khi đúng
        loginBox.style.boxShadow = "0 0 30px rgba(46, 213, 115, 0.5)";
        
        // Hiệu ứng fade-out trước khi chuyển trang
        document.body.style.opacity = "0";
        document.body.style.transition = "opacity 0.8s ease";
        
        // Chuyển trang ngay lập tức (bỏ setTimeout)
        window.location.href = "index.html";

        // Nếu vẫn không chuyển được, hãy thử cách này
        /*
        setTimeout(() => {
            console.log("Đang chuyển trang...");
            window.location = "index.html";
            // Nếu vẫn không hoạt động, thử cách khác:
            // window.open("index.html", "_self");
        }, 800);
        */
    } else {
        // Hiệu ứng khi sai
        errorMessageElement.textContent = "Sai rồi nè! Thử lại nha tình yêu ❤️";
        document.getElementById('answerInput').value = ""; // Xóa input sai
        document.getElementById('answerInput').focus(); // Focus lại vào input
        
        // Thêm hiệu ứng rung lắc
        loginBox.classList.add('shake');
        setTimeout(() => {
            loginBox.classList.remove('shake');
        }, 500);
    }
}