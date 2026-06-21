// ===== AUTH CHECK =====
function checkAuth() {
    return localStorage.getItem('isLoggedIn') === 'true';
}

function requireAuth(callback) {
    if (checkAuth()) {
        callback();
    } else {
        localStorage.setItem('redirectAfterLogin', window.location.href);
        window.location.href = 'auth.html';
    }
}

// ===== MODAL LOGIC =====
function openModal(type) {
    const overlay = document.getElementById('modalOverlay');
    const questionModal = document.getElementById('questionModal');
    const chatModal = document.getElementById('chatModal');

    overlay.classList.add('active');

    if (type === 'question') {
        questionModal.style.display = 'flex';
        chatModal.style.display = 'none';
    } else if (type === 'chat') {
        questionModal.style.display = 'none';
        chatModal.style.display = 'flex';
    }
}

function closeModal() {
    const overlay = document.getElementById('modalOverlay');
    overlay.classList.remove('active');
}

document.addEventListener('click', function(e) {
    const overlay = document.getElementById('modalOverlay');
    if (e.target === overlay) {
        closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ===== CHAT LOGIC =====
let attachedImage = null;

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = function(e) {
            attachedImage = e.target.result;
            document.getElementById('attachmentImage').src = attachedImage;
            document.getElementById('attachmentPreview').style.display = 'flex';
        };
        reader.readAsDataURL(file);
    }
}

function removeAttachment() {
    attachedImage = null;
    document.getElementById('attachmentPreview').style.display = 'none';
    document.getElementById('fileInput').value = '';
}

function sendMessage() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');
    const text = input.value.trim();

    if (!text && !attachedImage) return;

    const userMsg = document.createElement('div');
    userMsg.className = 'chat-message-user';

    if (text) {
        const textSpan = document.createElement('span');
        textSpan.textContent = text;
        userMsg.appendChild(textSpan);
    }

    if (attachedImage) {
        const img = document.createElement('img');
        img.src = attachedImage;
        img.className = 'chat-message-image';
        img.onclick = function() {
            const overlay = document.createElement('div');
            overlay.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.9);display:flex;align-items:center;justify-content:center;z-index:2000;cursor:pointer;';
            const fullImg = document.createElement('img');
            fullImg.src = attachedImage;
            fullImg.style.cssText = 'max-width:90%;max-height:90%;border-radius:12px;border:2px solid #66FCF1;';
            overlay.appendChild(fullImg);
            overlay.onclick = () => overlay.remove();
            document.body.appendChild(overlay);
        };
        userMsg.appendChild(img);
    }

    messages.appendChild(userMsg);

    input.value = '';
    removeAttachment();
    messages.scrollTop = messages.scrollHeight;

    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.className = 'chat-message-bot';
        botMsg.textContent = 'Спасибо за обращение! Наш оператор скоро ответит вам.';
        messages.appendChild(botMsg);
        messages.scrollTop = messages.scrollHeight;
    }, 1000);
}

document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter' && e.target.id === 'chatInput') {
        e.preventDefault();
        sendMessage();
    }
});

// ===== BUY COURSE LOGIC =====
let coursePurchased = false;

function buyCourse() {
    requireAuth(() => {
        if (!coursePurchased) {
            coursePurchased = true;
            const btn = document.getElementById('buyBtn');
            btn.textContent = 'КУРС КУПЛЕН';
            btn.style.backgroundColor = '#66FCF1';
            btn.style.color = '#0B0C10';
            btn.disabled = true;

            const materials = document.querySelectorAll('.material-item.locked');
            materials.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.remove('locked');
                    item.style.opacity = '1';
                    item.style.cursor = 'pointer';

                    item.addEventListener('click', function() {
                        const materialName = item.querySelector('span:first-child').textContent;
                        alert('Открывается: ' + materialName);
                    });
                }, index * 200);
            });

            const courseTitle = window.currentCourseData ? window.currentCourseData.title : 'Python с нуля';
            alert('Поздравляем! Курс "' + courseTitle + '" успешно куплен. Материалы разблокированы.');
        }
    });
}

// ===== REVIEWS LOGIC =====
function addReview() {
    requireAuth(() => {
        const reviewText = prompt('Введите ваш отзыв:');
        if (reviewText && reviewText.trim()) {
            const reviewsGrid = document.querySelector('.reviews-grid');
            if (reviewsGrid) {
                const newReview = document.createElement('div');
                newReview.className = 'review-card';
                newReview.innerHTML =
                    '<div class="review-author">' +
                        '<div class="review-avatar"><i class="fas fa-user"></i></div>' +
                        '<span>Вы</span>' +
                    '</div>' +
                    '<p class="review-text">' + reviewText + '</p>' +
                    '<div class="review-actions">' +
                        '<span>Это было полезно?</span>' +
                        '<button class="review-btn like" onclick="toggleReviewLike(this)"><i class="fas fa-check"></i></button>' +
                        '<button class="review-btn dislike" onclick="toggleReviewDislike(this)"><i class="fas fa-times"></i></button>' +
                    '</div>';
                reviewsGrid.insertBefore(newReview, reviewsGrid.firstChild);
                alert('Спасибо за отзыв!');
            }
        }
    });
}

