
window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    header.classList.toggle('rolagem',window.scrollY > 500)
})

const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');
const produtosGrid = document.querySelector('.produtos-grid');

let currentIndex = 0;
const itemWidth = produtosGrid.querySelector('.produto').offsetWidth;
const visibleItems = 1;

prevButton.addEventListener('click', () => {
    currentIndex = Math.max(0, currentIndex - visibleItems);
    updateCarousel();
});

nextButton.addEventListener('click', () => {
    const maxIndex = produtosGrid.children.length - visibleItems;
    currentIndex = Math.min(maxIndex, currentIndex + visibleItems);
    updateCarousel();
});

function updateCarousel() {
    produtosGrid.style.transform = `translateX(-${currentIndex * (itemWidth-100)}px)`;
}