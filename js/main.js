// Main JavaScript for Pantulan Persona - FULL VERSION WITH KEYBOARD SUPPORT
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', function() {
            // Implement mobile menu toggle if needed
            console.log('Mobile menu clicked');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add fade-in animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements with the 'fade-in' class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Question page functionality
    if (window.location.pathname.includes('question.html')) {
        initializeQuestionPage();
    }

    // Result page functionality
    if (window.location.pathname.includes('result.html')) {
        initializeResultPage();
    }
});

// Global variables for keyboard navigation
let currentQuestion = 0;
let userAnswers = [];
let questions = [];

// Keyboard event handler
function handleKeyboardInput(event) {
    // Only process if we're on question page
    if (!window.location.pathname.includes('question.html')) return;

    const key = event.key;
    
    // Number keys 1-4 for answer selection
    if (key >= '1' && key <= '4') {
        const optionIndex = parseInt(key) - 1;
        selectOption(optionIndex);
    }
    
    // Enter key for next question
    if (key === 'Enter') {
        event.preventDefault();
        const nextButton = document.getElementById('next-button');
        if (!nextButton.disabled) {
            nextButton.click();
        }
    }
    
    // Backspace key for previous question
    if (key === 'Backspace') {
        event.preventDefault();
        const prevButton = document.getElementById('prev-button');
        if (!prevButton.disabled) {
            prevButton.click();
        }
    }
}

// Add keyboard event listener
document.addEventListener('keydown', handleKeyboardInput);

// Function to select option by index
function selectOption(optionIndex) {
    const options = document.querySelectorAll('.option');
    if (optionIndex >= 0 && optionIndex < options.length) {
        options[optionIndex].click();
        
        // Add visual feedback for keyboard selection
        options[optionIndex].classList.add('keyboard-selected');
        setTimeout(() => {
            options[optionIndex].classList.remove('keyboard-selected');
        }, 200);
    }
}

