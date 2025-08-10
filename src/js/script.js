// Mobile Navigation Toggle
function toggleMenu() {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
}

// Sample data for dynamic content
const additionalPosts = [
    {
        date: "8 de Marzo, 2024",
        author: "Dra. Patricia Silva",
        title: "Los 10 alimentos tóxicos para perros que debes evitar",
        excerpt: "¡ALERTA MÁXIMA! Estos alimentos comunes en tu cocina pueden ser mortales para tu perro. Chocolate, uvas, cebolla... conoce la lista completa de alimentos prohibidos y qué hacer en caso de intoxicación. Una guía que puede salvar la vida de tu mascota.",
        tags: ["🐶 Perros", "🏥 Salud", "⚠️ Toxicidad", "🚨 Emergencia"]
    },
    {
        date: "5 de Marzo, 2024",
        author: "Luis Hernández",
        title: "Cómo entrenar a tu gato para usar el arenero perfectamente",
        excerpt: "¿Tu gato evita el arenero? ¡No más accidentes! Descubre los secretos profesionales para lograr que tu felino use el arenero sin fallas. Desde la ubicación perfecta hasta el tipo de arena ideal, técnicas probadas que funcionan en el 99% de los casos.",
        tags: ["🐱 Gatos", "🎯 Entrenamiento", "🏠 Higiene", "💡 Consejos"]
    },
    {
        date: "3 de Marzo, 2024",
        author: "Carmen Ruiz",
        title: "Razas de perros ideales para apartamentos pequeños",
        excerpt: "¡Vives en un apartamento pequeño pero sueñas con un perro? Descubre las 15 razas perfectas para espacios reducidos. Perros que se adaptan, necesitan poco ejercicio pero dan mucho amor. Incluye consejos de expertos para maximizar el espacio y mantener a tu perro feliz en la ciudad.",
        tags: ["🐶 Perros", "🏠 Apartamento", "🏆 Razas", "🏙️ Ciudad"]
    }
];

let postsLoaded = 3;

// Load More Posts Functionality
function loadMorePosts() {
    const blogPosts = document.querySelector('.blog-posts');
    const loadingDiv = document.querySelector('.loading');
    const loadMoreBtn = document.getElementById('loadMore');

    // Show loading animation
    loadingDiv.style.display = 'block';
    loadMoreBtn.style.display = 'none';

    // Simulate API call delay
    setTimeout(() => {
        additionalPosts.forEach((post, index) => {
            if (postsLoaded + index < 6) { // Limit total posts
                const postElement = createPostElement(post);
                blogPosts.insertBefore(postElement, loadMoreBtn);
            }
        });

        postsLoaded += additionalPosts.length;
        loadingDiv.style.display = 'none';
        
        if (postsLoaded >= 6) {
            loadMoreBtn.textContent = '🐾 Todas las publicaciones cargadas';
            loadMoreBtn.disabled = true;
            loadMoreBtn.style.opacity = '0.6';
            loadMoreBtn.style.cursor = 'not-allowed';
        } else {
            loadMoreBtn.style.display = 'block';
        }
    }, 1500);
}

// Create Post Element
function createPostElement(post) {
    const article = document.createElement('article');
    article.className = 'post-card';
    article.style.animationDelay = '0s';
    
    // Determine tag classes
    const tagElements = post.tags.map(tag => {
        let tagClass = 'tag';
        if (tag.includes('Gatos')) tagClass += ' cat-tag';
        else if (tag.includes('Perros')) tagClass += ' dog-tag';
        else if (tag.includes('Adopción')) tagClass += ' adoption-tag';
        else if (tag.includes('Salud') || tag.includes('Cuidados')) tagClass += ' care-tag';
        
        return `<a href="#" class="${tagClass}">${tag}</a>`;
    }).join('');
    
    article.innerHTML = `
        <div class="post-meta">
            <span class="post-date">📅 ${post.date}</span>
            <span class="post-author">👤 ${post.author}</span>
        </div>
        <h2 class="post-title">${post.title}</h2>
        <p class="post-excerpt">${post.excerpt}</p>
        <div class="post-tags">
            ${tagElements}
        </div>
        <a href="#" class="read-more">Leer Más</a>
    `;
    
    return article;
}

// Search Posts Functionality
function searchPosts(query) {
    const posts = document.querySelectorAll('.post-card');
    const searchTerm = query.toLowerCase();

    posts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
        const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');

        if (title.includes(searchTerm) || excerpt.includes(searchTerm) || tags.includes(searchTerm)) {
            post.style.display = 'block';
            post.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            post.style.display = 'none';
        }
    });

    // Show "No results" message if no posts are visible
    const visiblePosts = Array.from(posts).filter(post => post.style.display !== 'none');
    const existingNoResults = document.querySelector('.no-results');

    if (visiblePosts.length === 0 && query.trim() !== '') {
        if (!existingNoResults) {
            const noResults = document.createElement('div');
            noResults.className = 'no-results';
            noResults.innerHTML = `
                <h3>No se encontraron publicaciones</h3>
                <p>Prueba buscando algo diferente o navega por nuestras categorías.</p>
            `;
            document.querySelector('.blog-posts').appendChild(noResults);
        }
    } else if (existingNoResults) {
        existingNoResults.remove();
    }
}

