const content = document.querySelector(".content")
const review = document.querySelector(".review")
const api = "https://dummyjson.com";

async function getData() {
    let query = new URLSearchParams(window.location.search)
    let id = query.get("q")
    const res = await fetch (`${api}/products/${id}`)
    res.json().then(res => createContent(res))
}
getData()

function createContent(data){
    content.innerHTML = `
            <img class="mb-[-111px]" src=${data.images[0]} alt="${data.category} width="50" height="50">
            <div class="cursor-pointer">
                <div class="w-[500px] p-4 h-[253px] border-[1px] border-white rounded-xl bg-gray-900 text-white hover:bg-white hover:text-blue-700 duration-300">
                    <p><strong class="text-[20px]">Title: </strong>${data.title}</p>
                    <br>
                    <p><strong class="text-[20px]">Description: </strong>${data.description}</p>
                    <br>
                    <p><strong class="text-[20px]">Category: </strong>${data.category}</p>
                </div>
                
                <div class="flex gap-[20px] mt-[50px] w-[500px] border-[1px] border-white rounded-xl bg-gray-900 text-white hover:bg-white hover:text-blue-700 duration-300">
                    <div class="w-[200px] p-4">
                        <p><strong>Brand: </strong>${data.brand}</p>
                        <p><strong>Weight: </strong>${data.weight}</p>
                        <p><strong>Discount: </strong>${data.discountPercentage}</p>
                        <p><strong>Stock: </strong>${data.stock}</p>
                        <p><strong>Raiting: </strong>${data.rating}</p>
                    </div>

                    <div class="w-[200px] p-4">
                        <p class="text-green-500 text-center ml-[50px] mb-[30px]"><strong>Price: $</strong>${data.price}</p>
                        <button class="relative  duration-500 group cursor-pointer text-sky-50  overflow-hidden h-14 w-56 rounded-md bg-sky-800 p-2 flex justify-center items-center font-extrabold">
                            <div class="absolute z-10 w-40 h-40 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-900 delay-150 group-hover:delay-75"></div>
                            <div class="absolute z-10 w-32 h-32 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-800 delay-150 group-hover:delay-100"></div>
                            <div class="absolute z-10 w-24 h-24 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-700 delay-150 group-hover:delay-150"></div>
                            <div class="absolute z-10 w-16 h-16 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-600 delay-150 group-hover:delay-200"></div>
                            <div class="absolute z-10 w-8 h-8 rounded-full group-hover:scale-150 transition-all  duration-500 ease-in-out bg-sky-500 delay-150 group-hover:delay-300"></div>
                            <p class="z-10">Buy</p>
                        </button>
                    </div>
                </div>
            </div>
            
    `
    data.reviews.forEach(item => {
        const elDiv = document.createElement("div")
        elDiv.className = "w-[300px] border-[1px] border-white text-white p-4 rounded-[10px] hover:bg-white hover:text-blue-700 duration-300"
        elDiv.innerHTML = `
            <h3 class="text-[20px] mb-[10px]">${item.comment}</h3>
            <p class="mb-[10px]">${item.reviewerName}</p>
            <div>
                ${`<i class="fa-solid fa-star"></i>`.repeat(item.rating)}
                ${`<i class="fa-regular fa-star"></i>`.repeat(5-item.rating)}
            </div>
        `
        review.appendChild(elDiv)
    });    
}