// Question page specific functionality - WITH KEYBOARD SUPPORT
function initializeQuestionPage() {
    questions = [
        // E/I Questions (15 questions)
        {
            id: 1,
            text: "Saya adalah orang yang suka dengan keramaian",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "E", score: 2 },
                { text: "Setuju", value: "E", score: 1 },
                { text: "Tidak Setuju", value: "I", score: 1 },
                { text: "Sangat Tidak Setuju", value: "I", score: 2 }
            ]
        },
        {
            id: 2,
            text: "Saya merasa berenergi setelah menghabiskan waktu dengan banyak orang",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "E", score: 2 },
                { text: "Setuju", value: "E", score: 1 },
                { text: "Tidak Setuju", value: "I", score: 1 },
                { text: "Sangat Tidak Setuju", value: "I", score: 2 }
            ]
        },
        {
            id: 3,
            text: "Saya lebih memilih percakapan dalam kelompok kecil daripada pesta besar",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "I", score: 2 },
                { text: "Setuju", value: "I", score: 1 },
                { text: "Tidak Setuju", value: "E", score: 1 },
                { text: "Sangat Tidak Setuju", value: "E", score: 2 }
            ]
        },
        {
            id: 4,
            text: "Saya mudah memulai percakapan dengan orang asing",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "E", score: 2 },
                { text: "Setuju", value: "E", score: 1 },
                { text: "Tidak Setuju", value: "I", score: 1 },
                { text: "Sangat Tidak Setuju", value: "I", score: 2 }
            ]
        },
        {
            id: 5,
            text: "Saya perlu waktu sendiri untuk mengisi ulang energi setelah sosialisasi",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "I", score: 2 },
                { text: "Setuju", value: "I", score: 1 },
                { text: "Tidak Setuju", value: "E", score: 1 },
                { text: "Sangat Tidak Setuju", value: "E", score: 2 }
            ]
        },
        {
            id: 6,
            text: "Saya senang menjadi pusat perhatian",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "E", score: 2 },
                { text: "Setuju", value: "E", score: 1 },
                { text: "Tidak Setuju", value: "I", score: 1 },
                { text: "Sangat Tidak Setuju", value: "I", score: 2 }
            ]
        },
        {
            id: 7,
            text: "Saya lebih suka bekerja sendiri daripada dalam tim",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "I", score: 2 },
                { text: "Setuju", value: "I", score: 1 },
                { text: "Tidak Setuju", value: "E", score: 1 },
                { text: "Sangat Tidak Setuju", value: "E", score: 2 }
            ]
        },
        {
            id: 8,
            text: "Saya sering mengambil inisiatif dalam situasi sosial",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "E", score: 2 },
                { text: "Setuju", value: "E", score: 1 },
                { text: "Tidak Setuju", value: "I", score: 1 },
                { text: "Sangat Tidak Setuju", value: "I", score: 2 }
            ]
        },
        {
            id: 9,
            text: "Saya merasa nyaman menghadiri acara dimana saya tidak mengenal siapa pun",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "E", score: 2 },
                { text: "Setuju", value: "E", score: 1 },
                { text: "Tidak Setuju", value: "I", score: 1 },
                { text: "Sangat Tidak Setuju", value: "I", score: 2 }
            ]
        },
        {
            id: 10,
            text: "Saya lebih memilih komunikasi tertulis daripada percakapan langsung",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "I", score: 2 },
                { text: "Setuju", value: "I", score: 1 },
                { text: "Tidak Setuju", value: "E", score: 1 },
                { text: "Sangat Tidak Setuju", value: "E", score: 2 }
            ]
        },
        {
            id: 11,
            text: "Saya senang bertemu orang baru",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "E", score: 2 },
                { text: "Setuju", value: "E", score: 1 },
                { text: "Tidak Setuju", value: "I", score: 1 },
                { text: "Sangat Tidak Setuju", value: "I", score: 2 }
            ]
        },
        {
            id: 12,
            text: "Saya butuh waktu untuk memproses pikiran sebelum berbagi dengan orang lain",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "I", score: 2 },
                { text: "Setuju", value: "I", score: 1 },
                { text: "Tidak Setuju", value: "E", score: 1 },
                { text: "Sangat Tidak Setuju", value: "E", score: 2 }
            ]
        },
        {
            id: 13,
            text: "Saya mudah bosan ketika sendirian terlalu lama",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "E", score: 2 },
                { text: "Setuju", value: "E", score: 1 },
                { text: "Tidak Setuju", value: "I", score: 1 },
                { text: "Sangat Tidak Setuju", value: "I", score: 2 }
            ]
        },
        {
            id: 14,
            text: "Saya lebih suka menghabiskan akhir pekan dengan teman-teman daripada sendiri",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "E", score: 2 },
                { text: "Setuju", value: "E", score: 1 },
                { text: "Tidak Setuju", value: "I", score: 1 },
                { text: "Sangat Tidak Setuju", value: "I", score: 2 }
            ]
        },
        {
            id: 15,
            text: "Saya merasa lebih kreatif ketika bekerja sendiri",
            dimension: "EI",
            options: [
                { text: "Sangat Setuju", value: "I", score: 2 },
                { text: "Setuju", value: "I", score: 1 },
                { text: "Tidak Setuju", value: "E", score: 1 },
                { text: "Sangat Tidak Setuju", value: "E", score: 2 }
            ]
        },

        // S/N Questions (15 questions)
        {
            id: 16,
            text: "Saya lebih fokus pada fakta dan detail daripada kemungkinan di masa depan",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "S", score: 2 },
                { text: "Setuju", value: "S", score: 1 },
                { text: "Tidak Setuju", value: "N", score: 1 },
                { text: "Sangat Tidak Setuju", value: "N", score: 2 }
            ]
        },
        {
            id: 17,
            text: "Saya sering memikirkan masa depan dan berbagai kemungkinannya",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "N", score: 2 },
                { text: "Setuju", value: "N", score: 1 },
                { text: "Tidak Setuju", value: "S", score: 1 },
                { text: "Sangat Tidak Setuju", value: "S", score: 2 }
            ]
        },
        {
            id: 18,
            text: "Saya lebih memilih ide-ide praktis daripada teori yang kompleks",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "S", score: 2 },
                { text: "Setuju", value: "S", score: 1 },
                { text: "Tidak Setuju", value: "N", score: 1 },
                { text: "Sangat Tidak Setuju", value: "N", score: 2 }
            ]
        },
        {
            id: 19,
            text: "Saya mudah melihat pola dan hubungan antara hal-hal yang tampaknya tidak terkait",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "N", score: 2 },
                { text: "Setuju", value: "N", score: 1 },
                { text: "Tidak Setuju", value: "S", score: 1 },
                { text: "Sangat Tidak Setuju", value: "S", score: 2 }
            ]
        },
        {
            id: 20,
            text: "Saya lebih percaya pada pengalaman daripada intuisi",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "S", score: 2 },
                { text: "Setuju", value: "S", score: 1 },
                { text: "Tidak Setuju", value: "N", score: 1 },
                { text: "Sangat Tidak Setuju", value: "N", score: 2 }
            ]
        },
        {
            id: 21,
            text: "Saya senang membayangkan berbagai skenario 'bagaimana jika'",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "N", score: 2 },
                { text: "Setuju", value: "N", score: 1 },
                { text: "Tidak Setuju", value: "S", score: 1 },
                { text: "Sangat Tidak Setuju", value: "S", score: 2 }
            ]
        },
        {
            id: 22,
            text: "Saya lebih memilih instruksi yang jelas dan langkah demi langkah",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "S", score: 2 },
                { text: "Setuju", value: "S", score: 1 },
                { text: "Tidak Setuju", value: "N", score: 1 },
                { text: "Sangat Tidak Setuju", value: "N", score: 2 }
            ]
        },
        {
            id: 23,
            text: "Saya sering menemukan makna tersembunyi dalam hal-hal sederhana",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "N", score: 2 },
                { text: "Setuju", value: "N", score: 1 },
                { text: "Tidak Setuju", value: "S", score: 1 },
                { text: "Sangat Tidak Setuju", value: "S", score: 2 }
            ]
        },
        {
            id: 24,
            text: "Saya lebih tertarik pada realitas saat ini daripada kemungkinan di masa depan",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "S", score: 2 },
                { text: "Setuju", value: "S", score: 1 },
                { text: "Tidak Setuju", value: "N", score: 1 },
                { text: "Sangat Tidak Setuju", value: "N", score: 2 }
            ]
        },
        {
            id: 25,
            text: "Saya senang membahas ide-ide abstrak dan teoretis",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "N", score: 2 },
                { text: "Setuju", value: "N", score: 1 },
                { text: "Tidak Setuju", value: "S", score: 1 },
                { text: "Sangat Tidak Setuju", value: "S", score: 2 }
            ]
        },
        {
            id: 26,
            text: "Saya memperhatikan detail kecil yang sering dilewatkan orang lain",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "S", score: 2 },
                { text: "Setuju", value: "S", score: 1 },
                { text: "Tidak Setuju", value: "N", score: 1 },
                { text: "Sangat Tidak Setuju", value: "N", score: 2 }
            ]
        },
        {
            id: 27,
            text: "Saya mudah melihat gambaran besar daripada terjebak dalam detail",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "N", score: 2 },
                { text: "Setuju", value: "N", score: 1 },
                { text: "Tidak Setuju", value: "S", score: 1 },
                { text: "Sangat Tidak Setuju", value: "S", score: 2 }
            ]
        },
        {
            id: 28,
            text: "Saya lebih memilih hal-hal yang konkret dan dapat diamati",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "S", score: 2 },
                { text: "Setuju", value: "S", score: 1 },
                { text: "Tidak Setuju", value: "N", score: 1 },
                { text: "Sangat Tidak Setuju", value: "N", score: 2 }
            ]
        },
        {
            id: 29,
            text: "Saya sering memiliki wawasan tentang masa depan",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "N", score: 2 },
                { text: "Setuju", value: "N", score: 1 },
                { text: "Tidak Setuju", value: "S", score: 1 },
                { text: "Sangat Tidak Setuju", value: "S", score: 2 }
            ]
        },
        {
            id: 30,
            text: "Saya lebih percaya pada data dan fakta daripada perasaan",
            dimension: "SN",
            options: [
                { text: "Sangat Setuju", value: "S", score: 2 },
                { text: "Setuju", value: "S", score: 1 },
                { text: "Tidak Setuju", value: "N", score: 1 },
                { text: "Sangat Tidak Setuju", value: "N", score: 2 }
            ]
        },

        // T/F Questions (15 questions)
        {
            id: 31,
            text: "Saya membuat keputusan berdasarkan logika daripada perasaan",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "T", score: 2 },
                { text: "Setuju", value: "T", score: 1 },
                { text: "Tidak Setuju", value: "F", score: 1 },
                { text: "Sangat Tidak Setuju", value: "F", score: 2 }
            ]
        },
        {
            id: 32,
            text: "Saya mempertimbangkan perasaan orang lain ketika membuat keputusan",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "F", score: 2 },
                { text: "Setuju", value: "F", score: 1 },
                { text: "Tidak Setuju", value: "T", score: 1 },
                { text: "Sangat Tidak Setuju", value: "T", score: 2 }
            ]
        },
        {
            id: 33,
            text: "Kebenaran lebih penting daripada menjaga perasaan orang",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "T", score: 2 },
                { text: "Setuju", value: "T", score: 1 },
                { text: "Tidak Setuju", value: "F", score: 1 },
                { text: "Sangat Tidak Setuju", value: "F", score: 2 }
            ]
        },
        {
            id: 34,
            text: "Saya mudah merasakan emosi orang lain",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "F", score: 2 },
                { text: "Setuju", value: "F", score: 1 },
                { text: "Tidak Setuju", value: "T", score: 1 },
                { text: "Sangat Tidak Setuju", value: "T", score: 2 }
            ]
        },
        {
            id: 35,
            text: "Saya lebih tertarik pada kebenaran objektif daripada harmoni sosial",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "T", score: 2 },
                { text: "Setuju", value: "T", score: 1 },
                { text: "Tidak Setuju", value: "F", score: 1 },
                { text: "Sangat Tidak Setuju", value: "F", score: 2 }
            ]
        },
        {
            id: 36,
            text: "Saya menghindari konflik dan berusaha menjaga kedamaian",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "F", score: 2 },
                { text: "Setuju", value: "F", score: 1 },
                { text: "Tidak Setuju", value: "T", score: 1 },
                { text: "Sangat Tidak Setuju", value: "T", score: 2 }
            ]
        },
        {
            id: 37,
            text: "Saya lebih menghargai keadilan daripada belas kasihan",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "T", score: 2 },
                { text: "Setuju", value: "T", score: 1 },
                { text: "Tidak Setuju", value: "F", score: 1 },
                { text: "Sangat Tidak Setuju", value: "F", score: 2 }
            ]
        },
        {
            id: 38,
            text: "Saya sering membuat keputusan berdasarkan nilai-nilai pribadi",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "F", score: 2 },
                { text: "Setuju", value: "F", score: 1 },
                { text: "Tidak Setuju", value: "T", score: 1 },
                { text: "Sangat Tidak Setuju", value: "T", score: 2 }
            ]
        },
        {
            id: 39,
            text: "Saya dapat tetap objektif bahkan dalam situasi emosional",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "T", score: 2 },
                { text: "Setuju", value: "T", score: 1 },
                { text: "Tidak Setuju", value: "F", score: 1 },
                { text: "Sangat Tidak Setuju", value: "F", score: 2 }
            ]
        },
        {
            id: 40,
            text: "Saya mudah tersentuh oleh cerita sedih atau film yang mengharukan",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "F", score: 2 },
                { text: "Setuju", value: "F", score: 1 },
                { text: "Tidak Setuju", value: "T", score: 1 },
                { text: "Sangat Tidak Setuju", value: "T", score: 2 }
            ]
        },
        {
            id: 41,
            text: "Saya lebih memilih kritik yang jujur daripada pujian yang tidak tulus",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "T", score: 2 },
                { text: "Setuju", value: "T", score: 1 },
                { text: "Tidak Setuju", value: "F", score: 1 },
                { text: "Sangat Tidak Setuju", value: "F", score: 2 }
            ]
        },
        {
            id: 42,
            text: "Saya sering mempertimbangkan bagaimana keputusan saya akan mempengaruhi orang lain",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "F", score: 2 },
                { text: "Setuju", value: "F", score: 1 },
                { text: "Tidak Setuju", value: "T", score: 1 },
                { text: "Sangat Tidak Setuju", value: "T", score: 2 }
            ]
        },
        {
            id: 43,
            text: "Saya percaya bahwa kebenaran harus diutamakan dalam semua situasi",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "T", score: 2 },
                { text: "Setuju", value: "T", score: 1 },
                { text: "Tidak Setuju", value: "F", score: 1 },
                { text: "Sangat Tidak Setuju", value: "F", score: 2 }
            ]
        },
        {
            id: 44,
            text: "Saya mudah berempati dengan orang yang sedang mengalami kesulitan",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "F", score: 2 },
                { text: "Setuju", value: "F", score: 1 },
                { text: "Tidak Setuju", value: "T", score: 1 },
                { text: "Sangat Tidak Setuju", value: "T", score: 2 }
            ]
        },
        {
            id: 45,
            text: "Saya lebih menghargai efisiensi daripada perasaan orang",
            dimension: "TF",
            options: [
                { text: "Sangat Setuju", value: "T", score: 2 },
                { text: "Setuju", value: "T", score: 1 },
                { text: "Tidak Setuju", value: "F", score: 1 },
                { text: "Sangat Tidak Setuju", value: "F", score: 2 }
            ]
        },

        // J/P Questions (15 questions)
        {
            id: 46,
            text: "Saya lebih suka membuat rencana daripada bersikap spontan",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "J", score: 2 },
                { text: "Setuju", value: "J", score: 1 },
                { text: "Tidak Setuju", value: "P", score: 1 },
                { text: "Sangat Tidak Setuju", value: "P", score: 2 }
            ]
        },
        {
            id: 47,
            text: "Saya mudah beradaptasi dengan perubahan rencana",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "P", score: 2 },
                { text: "Setuju", value: "P", score: 1 },
                { text: "Tidak Setuju", value: "J", score: 1 },
                { text: "Sangat Tidak Setuju", value: "J", score: 2 }
            ]
        },
        {
            id: 48,
            text: "Saya merasa tidak nyaman ketika tidak memiliki jadwal yang jelas",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "J", score: 2 },
                { text: "Setuju", value: "J", score: 1 },
                { text: "Tidak Setuju", value: "P", score: 1 },
                { text: "Sangat Tidak Setuju", value: "P", score: 2 }
            ]
        },
        {
            id: 49,
            text: "Saya sering menunda-nunda tugas sampai deadline mendekat",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "P", score: 2 },
                { text: "Setuju", value: "P", score: 1 },
                { text: "Tidak Setuju", value: "J", score: 1 },
                { text: "Sangat Tidak Setuju", value: "J", score: 2 }
            ]
        },
        {
            id: 50,
            text: "Saya menyukai kepastian dan struktur",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "J", score: 2 },
                { text: "Setuju", value: "J", score: 1 },
                { text: "Tidak Setuju", value: "P", score: 1 },
                { text: "Sangat Tidak Setuju", value: "P", score: 2 }
            ]
        },
        {
            id: 51,
            text: "Saya lebih memilih untuk menjaga opsi tetap terbuka",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "P", score: 2 },
                { text: "Setuju", value: "P", score: 1 },
                { text: "Tidak Setuju", value: "J", score: 1 },
                { text: "Sangat Tidak Setuju", value: "J", score: 2 }
            ]
        },
        {
            id: 52,
            text: "Saya merasa puas ketika dapat mencentang item dari daftar tugas",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "J", score: 2 },
                { text: "Setuju", value: "J", score: 1 },
                { text: "Tidak Setuju", value: "P", score: 1 },
                { text: "Sangat Tidak Setuju", value: "P", score: 2 }
            ]
        },
        {
            id: 53,
            text: "Saya senang mengeksplorasi peluang baru tanpa komitmen awal",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "P", score: 2 },
                { text: "Setuju", value: "P", score: 1 },
                { text: "Tidak Setuju", value: "J", score: 1 },
                { text: "Sangat Tidak Setuju", value: "J", score: 2 }
            ]
        },
        {
            id: 54,
            text: "Saya lebih memilih membuat keputusan cepat daripada menunda",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "J", score: 2 },
                { text: "Setuju", value: "J", score: 1 },
                { text: "Tidak Setuju", value: "P", score: 1 },
                { text: "Sangat Tidak Setuju", value: "P", score: 2 }
            ]
        },
        {
            id: 55,
            text: "Saya merasa terbebani oleh terlalu banyak aturan dan jadwal",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "P", score: 2 },
                { text: "Setuju", value: "P", score: 1 },
                { text: "Tidak Setuju", value: "J", score: 1 },
                { text: "Sangat Tidak Setuju", value: "J", score: 2 }
            ]
        },
        {
            id: 56,
            text: "Saya biasanya menyelesaikan pekerjaan jauh sebelum deadline",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "J", score: 2 },
                { text: "Setuju", value: "J", score: 1 },
                { text: "Tidak Setuju", value: "P", score: 1 },
                { text: "Sangat Tidak Setuju", value: "P", score: 2 }
            ]
        },
        {
            id: 57,
            text: "Saya senang mengikuti arus dan melihat apa yang terjadi",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "P", score: 2 },
                { text: "Setuju", value: "P", score: 1 },
                { text: "Tidak Setuju", value: "J", score: 1 },
                { text: "Sangat Tidak Setuju", value: "J", score: 2 }
            ]
        },
        {
            id: 58,
            text: "Saya merasa perlu menyelesaikan satu proyek sebelum memulai yang lain",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "J", score: 2 },
                { text: "Setuju", value: "J", score: 1 },
                { text: "Tidak Setuju", value: "P", score: 1 },
                { text: "Sangat Tidak Setuju", value: "P", score: 2 }
            ]
        },
        {
            id: 59,
            text: "Saya mudah terganggu oleh ide-ide dan proyek baru",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "P", score: 2 },
                { text: "Setuju", value: "P", score: 1 },
                { text: "Tidak Setuju", value: "J", score: 1 },
                { text: "Sangat Tidak Setuju", value: "J", score: 2 }
            ]
        },
        {
            id: 60,
            text: "Saya merasa lebih produktif ketika memiliki rutinitas yang teratur",
            dimension: "JP",
            options: [
                { text: "Sangat Setuju", value: "J", score: 2 },
                { text: "Setuju", value: "J", score: 1 },
                { text: "Tidak Setuju", value: "P", score: 1 },
                { text: "Sangat Tidak Setuju", value: "P", score: 2 }
            ]
        }
    ];

    currentQuestion = 0;
    userAnswers = Array(questions.length).fill(null);
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const questionContainer = document.getElementById('question-container');
    const nextButton = document.getElementById('next-button');
    const prevButton = document.getElementById('prev-button');

    // Initialize the first question
    renderQuestion(currentQuestion);

    function renderQuestion(index) {
        if (index < 0 || index >= questions.length) return;

        const question = questions[index];
        questionContainer.innerHTML = `
            <div class="bg-white rounded-lg shadow-lg p-6 question-card fade-in">
                <div class="mb-4 flex justify-between items-center">
                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                        Pertanyaan ${question.id}/60
                    </span>
                    <span class="text-xs text-gray-500 hidden md:block">Gunakan tombol 1-4 pada keyboard</span>
                </div>
                <h3 class="text-xl font-semibold text-gray-800 mb-6">${question.text}</h3>
                <div class="space-y-3">
                    ${question.options.map((option, i) => `
                        <div class="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-indigo-50 cursor-pointer transition-all duration-200 option ${userAnswers[index] === option.value ? 'bg-indigo-50 border-indigo-300' : ''}" data-value="${option.value}" data-score="${option.score}" data-index="${i}">
                            <div class="flex items-center w-full">
                                <div class="key-indicator w-6 h-6 flex items-center justify-center bg-gray-100 border border-gray-300 rounded text-xs font-mono text-gray-600 mr-3">
                                    ${i + 1}
                                </div>
                                <input type="radio" id="option-${index}-${i}" name="question-${question.id}" value="${option.value}" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300" ${userAnswers[index] === option.value ? 'checked' : ''}>
                                <label for="option-${index}-${i}" class="ml-3 block text-sm font-medium text-gray-700 cursor-pointer flex-1">${option.text}</label>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        // Update progress
        const progress = ((index + 1) / questions.length) * 100;
        progressBar.style.width = `${progress}%`;
        progressText.textContent = `${index + 1}/60`;

        // Update navigation buttons
        prevButton.disabled = index === 0;
        nextButton.textContent = index === questions.length - 1 ? 'Lihat Hasil' : 'Lanjut';
        nextButton.disabled = userAnswers[index] === null;

        // Add event listeners to options
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                const score = parseInt(this.getAttribute('data-score'));
                const optionIndex = parseInt(this.getAttribute('data-index'));
                
                // Remove selected style from all options
                document.querySelectorAll('.option').forEach(opt => {
                    opt.classList.remove('bg-indigo-50', 'border-indigo-300', 'keyboard-selected');
                });
                
                // Add selected style to clicked option
                this.classList.add('bg-indigo-50', 'border-indigo-300');
                
                // Check the radio button
                const radio = this.querySelector('input[type="radio"]');
                radio.checked = true;
                
                // Store answer
                userAnswers[index] = value;
                
                // Enable next button
                nextButton.disabled = false;
                
                // Show keyboard shortcut feedback
                showKeyboardFeedback(optionIndex);
            });
        });

        // Focus management for accessibility
        if (userAnswers[index]) {
            const selectedOption = document.querySelector(`.option[data-value="${userAnswers[index]}"]`);
            if (selectedOption) {
                selectedOption.classList.add('bg-indigo-50', 'border-indigo-300');
            }
        }
    }

    // Show keyboard selection feedback
    function showKeyboardFeedback(optionIndex) {
        const keyIndicators = document.querySelectorAll('.key-indicator');
        keyIndicators.forEach((indicator, index) => {
            if (index === optionIndex) {
                indicator.classList.add('bg-indigo-500', 'text-white', 'border-indigo-600');
                setTimeout(() => {
                    indicator.classList.remove('bg-indigo-500', 'text-white', 'border-indigo-600');
                    indicator.classList.add('bg-gray-100', 'text-gray-600', 'border-gray-300');
                }, 500);
            }
        });
    }

    // Navigation event listeners
    nextButton.addEventListener('click', function() {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            renderQuestion(currentQuestion);
        } else {
            // Calculate result and redirect
            calculateResult();
        }
    });

    prevButton.addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            renderQuestion(currentQuestion);
        }
    });

    function calculateResult() {
        // Calculate scores for each dimension
        const scores = {
            E: 0, I: 0,
            S: 0, N: 0,
            T: 0, F: 0,
            J: 0, P: 0
        };

        questions.forEach((question, index) => {
            const answer = userAnswers[index];
            if (answer) {
                const option = question.options.find(opt => opt.value === answer);
                if (option) {
                    scores[answer] += option.score;
                }
            }
        });

        // Determine personality type
        const type = 
            (scores.E > scores.I ? 'E' : 'I') +
            (scores.S > scores.N ? 'S' : 'N') +
            (scores.T > scores.F ? 'T' : 'F') +
            (scores.J > scores.P ? 'J' : 'P');

        // Redirect to result page with the type
        window.location.href = `result.html?type=${type}`;
    }
}

