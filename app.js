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
        card.className = "card w-[300px] p-[15px] border-[1px] border-blue-200 rounded-xl shadow-md"
        card.innerHTML= ` 
            <img class="w-full h-[250px] object-contain" src=${product.images[0]} alt="Img">
            <h3><strong class="text-[20px] font-bold">Title:</strong> ${product.title}</h3>
            <p><strong class="text-[20px] font-bold">Category:</strong> ${product.category}</p>
            <div class="flex gap-[100px] mt-[10px]">
                <strong class="text-green-400 text-[20px] font-bold">$${product.price}</strong>
                <button class="cursor-pointer text-white font-bold relative text-[14px] w-[9em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[30px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[35px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700 hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px]">Buy</button>
            </div>
        `
        wrapper.appendChild(card)
    });
}
btn.addEventListener("click", () =>{
    offset++
    getData("products", offset)
})

async function getCategory(endpoint) {
    const res = await fetch(`${api}/${endpoint}`)
    res.json().then(res => createCategory(res))
}
getCategory("products/category-list")

function createCategory(data){
    data.forEach(item => {
         const elLi = document.createElement("li")
        const elData = document.createElement("data")
        elLi.classList = "category_item bg-blue-500 rounded-md px-1 mb-[10px]"

        elData.innerHTML =  item
        elData.setAttribute("value", `/category/${item}`)
        
        elData.addEventListener("click", (e) =>{
            getData(`products${e.target.value}`, offset)
        })

        elLi.appendChild(elData)
        category.appendChild(elLi)
    });
}
elSearchInput.addEventListener("keyup", function(evt) {
    const searachValue = evt.target.value.toLowerCase();
    const filteredUsers = countrys.filter(item => item.name.toLowerCase().includes(searachValue));
    renderCountries(filteredUsers);
});