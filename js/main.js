/// <reference types="../@types/jquery" />


/**
Search meal by name
http://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata

Lookup full meal details by id
http://www.themealdb.com/api/json/v1/1/lookup.php?i=52772

Lookup a random meal
http://www.themealdb.com/api/json/v1/1/random.php

Latest Meals
http://www.themealdb.com/api/json/v1/1/latest.php

List all Categories, Area, Ingredients
http://www.themealdb.com/api/json/v1/1/list.php?c=list
http://www.themealdb.com/api/json/v1/1/list.php?a=list
http://www.themealdb.com/api/json/v1/1/list.php?i=list

Filter by ingredient
http://www.themealdb.com/api/json/v1/1/filter.php?i=chicken%20breast

Filter by Category
http://www.themealdb.com/api/json/v1/1/filter.php?c=Seafood




*/
// let dataShow = document.getElementById("dataShow");
let widthInner = $(".nav-tab").outerWidth(true);
let tpLi = '';
$(".side-nav-menu").animate({ left: `-${widthInner}px` }, 0);

function closeEle() {
    $(".open-close-icon").removeClass("fa-x").addClass("fa-align-justify")
    $("#nav-list li").hide(600)
    $(".side-nav-menu").animate({ left: `-${widthInner}px` }, 800);
}
function openEle() {
    $(".open-close-icon").removeClass("fa-align-justify").addClass("fa-x")
    $(".side-nav-menu").animate({ left: `0px` }, 800);
    $("#nav-list li").slideUp().show(800)
}
$(".open-close-icon").click(function () {
    let left = $(".side-nav-menu").css('left');
    console.log(widthInner)
    if (left == '0px') {
        closeEle()
    } else {
        openEle()

    }
})


async function getCategorys() {

    let myData = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`).catch((error) => {
        window.alert(error);
    })
    myData = await myData.json();
    let categorys = myData.categories;
    console.log(categorys)
    displayData(categorys)
}
async function getSpecificCat(category) {
    let myData = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`).catch((error) => {
        window.alert(error);
    })
    myData = await myData.json()
    let = myData.meals
    console.log(meals)
    dispalyMeals(meals)
}



async function getdetails(id) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).catch((err) => {
        window.alert(err)
    });
    data = await data.json();
    let myDetails = data.meals[0];
    console.log(myDetails)


    let myArr1 = [];
    let myArr2 = [];
    const keys = Object.keys(myDetails);
    keys.forEach(element => {
        element.includes("strIngredient") ? myArr1.push(element) : "";
        element.includes("strMeasure") ? myArr2.push(element) : "";
    });




    console.log(myArr1);
    console.log(myArr2);
    ingreMeasu(myArr1, myArr2, myDetails)


    displayData3(myDetails)

}


function ingreMeasu(arr, arr2, obbj) {
    tpLi = ""
    for (let i = 0; i < arr.length; i++) {
        if (obbj[arr2[i]] == null || obbj[arr2[i]] == "" || obbj[arr2[i]] == " ") {

        } else {

            tpLi += `
            <li class="alert alert-dark fw-medium rounded-3 p-2 m-2 ">${obbj[arr2[i]]} ${obbj[arr[i]]} </li>
            
            `
        }
    }
}


async function getArea() {
    let mydata = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`).catch((err) => window.alert(err));
    mydata = await mydata.json();
    let resArrObj = mydata.meals;
    console.log(resArrObj)
    displayArea(resArrObj)
}
// getArea()

async function getAreaMeals(area) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`).catch((e) => window.alert(e));
    data = await data.json();
    let resArrObj = data.meals;
    console.log(resArrObj)
    dispalyMeals(resArrObj)
}
function displayArea(arr) {
    let temp = "";
    arr.forEach((element) => {

        temp += `
        <div class="col-md-3 col-sm-12 ">
       <div onclick="getAreaMeals('${element.strArea}')" class="layer-parent text-center position-relative overflow-hidden rounded-3"> 
       <i class="fa-solid fa-house"></i>
        <h3>${element.strArea}</h3>
        
       </div>
      </div>
        `
    });
    $("#dataShow").html(temp)
}

getAreaMeals('Japanese')

async function getIngredients() {
    let mydata = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`).catch((err) => window.alert(err));
    mydata = await mydata.json();
    let resArrObj = mydata.meals.slice(0, 20);
    console.log(resArrObj)
    displayIngredients(resArrObj)
}
function displayIngredients(arr) {
    let temp = "";
    arr.forEach((element) => {
        let words = element.strDescription.split(" ");
        const limitedWords = words.slice(0, 25);
        const limitedParagraph = limitedWords.join(" ");
        temp += `
        <div class="col-md-3 col-sm-12  ">
       <div onclick="getIngredientsMeals('${element.strIngredient}')" class="layer-parent text-center position-relative overflow-hidden rounded-3"> 
       <i class="fa-solid fa-burger" style="color: #2491e5; font-size:4rem; "></i>
        <h3>${element.strIngredient}</h3>
        <p>${limitedParagraph}</p>
       </div>
      </div>
        `
    });
    $("#dataShow").html(temp)
}


async function getIngredientsMeals(ing) {
    let data = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ing}`).catch((e) => window.alert(e));
    data = await data.json();
    let resArrObj = data.meals;
    console.log(resArrObj)
    dispalyMeals(resArrObj);
}



// getdetails(52772)

