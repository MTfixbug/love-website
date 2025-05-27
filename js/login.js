function checkAnswer() {
    const answer = document.getElementById('answerInput').value.trim(); // Thêm .trim() để xóa khoảng trắng thừa
    const errorMessageElement = document.getElementById('errorMessage');
    const loginBox = document.querySelector('.login-box'); // Đảm bảo class này có trong HTML của bạn

    console.log("Người dùng nhập: '" + answer + "'"); // Debug: xem giá trị nhập vào

    // Kiểm tra xem phần tử loginBox có tồn tại không để tránh lỗi
    if (!loginBox) {
        console.error("Lỗi nghiêm trọng: Không tìm thấy phần tử có class '.login-box' trong HTML!");
        // Bạn có thể quyết định dừng ở đây nếu loginBox quá quan trọng
    }

    if (answer === "99") { // HOẶC "100" tùy theo ý bạn cho ngày kỷ niệm
        console.log("Đáp án đúng! Chuẩn bị chuyển trang..."); // Debug

        // Áp dụng hiệu ứng khi trả lời đúng
        if (loginBox) {
            loginBox.style.boxShadow = "0 0 30px rgba(46, 213, 115, 0.5)";
        }
        
        // Bắt đầu hiệu ứng fade-out cho body
        // Việc chuyển trang có thể xảy ra trước khi hiệu ứng 0.8 giây này hoàn tất về mặt hình ảnh.
        // Điều này thường chấp nhận được nếu ưu tiên chuyển trang ngay.
        document.body.style.transition = "opacity 0.8s ease";
        document.body.style.opacity = "0";
        
        // Chuyển trang đến index.html
        // Đây là cách tiêu chuẩn và thường đáng tin cậy nhất.
        // Hãy chắc chắn rằng file 'index.html' nằm trong cùng thư mục với 'login.html'.
        console.log("Đang cố gắng chuyển đến trang index.html..."); // Debug
        
        // Dòng lệnh chính để chuyển trang:
        window.location.href = "index.html";

        // --- Các giải pháp dự phòng (NẾU dòng trên vẫn không hoạt động) ---
        // Những cách này thường không cần thiết nhưng có thể thử nếu 'window.location.href' gặp sự cố lạ.
        // Thử từng cái một, và xóa/comment những cái khác.
        // Đôi khi một độ trễ RẤT NHỎ có thể giúp trình duyệt xử lý hiệu ứng trước khi điều hướng.
        /*
        setTimeout(function() {
            console.log("Thử chuyển trang (href) với độ trễ nhỏ...");
            window.location.href = "index.html";
        }, 50); // 50 mili giây
        */

        /*
        setTimeout(function() {
            console.log("Thử chuyển trang (assign) với độ trễ nhỏ...");
            window.location.assign("index.html"); // Tương tự như href
        }, 50);
        */

        /*
        setTimeout(function() {
            console.log("Thử chuyển trang (open _self) với độ trễ nhỏ...");
            window.open("index.html", "_self"); // Mở trong tab hiện tại
        }, 50);
        */

    } else {
        console.log("Đáp án sai."); // Debug
        if (errorMessageElement) {
             errorMessageElement.textContent = "Sai rồi nè! Thử lại nha tình yêu ❤️";
        }
       
        const answerInput = document.getElementById('answerInput');
        if (answerInput) {
            answerInput.value = ""; // Xóa input sai
            answerInput.focus();    // Focus lại vào input
        }
        
        // Thêm hiệu ứng rung lắc khi sai
        if (loginBox) {
            loginBox.classList.add('shake');
            setTimeout(() => {
                loginBox.classList.remove('shake');
            }, 500);
        } else {
            // console.warn("Không tìm thấy '.login-box', không thể áp dụng hiệu ứng rung."); // Bỏ comment nếu cần debug
        }
    }
}

// Đảm bảo hàm này được gọi đúng cách, ví dụ qua thuộc tính onclick trên nút:
// <button onclick="checkAnswer()">Vào Xem Kỷ Niệm</button>

// Hoặc thêm trình nghe sự kiện cho nút và phím Enter trong JavaScript,
// đặt ở cuối file HTML hoặc trong DOMContentLoaded:
/*
document.addEventListener('DOMContentLoaded', () => {
    const loginButton = document.getElementById('yourLoginButtonId'); // Giả sử nút của bạn có ID
    if (loginButton) {
        loginButton.addEventListener('click', checkAnswer);
    }

    const answerInput = document.getElementById('answerInput');
    if (answerInput) {
        answerInput.addEventListener('keypress', function(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Ngăn hành động mặc định nếu input nằm trong form
                checkAnswer();
            }
        });
    }
});
*/