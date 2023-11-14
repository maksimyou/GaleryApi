const mainContentItems = document.querySelector('.main_content_items')
const loader = document.querySelector('.loader')

const closeOpen = document.querySelector('.close-open')
const closeModal = document.querySelector('.close-modal')
const fullPhoto = document.querySelector('.full-photo')
const modalFullPhoto = document.querySelector('.modal-fullPhoto')



const searchBtn = document.querySelector('.header_search_btn')
const searchInput = document.querySelector('.header_search_input')

const prev = document.querySelector('.prev')
const next = document.querySelector('.next')
const current1 = document.querySelector('.current-1')
const current2 = document.querySelector('.current-2')
const current3 = document.querySelector('.current-3')
const ACCES_KEY = 'GSbi5Ybuq-1fDtL5jpEy0c8dIV96IaAYalhMmWrMajo'
let page = 1
let isLoad = false;

const start = () => {
    isLoad = false;

    if (!isLoad) {
        mainContentItems.style.display = 'none'
        loader.style.display = 'flex'
    }

    fetch(`https://api.unsplash.com/photos`, {
        headers: { Authorization: `Client-ID ${ACCES_KEY}` }
    })
        .then(res => res.json())
        .then(data => {
            isLoad = true
            if (isLoad) {
                mainContentItems.style.display = 'grid'
                loader.style.display = 'none'
            }
            console.log(data)
            createGalery(data)
        })

}
start()

prev.addEventListener('click', () => {
    page -= 3
    if (page <= 1) {
        page = 1;
        current1.textContent = 1
        current2.textContent = 2
        current3.textContent = 3

    } else {
        current1.textContent = page
        current2.textContent = page - 1
        current3.textContent = page - 2
    }

    showBtn()
    btnActive(0)
    apiPage();
})

next.addEventListener('click', () => {
    page += 3
    current1.textContent = page
    current2.textContent = page + 1
    current3.textContent = page + 2
    if (page <= 0) {
        page = 1;
        current1.textContent = 98
        current2.textContent = 99
        current3.textContent = 100
    }
    showBtn()
    btnActive(0)
    apiPage()
    console.log(page)

})

current1.addEventListener('click', () => {
    btnActive(0)
    apiPage(1)
})
current2.addEventListener('click', () => {
    btnActive(1)
    apiPage(2)
})

current3.addEventListener('click', () => {
    btnActive(2)
    apiPage(3)
})

searchBtn.addEventListener('click', () => {
    console.log(searchInput.value)
    searchApi(searchInput.value);
})
closeModal.addEventListener('click', () => {
    modalFullPhoto.style.display = "none"
})

closeOpen.addEventListener('click', () => {
    fullscreenFunc()
})

const createElem = (tag, strClass) => {
    const elem = document.createElement(tag);
    elem.classList.add(strClass)
    return elem;
}


const showBtn = () => {
    if (page <= 1) {
        prev.style.display = 'none';
        next.style.display = 'block';
    } else if (page + 3 >= 100) {
        prev.style.display = 'block';
        next.style.display = 'none';
    } else if (page < 100 && page > 1) {
        prev.style.display = 'block';
        next.style.display = 'block';
    }
}

const apiPage = (num = 0) => {
    isLoad = false;

    if (!isLoad) {
        mainContentItems.style.display = 'none'
        loader.style.display = 'flex'
    }


    fetch(`https://api.unsplash.com/photos?page=${page + num}`, {
        headers: { Authorization: `Client-ID ${ACCES_KEY}` }
    })
        .then(res => res.json())
        .then(data => {
            isLoad = true
            if (isLoad) {
                mainContentItems.style.display = 'grid'
                loader.style.display = 'none'
            }
            console.log(data)
            createGalery(data)
        })
}

const btnActive = (num) => {
    let arr = [current1, current2, current3];
    arr.forEach(e => { e.classList.remove('active-page') });
    arr[num].classList.add('active-page')
}

const createGalery = (arr) => {
    mainContentItems.innerHTML = '';
    for (let i = 0; i < arr.length; i++) {
        const elem = createElem('div', 'main_content_item')
        elem.addEventListener('click', () => {
            fullPhotoShow(arr[i].urls.full)
        })
        const elemImg = createElem('img', 'main-img')
        elemImg.src = arr[i].urls.small
        elem.append(elemImg)
        mainContentItems.append(elem)
    }
}

const searchApi = (search) => {
    let strLocal = JSON.stringify(search);
    localStorage.setItem('search', strLocal)

    isLoad = false;
    if (!isLoad) {
        mainContentItems.style.display = 'none'
        loader.style.display = 'flex'
    }


    fetch(`https://api.unsplash.com/search/photos?page=1&query=${search}`, {
        headers: { Authorization: `Client-ID ${ACCES_KEY}` }
    })
        .then(res => res.json())
        .then(data => {
            isLoad = true
            if (isLoad) {
                mainContentItems.style.display = 'grid'
                loader.style.display = 'none'
            }
            console.log(data)
            createGalery(data.results)
        })

}

const fullPhotoShow = (link) => {

    modalFullPhoto.style.display = 'flex';
    fullPhoto.src = link;

}

const fullscreenFunc = () => {
    if (document.fullscreenElement) {
        const cancellFullScreen = document.exitFullscreen || document.mozCancelFullScreen || document.webkitExitFullscreen || document.msExitFullscreen;
        cancellFullScreen.call(document);
    } else {
        fullPhoto.requestFullscreen()
    }
}
