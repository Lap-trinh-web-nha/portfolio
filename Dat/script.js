document.addEventListener('DOMContentLoaded', function () {

    // =================================================================
    // =========== HIỆU ỨNG CHO NAVBAR & MENU MOBILE ===============
    // =================================================================
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        // Sự kiện click để bật/tắt menu
        navToggle.addEventListener('click', function () {
            navLinks.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // Tự động đóng menu khi người dùng click vào một link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Chỉ thực hiện nếu menu đang mở
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    navToggle.classList.remove('active');
                }
            });
        });
    }


    // =================================================================
    // =========== HIỆU ỨNG CHO SECTION LỘ TRÌNH SỰ NGHIỆP ============
    // =================================================================
    const timelineSection = document.querySelector('.roadmap-section');

    if (timelineSection) {
        const progressLine = timelineSection.querySelector('.timeline-progress');
        const timelineItems = timelineSection.querySelectorAll('.timeline-item');

        // --- 1. Hiệu ứng "Vẽ" đường kẻ khi cuộn ---
        const handleScroll = () => {
            const sectionRect = timelineSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Tính toán vị trí bắt đầu và kết thúc của section trong viewport
            const start = sectionRect.top;
            const end = sectionRect.bottom;

            // Tính toán % đã cuộn qua section
            // Bắt đầu "vẽ" khi đỉnh section chạm vào giữa màn hình
            // và kết thúc "vẽ" khi đáy section chạm vào giữa màn hình
            let progress = (windowHeight / 2 - start) / (end - start);

            // Giới hạn giá trị progress từ 0 đến 1
            progress = Math.max(0, Math.min(1, progress));

            // Cập nhật chiều cao của đường tiến trình
            if (progressLine) {
                progressLine.style.height = `${progress * 100}%`;
            }
        };

        // --- 2. Hiệu ứng "Hiện ra" cho các item khi vào tầm nhìn ---
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Nếu phần tử đang hiển thị trên màn hình
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Tùy chọn: Dừng quan sát sau khi đã hiện ra
                    // observer.unobserve(entry.target);
                } else {
                    // Tùy chọn: Làm hiệu ứng biến mất khi cuộn ra khỏi tầm nhìn
                    entry.target.classList.remove('is-visible');
                }
            });
        }, {
            rootMargin: '0px',
            threshold: 0.5 // Kích hoạt khi 50% item hiện ra
        });

        // Bắt đầu quan sát tất cả các item
        timelineItems.forEach(item => {
            observer.observe(item);
        });

        // Gắn sự kiện scroll để cập nhật đường kẻ
        window.addEventListener('scroll', handleScroll);
    }


  
    // =================================================================
    // =========== HIỆU ỨNG CHO SECTION NĂNG LỰC (STAGGERED) ==========
    // =================================================================
    const skillRows = document.querySelectorAll('.skill-row');

    if (skillRows.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                } else {
                    // Tùy chọn: Xóa class để hiệu ứng lặp lại mỗi khi cuộn
                    // entry.target.classList.remove('is-visible');
                }
            });
        }, {
            threshold: 0.2 // Kích hoạt khi 20% của hàng hiện ra
        });

        skillRows.forEach(row => {
            observer.observe(row);
        });
    }


    // =================================================================
    // =========== HIỆU ỨNG CHO ALBUM KHOẢNH KHẮC ===============
    // =================================================================
    const albumContainer = document.querySelector('.album-container');
    if (albumContainer) {
        let currentIndex = 0;
        const spreads = albumContainer.querySelectorAll('.album-spread');
        const dotsContainer = albumContainer.querySelector('.album-dots');
        let totalPages = spreads.length;

        // --- Hàm để hiển thị trang ---
        function showPage(index) {
            spreads.forEach((spread, i) => {
                spread.classList.remove('active');
                if (i === index) {
                    spread.classList.add('active');
                }
            });
            // Cập nhật dot active
            const dots = dotsContainer.querySelectorAll('.album-dot');
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
            currentIndex = index;
        }

        // --- Tạo các chấm tròn điều hướng ---
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.classList.add('album-dot');
            dot.setAttribute('aria-label', `Go to page ${i + 1}`);
            dot.addEventListener('click', () => {
                showPage(i);
            });
            dotsContainer.appendChild(dot);
        }

        // --- Xử lý sự kiện click cho nút Next/Prev ---
        const nextBtn = albumContainer.querySelector('.album-nav.next');
        const prevBtn = albumContainer.querySelector('.album-nav.prev');

        if (nextBtn && prevBtn) {
            nextBtn.addEventListener('click', () => {
                let nextIndex = (currentIndex + 1) % totalPages;
                showPage(nextIndex);
            });

            prevBtn.addEventListener('click', () => {
                let prevIndex = (currentIndex - 1 + totalPages) % totalPages;
                showPage(prevIndex);
            });
        }

        // Hiển thị trang đầu tiên
        showPage(0);

        // --- Logic Responsive cho Mobile ---
        // Trên mobile, mỗi "trang" là một ảnh, không phải một "spread"
        // Code hiện tại đã xử lý việc này bằng CSS (ẩn ảnh thứ 2)
        // và logic JS vẫn hoạt động đúng cho việc lật từng ảnh một.
    }
});