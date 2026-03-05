const API_URL = "http://localhost:3000/books";
let currentPage = 1;

// Function to render books to UI
function renderBooks(books, append = false) {
    const container = document.getElementById('bookResults');
    const html = books.map(book => `
        <div class="book-card">
            <h3>${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Category: ${book.category}</p>
            <p class="price">Price: ₹${book.price}</p>
            <p class="rating">Rating: ⭐${book.rating}</p>
        </div>
    `).join('');
    
    if (append) container.innerHTML += html;
    else container.innerHTML = html;
}

// 1. Search Books
async function searchBooks() {
    const title = document.getElementById('searchTitle').value;
    if (title.length < 2) return;
    const res = await fetch(`${API_URL}/search?title=${title}`);
    renderBooks(await res.json());
}

// 2. Filter by Category
async function filterCategory(cat) {
    const res = await fetch(`${API_URL}/category/${cat}`);
    renderBooks(await res.json());
}

// 3. Sort Books
async function sortBy(field) {
    const res = await fetch(`${API_URL}/sort/${field}`);
    renderBooks(await res.json());
}

// 4. Top Rated
async function getTopRated() {
    const res = await fetch(`${API_URL}/top`);
    renderBooks(await res.json());
}

// 5. Pagination (Load More)
async function loadMore() {
    currentPage++;
    const res = await fetch(`${API_URL}?page=${currentPage}`);
    const books = await res.json();
    if (books.length > 0) renderBooks(books, true);
    else alert("No more books to load");
}

// Initial Load
window.onload = () => loadMore();
