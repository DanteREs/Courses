// База данных курсов
const coursesData = {
    'python': {
        title: 'Python с нуля',
        desc: 'Обучение самым основным понятиям в Python разработке',
        rating: '4,6',
        price: '89.99$',
        logo: '',
        logoColor: '#66FCF1',
        nodes: ['INTS', 'floats', 'strings', 'Lists', 'Dictionary'],
        learn: [
            'Создавать и работать с переменными',
            'Использовать базовые команды',
            'Использовать условные конструкции',
            'Использовать циклы',
            'Создавать и использовать такие структуры как: циклы, словари, кортежи и т.д.',
            'Понимание базовых парадигм ООП',
            'и т.д'
        ],
        description: 'Курс преподаст базовые знания в языке программирования Python. Умения студента, успешно прошедшего курс будет соответствовать умениям Junior разработчика.',
        features: [
            'Понятные и простые формулировки',
            'Не требуются знания языка',
            'Интуитивно понятная программа'
        ],
        materials: [
            { name: 'Введение в Python', duration: '25:24' },
            { name: 'Переменные и типы данных', duration: '15:24' },
            { name: 'Условные конструкции', duration: '32:12' },
            { name: 'Циклы', duration: '21:32' },
            { name: 'Функции', duration: '67:42' },
            { name: 'ООП основы', duration: '11:11' }
        ]
    },
    'javascript': {
        title: 'JavaScript Basic',
        desc: 'Основы JavaScript для начинающих разработчиков',
        rating: '4,5',
        price: '99.99$',
        logo: 'JS',
        logoColor: '#f7df1e',
        nodes: ['Variables', 'Functions', 'Arrays', 'Objects', 'DOM'],
        learn: [
            'Работать с переменными и типами данных',
            'Создавать функции и методы',
            'Использовать массивы и объекты',
            'Работать с DOM',
            'Обрабатывать события',
            'Использовать асинхронность',
            'и т.д'
        ],
        description: 'Курс по основам JavaScript. После прохождения вы сможете создавать интерактивные веб-страницы и понимать код на JS.',
        features: [
            'Практические примеры',
            'Много упражнений',
            'Современный JavaScript'
        ],
        materials: [
            { name: 'Основы JS', duration: '30:15' },
            { name: 'Функции', duration: '45:20' },
            { name: 'Массивы', duration: '28:45' },
            { name: 'Объекты', duration: '35:10' },
            { name: 'DOM манипуляции', duration: '52:30' },
            { name: 'Async/Await', duration: '40:15' }
        ]
    },
    'web': {
        title: 'Веб-разработка',
        desc: 'Fullstack разработка с нуля до профессионала',
        rating: '4,7',
        price: '119.99$',
        logo: 'WEB',
        logoColor: '#61dafb',
        nodes: ['HTML', 'CSS', 'JS', 'React', 'Node'],
        learn: [
            'Вёрстка сайтов на HTML/CSS',
            'Программирование на JavaScript',
            'Работа с React',
            'Создание серверов на Node.js',
            'Работа с базами данных',
            'Деплой приложений',
            'и т.д'
        ],
        description: 'Полный курс веб-разработки. Научитесь создавать современные веб-приложения от фронтенда до бэкенда.',
        features: [
            'Полный стек технологий',
            'Реальные проекты',
            'Подготовка к работе'
        ],
        materials: [
            { name: 'HTML основы', duration: '20:00' },
            { name: 'CSS и адаптивность', duration: '35:45' },
            { name: 'JavaScript', duration: '50:30' },
            { name: 'React', duration: '65:20' },
            { name: 'Node.js', duration: '45:15' },
            { name: 'Базы данных', duration: '38:40' }
        ]
    },
    'mobile': {
        title: 'Mobile Apps',
        desc: 'Разработка мобильных приложений для iOS и Android',
        rating: '4,4',
        price: '109.99$',
        logo: 'APP',
        logoColor: '#007aff',
        nodes: ['iOS', 'Android', 'Flutter', 'RN', 'API'],
        learn: [
            'Создавать приложения для iOS',
            'Разрабатывать для Android',
            'Использовать Flutter',
            'Работать с React Native',
            'Интегрировать API',
            'Публиковать в магазинах',
            'и т.д'
        ],
        description: 'Курс по мобильной разработке. Научитесь создавать приложения для обеих платформ с единой кодовой базой.',
        features: [
            'Кроссплатформенность',
            'Современные фреймворки',
            'Публикация в сторах'
        ],
        materials: [
            { name: 'Введение в мобильную разработку', duration: '22:30' },
            { name: 'Flutter основы', duration: '48:15' },
            { name: 'UI компоненты', duration: '35:20' },
            { name: 'Навигация', duration: '28:45' },
            { name: 'API интеграция', duration: '55:10' },
            { name: 'Публикация', duration: '25:30' }
        ]
    },
    'data': {
        title: 'Data Science',
        desc: 'Анализ данных и машинное обучение',
        rating: '4,8',
        price: '129.99$',
        logo: 'DATA',
        logoColor: '#ff6b6b',
        nodes: ['Python', 'ML', 'AI', 'Data', 'Stats'],
        learn: [
            'Анализировать данные',
            'Строить модели ML',
            'Работать с нейросетями',
            'Визуализировать данные',
            'Использовать Pandas и NumPy',
            'Создавать AI решения',
            'и т.д'
        ],
        description: 'Курс по науке о данных. Освойте машинное обучение и анализ данных с помощью Python.',
        features: [
            'Реальные датасеты',
            'Современные алгоритмы',
            'Практика на проектах'
        ],
        materials: [
            { name: 'Введение в Data Science', duration: '30:00' },
            { name: 'Pandas и NumPy', duration: '55:20' },
            { name: 'Визуализация', duration: '40:15' },
            { name: 'Машинное обучение', duration: '70:30' },
            { name: 'Нейросети', duration: '65:45' },
            { name: 'Проект', duration: '45:20' }
        ]
    },
    'python-advanced': {
        title: 'Python Advanced',
        desc: 'Продвинутый Python для опытных разработчиков',
        rating: '4,6',
        price: '89.99$',
        logo: '🐍',
        logoColor: '#66FCF1',
        nodes: ['OOP', 'Async', 'Decorators', 'Django', 'FastAPI'],
        learn: [
            'Глубокое понимание ООП',
            'Асинхронное программирование',
            'Декораторы и метаклассы',
            'Работа с Django',
            'Создание API на FastAPI',
            'Оптимизация кода',
            'и т.д'
        ],
        description: 'Продвинутый курс Python для тех, кто уже знает основы. Углубитесь в язык и станьте профессионалом.',
        features: [
            'Продвинутые темы',
            'Best practices',
            'Реальные кейсы'
        ],
        materials: [
            { name: 'OOP глубокое погружение', duration: '45:20' },
            { name: 'Асинхронность', duration: '50:15' },
            { name: 'Декораторы', duration: '35:30' },
            { name: 'Django', duration: '60:45' },
            { name: 'FastAPI', duration: '42:20' },
            { name: 'Оптимизация', duration: '38:15' }
        ]
    },
    'react': {
        title: 'React JS',
        desc: 'Современный React с нуля до профессионала',
        rating: '4,7',
        price: '99.99$',
        logo: '⚛️',
        logoColor: '#61dafb',
        nodes: ['React', 'Redux', 'Hooks', 'Router', 'API'],
        learn: [
            'Создавать компоненты',
            'Управлять состоянием',
            'Использовать хуки',
            'Работать с маршрутизацией',
            'Интегрировать API',
            'Оптимизировать приложения',
            'и т.д'
        ],
        description: 'Полный курс React. Научитесь создавать современные SPA приложения с использованием React и экосистемы.',
        features: [
            'Современный React 18',
            'Много практики',
            'Реальный проект'
        ],
        materials: [
            { name: 'Основы React', duration: '35:20' },
            { name: 'Компоненты', duration: '42:15' },
            { name: 'Хуки', duration: '48:30' },
            { name: 'Redux', duration: '55:45' },
            { name: 'Router', duration: '38:20' },
            { name: 'Проект', duration: '65:10' }
        ]
    },
    'html-css': {
        title: 'HTML/CSS',
        desc: 'Вёрстка сайтов с нуля',
        rating: '4,5',
        price: '119.99$',
        logo: 'HTML',
        logoColor: '#e34c26',
        nodes: ['HTML5', 'CSS3', 'SASS', 'Flex', 'Grid'],
        learn: [
            'Семантическая вёрстка',
            'Современный CSS',
            'Flexbox и Grid',
            'Адаптивный дизайн',
            'Анимации',
            'Препроцессоры',
            'и т.д'
        ],
        description: 'Курс по вёрстке сайтов. Научитесь создавать красивые и адаптивные веб-страницы.',
        features: [
            'Современные стандарты',
            'Адаптивность',
            'Много практики'
        ],
        materials: [
            { name: 'HTML основы', duration: '25:00' },
            { name: 'CSS основы', duration: '30:15' },
            { name: 'Flexbox', duration: '35:20' },
            { name: 'Grid', duration: '40:30' },
            { name: 'Адаптивность', duration: '45:15' },
            { name: 'Анимации', duration: '38:45' }
        ]
    },
    'backend-python': {
        title: 'Backend Python',
        desc: 'Серверная разработка на Python',
        rating: '4,6',
        price: '89.99$',
        logo: 'BACK',
        logoColor: '#4db6ac',
        nodes: ['Flask', 'SQL', 'REST', 'Docker', 'AWS'],
        learn: [
            'Создавать серверы',
            'Работать с базами данных',
            'Создавать REST API',
            'Использовать Docker',
            'Деплоить на AWS',
            'Безопасность приложений',
            'и т.д'
        ],
        description: 'Курс по серверной разработке на Python. Научитесь создавать надёжные и масштабируемые бэкенд приложения.',
        features: [
            'Production-ready код',
            'DevOps основы',
            'Облачные технологии'
        ],
        materials: [
            { name: 'Flask основы', duration: '40:20' },
            { name: 'Базы данных', duration: '50:15' },
            { name: 'REST API', duration: '45:30' },
            { name: 'Docker', duration: '55:45' },
            { name: 'AWS', duration: '48:20' },
            { name: 'Безопасность', duration: '35:10' }
        ]
    }
};