function toggleReviewLike(btn) {
    requireAuth(() => {
        btn.style.opacity = btn.style.opacity === '1' ? '0.5' : '1';
    });
}

function toggleReviewDislike(btn) {
    requireAuth(() => {
        btn.style.opacity = btn.style.opacity === '1' ? '0.5' : '1';
    });
}

// ===== SEARCH FUNCTIONALITY =====
function handleSearch(e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        const query = this.value.trim();
        if (query) {
            window.location.href = 'filters.html?search=' + encodeURIComponent(query);
        }
    }
}

document.querySelectorAll('.search-bar input').forEach(function(input) {
    input.addEventListener('keypress', handleSearch);
});

function handleSearchOnFilters() {
    const params = new URLSearchParams(window.location.search);
    const searchQuery = params.get('search');

    if (searchQuery) {
        const searchInput = document.querySelector('.search-bar input');
        if (searchInput) {
            searchInput.value = searchQuery;
        }

        const courseCards = document.querySelectorAll('.course-card');
        const query = searchQuery.toLowerCase();

        courseCards.forEach(function(card) {
            const title = card.querySelector('.course-title') ? card.querySelector('.course-title').textContent.toLowerCase() : '';
            const desc = card.querySelector('.course-desc') ? card.querySelector('.course-desc').textContent.toLowerCase() : '';

            if (title.includes(query) || desc.includes(query)) {
                card.style.display = 'flex';
                card.style.animation = 'fadeIn 0.3s ease';
            } else {
                card.style.display = 'none';
            }
        });

        const visibleCards = Array.from(courseCards).filter(function(card) {
            return card.style.display !== 'none';
        });
        const filtersSection = document.querySelector('.filters-section');

        const oldMsg = document.querySelector('.search-results-msg');
        if (oldMsg) oldMsg.remove();

        const msg = document.createElement('div');
        msg.className = 'search-results-msg';
        msg.innerHTML =
            '<div style="padding:20px;margin-bottom:30px;background:rgba(102,252,241,0.1);border-radius:8px;border-left:4px solid #66FCF1;">' +
                '<p style="color:#66FCF1;font-size:18px;font-weight:700;margin:0;">Результаты поиска: "' + searchQuery + '"</p>' +
                '<p style="color:#C5C6C7;font-size:14px;margin:5px 0 0 0;">Найдено курсов: ' + visibleCards.length + '</p>' +
            '</div>';
        filtersSection.insertBefore(msg, filtersSection.querySelector('.courses-grid'));

        if (visibleCards.length === 0) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML =
                '<p style="font-size:24px;margin-bottom:10px;"></p>' +
                '<p>Курсы по запросу "' + searchQuery + '" не найдены</p>' +
                '<p style="font-size:14px;margin-top:10px;">Попробуйте изменить запрос</p>';
            filtersSection.appendChild(noResults);
        }
    }
}

