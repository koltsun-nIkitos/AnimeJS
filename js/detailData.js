const detailData = () => {
    const preloader = document.querySelector(".preloder");

    const renderGanreList = (ganres) => {
        const dropdownBlock = document.querySelector(".header__menu .dropdown");

        
        ganres.forEach(ganre => {
            dropdownBlock.insertAdjacentHTML('beforeend', `
                <li>
                    <a href="./categories.html?ganre=${ganre}">${ganre}</a>
                </li>
                `
            );
        });

    }

    const renderAnimeDetails = (array, itemId) => {
        const animeObj = array.find(item => item.id == itemId);
        const imageBlock = document.querySelector('.anime__details__pic');
        const viewBlock = imageBlock.querySelector('.view');
        const titleBlock = document.querySelector(".anime__details__title h3");
        const subtitleBlock = document.querySelector(".anime__details__title span");
        const descriptionBlock = document.querySelector(".anime__details__text p");
        const widgetList = document.querySelectorAll('.anime__details__widget ul li');
        const breadcrumb = document.querySelector(".breadcrumb__links span");

        console.log(widgetList)

        console.log(animeObj);

        if(animeObj){
            imageBlock.dataset.setbg = animeObj.image;
            viewBlock.innerHTML = '';
            viewBlock.insertAdjacentHTML('beforeend', 
                `<i class="fa fa-eye"></i> ${animeObj.views}`
            );

            titleBlock.textContent = animeObj.title;
            subtitleBlock.textContent = animeObj['original-title'];
            descriptionBlock.textContent = animeObj.description;

            widgetList[0].insertAdjacentHTML('beforeend', `
                <span> Год выпуска:</span> ${animeObj.date}
            `);
            widgetList[1].insertAdjacentHTML('beforeend', `
                <span>Рейтинг:</span>  ${animeObj.rating}
            `);
            widgetList[2].insertAdjacentHTML('beforeend', `
                <span>Жанры:</span> ${animeObj.tags.join(', ')}
            `);

            breadcrumb.textContent = animeObj.ganre;

            document.querySelectorAll('.set-bg').forEach((element) => {
                element.style.backgroundImage = `url(${element.dataset.setbg})`;
            });

            setTimeout(()=>{
                preloader.classList.remove('active');
            }, 500);
        }else {
            const container = document.querySelector('.spad ');
            container.textContent = 'Аниме отсутствует!'
            container.classList.add('no-response');
        }

    };



    fetch('./db.json')
    .then((response) => {
        if (response.status == 200) {
            return response.json()
        } else {
            console.error("Ошибка по адресу: " + response.url);
            console.error("Статус ошибки: " + + response.status);
            const container = document.querySelector('.product.spad');
            container.textContent = 'Упс, ничего не найдено!'
            container.classList.add('no-response');
        }
        
    })
    .then((data) =>{
        const ganres = new Set();
        const genreParams = new URLSearchParams(window.location.search).get('itemId');

        data.anime.forEach((item) =>{
            ganres.add(item.ganre);
        });



        if(genreParams){
            renderAnimeDetails(data.anime, genreParams);
        } else {
            console.log('Аниме отсутствует!');
        }
        
        renderGanreList(ganres);
    })
}

detailData();