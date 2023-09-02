
/////////common function///////////////////////
function loadingOpen() {
    $('.loading').fadeIn(10),
        $('body').css('overflow', 'hidden')
    $('#forSearch').css('display', 'none')

}
function loadingClose() {
    $(document).ready(function () {
        $('.loading').fadeOut(10, function () {
            $('body').css('overflow', 'auto')
        })
    })
}

getMeals()
let widths = $('#hidden').outerWidth()
$('#nav').css('left', -widths)
document.getElementById('Home').classList.remove('contact-class')
let left = true
$('#open').click(function () {
    $('#nav').css('display', 'flex')
    $('#nav').animate({ left: `0` }, 500)
    $('#open').css('display', 'none')
    $('#close').css('display', 'block')
    for (let i = 0; i < 5; i++) {
        $('.hight').eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
})
function closenav() {
    $('#nav').css('display', 'flex')
    $('#nav').animate({ left: `-${widths}` }, 500)
    $('#open').css('display', 'block')
    $('#close').css('display', 'none')
    for (let i = 0; i < 5; i++) {
        $('.hight').eq(i).animate({ top: 300 }, (i + 5) * 100)
    }
}
$('#close').click(function () {
    $('#nav').css('display', 'flex')
    $('#nav').animate({ left: `-${widths}` }, 500)
    $('#open').css('display', 'block')
    $('#close').css('display', 'none')
    for (let i = 0; i < 5; i++) {
        $('.hight').eq(i).animate({ top: 300 }, (i + 5) * 100)
    }
})




async function getMeals() {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`)
    if (response.ok && 400 != response.status) {
        let result = await response.json()
        loadingClose()
        let cartona = showMeals(result.meals)
        $('#random').html(cartona)
    }
}

function showMeals(data) {
    let cartona = ``
    for (let i = 0; i < data.length; i++) {
        cartona += `
        <div class="col-md-3" onClick="getCard('${data[i].strMeal}')">
        <div class="overflow-hidden meals position-relative rounded-2 cursor-pointer">
            <img src="${data[i].strMealThumb}" class="w-100 rounded" alt="">
            <div class="meal-over position-absolute rounded d-flex align-items-center text-black p-2">
                <h3>${data[i].strMeal}</h3>
            </div>
        </div>
    </div>`
    }
    return cartona
}


async function getCard(mealDetails) {
    loadingOpen()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealDetails}`)
    if (response.ok && 400 != response.status) {
        let result = await response.json()
        loadingClose()
        openCard(result.meals)
    }
}