// ===== FILTERS LOGIC =====
function initFilters() {
    const filterTabs = document.querySelectorAll('.filter-tab');
    const categoryFilter = document.getElementById('categoryFilter');
    const dateFilter = document.getElementById('dateFilter');
    const priceFilter = document.getElementById('priceFilter');
    const courseCards = document.querySelectorAll('.course-card');

    if (!filterTabs.length) return;

    filterTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            filterTabs.forEach(function(t) { t.classList.remove('active'); });
            this.classList.add('active');

            const filter = this.dataset.filter;
            if (categoryFilter) categoryFilter.style.display = filter === 'category' ? 'flex' : 'none';
            if (dateFilter) dateFilter.style.display = filter === 'date' ? 'flex' : 'none';
            if (priceFilter) priceFilter.style.display = filter === 'price' ? 'flex' : 'none';
        });
    });

    if (categoryFilter) {
        const checkboxes = categoryFilter.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.addEventListener('change', filterCourses);
        });
    }

    if (dateFilter) {
        const radioButtons = dateFilter.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(function(radio) {
            radio.addEventListener('change', filterCourses);
        });
    }

    if (priceFilter) {
        const radioButtons = priceFilter.querySelectorAll('input[type="radio"]');
        radioButtons.forEach(function(radio) {
            radio.addEventListener('change', filterCourses);
        });
    }

    function filterCourses() {
        const activeCategory = categoryFilter ?
            Array.from(categoryFilter.querySelectorAll('input[type="checkbox"]:checked')).map(function(cb) { return cb.value; }) : [];

        const activeDate = dateFilter ?
            (dateFilter.querySelector('input[type="radio"]:checked') ? dateFilter.querySelector('input[type="radio"]:checked').value : null) : null;

        const activePrice = priceFilter ?
            (priceFilter.querySelector('input[type="radio"]:checked') ? priceFilter.querySelector('input[type="radio"]:checked').value : null) : null;

        let coursesArray = Array.from(courseCards).map(function(card) {
            const price = parseFloat(card.dataset.price || '0');
            return {
                element: card,
                price: price,
                category: card.dataset.category || 'python'
            };
        });

        if (activeCategory.length > 0) {
            coursesArray = coursesArray.filter(function(course) {
                return activeCategory.includes(course.category);
            });
        }

        if (activePrice === 'low') {
            coursesArray.sort(function(a, b) { return a.price - b.price; });
        } else if (activePrice === 'high') {
            coursesArray.sort(function(a, b) { return b.price - a.price; });
        } else if (activePrice === 'free') {
            coursesArray = coursesArray.filter(function(course) { return course.price === 0; });
        }

        const coursesGrid = document.querySelector('.courses-grid');
        if (!coursesGrid) return;

        coursesGrid.innerHTML = '';

        coursesArray.forEach(function(course) {
            course.element.style.display = 'flex';
            course.element.style.animation = 'fadeIn 0.3s ease';
            coursesGrid.appendChild(course.element);
        });

        let noResultsMsg = document.querySelector('.no-results');

        if (coursesArray.length === 0) {
            if (!noResultsMsg) {
                noResultsMsg = document.createElement('div');
                noResultsMsg.className = 'no-results';
                noResultsMsg.innerHTML = '<p>Курсы не найдены. Попробуйте изменить фильтры.</p>';
                document.querySelector('.filters-section').appendChild(noResultsMsg);
            }
        } else if (noResultsMsg) {
            noResultsMsg.remove();
        }
    }

    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            courseCards.forEach(function(card) {
                const title = card.querySelector('.course-title') ? card.querySelector('.course-title').textContent.toLowerCase() : '';
                const desc = card.querySelector('.course-desc') ? card.querySelector('.course-desc').textContent.toLowerCase() : '';

                if (title.includes(query) || desc.includes(query)) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    }
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== FORM SUBMISSIONS =====
document.querySelectorAll('form').forEach(function(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (this.classList.contains('modal-form')) {
            alert('Спасибо! Ваше сообщение отправлено.');
            closeModal();
            this.reset();
        }
    });
});

// ===== AUTH FORMS =====
function initAuth() {
    const params = new URLSearchParams(window.location.search);
    const mode = params.get('mode');
    const title = document.getElementById('authTitle');
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const breadcrumbMode = document.getElementById('breadcrumbMode');
    const submitBtn = document.getElementById('authSubmitBtn');

    if (!title || !registerForm || !loginForm) return;

    if (mode === 'register') {
        title.textContent = 'РЕГИСТРАЦИЯ';
        registerForm.style.display = 'block';
        loginForm.style.display = 'none';
        if (breadcrumbMode) breadcrumbMode.textContent = 'Регистрация';
        if (submitBtn) submitBtn.textContent = 'Зарегистрироваться';
    } else {
        title.textContent = 'ВХОД';
        registerForm.style.display = 'none';
        loginForm.style.display = 'block';
        if (breadcrumbMode) breadcrumbMode.textContent = 'Вход';
    }

    const loginBtn = loginForm.querySelector('.auth-submit-btn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            const email = loginForm.querySelector('input[type="email"]') ? loginForm.querySelector('input[type="email"]').value : '';
            const passwordInputs = loginForm.querySelectorAll('input[type="password"]');
            const password = passwordInputs.length > 0 ? passwordInputs[0].value : '';

            if (email && password) {
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userEmail', email);

                const redirectUrl = localStorage.getItem('redirectAfterLogin');
                if (redirectUrl) {
                    localStorage.removeItem('redirectAfterLogin');
                    window.location.href = redirectUrl;
                } else {
                    window.location.href = 'index.html';
                }
            } else {
                alert('Пожалуйста, заполните все поля');
            }
        });
    }

    const registerBtn = registerForm.querySelector('.auth-submit-btn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function() {
            const nameInput = registerForm.querySelector('input[type="text"]');
            const emailInput = registerForm.querySelector('input[type="email"]');
            const passwordInputs = registerForm.querySelectorAll('input[type="password"]');

            const name = nameInput ? nameInput.value : '';
            const email = emailInput ? emailInput.value : '';
            const password = passwordInputs.length > 0 ? passwordInputs[0].value : '';
            const passwordConfirm = passwordInputs.length > 1 ? passwordInputs[1].value : '';

            if (!name || !email || !password) {
                alert('Пожалуйста, заполните все поля');
                return;
            }

            if (password !== passwordConfirm) {
                alert('Пароли не совпадают');
                return;
            }

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userEmail', email);
            localStorage.setItem('userName', name);

            alert('Регистрация успешна!');
            window.location.href = 'index.html';
        });
    }
}

// ===== INITIALIZE =====
document.addEventListener('DOMContentLoaded', function() {
    initFilters();
    initAuth();

    if (window.location.pathname.includes('filters.html')) {
        handleSearchOnFilters();
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const userName = localStorage.getItem('userName');

    if (isLoggedIn && userName) {
        console.log('Пользователь ' + userName + ' авторизован');
    }
});