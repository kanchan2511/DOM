//random id generator
function generateBookId() {
    return new Date() + Math.floor(1000 + Math.random() * 9000);
}
const form = document.getElementById('bookmark-form');
const bookmarkList = document.querySelector('.bookmarks-list');
const buttons = document.querySelectorAll('.filter-btn');
let currentFilter = 'All';
let bookmarks = [];
let filterArr = [];
form.addEventListener('submit', (e) => {
   e.preventDefault();
    const title = document.getElementById('websiteTitle').value;
    const url = document.getElementById('websiteUrl').value;
    const category = document.getElementById('category').value;
    const bookmark = {
        id: generateBookId(),
        title: title,
        url: url,
        category: category
    }
    bookmarks.push(bookmark);
    saveBookmarks();
    applyFilter();
    form.reset();
});
function renderBookmarks() {
    bookmarkList.innerHTML = '';
    if (filterArr.length === 0) {
        bookmarkList.innerHTML = '<li>No bookmarks found</li>';
        bookmarkList.style.listStyleType = 'none';
        return;
    }
    filterArr.forEach((b) => {
        let bookmarkItem = document.createElement('div'); 
        bookmarkItem.classList.add('bookmark-item');
        bookmarkItem.innerHTML = ` <div class="bookmark-info">
                        <h3>${b.title}</h3>
                        <a class="bookmark-link"
                            href="${b.url}" target="_blank">${b.url}</a>
                        <div class="bookmark-category">${b.category}</div>
                    </div>
                    <div class="delete-btn">Delete</div>
                </div>`
        bookmarkList.append(bookmarkItem);
        //delete button
        const deleteBtn = bookmarkItem.querySelector('.delete-btn');
        //add event listener
        deleteBtn.addEventListener('click', () => {
            handleDelete(b.id);
        });
    });
}
document.addEventListener('DOMContentLoaded', () => {
    loadBookmarks();
});
function handleDelete(id) {
    // const index = bookmarks.findIndex((b) => b.id == id);
    // if (index !== -1) {
    //     bookmarks.splice(index, 1);
    //     applyFilter();
    //     saveBookmarks();
    // }
    bookmarks = bookmarks.filter(bookmark => bookmark.id !== id);
    applyFilter();
    saveBookmarks();
}

//filter buttons
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        buttons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        currentFilter = button.getAttribute("data-category");
        applyFilter();
    })
})
function applyFilter() {
    if (currentFilter === 'All') {
        filterArr = bookmarks;
    } else if (currentFilter === 'Work') {
        filterArr = bookmarks.filter(b => b.category === 'Work');
    } else if (currentFilter === 'Study') {
        filterArr = bookmarks.filter(b => b.category === 'Study');
    } else {
        filterArr = bookmarks.filter(b => b.category === currentFilter);
    }
    renderBookmarks();
    saveBookmarks();
}
//local storage
function saveBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks))
}
function loadBookmarks() {
    const stored = localStorage.getItem('bookmarks');
    if (stored) {
        bookmarks = JSON.parse(stored);//strings back to objects (original form)
    }
    applyFilter();
}

