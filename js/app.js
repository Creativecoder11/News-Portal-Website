const loadCategory = async() => {
    const url = 'https://openapi.programming-hero.com/api/news/categories';
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.data.news_category);
}

const displayCategory = (categories) =>{
    const categoriesContainer = document.getElementById('category-container');
    categories.forEach((category) => {
        const categoryDiv = document.createElement('div')
        categoryDiv.innerHTML=`
        <li class="category-list me-1 mb-2" onclick="detailsLoad(${category.category_id})">${category.category_name}</li>         
        `;
        categoriesContainer.appendChild(categoryDiv);
    });
    
} 

loadCategory();

const detailsLoad = async(allNews) => {
    toggleSpinner(true)

    const url = `https://openapi.programming-hero.com/api/news/category/0${allNews}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNews(data.data);
}



const displayNews = (displayAllNews) => {
    const displayItem = document.getElementById('newsItem')
    displayItem.innerHTML=`
        <p class="fs-4 fw-bold text-center">Total item found from categories: <span class="fs-3 item-number">${displayAllNews.length}</span></p>
    `;
    const detailsContainer = document.getElementById('post-container');
    detailsContainer.innerHTML = '';
   
    displayAllNews.forEach((posts) => {
        const postDiv = document.createElement('div')
        postDiv.innerHTML=`
        <div class="card card-container mb-3 shadow p-3 mb-5 bg-body rounded border-0 container ">
            <div class="row g-0">
                <div class="col-md-3">
                    <img src="${posts.thumbnail_url}" class="img-fluid rounded-start" alt="...">
                </div>
                <div class="col-md-8">
                    <div class="mt-4">
                        <h5 class="card-title">${posts.title}</h5>
                        <p class="card-text my-3">${posts.details.slice(0, 400)} ...</p>
                    </div>
                    <div class="d-flex mt-4 justify-content-between align-items-center"> 
                        <div class="d-flex">
                            <div class="me-3">
                                <img src="${posts.author.img}" class="rounded-circle" style="height: 60px; width: 60px" alt="..."> 
                            </div>
                            <div class="mt-1"> 
                                <h6 class="author-title">${posts.author.name ? posts.author.name:"<p class='text-danger'> Data Not Found </p>"}</h6>
                                <p>${posts.author.published_date ? posts.author.published_date:"<p class='text-danger' > Data Not Found </p>"}</p>
                            </div>
                        </div>
                        <div class="d-flex ms-5 mt-3">
                            <i class="fa-solid fa-eye me-2 mt-1"></i>
                            <p>${posts.total_view ? posts.total_view:"<p class='text-danger' > No Views </p>"}</p>
                        </div>
                        <div class="ms-5 d-none d-sm-block">
                            <i class="fa-solid fa-star"></i> 
                            <i class="fa-solid fa-star"></i> 
                            <i class="fa-solid fa-star"></i> 
                            <i class="fa-solid fa-star"></i> 
                            <i class="fa-solid fa-star-half-stroke"></i>
                        </div> 
                        <div class="ms-5">
                            <a href="#" onclick="loadModal('${posts._id}')" data-bs-toggle="modal" data-bs-target="#exampleModal"><i id="model-button" class="fs-4 fa-solid fa-square-arrow-up-right"></i></a>
                        </div>
                    </div>
                </?div>
            </div>
        </div>
        `;
        detailsContainer.appendChild(postDiv);
    });
    toggleSpinner(false);
}


const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if(isLoading){
        loaderSection.classList.remove('d-none');
    }
    else{
        loaderSection.classList.add('d-none');
    }
}

const loadModal= (postId) =>{

    const url =`https://openapi.programming-hero.com/api/news/${postId}`
    fetch(url)
    .then(res => res.json())
    .then(data => displayModal(data.data[0]))
}
    const displayModal = (modalDetail) => {

        const modalBody = document.getElementById('modal-body');
        modalBody.innerHTML=`
        <img class="img-fluid my-3" src="${modalDetail.image_url}" alt="">
        <h3>${modalDetail.title}</h3>
        <p>${modalDetail.details} </p>
    `
    }
detailsLoad(01);
