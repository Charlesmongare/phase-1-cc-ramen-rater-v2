document.addEventListener('DOMContentLoaded', main);

function main() {
  displayRamens();
  addSubmitListener();
}

function displayRamens() {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      const ramenMenu = document.getElementById('ramen-menu');
      ramenMenu.innerHTML = '';
      ramens.forEach(ramen => {
        const img = document.createElement('img');
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener('click', () => handleClick(ramen));
        ramenMenu.appendChild(img);
      });
      // Show the first ramen details by default
      if (ramens.length > 0) handleClick(ramens[0]);
    });
}

function handleClick(ramen) {
  document.getElementById('ramen-detail-img').src = ramen.image;
  document.getElementById('ramen-name').innerText = ramen.name;
  document.getElementById('ramen-description').innerText = ramen.description;
  document.getElementById('ramen-rating').innerText = `Rating: ${ramen.rating}`;
  document.getElementById('ramen-comment').innerText = ramen.comment;
}

function addSubmitListener() {
  const newRamenForm = document.getElementById('new-ramen');
  newRamenForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const ramenName = event.target['new-ramen-name'].value;
    const ramenImage = event.target['new-ramen-image'].value;

    const newRamen = {
      name: ramenName,
      image: ramenImage,
      rating: 0,
      comment: ''
    };

    // Add to the DOM (this won't persist)
    const ramenMenu = document.getElementById('ramen-menu');
    const img = document.createElement('img');
    img.src = newRamen.image;
    img.alt = newRamen.name;
    img.addEventListener('click', () => handleClick(newRamen));
    ramenMenu.appendChild(img);

    // Clear the form
    newRamenForm.reset();
  });
}

