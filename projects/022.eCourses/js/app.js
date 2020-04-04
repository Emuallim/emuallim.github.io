// --------------------- VARIABLES ----------------------------
const courses = document.querySelector('#courses-list'),
    shoppingCartContent = document.querySelector('#cart-content tbody'),
    clearCartBtn = document.querySelector('#clear-cart');


// --------------------- LISTENERS ----------------------------
loadEventListeners();

function loadEventListeners() {
    // When a new course is added
    courses.addEventListener('click', buyCourse);

    // When the remove button is clicked
    shoppingCartContent.addEventListener('click', removeCourse);

    // Clear cart btn
    clearCartBtn.addEventListener('click', clearCart);

    // Document ready
    document.addEventListener('DOMContentLoaded', getFromLocalStorage);
}


// --------------------- FUNCTIONS ----------------------------
function buyCourse(e) {
    e.preventDefault();
    // use delegation to find the course that was added
    if (e.target.classList.contains('add-to-cart')) {
        // Read the course values
        const course = e.target.parentElement.parentElement;

        // read the values
        getCourseInfo(course);
    }
}
// Reads the HTML info of the selected course
function getCourseInfo(course) {
    const courseInfo = {
            image: course.querySelector('img').src,
            title: course.querySelector('h4').textContent,
            price: course.querySelector('.price span').textContent,
            id: course.querySelector('a').getAttribute('data-id')
        }
        // Insert into the shopping cart
    addIntoCart(courseInfo);
}
// Display the selected course into the shopping cart
function addIntoCart(course) {
    // Create a <tr> table row
    const row = document.createElement('tr');
    // Build the template
    row.innerHTML = `
        <tr>
            <td><img src="${course.image}" width=100></td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
    `;

    // Add into the shopping cart
    shoppingCartContent.appendChild(row);

    // Add course into storage
    saveIntoStorage(course);
}

// Add the courses into the local storage
function saveIntoStorage(course) {
    let courses = getCoursesFromStorage();
    // add the course into the array
    courses.push(course);
    // since storage only saves strings, we need to convert JSON into string
    localStorage.setItem('courses', JSON.stringify(courses));
}

// Get the courses from the local storage
function getCoursesFromStorage() {
    let courses;
    // if something exists in the storage then we get the value otherwise create an empty array
    if (localStorage.getItem('courses') === null) {
        courses = [];
    } else {
        courses = JSON.parse(localStorage.getItem('courses'));
    }
    return courses;
}

// Remove course from the DOM
function removeCourse(e) {
    let course, courseId;

    // remove from the DOM
    if (e.target.classList.contains('remove')) {
        e.target.parentElement.parentElement.remove();
        course = e.target.parentElement.parentElement;
        courseId = course.querySelector('a').getAttribute('data-id');
    }
    // remove from the local storage
    removeCourseLocalStorage(courseId);
}
// remove from local storage
function removeCourseLocalStorage(id) {
    // get the local storage data
    let coursesLS = getCoursesFromStorage();
    // loop thu the array and find the index to remove
    coursesLS.forEach(function(courseLS, index) {
        if (courseLS.id === id) {
            coursesLS.splice(index, 1);
        }
    });
    // Add the rest of the array
    localStorage.setItem('courses', JSON.stringify(coursesLS));
}

// Clears the shopping cart
function clearCart() {
    // shoppingCartContent.innerHTML = '';
    while (shoppingCartContent.firstChild) {
        shoppingCartContent.removeChild(shoppingCartContent.firstChild);
    }

    // Clear from local storage
    clearLocalStorage();
}
// clears the whole local storage
function clearLocalStorage() {
    localStorage.clear();
}

// Loads when document is ready and print courses into shopping cart
function getFromLocalStorage() {
    let coursesLS = getCoursesFromStorage();
    // Loop through the courses and print into the cart
    coursesLS.forEach(function(course) {
        // create <tr>
        const row = document.createElement('tr');
        // print the content
        row.innerHTML = `
        <tr>
            <td><img src="${course.image}" width=100></td>
            <td>${course.title}</td>
            <td>${course.price}</td>
            <td>
                <a href="#" class="remove" data-id="${course.id}">X</a>
            </td>
        </tr>
        `;
        shoppingCartContent.appendChild(row);
    });
}