// Result page specific functionality - FULL VERSION
function initializeResultPage() {
    // Get personality type from URL
    const urlParams = new URLSearchParams(window.location.search);
    const personalityType = urlParams.get('type') || 'INTJ';
    
    // Personality data with updated Spotify playlists
    const personalityData = {
        INTJ: {
            name: "The Architect",
            fullName: "Introverted, Intuitive, Thinking, Judging",
            description: "Visioner strategis dengan rencana untuk segala sesuatu. INTJ adalah pemikir analitis dan deterministik yang menikmati merancang sistem dan proses yang kompleks. Mereka mandiri, percaya diri, dan memiliki kemampuan luar biasa untuk mengubah teori menjadi rencana aksi yang solid.",
            traits: ["Visioner", "Strategis", "Analitis", "Deterministik", "Mandiri"],
            playlist: "https://open.spotify.com/playlist/6XLe6xcYSiIJhH30yL4bCD?si=a54b84e55b574f7c",
            compatibility: ["ENFP", "ENTP"],
            colors: ["Ungu", "Biru Tua"],
            environment: "Lingkungan yang tenang dan terstruktur"
        },
        INTP: {
            name: "The Thinker",
            fullName: "Introverted, Intuitive, Thinking, Perceiving",
            description: "Pemikir inovatif yang terobsesi dengan analisis teoretis. INTP adalah pemecah masalah logis yang menikmati tantangan intelektual. Mereka sangat kreatif dan cerdas, selalu mencari pola dan penjelasan di balik segala sesuatu.",
            traits: ["Inovatif", "Logis", "Kurios", "Abstrak", "Kreatif"],
            playlist: "https://open.spotify.com/playlist/4Oh3b8bvVKOrkj079iXbM6?si=3d9bfc93511842d1",
            compatibility: ["ENTJ", "ENFJ"],
            colors: ["Biru", "Hijau"],
            environment: "Ruang kerja pribadi yang tenang"
        },
        ENTJ: {
            name: "The Commander",
            fullName: "Extraverted, Intuitive, Thinking, Judging",
            description: "Pemimpin tegas yang visioner dan selalu siap mengorganisir. ENTJ adalah pemimpin alami yang efisien dan berorientasi pada hasil. Mereka karismatik, percaya diri, dan memiliki kemampuan luar biasa dalam mengorganisir tim dan proyek.",
            traits: ["Tegas", "Visioner", "Organisator", "Efisien", "Karismatik"],
            playlist: "https://open.spotify.com/playlist/4tRHeotm3SmJsalwFQmqbC?si=75871952c918407f",
            compatibility: ["INTP", "INFP"],
            colors: ["Merah", "Emas"],
            environment: "Lingkungan dinamis dengan tanggung jawab"
        },
        ENTP: {
            name: "The Debater",
            fullName: "Extraverted, Intuitive, Thinking, Perceiving",
            description: "Pembicara yang cerdas dan penuh semangat. ENTP adalah inovator yang menikmati debat intelektual dan tantangan mental. Mereka cepat, pandai, dan pandai memanipulasi orang dan situasi untuk tujuan mereka.",
            traits: ["Cerdas", "Inovatif", "Energik", "Argumentatif", "Pandai"],
            playlist: "https://open.spotify.com/playlist/5lmyYiNY4WpkWizIQfT7OW?si=66b921131d4e41e7",
            compatibility: ["INFJ", "INTJ"],
            colors: ["Oranye", "Ungu"],
            environment: "Lingkungan yang menantang dan berubah-ubah"
        },
        INFJ: {
            name: "The Advocate",
            fullName: "Introverted, Intuitive, Feeling, Judging",
            description: "Pendukung yang idealis dan berprinsip. INFJ adalah visioner yang penuh kasih dan inspiratif dengan wawasan mendalam tentang orang lain. Mereka kreatif, penuh semangat, dan memiliki rasa tujuan yang kuat.",
            traits: ["Idealistis", "Berprinsip", "Inspiratif", "Intuitif", "Kreatif"],
            playlist: "https://open.spotify.com/playlist/0S7U6idUEvlFDjbUHAK8HQ?si=3e377ae8aa2e4b2c",
            compatibility: ["ENFP", "ENTP"],
            colors: ["Ungu", "Hijau"],
            environment: "Lingkungan yang bermakna dan harmonis"
        },
        INFP: {
            name: "The Mediator",
            fullName: "Introverted, Intuitive, Feeling, Perceiving",
            description: "Pendamai yang penuh kasih dan kreatif. INFP adalah orang yang berempati dan penuh arti yang didorong oleh nilai-nilai mereka. Mereka pemimpi yang idealis, selalu mencari yang benar dan bermakna dalam hidup.",
            traits: ["Empatik", "Kreatif", "Idealistis", "Fleksibel", "Artistik"],
            playlist: "https://open.spotify.com/playlist/6avRBWsApQehZSvV1Xuy4m?si=9bc4483be1694f1b",
            compatibility: ["ENFJ", "ENTJ"],
            colors: ["Hijau", "Biru"],
            environment: "Lingkungan yang mendukung ekspresi diri"
        },
        ENFJ: {
            name: "The Protagonist",
            fullName: "Extraverted, Intuitive, Feeling, Judging",
            description: "Pemimpin yang karismatik dan inspiratif. ENFJ adalah pemimpin alami yang penuh gairah dan pandai menghubungkan orang. Mereka karismatik, persuasif, dan memiliki kemampuan alami untuk memotivasi orang lain.",
            traits: ["Karismatik", "Inspiratif", "Empatik", "Organisator", "Persuasif"],
            playlist: "https://open.spotify.com/playlist/2yyz0PaJ5o0nq8nizAwNR6?si=4f1b21e802b24803",
            compatibility: ["INFP", "ISFP"],
            colors: ["Emas", "Merah"],
            environment: "Lingkungan sosial yang harmonis"
        },
        ENFP: {
            name: "The Campaigner",
            fullName: "Extraverted, Intuitive, Feeling, Perceiving",
            description: "Pembuat kampanye yang antusias, kreatif, dan sosial. ENFP adalah orang yang bersemangat, enerjik, dan pandai menghubungkan orang. Mereka spontan, fleksibel, dan selalu siap untuk petualangan baru.",
            traits: ["Antusias", "Kreatif", "Sosial", "Optimistis", "Spontan"],
            playlist: "https://open.spotify.com/playlist/3vV3zUk4JQwfPJvrzoYeqS?si=2c0cc93264244fed",
            compatibility: ["INTJ", "INFJ"],
            colors: ["Oranye", "Merah Muda"],
            environment: "Lingkungan yang dinamis dan sosial"
        },
        ISTJ: {
            name: "The Logistician",
            fullName: "Introverted, Sensing, Thinking, Judging",
            description: "Ahli logistik yang praktis dan berfakta. ISTJ adalah individu yang dapat diandalkan dan bertanggung jawab yang menghargai tradisi. Mereka terorganisir, praktis, dan selalu menyelesaikan apa yang mereka mulai.",
            traits: ["Praktis", "Dapat Diandalkan", "Bertanggung Jawab", "Tradisional", "Terorganisir"],
            playlist: "https://open.spotify.com/playlist/3c0U9xTSMJrX4A5omWt0gK?si=ff401797c833459c",
            compatibility: ["ESFP", "ESTP"],
            colors: ["Biru", "Abu-abu"],
            environment: "Lingkungan yang terstruktur dan terorganisir"
        },
        ISFJ: {
            name: "The Defender",
            fullName: "Introverted, Sensing, Feeling, Judging",
            description: "Pembela yang protektif dan penuh kasih. ISFJ adalah orang yang sangat dedikatif dan hangat yang selalu siap melindungi orang yang mereka cintai. Mereka praktis, penuh kasih, dan sangat dapat diandalkan.",
            traits: ["Protektif", "Penuh Kasih", "Dapat Diandalkan", "Tradisional", "Praktis"],
            playlist: "https://open.spotify.com/playlist/3KMb5q5AUYv70a72dfzvwh?si=ec695aae4cf146f1",
            compatibility: ["ESFP", "ESTP"],
            colors: ["Biru Muda", "Merah Muda"],
            environment: "Lingkungan yang mendukung dan stabil"
        },
        ESTJ: {
            name: "The Executive",
            fullName: "Extraverted, Sensing, Thinking, Judging",
            description: "Eksekutif yang tegas dan pengelola yang hebat. ESTJ adalah individu yang terorganisir dan menghargai tradisi aturan. Mereka tegas, praktis, dan memiliki kemampuan alami dalam mengambil keputusan.",
            traits: ["Tegas", "Terorganisir", "Tradisional", "Pemimpin", "Praktis"],
            playlist: "https://open.spotify.com/playlist/7j7LfYqwkyvg0Wyx0FQkfy?si=21ef71e601304b1c",
            compatibility: ["ISFP", "ISTP"],
            colors: ["Biru Navy", "Merah"],
            environment: "Lingkungan yang terstruktur dengan hierarki jelas"
        },
        ESFJ: {
            name: "The Consul",
            fullName: "Extraverted, Sensing, Feeling, Judging",
            description: "Konsul yang peduli, sosial, dan populer. ESFJ adalah orang yang hangat dan penuh kasih yang senang membantu orang lain. Mereka sosial, praktis, dan selalu berusaha menciptakan harmoni.",
            traits: ["Peduli", "Sosial", "Populer", "Tradisional", "Praktis"],
            playlist: "https://open.spotify.com/playlist/4mEJvZ8NpnXzSzrm9qKDev?si=2323afb451384ba5",
            compatibility: ["ISFP", "ISTP"],
            colors: ["Merah Muda", "Kuning"],
            environment: "Lingkungan sosial yang harmonis"
        },
        ISTP: {
            name: "The Virtuoso",
            fullName: "Introverted, Sensing, Thinking, Perceiving",
            description: "Virtuoso yang berani dan praktis. ISTP adalah pemecah masalah yang fleksibel dan spontan yang siap menghadapi tantangan. Mereka mandiri, adaptif, dan memiliki kemampuan teknis yang kuat.",
            traits: ["Berani", "Praktis", "Fleksibel", "Spontan", "Mandiri"],
            playlist: "https://open.spotify.com/playlist/0krQvLDSmus5DLnsPHdWFV?si=ad410a414dac4eef",
            compatibility: ["ESFJ", "ESTJ"],
            colors: ["Perak", "Hitam"],
            environment: "Lingkungan yang memungkinkan eksplorasi praktis"
        },
        ISFP: {
            name: "The Adventurer",
            fullName: "Introverted, Sensing, Feeling, Perceiving",
            description: "Petualang yang fleksibel dan menawan. ISFP adalah seniman yang pemalu dan penuh kasih yang siap menjelajahi dan mengalami hal baru. Mereka artistik, fleksibel, dan menghargai kebebasan.",
            traits: ["Fleksibel", "Menawan", "Artistik", "Pemalu", "Spontan"],
            playlist: "https://open.spotify.com/playlist/7cXDVmkqqvXsZIilj3iHRw?si=9cc3d9b7eca94f0c",
            compatibility: ["ENFJ", "ESTJ"],
            colors: ["Hijau", "Krem"],
            environment: "Lingkungan yang estetik dan personal"
        },
        ESTP: {
            name: "The Entrepreneur",
            fullName: "Extraverted, Sensing, Thinking, Perceiving",
            description: "Pengusaha yang enerjik, pandai, dan perseptif. ESTP adalah orang yang cerdas, enerjik, dan sangat pandai membaca orang. Mereka spontan, berani, dan selalu siap mengambil risiko.",
            traits: ["Enerjik", "Pandai", "Perseptif", "Spontan", "Berani"],
            playlist: "https://open.spotify.com/playlist/02ZbDH1vLYQQxs6LqX9dRQ?si=e278dc3385df4c24",
            compatibility: ["ISFJ", "ISTJ"],
            colors: ["Merah", "Perak"],
            environment: "Lingkungan yang dinamis dan penuh aksi"
        },
        ESFP: {
            name: "The Entertainer",
            fullName: "Extraverted, Sensing, Feeling, Perceiving",
            description: "Penghibur yang spontan, enerjik, dan antusias. ESFP adalah orang yang spontan, aktif, dan senang menjadi pusat perhatian. Mereka sosial, praktis, dan selalu membawa energi positif.",
            traits: ["Spontan", "Enerjik", "Antusias", "Sosial", "Praktis"],
            playlist: "https://open.spotify.com/playlist/4qVOTRkyqZFpqcTqG6yuI8?si=400b439ab8094fe9",
            compatibility: ["ISFJ", "ISTJ"],
            colors: ["Kuning", "Oranye"],
            environment: "Lingkungan sosial yang menyenangkan"
        }
    };

    const data = personalityData[personalityType] || personalityData.INTJ;
    
    // Update page content
    document.getElementById('personality-type').textContent = personalityType;
    document.getElementById('personality-name').textContent = data.name;
    document.getElementById('personality-fullname').textContent = data.fullName;
    document.getElementById('personality-description').textContent = data.description;
    document.getElementById('personality-playlist').href = data.playlist;
    document.getElementById('personality-compatibility').textContent = data.compatibility.join(', ');
    document.getElementById('personality-colors').textContent = data.colors.join(', ');
    document.getElementById('personality-environment').textContent = data.environment;
    
    // Update traits
    const traitsContainer = document.getElementById('personality-traits');
    traitsContainer.innerHTML = data.traits.map(trait => 
        `<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">${trait}</span>`
    ).join('');
    
    // Set personality-specific background color
    const personalityHeader = document.querySelector('.personality-header');
    if (personalityHeader) {
        personalityHeader.classList.add(`personality-${personalityType.toLowerCase()}`);
    }
    
    // Initialize chart
    initializePersonalityChart(personalityType);
    
    // Set up download button
    document.getElementById('download-btn').addEventListener('click', downloadResult);
}