function displayData(arr) {
    let temp = "";
    arr.forEach((element) => {

        temp += `
        <div class="col-md-3 col-sm-12 ">
       <div onclick="getSpecificCat('${element.strCategory}')" class="layer-parent position-relative overflow-hidden rounded-3">
        <img src="${element.strCategoryThumb}" class="w-100" alt="">
        <div class="layer position-absolute text-center ">
        <h3>${element.strCategory}</h3>
          <p maxlength="10" >${element.strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>      
        </div>
       </div>
      </div>
        `
    });
    $("#dataShow").html(temp)
}


function dispalyMeals(arr) {
    let temp2 = "";
    arr.forEach((element) => {
        temp2 += `
        <div class="col-md-3 col-sm-12 ">
       <div onclick="getdetails(${element.idMeal})" class="layer-parent position-relative overflow-hidden rounded-3">
        <img src="${element.strMealThumb}" class="w-100" alt="">
        <div class="layer position-absolute text-center ">
        <h4>${element.strMeal}</h4>
        </div>
       </div>
      </div>
        `
    });
    $("#dataShow").html(temp2)

}


function displayData3(obj) {
    let tags = '';
    if (obj.strTags !== null) {
        tags = obj.strTags;
    }
    let temp = "";


    temp = `
        <div class="row">
            <div class="col-md-4 text-sm-center">
                <img src="${obj.strMealThumb}" class="w-100 rounded-3" alt="">
                <h3>${obj.strMeal}</h3>
            </div>
            <div class="col-md-8  ps-sm-5">
                <h3>Instructions</h3>
                <p>
                ${obj.strInstructions}
                </p>
                <h3>Area : ${obj.strArea}</h3>
                <h3>Category : ${obj.strCategory}</h3>
                <h3>Recipes :</h3>
                <ul class="d-flex list-unstyled flex-wrap  text-center " >
                 ${tpLi}
                </ul>
                <h3>Tags :</h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                    
        <li class="alert alert-danger m-2 p-1">${tags}</li>
                </ul>
               
                <a href="${obj.strSource}" class="btn btn-success  ">Source</a>
                <a href="${obj.strYoutube}" class="btn btn-danger mx-2 ">Youtube</a>
            </div>

        </div>
        `;
    $("#dataShow").html(temp)
}




function nameValidation() {
    // if( document.getElementById("name").value)
    return (/^[a-zA-Z ]+$/.test(document.getElementById("name").value))
}

function emailValidation() {
    return (/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(document.getElementById("email").value))
}

// console.log(emailValidation())

function phoneValidation() {
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.getElementById("number").value))
}


function ageValidation() {
    return (/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test(document.getElementById("age").value))
}


function passwordValidation() {
    return (/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/.test(document.getElementById("password").value))
}

function repasswordValidation() {
    return document.getElementById("repasswordInput").value == document.getElementById("repassword").value
}





function contact() {

    let temp = `
   
   <div id="contact-form" class="row" >
   <div class="form-group col-md-5 col-sm-12">
    
     <input type="text"  class="form-control" id="name" name="name" placeholder="Enter your name" required>
     <div class="alert alert-danger alertName p-3">Special characters and numbers not allowed</div>
   </div>
   <div class="form-group col-md-5 col-sm-12">
     
     <input type="email"  class="form-control" id="email" name="email" placeholder="Enter your email" required>
     <div class="alert alert-danger alertEmail  p-3">Email not valid *exemple@yyy.zzz</div>

   </div>
   <div class="form-group col-md-5 col-sm-12">
      
       <input type="number"  class="form-control" id="number" name="number" placeholder="Enter your Number" required>
       <div class="alert alert-danger alertNum p-3">Enter valid Phone Number</div>

     </div>
     <div class="form-group col-md-5 col-sm-12">
       <input type="date"   class="form-control" id="age" name="age" placeholder="Enter your Age" required>
       <div class="alert alert-danger alertAge  p-3">Enter your Valid Age</div>
     </div>
     <div class="form-group col-md-5 col-sm-12">
       <input type="password"  class="form-control" id="password" name="password" placeholder="Password" required>
       <div class="alert alert-danger alertPass p-3">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>
     </div>
     <div class="form-group col-md-5 col-sm-12">
       <input type="password" class="form-control"  id="repassword" name="repassword" placeholder="Repassword" required>
       <div class="alert alert-danger  alertRepass p-3">Enter valid repassword</div>
     </div>
   
   <button type="submit" id="sub" disabled class="btn col-lg-10 btn-outline-danger ">Submit</button>
</div>
   
   `
    $("#repassword").keyup(function () {
        if (!passwordValidation()) {
            $(".alertRepass").css("display", "block");
        } else {
            $(".alertRepass").css("display", "none");

        }
    })
    $("#password").keyup(function () {
        if (!passwordValidation()) {
            $(".alertPass").css("display", "block");
        } else {
            $(".alertPass").css("display", "none");

        }
    })
    $("#dataShow").html(temp);
    $("#name").keyup(function () {
        if (!nameValidation()) {
            $(".alertName").css("display", "block");
        } else {
            $(".alertName").css("display", "none");

        }
    })
    $("#email").keyup(function () {
        if (!emailValidation()) {
            $(".alertEmail").css("display", "block");
        } else {
            $(".alertEmail").css("display", "none");

        }
    })
    $("#age").keyup(function () {
        if (!ageValidation()) {
            $(".alertAge").css("display", "block");
        } else {
            $(".alertAge").css("display", "none");

        }
    })
    $("#number").keyup(function () {
        if (!phoneValidation()) {
            $(".alertNum").css("display", "block");
        } else {
            $(".alertNum").css("display", "none");

        }
    })
    if ($(".alertPass").css("display") == "none") {
        $("#sub").removeAttr("disabled");
    }
}

// 