// Загрузка курса при открытии страницы
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const courseKey = params.get('course') || 'python';
    const course = coursesData[courseKey];
    
    if (course) {
        document.title = `${course.title} — DevDelta`;
        
        document.getElementById('courseHeroTitle').textContent = course.title;
        document.getElementById('courseHeroDesc').textContent = course.desc;
        document.getElementById('courseRating').textContent = course.rating;
        
        document.getElementById('breadcrumbCourse').textContent = `"${course.title}"`;
        
        const learnList = document.getElementById('courseLearnList');
        learnList.innerHTML = course.learn.map(item => `<li>${item}</li>`).join('');
        
        document.getElementById('courseDescription').textContent = course.description;
        
        const materialsList = document.getElementById('materialsList');
        materialsList.innerHTML = course.materials.map((mat) => `
            <div class="material-item locked">
                <span>${mat.name}</span>
                <span class="material-duration">${mat.duration}</span>
            </div>
        `).join('');
        
        document.getElementById('sidebarCourseTitle').textContent = course.title;
        document.getElementById('sidebarPrice').textContent = course.price;
        document.getElementById('sidebarLogo').textContent = course.logo;
        document.getElementById('sidebarLogo').style.color = course.logoColor;
        
        const featuresList = document.getElementById('sidebarFeatures');
        featuresList.innerHTML = course.features.map(item => `<li>${item}</li>`).join('');
        
        const nodes = document.querySelectorAll('#sidebarDiagram .node');
        course.nodes.forEach((nodeName, index) => {
            if (nodes[index]) {
                nodes[index].textContent = nodeName;
            }
        });
        
        window.currentCourse = courseKey;
        window.currentCourseData = course;
    }
});