const mainData = () => {

    const renderAnimeList = (array, ganres) => {
        console.log(array, ganres)
    };

    const renderTopAnime = (array) =>{
        const wrapper = document.querySelector(".filter__gallery");
        wrapper.innerHTML = '';

        array.forEach((item) => {
            wrapper.insertAdjacentHTML('afterbegin', `
                <div class="product__sidebar__view__item set-bg mix day years"
                    data-setbg="${item.image}">
                    <div class="ep">${item.rating} / 10</div>
                    <div class="view"><i class="fa fa-eye"></i> ${item.views}</div>
                    <h5><a href="/anime-details.html">${item.title}</a></h5>
                </div>
            `)
        });

        wrapper.querySelectorAll('.set-bg').forEach((element) => {
            element.style.backgroundImage = `url(${element.dataset.setbg})`;
        });
    };

    fetch('./db.json')
        .then((response) => {
            if (response.status == 200) {
                return response.json()
            } else {
                console.log()
                console.error("Ошибка по адресу: " + response.url);
                console.error("Статус ошибки: " + + response.status);
                const container = document.querySelector('.product.spad');
                container.textContent = 'Упс, ничего не найдено!'
                container.classList.add('no-response');
            }
            
        })
        .then((data) =>{
            const ganres = new Set();

            renderTopAnime(data.anime.sort((a, b) =>  b.views - a.views).slice(0, 5));

            data.anime.forEach((item) =>{
                ganres.add(item.ganre);
            });

            renderAnimeList(data.anime, ganres);
        })
};

mainData();