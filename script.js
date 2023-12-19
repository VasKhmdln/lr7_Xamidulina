//АККОРДЕОН
var acc = document.getElementsByClassName("accordion");
var i;

for (i = 0; i < acc.length; i++) {
  acc[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var panel = this.nextElementSibling;
    if (panel.style.display === "block") {
      panel.style.display = "none";
    } else {
      panel.style.display = "block";
    }
  });
}

//ПОКАЗ И ФИЛЬТРАЦИЯ СТАТЕЙ

document.addEventListener('DOMContentLoaded', function () {
  // Получаем кнопки и поле для фильтрации
  const showAllButton = document.getElementById('showAllButton');
  const filterButton = document.getElementById('filterButton');
  const filterInput = document.getElementById('filterInput');
  const reviewsListContainer = document.getElementById('reviewsList');

  // Добавляем обработчики событий
  showAllButton.addEventListener('click', function () {
      // Вызываем функцию для получения и отображения всех статей
      getReviewsAndShow();
      filterInput.value = ''; // Очищаем поле фильтра
  });

  filterButton.addEventListener('click', filterReviews);
});

// Функция для получения всех статей
function getReviews() {
  return fetch('https://jsonplaceholder.typicode.com/comments?_limit=10')
      .then(response => response.json());
}

// Функция для отображения всех статей
function showAllReviews() {
  getReviewsAndShow();
  filterInput.value = ''; // Очищаем поле фильтра
}

// Функция для получения и отображения всех статей
function getReviewsAndShow() {
  getReviews()
      .then(reviews => {
          fillReviewsList(reviews);
          showReviews(); // Показываем блок со статьями
      })
      .catch(error => {
          console.error('Ошибка:', error);
          alert('Произошла ошибка при загрузке статей.');
      });
}

// Функция для показа блока со статьями
function showReviews() {
  const reviewsListContainer = document.getElementById('reviewsList');
  reviewsListContainer.style.display = 'block';
}

// Функция для фильтрации статей по заголовку
async function filterReviews() {
  const searchTerm = filterInput.value;
  if (searchTerm) {
      try {
          const response = await fetch(`https://jsonplaceholder.typicode.com/comments?_limit=10&name=${searchTerm}`);
          if (!response.ok) {
              throw new Error('Failed to filter reviews');
          }

          const filteredReviews = await response.json();
          fillReviewsList(filteredReviews);
          showReviews(); // Показываем блок со статьями после фильтрации
      } catch (error) {
          console.error('Ошибка:', error);
          alert('Произошла ошибка при фильтрации статей.');
      }
  } else {
      // Если поле фильтра пустое, показываем все статьи
      getReviewsAndShow();
  }
}

// Функция для заполнения списка статей на странице
function fillReviewsList(reviews) {
  const reviewsListContainer = document.getElementById('reviewsList');

  if (reviews.length > 0) {
      reviewsListContainer.innerHTML = reviews.map(review => createReviewItem(review)).join('');
  } else {
      reviewsListContainer.innerHTML = '<p>Статей пока нет.</p>';
  }
}

// Функция для создания HTML-элемента для статьи
function createReviewItem(review) {
  return `
  <div class="review-item">
      <h3>${review.name}</h3>
      <p>${review.body}</p>
  </div>
`;
}