function openCard(meal) {
    closenav()
    $('.innerLoading').css('display', 'none')
    let tags = meal[0].strTags?.split(",")
    let Tag = ``
    if (tags != undefined) {
        for (let i = 0; i < tags.length; i++) {
            Tag += `<li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
        }
    }
    let ingredients = ``
    for (let i = 1; i <= 20; i++) {
        if (meal[0][`strIngredient${i}`] != "") {
            ingredients += `<li class="alert alert-info m-2 p-1">${meal[0][`strMeasure${i}`]} ${meal[0][`strIngredient${i}`]}</li>`
        }
        else {
            break;
        }
    }
    let cartona = `    
    <div class="col-md-4 d-flex flex-column">
        <img src="${meal[0].strMealThumb}" class="w-100 rounded" alt="">
        <h3>${meal[0].strMeal}</h3>
    </div>
    <div class="col-md-8">
    <h2>Instructions</h2>
    <p>${meal[0].strInstructions}</p>
    <div class="d-flex font">
        <span class="font-weight-bold">Area :</span>
        <p class="mx-2 ">${meal[0].strArea}</p>
    </div>
    <div class="d-flex font">
        <span class="font-weight-bold">Category :</span>
        <p class="mx-2">${meal[0].strCategory}</p>
    </div>
    <div>
        <span class=" font font-weight-bold">Recipes:</span>
        <ul class="list-unstyled d-flex flex-wrap">${ingredients}</ul>
    </div>
    <div>
    <span class=" font font-weight-bold">Tags:</span>
    <ul class="list-unstyled d-flex flex-wrap">${Tag}</ul>
    
    <a target="_blank" href="${meal.strSource}" class="btn btn-success">Source</a>
    <a target="_blank" href="${meal.strYoutube}" class="btn btn-danger">Youtube</a>
    </div>
    </div>
    `
    document.getElementById('random').innerHTML = cartona
}


//////////////////searching section////////////////////////////////////////////////
async function searchingName(st) {
    $('.innerLoading').fadeIn(10)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${st}`)
    if (response.ok && 400 != response.status) {
        let result = await response.json()
        let cartona = showMeals(result.meals)
        $('#forSearch').html(cartona)
    }
}

async function searchingLetter(st) {
    $('.innerLoading').fadeIn(10)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${st}`)
    if (response.ok && 400 != response.status) {
        let result = await response.json()
        let cartona = showMeals(result.meals)
        $('#forSearch').html(cartona)
    }
}
function search() {
    closenav()
    $('#forSearch').css('display', 'flex')
    document.getElementById('Home').classList.remove('contact-class')
    cartona = `
    <div class="col-md-6">
    <input onkeyup="searchingName(this.value)" class="form-control form-control1" type="text" id="byName" placeholder="search by name">
    </div>
    <div class="col-md-6">
    <input onkeyup="searchingLetter(this.value)" class="form-control form-control1"  maxlength="1" type="text" id="byFirstLetter" placeholder="search by first letter">
    </div>
    `
    $('#random').html(cartona)
}




///=============>>>category section<<<<================/////////////////////////////////////
function category() {
    closenav()
    getCategories()
    document.getElementById('Home').classList.remove('contact-class')
    $('.innerLoading').css('display', 'none')
}
async function getCategories() {
    loadingOpen()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    if (response.ok && 400 != response.status) {
        let result = await response.json()
        loadingClose()
        showcategories(result.categories)
    }
}
function showcategories(data) {
    cartona = ``
    for (let i = 0; i < data.length; i++) {
        cartona += `
    <div class="col-md-3" onClick="showCategory('${data[i].strCategory}')">
        <div class="overflow-hidden meals position-relative rounded-2 cursor-pointer">
            <img src="${data[i].strCategoryThumb}" class="w-100 rounded" alt="">
            <div class="meal-over position-absolute rounded text-center text-black p-2 overflow-hidden">
                <h3>${data[i].strCategory}</h3>
                <div class=" text-black p-2 overflow-hidden">
                <p>${data[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
            </div>
        </div>
    </div>`
    }
    $('#random').html(cartona)
}
async function showCategory(category) {
    loadingOpen()
    closenav()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    if (response.ok && 400 != response.status) {
        let result = await response.json()
        loadingClose()
        let cartona = showMeals(result.meals)
        $('#random').html(cartona)
    }
}

///=============>>>area section<<<<================/////////////////////////////////////
function Area() {
    closenav()
    getAreas()
    document.getElementById('Home').classList.remove('contact-class')
    $('.innerLoading').css('display', 'none')
}
async function getAreas() {
    loadingOpen()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    if (response.ok && 400 != response.status) {
        let result = await response.json()
        loadingClose()
        showAreas(result.meals);
    }
}
function showAreas(data) {
    cartona = ``
    for (let i = 0; i < data.length; i++) {
        cartona += `
    <div class="col-md-3" onClick="showArea('${data[i].strArea}')">
        <div class="text-center meals poi">
        <i class="fa-solid fa-house fa-4x"></i>
            <div class="text-center">
                <h3>${data[i].strArea}</h3>
            </div>
        </div>
    </div>`
    }
    $('#random').html(cartona)
}
async function showArea(area) {
    loadingOpen()
    closenav()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    if (response.ok && 400 != response.status) {
        let result = await response.json()
        loadingClose()
        let cartona = showMeals(result.meals)
        $('#random').html(cartona)
    }
}



///=============>>>Ingredients section<<<<================//////////////////////////////////////////////
function ingredients() {
    closenav()
    getIngredients()
    document.getElementById('Home').classList.remove('contact-class')
    $('.innerLoading').css('display', 'none')
}
async function getIngredients() {
    loadingOpen()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    if (response.ok && 400 != response.status) {
        let result = await response.json()
        loadingClose()
        showIngredients(result.meals)
    }
}

function showIngredients(data) {
    cartona = ``
    for (let i = 0; i < 20; i++) {
        cartona += `
    <div class="col-md-3" onClick="showIngredientsMeals('${data[i].strIngredient}')">
        <div class="text-center meals poi">
        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
            <div class="text-center">
                <h3>${data[i].strIngredient}</h3>
                <p>${data[i].strDescription.split(" ").slice(0, 20).join(" ")}</p>
            </div>
        </div>
    </div>`
    }
    $('#random').html(cartona)
}
async function showIngredientsMeals(INgrediant) {
    loadingOpen()
    closenav()
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${INgrediant}`)
    if (response.ok && 400 != response.status) {
        let result = await response.json()
        loadingClose()
        let cartona = showMeals(result.meals)
        $('#random').html(cartona)
    }
}


///=============>>>contact Us section<<<<================//////////////////////////////////////////////

function contactUs() {
    closenav()
    document.getElementById('Home').classList.add('contact-class')
    $('.innerLoading').css('display', 'none')

    cartona = `    
        <div class="col-md-6 my-2">
            <input onkeyup="nameValidation(this.value)" type="text" id="Name" class="form-control" placeholder="Enter your Name">
            <div id="wrongname" class="d-none alert alert-danger p-3 mt-2">Special characters and numbers not allowed</div>
        </div>
        <div class="col-md-6 my-2">
            <input onkeyup="emailValidation(this.value)" type="email" id="email" class="form-control" placeholder="Enter your email">
            <div id="wrongEmail" class="d-none alert alert-danger p-3 mt-2">your email isnot valid</div>
            </div>
        <div class="col-md-6 my-2">
            <input onkeyup="telValidation(this.value)" type="tel" id="phone" class="form-control" placeholder="Enter your phone">
            <div id="wrongtel" class="d-none alert alert-danger p-3 mt-2">Enter valid phone number</div>
        </div>

        <div class="col-md-6 my-2">
            <input  onkeyup="ageValidation(this.value)" type="number" id="age" class="form-control" placeholder="Enter your age">
            <div id="wrongage" class="d-none alert alert-danger p-3 mt-2">Enter valid age</div>
        </div>
        <div class="col-md-6 my-2">
            <input onkeyup="passwordValidation(this.value)" type="password" id="password" class="form-control" placeholder="Enter your password">
            <div id="wrongpass" class="d-none alert alert-danger p-3 mt-2">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
        </div>
        <div class="col-md-6 my-2">
            <input onkeyup="repasswordValidation(this.value)" type="password" id="repassword" class="form-control" placeholder="Repassword">
            <div id="wrongrepass" class="d-none alert alert-danger p-3 mt-2">Enter valid repassword</div>
        </div>
        </div>
        <div class="col-md-12 my-2 text-center">
        <button class="btn btn-outline-danger " disabled id="submit">Submit</button>
    </div>
    `
    $('#random').html(cartona)
    ableButton()
}
let uname=false,uemail=false,uphone=false,uage=false,upass=false,urepass=false

function emailValidation(email) {
    let foremail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/
    if (foremail.test(email) == false) {
        document.getElementById('wrongEmail').classList.replace("d-none","d-block")
        uemail=false
    }
    else {
        document.getElementById('wrongEmail').classList.replace("d-block","d-none")
        uemail=true
    }
    ableButton()
}
function telValidation(tel) {
    let fortel =/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    if (fortel.test(tel) == false) {
        document.getElementById('wrongtel').classList.replace("d-none","d-block")
        uphone=false
    }
    else {
        document.getElementById('wrongtel').classList.replace("d-block","d-none")
        uphone= true
    }
    ableButton()
}
function ageValidation(age) {
    let forage =/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/
    if (forage.test(age) == false) {
        document.getElementById('wrongage').classList.replace("d-none","d-block")
        uage=false
    }
    else {
        uage=true
        document.getElementById('wrongage').classList.replace("d-block","d-none")
    }
    ableButton()
}
let thisPass=``
function passwordValidation(password){
    let forage =/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
    if (forage.test(password) == false) {
        document.getElementById('wrongpass').classList.replace("d-none","d-block")
        upass= false
    }
    else {
        document.getElementById('wrongpass').classList.replace("d-block","d-none")
        thisPass=password
        upass= true
    }
    ableButton()
}
function repasswordValidation(repassword){
    if (repassword!=thisPass) {
        document.getElementById('wrongrepass').classList.replace("d-none","d-block")
        urepass= false
    }
    else {
        document.getElementById('wrongrepass').classList.replace("d-block","d-none")
        urepass= true
    }ableButton()
}
function nameValidation(name){
    let forname =/^[a-zA-Z ]+$/
    if (forname.test(name) == false) {
        document.getElementById('wrongname').classList.replace("d-none","d-block")
        uname= false
    }
    else {
        document.getElementById('wrongname').classList.replace("d-block","d-none")
        uname= true
    }
    ableButton()
}
function ableButton(){
    if(uname==true&&uemail==true&&uage==true&&uphone==true&&upass==true&&urepass==true)
    {
        document.getElementById('submit').removeAttribute("disabled")
    }

}