const mainData = () => {
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
            console.log(data)
        })
};

mainData();