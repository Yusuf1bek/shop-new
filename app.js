const wrapper = document.querySelector(".wrapper")
const loading = document.querySelector(".loading")
const btn = document.querySelector(".btn")
const category = document.querySelector(".category")

const api = "https://dummyjson.com"

let limitCount = 4
let offset = 1  

async function getData(endpoint, count) {
    const response = await fetch(`${api}/${endpoint}?limit=${limitCount * count}`)
    response
        .json()
        .then((res) => createProduct(res))
        .catch((err) => console.log(err))
        .finally(() => {
        loading.style.display = "none"
    })
}
getData("products", offset)

function createProduct(data){
    while(wrapper.firstChild){
        wrapper.firstChild.remove()
    }
    data.products.forEach(product => {
        const card = document.createElement("div")
        card.dataset.id = product.id
        card.className = "card w-[300px] p-[15px] border-[1px] border-blue-200 rounded-xl shadow-md"
        card.innerHTML= ` 
            <img data=id=${product.id} class="card_img w-full h-[250px] cursor-pointer object-contain" src=${product.images[0]} alt="Img">
            <h3><strong class="text-[20px] font-bold">Title:</strong> ${product.title}</h3>
            <p><strong class="text-[20px] font-bold">Category:</strong> ${product.category}</p>
            <div class="flex gap-[100px] mt-[10px]">
                <strong class="text-green-400 text-[20px] font-bold">$${product.price}</strong>
                <button class="relative  duration-500 group cursor-pointer text-sky-50  overflow-hidden h-14 w-56 rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold">
                    <div class="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-900 delay-150 group-hover:delay-75"></div>
                    <div class="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-800 delay-150 group-hover:delay-100"></div>
                    <div class="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-700 delay-150 group-hover:delay-150"></div>
                    <div class="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-600 delay-150 group-hover:delay-200"></div>
                    <div class="absolute z-10 w-8 h-8 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-500 delay-150 group-hover:delay-300"></div>
                    <p class="z-10">Buy</p>
                </button>

            </div>
        `
        wrapper.appendChild(card)
    });
}

async function getCategory(endpoint) {
    const res = await fetch(`${api}/${endpoint}`)
    res.json().then(res => createCategory(res))
}
getCategory("products/category-list")

let categoryType = "products"
function createCategory(data){
    data.forEach(item => {
        const elLi = document.createElement("li")
        const elData = document.createElement("data")
        elLi.classList = "category_item bg-blue-500 rounded-md px-1 mb-[10px] text-white hover:bg-white hover:text-blue-500 duration-300 cursor-pointer"
        
        elData.innerHTML =  item
        elData.setAttribute("value", `/category/${item}`)
        
        elData.addEventListener("click", (e) =>{
            categoryType = "products/" + e.target.value
            getData(categoryType, offset)
        })
        
        elLi.appendChild(elData)
        category.appendChild(elLi)
    });
}
btn.addEventListener("click", () =>{
    offset++
    getData(categoryType, offset)
})

wrapper.addEventListener("click", (e) => {
    if (e.target.classList.contains("card_img")) {
        let id = e.target.closest(".card").dataset.id;
        open(`/pages/about.html?q=${id}`, "_self")
    }
});
