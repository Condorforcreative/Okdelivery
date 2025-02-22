document.getElementById("orderForm")?.addEventListener("submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let phone = document.getElementById("phone").value;
    let location = document.getElementById("location").value;
    let shoppingList = document.getElementById("shoppingList").value;

    localStorage.setItem("name", name);
    localStorage.setItem("phone", phone);
    localStorage.setItem("location", location);
    localStorage.setItem("shoppingList", shoppingList);

    window.location.href = "review.html";
});

window.onload = function() {
    if (window.location.pathname.includes("review.html")) {
        document.getElementById("reviewName").innerText = localStorage.getItem("name");
        document.getElementById("reviewPhone").innerText = localStorage.getItem("phone");
        document.getElementById("reviewLocation").innerText = localStorage.getItem("location");
        document.getElementById("reviewShoppingList").innerText = localStorage.getItem("shoppingList");
    }
};

function confirmOrder() {
    let name = localStorage.getItem("name");
    let phone = localStorage.getItem("phone");
    let location = localStorage.getItem("location");
    let shoppingList = localStorage.getItem("shoppingList");

    let message = `طلب جديد:\nالاسم: ${name}\nالهاتف: ${phone}\nالموقع: ${location}\nقائمة التسوق:\n${shoppingList}`;
    
    let botToken = "7691291913:AAFCbx8l0UwFJWBDLI51ux56OP-MtiYoGKY";
    let chatId = "5031598913";
    let telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(message)}`;

    fetch(telegramUrl).then(response => {
        if (response.ok) {
            window.location.href = "confirmation.html";
        } else {
            alert("حدث خطأ أثناء إرسال الطلب!");
        }
    });
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            let mapsUrl = `https://www.google.com/maps?q=${lat},${lon}`;
            document.getElementById("location").value = mapsUrl;
        }, () => {
            alert("لا يمكن الحصول على الموقع!");
        });
    } else {
        alert("المتصفح لا يدعم تحديد الموقع!");
    }
}