function initializePersonalityChart(personalityType) {
    const ctx = document.getElementById('personality-chart');
    if (!ctx) return;
    
    ctx.getContext('2d');
    
    // Mock data for chart - in a real app, this would come from test results
    const data = {
        INTJ: { I: 75, N: 70, T: 80, J: 85 },
        INTP: { I: 80, N: 75, T: 85, P: 80 },
        ENTJ: { E: 75, N: 70, T: 80, J: 85 },
        ENTP: { E: 80, N: 75, T: 85, P: 80 },
        INFJ: { I: 75, N: 70, F: 80, J: 85 },
        INFP: { I: 80, N: 75, F: 85, P: 80 },
        ENFJ: { E: 75, N: 70, F: 80, J: 85 },
        ENFP: { E: 80, N: 75, F: 85, P: 80 },
        ISTJ: { I: 75, S: 70, T: 80, J: 85 },
        ISFJ: { I: 80, S: 75, F: 85, J: 80 },
        ESTJ: { E: 75, S: 70, T: 80, J: 85 },
        ESFJ: { E: 80, S: 75, F: 85, J: 80 },
        ISTP: { I: 75, S: 70, T: 80, P: 85 },
        ISFP: { I: 80, S: 75, F: 85, P: 80 },
        ESTP: { E: 75, S: 70, T: 80, P: 85 },
        ESFP: { E: 80, S: 75, F: 85, P: 80 }
    };
    
    const chartData = data[personalityType] || data.INTJ;
    
    // Destroy existing chart if it exists
    if (window.personalityChartInstance) {
        window.personalityChartInstance.destroy();
    }
    
    window.personalityChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(chartData).map(key => {
                const labels = {
                    'E': 'Extravert', 'I': 'Introvert',
                    'S': 'Sensing', 'N': 'Intuitive',
                    'T': 'Thinking', 'F': 'Feeling',
                    'J': 'Judging', 'P': 'Perceiving'
                };
                return labels[key] || key;
            }),
            datasets: [{
                data: Object.values(chartData),
                backgroundColor: [
                    'rgba(99, 102, 241, 0.8)',
                    'rgba(139, 92, 246, 0.8)',
                    'rgba(168, 85, 247, 0.8)',
                    'rgba(217, 70, 239, 0.8)'
                ],
                borderColor: [
                    'rgb(99, 102, 241)',
                    'rgb(139, 92, 246)',
                    'rgb(168, 85, 247)',
                    'rgb(217, 70, 239)'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return `${context.label}: ${context.raw}%`;
                        }
                    }
                }
            },
            cutout: '60%'
        }
    });
}

function downloadResult() {
    // In a real implementation, this would generate a PDF of the results
    alert('Fitur download hasil akan segera tersedia!');
    
    // For now, we'll create a simple text version
    const personalityType = document.getElementById('personality-type').textContent;
    const personalityName = document.getElementById('personality-name').textContent;
    const description = document.getElementById('personality-description').textContent;
    
    const content = `
HASIL TES KEPRIBADIAN MBTI - PANTULAN PERSONA

Tipe Kepribadian: ${personalityType} - ${personalityName}

Deskripsi:
${description}

Terima kasih telah mengikuti tes kepribadian MBTI di Pantulan Persona!
    `;
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hasil-mbti-${personalityType}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}