let lastScrollTop = 0;
const header = document.querySelector('.site-header');
let ticking = false;

window.addEventListener('scroll', function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            if (scrollTop > lastScrollTop) {
                // Scrolling down
                header.classList.add('hidden');
            } else {
                // Scrolling up
                header.classList.remove('hidden');
                if (scrollTop > 0) {
                    header.classList.add('transparent');
                } else {
                    header.classList.remove('transparent');
                }
            }

            lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        });

        ticking = true;
    }
});


let currentPage = 1;
let postsPerPage = 10;
const totalPosts = 100; // Update with the actual total number of posts
const postsContainer = document.getElementById('post-container');
const postCountElement = document.getElementById('post-count');

function renderPosts() {
    // Clear existing posts
    postsContainer.innerHTML = '';

    // Calculate the starting and ending post index
    const start = (currentPage - 1) * postsPerPage;
    const end = Math.min(start + postsPerPage, totalPosts);

    // Generate new posts
    for (let i = start; i < end; i++) {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <img src="image1.jpg" alt="Post ${i + 1}" class="lazyload">
            <div class="post-info">
                <h3 class="post-title">Judul Artikel Panjang yang Dipotong dengan Ellipsis</h3>
                <p class="post-description">Deskripsi artikel...</p>
            </div>
        `;
        postsContainer.appendChild(postElement);
    }

    // Update post count
    postCountElement.textContent = `Showing ${start + 1} - ${end} of ${totalPosts}`;

    // Update pagination buttons
    document.getElementById('prev').style.visibility = currentPage === 1 ? 'hidden' : 'visible';
    document.getElementById('next').style.visibility = end === totalPosts ? 'hidden' : 'visible';
    document.getElementById('current-page').textContent = currentPage;
}

function updatePosts() {
    postsPerPage = parseInt(document.getElementById('show-per-page').value);
    currentPage = 1;
    renderPosts();
}

function previousPage(event) {
    event.preventDefault();
    if (currentPage > 1) {
        currentPage--;
        renderPosts();
    }
}

function nextPage(event) {
    event.preventDefault();
    const totalPages = Math.ceil(totalPosts / postsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderPosts();
    }
}

// Initialize
document.getElementById('show-per-page').addEventListener('change', updatePosts);
renderPosts();