// Function to insert values in String
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
  };

try{  
  // URL example: /product.html?id=product_name
  params = window.location.search.split("id=")[1]
  id = params.split("&")[0]
  
  path = "./products/{}.json".format(id)

  $.ajax({
    url: path,
    cache: false,
    dataType: "json",
    success: (data) => loadContents(data)
    })
} catch (e) {
    console.log("Error report: ", e)
} 

function loadContents(data){
  console.log(data)
  var title = data["title"];
  var description = data["description"];
  var images = data["images"];
  var advantages = decorate(data["advantages"]);
  var how =  decorate(data["how-to-use"]);
  var available = data["available"];
  var prev = data["prev"];
  var next = data["next"];

  var isHomeCare = data["home-care"]
  if(isHomeCare){
    document.body.style.background = "url('./assets/img/products-bg2.jpg') no-repeat"
    document.body.style.backgroundSize = "cover";
  }

  document.getElementById("title").innerHTML += `${title}`
  document.getElementById("description").innerHTML = `${description}`
  document.getElementById("advantages").innerHTML = `${advantages}`
  document.getElementById("how-to-use").innerHTML = `${how}`
  document.getElementById("images").innerHTML = createImages(images)
  document.getElementById("defaultImage").style = "display:none"
  document.getElementById("available").innerHTML = `${available}`
  document.getElementById("prev").href +=  `${prev}`
  document.getElementById("next").href +=  `${next}`

  // Portfolio details carousel
  $(".owl-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    items: 1
  });

  $(document).ready(function() {
    $('.owl-carousel').magnificPopup({
      delegate: 'a',
      type:'image',
      gallery:{
        enabled:true,
        tCounter: ''
        }
      });
  });
}

function decorate(inputArray) {
  var outputString = "<ul class='bx-ul'>";
  inputArray.forEach((inputString) => {
    inputString = inputString.replace("(-)", "<li><i class='bx bx-merge'></i>")
    outputString += inputString + "</li>"
  })

  return outputString + "</ul>"
}

function createImages(imagesArray) {
  const base = '<a href="./{}"><img src="{}" class="img-fluid"/></a>';
  var imgs = ""
  imagesArray.forEach(imageSrc => {
    var img = base.format(imageSrc, imageSrc);
    imgs += img
  });
  console.log(imgs);
  return imgs
}

