export enum TEMPLATE_CATEGORIES {
  "PERSONAL_PAGES" = "Personal Pages",
  "COMPANY_PAGES" = "Company Pages",
}

export const PERSONAL_TEMPLATES = [
  {
    templateId: "",
    thumbnail:
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1OTU4NTJ8MHwxfHNlYXJjaHw0fHx3YXRjaHxlbnwwfDB8fHwxNzIwNzIzMjM0fDA&ixlib=rb-4.0.3&q=85",
    style: "",
    backgroundColor: "#E0F7FA",
    components: `
		<div class="flex flex-col justify-center items-center" ><body class="bg-primary-light font-sans">
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-12">
        <!-- Header Section -->
        <div class="text-center">
            <img src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1OTU4NTJ8MHwxfHNlYXJjaHw0fHx3YXRjaHxlbnwwfDB8fHwxNzIwNzIzMjM0fDA&ixlib=rb-4.0.3&q=85" alt="Watch Company Logo" class="mx-auto w-24 h-24">
            <h1 class="text-4xl font-bold mt-4 text-primary-dark">Discover Timeless Elegance</h1>
            <p class="mt-2 text-lg text-gray-700">Exquisite Watches for Every Occasion</p>
        </div>

        <!-- Hero Section -->
        <div class="relative mt-6">
            <img src="https://images.unsplash.com/photo-1623998021450-85c29c644e0d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1OTU4NTJ8MHwxfHNlYXJjaHwxNnx8d2F0Y2h8ZW58MHwwfHx8MTcyMDcyMzI2M3ww&ixlib=rb-4.0.3&q=85" alt="Hero Image" class="w-full h-64 object-cover rounded-lg shadow-lg">
            <div class="absolute inset-0 bg-blue-900 bg-opacity-50 flex items-center justify-center">
                <h2 class="text-2xl font-semibold text-white tracking-wide">Introducing Our Latest Collection</h2>
            </div>
        </div>

        <!-- Introduction Section -->
        <div class="mt-8 px-6">
            <h2 class="text-2xl font-semibold mb-4 text-primary-dark">Elevating Your Style</h2>
            <p class="text-gray-700 mb-6">Explore our newest range of watches, designed with precision and crafted with passion. Each timepiece is a blend of timeless elegance and modern sophistication.</p>
            <ul class="list-disc pl-5 text-gray-700 mb-6">
                <li>Swiss-Made Movements</li>
                <li>Luxurious Materials</li>
                <li>Water-Resistant up to 100m</li>
                <li>2-Year Warranty</li>
            </ul>
            
            <div class="text-center">
                <a href="your-website-url-here" class="btn-primary px-8 py-4 rounded-full text-lg font-bold transition duration-300">Explore Now</a>
            </div>
        </div>

        <!-- Featured Watches Section -->
        <div class="mt-8 px-6">
            <h3 class="text-xl font-semibold mb-4 text-primary-dark">Featured Watches</h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="bg-gray-50 p-6 rounded-lg shadow-md text-center">
                    <img src="https://images.unsplash.com/photo-1604242692760-2f7b0c26856d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1OTU4NTJ8MHwxfHNlYXJjaHwxOHx8d2F0Y2h8ZW58MHwwfHx8MTcyMDcyMzI2M3ww&ixlib=rb-4.0.3&q=85" alt="Featured Watch 1" class="mx-auto w-48 h-auto mb-4 rounded-lg transition duration-300 transform hover:scale-105">
                    <h4 class="text-lg font-semibold text-primary-dark">Classic Silver</h4>
                    <p class="text-gray-700">$299.00</p>
                </div>
                <div class="bg-gray-50 p-6 rounded-lg shadow-md text-center">
                    <img src="https://images.unsplash.com/photo-1554151447-b9d2197448f9?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1OTU4NTJ8MHwxfHNlYXJjaHwzNXx8d2F0Y2h8ZW58MHwwfHx8MTcyMDcyMzMwMHww&ixlib=rb-4.0.3&q=85" alt="Featured Watch 2" class="mx-auto w-48 h-auto mb-4 rounded-lg transition duration-300 transform hover:scale-105">
                    <h4 class="text-lg font-semibold text-primary-dark">Modern Black</h4>
                    <p class="text-gray-700">$349.00</p>
                </div>
            </div>
        </div>

        <!-- Customer Testimonials Section -->
        <div class="mt-8 px-6">
            <h3 class="text-xl font-semibold mb-2 text-primary-dark">Customer Testimonials</h3>
            <div class="space-y-6">
                <blockquote class="bg-gray-50 p-4 rounded-lg shadow-md italic border-l-4 pl-4 border-primary-dark">
                    "The Classic Silver watch is a timeless addition to my  collection. I love the quality and design!" - Alex Johnson
                </blockquote>
                <blockquote class="bg-gray-50 p-4 rounded-lg shadow-md italic border-l-4 pl-4 border-primary-dark">
                    "The Modern Black watch is sleek and sophisticated. I wear it every day." - Sarah Williams
                </blockquote>
            </div>
        </div>

        <!-- Follow Us Section -->
        <div class="text-center mt-8">
            <button class="btn-primary px-6 py-3 rounded-full font-bold text-lg hover:bg-blue-600 transition duration-300">Follow Us</button>
        </div>

        <!-- Footer Section -->
        <div class="border-t mt-8 pt-6 text-center text-gray-700">
            <p>Thank you for choosing our watch company.</p>
            <p>For more information, visit our <a href="your-website-url-here" class="text-accent">website</a> or contact us at <a href="mailto:support@watchcompany.com" class="text-accent">support@watchcompany.com</a>.</p>
            <p class="mt-2">© 2023 Watch Company. All rights reserved.</p>
        </div>
    </div>
</body></div>
`,
    heading: "Watch",
  },
  {
    templateId: "",
    thumbnail:
      "https://images.unsplash.com/photo-1526947425960-945c6e72858f?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1OTU4NTJ8MHwxfHNlYXJjaHw5fHxmYWNlJTIwY3JlYW18ZW58MHwwfHx8MTcyMDY5MzU2M3ww&ixlib=rb-4.0.3&q=85",
    style: "",
    backgroundColor: "#cac5c5",
    components: `
		<div class="flex flex-col justify-center items-center" >
		<body class="bg-gray-100 font-sans">
    <div class="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg mt-12">
        <div class="text-center">
            <img src="https://images.unsplash.com/photo-1601049315503-07926a49f521?crop=entropy&cs=srgb&fm=jpg&ixid=M3w1OTU4NTJ8MHwxfHNlYXJjaHwyfHxmYWNlJTIwY3JlYW18ZW58MHwwfHx8MTcyMDY5MzU2M3ww&ixlib=rb-4.0.3&q=85" alt="Matrixly Logo" class="mx-auto w-24 h-24">
            <h1 class="text-3xl font-bold mt-4">Welcome to Matrixly!</h1>
            <p class="mt-2 text-gray-600">Unlock the Power of Nature for Your Skin</p>
        </div>

        <div class="mt-6">
            <h2 class="text-2xl font-semibold mb-3">Introducing our Revolutionary Face Cream</h2>
            <p class="text-gray-700 mb-4">Matrixly brings you the finest face cream crafted from small, potent plants. Experience the essence of nature and achieve radiant, youthful skin with our exclusive formula.</p>
            <ul class="list-disc pl-5 text-gray-700 mb-6">
                <li>All-natural ingredients</li>
                <li>Perfect for all skin types</li>
                <li>Vegan and cruelty-free</li>
                <li>Clinically proven results</li>
            </ul>
            
            <div class="text-center">
                <a href="your-website-url-here" class="bg-green-500 text-white px-6 py-3 rounded-full font-bold text-lg hover:bg-green-600 transition duration-300">Shop Now</a>
            </div>
        </div>

        <div class="border-t mt-8 pt-6">
            <h3 class="text-xl font-semibold mb-2">Why Choose Matrixly?</h3>
            <p class="text-gray-700">Our mission is to provide you with skin care solutions that are rooted in the power of nature. Our face cream combines science and nature to give you visibly healthier and more youthful skin.</p>
        </div>

        <div class="border-t mt-6 pt-6">
            <h3 class="text-xl font-semibold mb-2">Hear from Our Satisfied Customers</h3>
            <blockquote class="text-gray-700 italic border-l-4 pl-4 border-green-500 mb-6">
                "Matrixly has transformed my skin! I’ve never felt more confident and beautiful." - Jane Doe
            </blockquote>
            <blockquote class="text-gray-700 italic border-l-4 pl-4 border-green-500">
                "The best face cream I’ve ever used. My skin feels amazing!" - John Smith
            </blockquote>
        </div>

        <div class="text-center mt-6">
            <button class="bg-blue-500 text-white px-6 py-2 rounded-full font-bold text-lg hover:bg-blue-600 transition duration-300">Follow Us</button>
        </div>

        <div class="border-t mt-6 pt-6 text-center text-gray-600">
            <p>Thank you for choosing Matrixly.</p>
            <p>For more information, visit our <a href="your-website-url-here" class="text-green-500">website</a> or contact us at <a href="mailto:support@matrixly.com" class="text-green-500">support@matrixly.com</a>.</p>
            <p class="mt-2">© 2023 Matrixly. All rights reserved.</p>
        </div>
    </div>
</body>
  </div>`,
    heading: "Face Cream",
  },

  {
    templateId: "",
    thumbnail: "https://www.w3schools.com/w3images/ny.jpg",
    style: "",
    backgroundColor: "#cac5c5",
    components: `<!DOCTYPE html>
<html lang="en">
<head>
<title>W3.CSS Template</title>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Lato">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
<style>
body {font-family: "Lato", sans-serif}
.mySlides {display: none}
</style>
</head>
<body>

<!-- Navbar -->
<div class="w3-top">
  <div class="w3-bar w3-black w3-card">
    <a class="w3-bar-item w3-button w3-padding-large w3-hide-medium w3-hide-large w3-right" href="javascript:void(0)" onclick="myFunction()" title="Toggle Navigation Menu"><i class="fa fa-bars"></i></a>
    <a href="#" class="w3-bar-item w3-button w3-padding-large">HOME</a>
    <a href="#band" class="w3-bar-item w3-button w3-padding-large w3-hide-small">BAND</a>
    <a href="#tour" class="w3-bar-item w3-button w3-padding-large w3-hide-small">TOUR</a>
    <a href="#contact" class="w3-bar-item w3-button w3-padding-large w3-hide-small">CONTACT</a>
    <div class="w3-dropdown-hover w3-hide-small">
      <button class="w3-padding-large w3-button" title="More">MORE <i class="fa fa-caret-down"></i></button>     
      <div class="w3-dropdown-content w3-bar-block w3-card-4">
        <a href="#" class="w3-bar-item w3-button">Merchandise</a>
        <a href="#" class="w3-bar-item w3-button">Extras</a>
        <a href="#" class="w3-bar-item w3-button">Media</a>
      </div>
    </div>
    <a href="javascript:void(0)" class="w3-padding-large w3-hover-red w3-hide-small w3-right"><i class="fa fa-search"></i></a>
  </div>
</div>

<!-- Navbar on small screens (remove the onclick attribute if you want the navbar to always show on top of the content when clicking on the links) -->
<div id="navDemo" class="w3-bar-block w3-black w3-hide w3-hide-large w3-hide-medium w3-top" style="margin-top:46px">
  <a href="#band" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">BAND</a>
  <a href="#tour" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">TOUR</a>
  <a href="#contact" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">CONTACT</a>
  <a href="#" class="w3-bar-item w3-button w3-padding-large" onclick="myFunction()">MERCH</a>
</div>

<!-- Page content -->
<div class="w3-content" style="max-width:2000px;margin-top:46px">

  <!-- Automatic Slideshow Images -->
  <div class="mySlides w3-display-container w3-center">
    <img src="/w3images/la.jpg" style="width:100%">
    <div class="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small">
      <h3>Los Angeles</h3>
      <p><b>We had the best time playing at Venice Beach!</b></p>   
    </div>
  </div>
  <div class="mySlides w3-display-container w3-center">
    <img src="/w3images/ny.jpg" style="width:100%">
    <div class="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small">
      <h3>New York</h3>
      <p><b>The atmosphere in New York is lorem ipsum.</b></p>    
    </div>
  </div>
  <div class="mySlides w3-display-container w3-center">
    <img src="/w3images/chicago.jpg" style="width:100%">
    <div class="w3-display-bottommiddle w3-container w3-text-white w3-padding-32 w3-hide-small">
      <h3>Chicago</h3>
      <p><b>Thank you, Chicago - A night we won't forget.</b></p>    
    </div>
  </div>

  <!-- The Band Section -->
  <div class="w3-container w3-content w3-center w3-padding-64" style="max-width:800px" id="band">
    <h2 class="w3-wide">THE BAND</h2>
    <p class="w3-opacity"><i>We love music</i></p>
    <p class="w3-justify">We have created a fictional band website. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
      ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <div class="w3-row w3-padding-32">
      <div class="w3-third">
        <p>Name</p>
        <img src="/w3images/bandmember.jpg" class="w3-round w3-margin-bottom" alt="Random Name" style="width:60%">
      </div>
      <div class="w3-third">
        <p>Name</p>
        <img src="/w3images/bandmember.jpg" class="w3-round w3-margin-bottom" alt="Random Name" style="width:60%">
      </div>
      <div class="w3-third">
        <p>Name</p>
        <img src="/w3images/bandmember.jpg" class="w3-round" alt="Random Name" style="width:60%">
      </div>
    </div>
  </div>

  <!-- The Tour Section -->
  <div class="w3-black" id="tour">
    <div class="w3-container w3-content w3-padding-64" style="max-width:800px">
      <h2 class="w3-wide w3-center">TOUR DATES</h2>
      <p class="w3-opacity w3-center"><i>Remember to book your tickets!</i></p><br>

      <ul class="w3-ul w3-border w3-white w3-text-grey">
        <li class="w3-padding">September <span class="w3-tag w3-red w3-margin-left">Sold out</span></li>
        <li class="w3-padding">October <span class="w3-tag w3-red w3-margin-left">Sold out</span></li>
        <li class="w3-padding">November <span class="w3-badge w3-right w3-margin-right">3</span></li>
      </ul>

      <div class="w3-row-padding w3-padding-32" style="margin:0 -16px">
        <div class="w3-third w3-margin-bottom">
          <img src="/w3images/newyork.jpg" alt="New York" style="width:100%" class="w3-hover-opacity">
          <div class="w3-container w3-white">
            <p><b>New York</b></p>
            <p class="w3-opacity">Fri 27 Nov 2016</p>
            <p>Praesent tincidunt sed tellus ut rutrum sed vitae justo.</p>
            <button class="w3-button w3-black w3-margin-bottom" onclick="document.getElementById('ticketModal').style.display='block'">Buy Tickets</button>
          </div>
        </div>
        <div class="w3-third w3-margin-bottom">
          <img src="/w3images/paris.jpg" alt="Paris" style="width:100%" class="w3-hover-opacity">
          <div class="w3-container w3-white">
            <p><b>Paris</b></p>
            <p class="w3-opacity">Sat 28 Nov 2016</p>
            <p>Praesent tincidunt sed tellus ut rutrum sed vitae justo.</p>
            <button class="w3-button w3-black w3-margin-bottom" onclick="document.getElementById('ticketModal').style.display='block'">Buy Tickets</button>
          </div>
        </div>
        <div class="w3-third w3-margin-bottom">
          <img src="/w3images/sanfran.jpg" alt="San Francisco" style="width:100%" class="w3-hover-opacity">
          <div class="w3-container w3-white">
            <p><b>San Francisco</b></p>
            <p class="w3-opacity">Sun 29 Nov 2016</p>
            <p>Praesent tincidunt sed tellus ut rutrum sed vitae justo.</p>
            <button class="w3-button w3-black w3-margin-bottom" onclick="document.getElementById('ticketModal').style.display='block'">Buy Tickets</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Ticket Modal -->
  <div id="ticketModal" class="w3-modal">
    <div class="w3-modal-content w3-animate-top w3-card-4">
      <header class="w3-container w3-teal w3-center w3-padding-32"> 
        <span onclick="document.getElementById('ticketModal').style.display='none'" 
       class="w3-button w3-teal w3-xlarge w3-display-topright">×</span>
        <h2 class="w3-wide"><i class="fa fa-suitcase w3-margin-right"></i>Tickets</h2>
      </header>
      <div class="w3-container">
        <p><label><i class="fa fa-shopping-cart"></i> Tickets, $15 per person</label></p>
        <input class="w3-input w3-border" type="text" placeholder="How many?">
        <p><label><i class="fa fa-user"></i> Send To</label></p>
        <input class="w3-input w3-border" type="text" placeholder="Enter email">
        <button class="w3-button w3-block w3-teal w3-padding-16 w3-section w3-right">PAY <i class="fa fa-check"></i></button>
        <button class="w3-button w3-red w3-section" onclick="document.getElementById('ticketModal').style.display='none'">Close <i class="fa fa-remove"></i></button>
        <p class="w3-right">Need <a href="#" class="w3-text-blue">help?</a></p>
      </div>
    </div>
  </div>

  <!-- The Contact Section -->
  <div class="w3-container w3-content w3-padding-64" style="max-width:800px" id="contact">
    <h2 class="w3-wide w3-center">CONTACT</h2>
    <p class="w3-opacity w3-center"><i>Fan? Drop a note!</i></p>
    <div class="w3-row w3-padding-32">
      <div class="w3-col m6 w3-large w3-margin-bottom">
        <i class="fa fa-map-marker" style="width:30px"></i> Chicago, US<br>
        <i class="fa fa-phone" style="width:30px"></i> Phone: +00 151515<br>
        <i class="fa fa-envelope" style="width:30px"> </i> Email: mail@mail.com<br>
      </div>
      <div class="w3-col m6">
        <form action="/action_page.php" target="_blank">
          <div class="w3-row-padding" style="margin:0 -16px 8px -16px">
            <div class="w3-half">
              <input class="w3-input w3-border" type="text" placeholder="Name" required name="Name">
            </div>
            <div class="w3-half">
              <input class="w3-input w3-border" type="text" placeholder="Email" required name="Email">
            </div>
          </div>
          <input class="w3-input w3-border" type="text" placeholder="Message" required name="Message">
          <button class="w3-button w3-black w3-section w3-right" type="submit">SEND</button>
        </form>
      </div>
    </div>
  </div>
  
<!-- End Page Content -->
</div>

<!-- Image of location/map -->
<img src="/w3images/map.jpg" class="w3-image w3-greyscale-min" style="width:100%">

<!-- Footer -->
<footer class="w3-container w3-padding-64 w3-center w3-opacity w3-light-grey w3-xlarge">
  <i class="fa fa-facebook-official w3-hover-opacity"></i>
  <i class="fa fa-instagram w3-hover-opacity"></i>
  <i class="fa fa-snapchat w3-hover-opacity"></i>
  <i class="fa fa-pinterest-p w3-hover-opacity"></i>
  <i class="fa fa-twitter w3-hover-opacity"></i>
  <i class="fa fa-linkedin w3-hover-opacity"></i>
  <p class="w3-medium">Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
</footer>

<script>
// Automatic Slideshow - change image every 4 seconds
var myIndex = 0;
carousel();

function carousel() {
  var i;
  var x = document.getElementsByClassName("mySlides");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";  
  }
  myIndex++;
  if (myIndex > x.length) {myIndex = 1}    
  x[myIndex-1].style.display = "block";  
  setTimeout(carousel, 4000);    
}

// Used to toggle the menu on small screens when clicking on the menu button
function myFunction() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

// When the user clicks anywhere outside of the modal, close it
var modal = document.getElementById('ticketModal');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
</script>

</body>
</html>
`,
    heading: "Music Brand",
  },
];
export const COMPANY_TEMPLATES = [
  {
    templateId: "",
    thumbnail:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSABA_u6Dih7mxnm56-hIy2JQ5t7D05TvzwQQ&s",
    style: "",
    backgroundColor: "",
    components: `<body id="itgy"><h1 class="heading"><div class="ql-editor" contenteditable="true"><p><strong style="font-size: 25px;">Welcome to a random Template</strong></p></div></h1><p class="paragraph"><div class="ql-editor" contenteditable="true"><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua</p></div></p></body>`,
    heading: "Portfolio",
  },
];
const TEMPLATES = {
  [TEMPLATE_CATEGORIES.PERSONAL_PAGES]: PERSONAL_TEMPLATES,
  [TEMPLATE_CATEGORIES.COMPANY_PAGES]: COMPANY_TEMPLATES,
};

export default TEMPLATES;