// Filter by Tag
function filterByTag(tag) {
    const posts = document.querySelectorAll('.post-card');
    
    posts.forEach(post => {
        const postTags = Array.from(post.querySelectorAll('.tag')).map(tagEl => tagEl.textContent);
        const hasTag = postTags.some(postTag => postTag.includes(tag));
        
        if (hasTag) {
            post.style.display = 'block';
            post.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            post.style.display = 'none';
        }
    });

    // Update search box to show current filter
    const searchBox = document.querySelector('.search-box');
    searchBox.value = `etiqueta:${tag}`;
}

// Filter by Category
function filterByCategory(category) {
    const posts = document.querySelectorAll('.post-card');
    const categoryKeywords = {
        'cuidados': ['salud', 'cuidados', 'alimentación', 'higiene'],
        'comportamiento': ['entrenamiento', 'comportamiento', 'educación'],
        'adopcion': ['adopción', 'rescate'],
        'alimentacion': ['alimentación', 'comida', 'tóxico'],
        'entretenimiento': ['juegos', 'diversión', 'entretenimiento']
    };

    const keywords = categoryKeywords[category] || [];
    
    posts.forEach(post => {
        const title = post.querySelector('.post-title').textContent.toLowerCase();
        const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
        const tags = Array.from(post.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase()).join(' ');
        
        const matchesCategory = keywords.some(keyword => 
            title.includes(keyword) || excerpt.includes(keyword) || tags.includes(keyword)
        );
        
        if (matchesCategory) {
            post.style.display = 'block';
            post.style.animation = 'fadeInUp 0.5s ease-out';
        } else {
            post.style.display = 'none';
        }
    });

    // Update search box to show current filter
    const searchBox = document.querySelector('.search-box');
    searchBox.value = `categoría:${category}`;
}

// Newsletter Subscription
function subscribeNewsletter() {
    const emailInput = document.querySelector('footer input[type="email"]');
    const email = emailInput.value.trim();

    if (email && email.includes('@')) {
        alert('¡Gracias por suscribirte a nuestro newsletter! 🐾');
        emailInput.value = '';
    } else {
        alert('Por favor, ingresa una dirección de correo válida.');
    }
}

// Smooth scrolling for navigation links
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

// Add scroll effects
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, rgba(0, 210, 211, 0.95) 0%, rgba(84, 160, 255, 0.95) 100%)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'linear-gradient(135deg, #00d2d3 0%, #54a0ff 100%)';
        header.style.backdropFilter = 'none';
    }
});

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations to elements
    const elementsToAnimate = document.querySelectorAll('.post-card, .sidebar-widget');
    elementsToAnimate.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        setTimeout(() => {
            element.style.transition = 'all 0.6s ease-out';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // Add welcome message
    setTimeout(() => {
        console.log('🐾 ¡Bienvenido a PetLog! Tu blog favorito de mascotas');
    }, 1000);
});

// Add keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu.classList.contains('active')) {
            toggleMenu();
        }
        
        // Clear search if Escape is pressed
        const searchBox = document.querySelector('.search-box');
        if (document.activeElement === searchBox) {
            searchBox.value = '';
            searchPosts('');
        }
    }
});

// Add click outside to close menu
document.addEventListener('click', (e) => {
    const nav = document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu');
    if (!nav.contains(e.target) && navMenu.classList.contains('active')) {
        toggleMenu();
    }
});

// Add pet sounds on interactions (fun feature)
document.querySelectorAll('.tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        if (tag.textContent.includes('Gatos') || tag.textContent.includes('🐱')) {
            console.log('🐱 Miau!');
        } else if (tag.textContent.includes('Perros') || tag.textContent.includes('🐶')) {
            console.log('🐶 Guau!');
        }
    });
});

// Add floating paw animation (Easter egg)
function createFloatingPaw() {
    const paw = document.createElement('div');
    paw.textContent = '🐾';
    paw.style.cssText = `
        position: fixed;
        font-size: 20px;
        pointer-events: none;
        z-index: 1000;
        animation: floatUp 3s linear forwards;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight}px;
        opacity: 0.7;
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            to {
                transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    
    if (!document.querySelector('#pawAnimation')) {
        style.id = 'pawAnimation';
        document.head.appendChild(style);
    }
    
    document.body.appendChild(paw);
    
    setTimeout(() => {
        paw.remove();
    }, 3000);
}

// Trigger floating paws on special interactions
document.querySelector('.logo').addEventListener('click', () => {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => createFloatingPaw(), i * 200);
    }
});

// Add loading animation on page load
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.animation = 'fadeInUp 0.8s ease-out forwards';
});