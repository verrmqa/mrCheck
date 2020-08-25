/* //слайдеры
let advantagesCar = document.querySelector(".advantages__content");
let franchizeCar = document.querySelector(".franchize__content");
let video = document.querySelector(".video__video");

function bbb() {
  let media_size = document.documentElement.clientWidth;
  if (media_size < 769) {
    franchizeCar.style.display = "block";
    $(document).ready(function() {
      $(".franchize__content").slick({
        infinite: true,
        dots: true,
        arrows: true,
        appendArrows: ".slider-arrows_Fr",
        prevArrow:
          '<span class="slider-arrow slick-prev"><img src="./img/arrow_left.png"></span>',
        nextArrow:
          '<span class="slider-arrow slick-next"><img src="./img/arrow_right.png"></span>',
        appendDots: ".slider-dots_Fr",
        dotsClass: "slick-dots"
      });
    });

    advantagesCar.style.display = "block";
    $(document).ready(function() {
      $(".advantages__content").slick({
        infinite: true,
        dots: true,
        arrows: true,
        appendArrows: ".slider-arrows_Ad",
        prevArrow:
          '<span class="slider-arrow slick-prev"><img src="./img/arrow_left.png"></span>',
        nextArrow:
          '<span class="slider-arrow slick-next"><img src="./img/arrow_right.png"></span>',
        appendDots: ".slider-dots_Ad",
        dotsClass: "slick-dots_Ad"
      });
    });
    video.style.width = "290px";
    video.style.height = "160px";
  } else if (media_size > 768) {
    franchizeCar.style.display = "grid";
    $(".franchize__content").slick("unslick");
    advantagesCar.style.display = "grid";
    $(".advantages__content").slick("unslick");
    video.style.width = "770px";
    video.style.height = "420px";
  }
}

document.onreadystatechange = function() {
  if (document.readyState == "complete") {
  }
  bbb();
};
window.addEventListener(
  `resize`,
  () => {
    bbb();
  },
  false
);

var $leaseRange = $("#leaseRange");
var $investRange = $("#investRange");
var $leaseOutput = $("#leaseOutput");
var $investOutput = $("#investOutput");
let range = document.querySelector("#investRange");

function updateOutput(el, val) {
  el.textContent = val;
}
$leaseRange
  .rangeslider({
    polyfill: false,
    onInit: function() {
      updateOutput($leaseOutput[0], this.value);
    }
  })
  .on("input", function() {
    updateOutput($leaseOutput[0], this.value);
  });
// Initialize
$investRange
  .rangeslider({
    polyfill: false,
    onInit: function() {
      updateOutput($investOutput[0], this.value);
    }
  })
  .on("input", function() {
    updateOutput($investOutput[0], this.value);
  });
//end слайдеры
//ползунки
let leaseOut = document.querySelector("#leaseOutput1");
let lRange = document.querySelector("#leaseRange");
lRange.addEventListener("change", () => {
  if (lRange.value >= 0) {
    allFunc();
  }
});

//калькулятор

//ищем элементы калькулятора
//элемент для вывода значения слайдера инвестиций
const investOutput = document.querySelector("#investOutput");
//элемент для вывода значения слайдера аренды
const leaseOutput = document.querySelector("#leaseOutput");
//ползунок инвестиций
const invRange = document.querySelector(".runnerInvest");
//ползунок аренды
const leasRange = document.querySelector(".runnerLease");

//оборот в день
const resultDaily = document.querySelector(".income__output-daily");
//ежемесячная прибыль
const resultMonthly = document.querySelector(".income__output-monthly");
//рентабельность
const resultProfitability = document.querySelector(
  ".income__output-profitability"
);
//окупаемость
const resultPayback = document.querySelector(".income__output-payback");
//доход за 12 месяцев
const result12month = document.querySelector(".income__output-12month");

//формулы

//подсчет дневного оборота
const dailyCount = () => {
  let dailyTurnover = ((investOutput.innerHTML * 100) / 2250)
    .toFixed()
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  return dailyTurnover;
};
//вывод дневного оборота
resultDaily.innerHTML = dailyCount();

//подсчет ежемесячной прибыли
const monthlyCount = () => {
  let monthlyTurnover = (
    (100 * investOutput.innerHTML) / 75 -
    ((169 * investOutput.innerHTML) / 1200 +
      10000 +
      (65.5 * investOutput.innerHTML) / 75 +
      1.8 * leaseOutput.innerHTML)
  )
    .toFixed()
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  return monthlyTurnover;
};
//вывод ежемесячной прибыли
resultMonthly.innerHTML = monthlyCount();

//подсчет рентабельности
const profitabilityCount = () => {
  let profitability = (
    100 -
    (0.75 *
      (((169 * investOutput.innerHTML) / 1200 + 10000) * 100 +
        (524 * investOutput.innerHTML) / 6 +
        180 * leaseOutput.innerHTML)) /
      investOutput.innerHTML
  ).toFixed();
  return profitability;
};
//вывод рентабельности
resultProfitability.innerHTML = profitabilityCount();

//подсчет окупаемости
const paybackCount = () => {
  let payback = (
    investOutput.innerHTML / monthlyCount().replace(/\s/g, "") +
    4
  ).toFixed();
  return payback;
};
//вывод окупаемости
resultPayback.innerHTML = paybackCount();

//подсчет дохода за 12 месяцев
const result12monthCount = () => {
  let result12month = (
    monthlyCount().replace(/\s/g, "") * 8 -
    investOutput.innerHTML
  )
    .toFixed()
    .replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");
  return result12month;
};
//вывод дохода за 12 месяцев

//функция обновляющая значения
const allFunc = () => {
  //дневной оборот
  dailyCount();
  resultDaily.innerHTML = dailyCount();
  //месячный оборот
  monthlyCount();
  resultMonthly.innerHTML = monthlyCount();
  //рентабельность
  profitabilityCount();
  resultProfitability.innerHTML = profitabilityCount();
  //окупаемость
  paybackCount();
  resultPayback.innerHTML = paybackCount();
  //доход за 12 месяцев
  result12monthCount();
  result12month.innerHTML = result12monthCount();
};

//обновление значений по клику на ползунке
invRange.addEventListener("mousemove", function() {
  allFunc();
});
//обновление значений по клику на ползунке
leasRange.addEventListener("mousemove", function() {
  allFunc();
});
//обновление значений по тачу на ползунке
invRange.addEventListener("touchstart", function() {
  allFunc();
});
//обновление значений по тачу на ползунке
leasRange.addEventListener("touchstart", function() {
  allFunc();
});
//обновление значений по окончанию тача на ползунке
invRange.addEventListener("touchend", function() {
  allFunc();
});
//обновление значений по окончанию тача на ползунке
leasRange.addEventListener("touchend", function() {
  allFunc();
});

//обновление значений подвижению тача  на ползунке
invRange.addEventListener("touchmove", function() {
  allFunc();
});
//обновление значений подвижению тача  на ползунке
leasRange.addEventListener("touchmove", function() {
  allFunc();
});

//обновление значений при выходе курсора за границы ползунка
let handle = document.querySelectorAll(".rangeslider__handle");
handle[0].addEventListener("mouseout", () => {
  allFunc();
});
handle[1].addEventListener("mouseout", () => {
  allFunc();
});

//end калькулятор

//ховер иконки vk на кнопке "Илья"
//поиск линка, содержимое которого будем менять
const iconVkIlya = document.querySelectorAll(".ilya-vk");

//смена на красную иконку
iconVkIlya[0].addEventListener("mouseenter", () => {
  iconVkIlya[0].innerHTML =
    "<img src='./img/SVG/vk_red.svg' alt='' class='icon icon-vk'/>Илья";
});
iconVkIlya[1].addEventListener("mouseenter", () => {
  iconVkIlya[1].innerHTML =
    "<img src='./img/SVG/vk_red.svg' alt='' class='icon icon-vk'/>Илья";
});
//обратная смена (на белую)
iconVkIlya[0].addEventListener("mouseleave", () => {
  iconVkIlya[0].innerHTML =
    "<img src='./img/SVG/vk_white.svg' alt='' class='icon icon-vk'/>Илья";
});
iconVkIlya[1].addEventListener("mouseleave", () => {
  iconVkIlya[1].innerHTML =
    "<img src='./img/SVG/vk_white.svg' alt='' class='icon icon-vk'/>Илья";
});

//ховеры иконок соцсетей в хедере
//поиск линка, содержимое которого будем менять
const iconVkHead = document.querySelector(".link-header_vk");
const iconInstHead = document.querySelector(".link-header_inst");
//vk
//смена на красную иконку
iconVkHead.addEventListener("mouseenter", () => {
  iconVkHead.innerHTML =
    '<img src="./img/SVG/vk_red.svg" alt="" class="icon icon-vk_header"/>';
});
//обратная смена (на черную)
iconVkHead.addEventListener("mouseleave", () => {
  iconVkHead.innerHTML =
    '<img src="./img/SVG/vk.svg" alt="" class="icon icon-vk_header"/>';
});
//instagramm
//смена на красную иконку
iconInstHead.addEventListener("mouseenter", () => {
  iconInstHead.innerHTML =
    "<img src='./img/SVG/instagram_red.svg' alt='' class='icon icon-instagram'/>";
});
//обратная смена (на черную)
iconInstHead.addEventListener("mouseleave", () => {
  iconInstHead.innerHTML =
    "<img src='./img/SVG/instagram.svg' alt='' class='icon icon-instagram'/>";
});

//ховеры иконок соцсетей в меню
//поиск линка, содержимое которого будем менять
const iconVkMenu = document.querySelector(".link-menu_vk");
const iconInstMenu = document.querySelector(".link-menu_inst");
//vk
//смена на красную иконку
iconVkMenu.addEventListener("mouseenter", () => {
  iconVkMenu.innerHTML =
    '<img src="./img/SVG/vk_red.svg" alt="icon-vk_red" class="icon icon-vk_header"/>';
});
//обратная смена (на черную)
iconVkMenu.addEventListener("mouseleave", () => {
  iconVkMenu.innerHTML =
    '<img src="./img/SVG/vk_white.svg" alt="icon-vk_white" class="icon icon-vk_header"/>';
});
//instagramm
//смена на красную иконку
iconInstMenu.addEventListener("mouseenter", () => {
  iconInstMenu.innerHTML =
    '<img src="./img/SVG/instagram_red.svg" alt="icon-instagram_red" class="icon icon-instagram"/>';
});
//обратная смена (на черную)
iconInstMenu.addEventListener("mouseleave", () => {
  iconInstMenu.innerHTML =
    '<img src="./img/SVG/instagram_white.svg" alt="icon-instagram_white" class="icon icon-instagram"/>';
});
//facebook
//смена на красную иконку

//ховеры соцсетей в футере
//поиск линка, содержимое которого будем менять
const iconVkFoot = document.querySelector(".link-social_vk");
const iconInsFoot = document.querySelector(".link-social_inst");
//vk
//смена на красную иконку
iconVkFoot.addEventListener("mouseenter", () => {
  iconVkFoot.innerHTML =
    '<img src="./img/SVG/vk_red.svg" alt="" class="icon icon-vk_soc"/>';
});
//обратная смена (на белую)
iconVkFoot.addEventListener("mouseleave", () => {
  iconVkFoot.innerHTML =
    '<img src="./img/SVG/vk_white.svg" alt="" class="icon icon-vk_soc"/>';
});
//instagramm
//смена на красную иконку
iconInsFoot.addEventListener("mouseenter", () => {
  iconInsFoot.innerHTML =
    "<img src='./img/SVG/instagram_red.svg' alt='' class='icon icon-instagram'/>";
});
//обратная смена (на белую)
iconInsFoot.addEventListener("mouseleave", () => {
  iconInsFoot.innerHTML =
    "<img src='./img/SVG/instagram_white.svg' alt='' class='icon icon-instagram'/>";
});

//исчезновение меню при клике на пункт
$(".menu__item").click(function() {
  $("#menu__toggle").prop("checked", false);
});

//модалка

const modal = document.querySelector("#modalWindow");
const modalCall = document.querySelector("#modalWindowCall");
const modalBtn = document.querySelectorAll(".link-modal");
const modalBtnCall = document.querySelector(".link-modal-call");
const modalBtnCallMob = document.querySelector(".link-modal-callMob");
const modalBtnTour = document.querySelector(".link-tour");
const modalBtnPresentation = document.querySelectorAll(".link-presentation");
const modalTitleTour = document.querySelector(".modal__title");

const closeBtn = document.querySelector("#closeBtn");
const closeBtn1 = document.querySelector("#closeBtn1");
const closeBtnCall = document.querySelector("#closeBtnCall");

modalBtn[0].addEventListener("click", openModal);
modalBtn[1].addEventListener("click", openModal);
modalBtn[2].addEventListener("click", openModal);
modalBtn[3].addEventListener("click", openModal);
modalBtn[4].addEventListener("click", openModal);
modalBtn[5].addEventListener("click", openModal);
modalBtn[6].addEventListener("click", openModal);
modalBtnCall.addEventListener("click", openModalCall);
modalBtnCallMob.addEventListener("click", openModalCall);

function openModal() {
  modal.style.display = "block";
}
function openModalCall() {
  modalCall.style.display = "block";
  $("#closeBtnCall").css("display", "block");
}

closeBtn.addEventListener("click", closeModal);
function closeModal() {
  modal.style.display = "none";
  modalCall.style.display = "none";
}
closeBtn1.addEventListener("click", closeModal);
function closeModal() {
  modal.style.display = "none";
  modalCall.style.display = "none";
}
closeBtnCall.addEventListener("click", closeModal);
function closeModal() {
  modal.style.display = "none";
  modalCall.style.display = "none";
}

window.addEventListener("click", outsideClick);
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}

window.addEventListener("click", outsideClick);
function outsideClick(e) {
  if (e.target == modalCall) {
    modalCall.style.display = "none";
  }
}
modalBtnPresentation[0].addEventListener("click", () => {
  modalTitleTour.innerHTML = '<h2 class="title">Заявка на презентацию</h2>';
});
modalBtnPresentation[1].addEventListener("click", () => {
  modalTitleTour.innerHTML = '<h2 class="title">Заявка на презентацию</h2>';
});
modalBtnPresentation[2].addEventListener("click", () => {
  modalTitleTour.innerHTML = '<h2 class="title">Заявка на презентацию</h2>';
});
modalBtnPresentation[3].addEventListener("click", () => {
  modalTitleTour.innerHTML = '<h2 class="title">Заявка на презентацию</h2>';
});

modalBtnTour.addEventListener("click", () => {
  modalTitleTour.innerHTML = '<h2 class="title">Заявка на экскурсию</h2>';
});

//маска на формы
$("#input--phone_modal").inputmask({ mask: "+7 (999) 999 - 9999" }); //specifying options
$(".input--phone").inputmask({ mask: "+7 (999) 999 - 9999" }); //specifying options
$("#input--phone_modalCall").inputmask({ mask: "+7 (999) 999 - 9999" }); //specifying options

//функция проверки телефона в форме обратного звонка
const phoneInputCall = document.querySelector("#input--phone_modalCall");
const messagePhoneCall = document.querySelector(".form-message_alertCall");

const checkPhoneCall = () => {
  const phoneReg = /\+7\ \([0-9]{3}\)\ [0-9]{3}\ \-\ [0-9]{4}/;
  if (phoneInputCall.value.match(phoneReg)) {
    console.log("Оk!", "Вы ввели свой телефон!", "ok");
    return true;
  } else {
    console.log("Ошибка!", "Вы не ввели свой телефон!", "error");
    messagePhoneCall.style.visibility = "visible";
    setTimeout(function() {
      messagePhoneCall.style.visibility = "hidden";
    }, 3000);
    return false;
  }
};
//функция проверки телефона в форме презентации
const phoneInput = document.querySelector("#input--phone_modal");
const messagePhone = document.querySelector(".form-message_alertPhone");

const checkPhone = () => {
  const phoneReg = /\+7\ \([0-9]{3}\)\ [0-9]{3}\ \-\ [0-9]{4}/;
  if (phoneInput.value.match(phoneReg)) {
    console.log("Оk!", "Вы ввели свой телефон!", "ok");
    return true;
  } else {
    console.log("Ошибка!", "Вы не ввели свой телефон!", "error");
    messagePhone.style.visibility = "visible";
    setTimeout(function() {
      messagePhone.style.visibility = "hidden";
    }, 3000);
    return false;
  }
};
//функция проверки телефона в форме преимуществ
const phoneInputAdv = document.querySelector("#input--phone");
const messagePhoneAdv = document.querySelector(".advantages__formbox-error");

const checkPhoneAdv = () => {
  const phoneReg = /\+7\ \([0-9]{3}\)\ [0-9]{3}\ \-\ [0-9]{4}/;
  if (phoneInputAdv.value.match(phoneReg)) {
    console.log("Оk!", "Вы ввели свой телефон!", "ok");
    return true;
  } else {
    console.log("Ошибка!", "Вы не ввели свой телефон!", "error");
    messagePhoneAdv.style.visibility = "visible";
    setTimeout(function() {
      messagePhoneAdv.style.visibility = "hidden";
    }, 3000);
    return false;
  }
};

//функция проверки email
const emailInput = document.querySelector("#input--email_modal");
const message = document.querySelector(".form-message_alert");

const checkMail = () => {
  const emailReg = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/;
  if (emailInput.value.match(emailReg)) {
    console.log("Оk!", "Вы ввели свой e-mail!", "ok");
    return true;
  } else {
    console.log("Ошибка!", "Вы не ввели свой e-mail!", "error");
    message.style.visibility = "visible";
    setTimeout(function() {
      message.style.visibility = "hidden";
    }, 3000);
    return false;
  }
};

//отправка данных
//отправка данных формы на API
async function forder(formDataObj) {
  const rawResponse = await fetch("https://api.ilkato.ru", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ action: "forder", data: formDataObj })
  });
  const content = await rawResponse.json();
  return content;
}

//на почту
$(document).ready(function() {
  $("#form-contact_modal").submit(function(click) {
    var formID = $(this).attr("id");
    var formNm = $("#" + formID);
    var message = $(formNm).find(".form-message_modal");
    var formTitle = $(formNm).find(".form-title_modal");

    click.preventDefault();
    var form_data = $(this).serialize();
    if (document.querySelector("#input--name_modal")) {
      var name = document.querySelector("#input--name_modal").value;
    }
    if (document.querySelector("#input--phone_modal")) {
      var phone = document.querySelector("#input--phone_modal").value;
    }
    if (document.querySelector("#input--email_modal")) {
      var email = document.querySelector("#input--email_modal").value;
    }
    if (document.querySelector("#input--comment_modal")) {
      var comment = document.querySelector("#input--comment_modal").value;
    }
    const formDataObj = {
      Name: name,
      Phone: phone,
      Email: email,
      Comment: comment
    };
    console.log("serial");

    if (checkMail() && checkPhone()) {
      $.ajax({
        type: "POST",
        url: "../php/send.php",
        data: form_data,
        success: function(response) {
          if (response == true) {
            var apiResp = forder(formDataObj);
          }
          // Вывод сообщения об успешной отправке
          $("#closeBtn1").css("display", "block");
          $(".form-title_modal").css("display", "block");
          $(".form-message_modal").css("display", "block");
          $(".form-title_box").addClass("blackbox");
          console.log("Спасибо!");
          console.log(formDataObj);
          formTitle.html("Спасибо!");
          message.html("Ваша заявка успешно отправлена");
          $("input")
            .not(":input[type=submit], :input[type=hidden]")
            .val("");
          setTimeout(function() {
            $("#closeBtn1").css("display", "none");
            formTitle.css("display", "none");
            message.css("display", "none");
            const modal = document.querySelector("#modalWindow");
            modal.style.display = "none";
            $(".form-title_box").removeClass("blackbox");
            $(".form-title_modal").css("display", "none");
            $(".form-message_modal").css("display", "none");
          }, 3000);
        },
        error: function(response) {
          // Вывод сообщения об ошибке отправки
          $("#closeBtn1").css("display", "block");
          $(".form-title_modal").css("display", "block");
          $(".form-message_modal").css("display", "block");
          $(".form-title_box").addClass("blackbox");
          console.log("ошибка !");
          console.log(formDataObj);
          formTitle.html("Извините");
          message.html("Произошла ошибка");
          console.log("ошибка");
          $("input")
            .not(":input[type=submit], :input[type=hidden]")
            .val("");
          setTimeout(function() {
            $("#closeBtn1").css("display", "none");
            formTitle.css("display", "none");
            message.css("display", "none");
            const modal = document.querySelector("#modalWindow");
            modal.style.display = "none";
            $(".form-title_box").removeClass("blackbox");
            $(".form-title_modal").css("display", "none");
            $(".form-message_modal").css("display", "none");
          }, 3000);
        }
      });
    }
  });

  $("#form-contact").submit(function(click) {
    click.preventDefault();
    var form_data1 = $(this).serialize();
    var formID = $(this).attr("id");
    var formNm = $("#" + formID);
    var message = $(formNm).find(".form-message");
    var formTitle = $(formNm).find(".form-title");
    if (document.querySelector("#input--phone")) {
      var phone = document.querySelector("#input--phone").value;
    }
    if (document.querySelector("#input--comment")) {
      var comment = document.querySelector("#input--comment").value;
    }
    const formDataObj = {
      Phone: phone,
      Comment: comment
    };

    if (checkPhoneAdv()) {
      $.ajax({
        type: "POST",
        url: "../php/send-mail.php",
        data: form_data1,
        success: function(response) {
          if (response == true) {
            var apiResp = forder(formDataObj);
          }
          // Вывод сообщения об успешной отправке
          $(".form-title_box-full").addClass("yellowbox");
          $(".request__form").addClass("form--shrink");
          console.log("успех!");
          console.log(formDataObj);
          message.css("visibility", "visible");
          message.html("Ваша заявка отправлена");
          $("input")
            .not(":input[type=submit], :input[type=hidden]")
            .val("");
          setTimeout(function() {}, 3000);
        },
        error: function(response) {
          // Данные не отправлены
          // Вывод сообщения об ошибке отправки
          $(".form-title_box-full").addClass("yellowbox");
          $(".request__form").addClass("form--shrink");
          console.log("ошибка !");
          console.log(formDataObj);
          message.css("visibility", "visible");
          message.html("Произошла ошибка");
          $("input")
            .not(":input[type=submit], :input[type=hidden]")
            .val("");
          setTimeout(function() {}, 3000);
        }
      });
    }
  });
});

//обратный звонок
$(document).ready(function() {
  $("#form-contactCall").submit(function(click) {
    var formID = $(this).attr("id");
    var formNm = $("#" + formID);
    var message = $(formNm).find(".form-message_modalCall");
    var formTitle = $(formNm).find(".form-title_modalCall");

    click.preventDefault();
    var form_data1 = $(this).serialize();

    if (document.querySelector("#input--phone_modalCall")) {
      var phone = document.querySelector("#input--phone_modalCall").value;
    }
    if (document.querySelector("#input--comment_modalCall")) {
      var comment = document.querySelector("#input--comment_modalCall").value;
    }
    const formDataObj = {
      Phone: phone,
      Comment: comment
    };
    if (checkPhoneCall()) {
      $.ajax({
        type: "POST",
        url: "../php/send-mail.php",
        data: form_data1,
        success: function(response) {
          if (response == true) {
            var apiResp = forder(formDataObj);
          }
          // Вывод сообщения об успешной отправке
          $("#closeBtnCall").css("display", "block");
          $(".form-title_modalCall").css("display", "block");
          $(".form-message_modalCall").css("display", "block");
          $(".form-title_box").addClass("blackboxCall");
          console.log("успех!");
          console.log(formDataObj);
          formTitle.html("Спасибо!");
          message.html("Ваша заявка успешно отправлена");
          $("input")
            .not(":input[type=submit], :input[type=hidden]")
            .val("");
          setTimeout(function() {
            $("#closeBtnCall").css("display", "none");
            formTitle.css("display", "none");
            message.css("display", "none");
            const modal = document.querySelector("#modalWindowCall");
            modal.style.display = "none";
            $(".form-title_box").removeClass("blackboxCall");
            $(".form-title_modalCall").css("display", "none");
            $(".form-message_modal").css("display", "none");
          }, 3000);
        },
        error: function(response) {
          // Вывод сообщения об ошибке отправки
          $("#closeBtnCall").css("display", "block");
          $(".form-title_modalCall").css("display", "block");
          $(".form-message_modalCall").css("display", "block");
          $(".form-title_box").addClass("blackboxCall");
          console.log("ошибка !");
          console.log(formDataObj);
          formTitle.html("Извините");
          message.html("Произошла ошибка");
          $("input")
            .not(":input[type=submit], :input[type=hidden]")
            .val("");
          setTimeout(function() {
            $("#closeBtnCall").css("display", "none");
            formTitle.css("display", "none");
            message.css("display", "none");
            const modal = document.querySelector("#modalWindowCall");
            modal.style.display = "none";
            $(".form-title_box").removeClass("blackboxCall");
            $(".form-title_modalCall").css("display", "none");
            $(".form-message_modalCall").css("display", "none");
          }, 3000);
        }
      });
    }
  });
});

//рестарт формы
const formRestart = document.querySelector(".form-title_restart");

formRestart.addEventListener("click", restart);

function restart() {
  $(".form-title_box-full").removeClass("yellowbox");
  $(".request__form").removeClass("form--shrink");
  $(".input--text").val("");
}

//проверка прокрутки страницы при загрузке
document.addEventListener("DOMContentLoaded", () => {
  if (window.pageYOffset > 50) {
    $(".section__nav").css("top", "0");
  }
  if (document.documentElement.clientWidth > 1173) {
  if (window.pageYOffset > 50) {
    $(".section__nav").css("top", "0");
    $(".img-label").css("width", "155px");
    $(".img-label").css("margin-top", "30px");
  }
}
});
//sticky menu на разных разрешениях
document.addEventListener("scroll", () => {
  if (document.documentElement.clientWidth > 1173) {
    $(".img-label").css("margin-top", "30px");
    $(".img-label").css("width", "155px");
    if (window.pageYOffset <= 50) {
      $(".section__nav").css("top", "0");
      $(".img-label").css("margin-top", "0");
      $(".img-label").css("width", "333px");
    }
  } else if (
    document.documentElement.clientWidth < 1173 &&
    document.documentElement.clientWidth > 768
  ) {
    $(".img-label").css("margin-top", "0px");
    if (window.pageYOffset <= 50) {
      $(".section__nav").css("top", "0");
      $(".img-label").css("margin-top", "-25px");
    }
  } else if (document.documentElement.clientWidth < 769) {
    $(".navbar-brand").css("margin-top", "25px");
    if (window.pageYOffset <= 50) {
      $(".navbar-brand").css("margin-top", "0");
      $(".section__nav").css("top", "0");
    }
  }
});
 */





 
/* ymaps.ready(init);

  function init() {
      var myMap = new ymaps.Map('map', {
          center: [55.751574, 37.573856],
          zoom: 9,
          controls: []
      }, {
          searchControlProvider: 'yandex#search'
      });
  
      var placemark = new ymaps.Placemark(myMap.getCenter(), {
          // Зададим содержимое заголовка балуна.
          balloonContentHeader: '<h4>Контакты</h4><br>',
          // Зададим содержимое основной части балуна.
          balloonContentBody: ' <br/> ' +
              '<a href="tel:+7-843-208-54-72">+7 (843) 208-54-72</a><br/>' +
              '<a href="mailto:online.mrcheck@ya.ru">online.mrcheck@ya.ru</a><br/>' +
              '<span>г. Казань, ул.Аграрная, 52 БЦ «Восточный»</span> <br/>',
          // Зададим содержимое нижней части балуна.
          balloonContentFooter: 'Режим работы:' +
          '<span>Пн-Пт: 9:00-18:00</span> <br/>',
          // Зададим содержимое всплывающей подсказки.
          hintContent: 'Пн-Пт: 9:00-18:00'
      });
      // Добавим метку на карту.
      myMap.geoObjects.add(placemark);
      // Откроем балун на метке.
      placemark.balloon.open();
  } */



//карта 
  ymaps.ready(function () {
    // Создание экземпляра карты и его привязка к созданному контейнеру.
    var myMap = new ymaps.Map('map', {
            center: [55.793862, 49.203008],
            zoom: 9,
            behaviors: ['default'],
            controls: ['zoomControl']
        }, {
            searchControlProvider: 'yandex#search'
        }),

        // Создание макета балуна на основе Twitter Bootstrap.
        MyBalloonLayout = ymaps.templateLayoutFactory.createClass(
            '<div class="popover top">' +
                '<div class="arrow"></div>' +
                '<div class="popover-inner">' +
                '$[[options.contentLayout observeSize minWidth=335 maxWidth=535 maxHeight=350]]' +
                '</div>' + 
                '</div>', {
                /**
                 * Строит экземпляр макета на основе шаблона и добавляет его в родительский HTML-элемент.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#build
                 * @function
                 * @name build
                 */
                build: function () {
                    this.constructor.superclass.build.call(this);

                    this._$element = $('.popover', this.getParentElement());

                    this.applyElementOffset();

                },

                /**
                 * Удаляет содержимое макета из DOM.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/layout.templateBased.Base.xml#clear
                 * @function
                 * @name clear
                 */
                clear: function () {
                    this._$element.find('.close')
                        .off('click');

                    this.constructor.superclass.clear.call(this);
                },

                /**
                 * Метод будет вызван системой шаблонов АПИ при изменении размеров вложенного макета.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name onSublayoutSizeChange
                 */
                onSublayoutSizeChange: function () {
                    MyBalloonLayout.superclass.onSublayoutSizeChange.apply(this, arguments);

                    if(!this._isElement(this._$element)) {
                        return;
                    }

                    this.applyElementOffset();

                    this.events.fire('shapechange');
                },

                /**
                 * Сдвигаем балун, чтобы "хвостик" указывал на точку привязки.
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/IBalloonLayout.xml#event-userclose
                 * @function
                 * @name applyElementOffset
                 */
                applyElementOffset: function () {
                    this._$element.css({
                        left: -(this._$element[0].offsetWidth * 1.3),
                        top: -(this._$element[0].offsetHeight / 2 + this._$element.find('.arrow')[0].offsetHeight)
                    });
                },


                /**
                 * Используется для автопозиционирования (balloonAutoPan).
                 * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ILayout.xml#getClientBounds
                 * @function
                 * @name getClientBounds
                 * @returns {Number[][]} Координаты левого верхнего и правого нижнего углов шаблона относительно точки привязки.
                 */
                getShape: function () {
                    if(!this._isElement(this._$element)) {
                        return MyBalloonLayout.superclass.getShape.call(this);
                    }

                    var position = this._$element.position();

                    return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
                        [position.left, position.top], [
                            position.left + this._$element[0].offsetWidth,
                            position.top + this._$element[0].offsetHeight + this._$element.find('.arrow')[0].offsetHeight
                        ]
                    ]));
                },

                /**
                 * Проверяем наличие элемента (в ИЕ и Опере его еще может не быть).
                 * @function
                 * @private
                 * @name _isElement
                 * @param {jQuery} [element] Элемент.
                 * @returns {Boolean} Флаг наличия.
                 */
                _isElement: function (element) {
                    return element && element[0] && element.find('.arrow')[0];
                }
            }),

        // Создание вложенного макета содержимого балуна.
        MyBalloonContentLayout = ymaps.templateLayoutFactory.createClass(
            '<h3 class="popover-title">$[properties.balloonHeader]</h3>' +
                '<div class="popover-content">$[properties.balloonContent]</div>'
        ),

        // Создание метки с пользовательским макетом балуна.
        myPlacemark = window.myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
            balloonHeader: '<h4>Контакты</h4><br>',
            balloonContent: ' <br/> ' +
            '<a href="tel:+7-843-208-54-72">+7 (843) 208-54-72</a><br/>' +
            '<a href="mailto:online.mrcheck@ya.ru">online.mrcheck@ya.ru</a><br/>' +
            '<span>г. Казань, ул.Аграрная, 52 БЦ «Восточный»</span> <br/>' +
            'Режим работы:' +
            '<span>Пн-Пт: 9:00-18:00</span> <br/>'
        }, {
            balloonShadow: false,
            balloonLayout: MyBalloonLayout,
            balloonContentLayout: MyBalloonContentLayout,
            balloonPanelMaxMapArea: 0,
            // Не скрываем иконку при открытом балуне.
            hideIconOnBalloonOpen: false,
            // И дополнительно смещаем балун, для открытия над иконкой.
            // balloonOffset: [3, -40]
        });

    myMap.behaviors.disable('scrollZoom'); 
    myMap.geoObjects.add(myPlacemark);
    // Откроем балун на метке.
    myPlacemark.balloon.open();
});

$(function () {
    $('#set-balloon-header').click(function () {
        window.myPlacemark.properties.set(
            'balloonHeader',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        );
    });
    $('#set-balloon-content').click(function () {
        window.myPlacemark.properties.set(
            'balloonContent',
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
                + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
        );
    });
});
//карта END 

//слайдер
$('.clients__slider').slick({
  slidesToShow: 6,
  arrows: true,
  dots: false,
  variableWidth: true,
  infinite: true,
});
//слайдер END 


//модалка

const modal = document.querySelector("#modalWindow");
const modalBtn = document.querySelectorAll(".link-modal");
const modalBtnCall = document.querySelector(".link-modal-call");
const modalBtnCallMob = document.querySelector(".link-modal-callMob");
const modalBtnTour = document.querySelector(".link-tour");
const modalBtnPresentation = document.querySelectorAll(".link-presentation");
const modalTitleTour = document.querySelector(".modal__title");

const closeBtn = document.querySelector("#closeBtn");

modalBtn[0].addEventListener("click", openModal);
modalBtn[1].addEventListener("click", openModal);

function openModal() {
  modal.style.display = "block";
}

closeBtn.addEventListener("click", closeModal);
function closeModal() {
  modal.style.display = "none";
}
closeBtn1.addEventListener("click", closeModal);
function closeModal() {
  modal.style.display = "none";
}

window.addEventListener("click", outsideClick);
function outsideClick(e) {
  if (e.target == modal) {
    modal.style.display = "none";
  }
}
modalBtnPresentation[0].addEventListener("click", () => {
  modalTitleTour.innerHTML = '<h2 class="title">Заявка на презентацию</h2>';
});
modalBtnPresentation[1].addEventListener("click", () => {
  modalTitleTour.innerHTML = '<h2 class="title">Заявка на презентацию</h2>';
});


//маска на формы
$("#input--phone_modal").inputmask({ mask: "+7 (999) 999 - 9999" }); //specifying options
$(".input--phone").inputmask({ mask: "+7 (999) 999 - 9999" }); //specifying options
$("#input--phone_modalCall").inputmask({ mask: "+7 (999) 999 - 9999" }); //specifying options

//функция проверки телефона в форме обратного звонка
const phoneInputCall = document.querySelector("#input--phone_modalCall");
const messagePhoneCall = document.querySelector(".form-message_alertCall");

const checkPhoneCall = () => {
  const phoneReg = /\+7\ \([0-9]{3}\)\ [0-9]{3}\ \-\ [0-9]{4}/;
  if (phoneInputCall.value.match(phoneReg)) {
    console.log("Оk!", "Вы ввели свой телефон!", "ok");
    return true;
  } else {
    console.log("Ошибка!", "Вы не ввели свой телефон!", "error");
    messagePhoneCall.style.visibility = "visible";
    setTimeout(function() {
      messagePhoneCall.style.visibility = "hidden";
    }, 3000);
    return false;
  }
};
//функция проверки телефона в форме презентации
const phoneInput = document.querySelector("#input--phone_modal");
const messagePhone = document.querySelector(".form-message_alertPhone");

const checkPhone = () => {
  const phoneReg = /\+7\ \([0-9]{3}\)\ [0-9]{3}\ \-\ [0-9]{4}/;
  if (phoneInput.value.match(phoneReg)) {
    console.log("Оk!", "Вы ввели свой телефон!", "ok");
    return true;
  } else {
    console.log("Ошибка!", "Вы не ввели свой телефон!", "error");
    messagePhone.style.visibility = "visible";
    setTimeout(function() {
      messagePhone.style.visibility = "hidden";
    }, 3000);
    return false;
  }
};
//функция проверки телефона в форме преимуществ
const phoneInputAdv = document.querySelector("#input--phone");
const messagePhoneAdv = document.querySelector(".advantages__formbox-error");

const checkPhoneAdv = () => {
  const phoneReg = /\+7\ \([0-9]{3}\)\ [0-9]{3}\ \-\ [0-9]{4}/;
  if (phoneInputAdv.value.match(phoneReg)) {
    console.log("Оk!", "Вы ввели свой телефон!", "ok");
    return true;
  } else {
    console.log("Ошибка!", "Вы не ввели свой телефон!", "error");
    messagePhoneAdv.style.visibility = "visible";
    setTimeout(function() {
      messagePhoneAdv.style.visibility = "hidden";
    }, 3000);
    return false;
  }
};

//функция проверки email
const emailInput = document.querySelector("#input--email_modal");
const message = document.querySelector(".form-message_alert");

const checkMail = () => {
  const emailReg = /[a-z0-9._%+!$&*=^|~#%'`?{}/-]+@([a-z0-9-]+\.){1,}([a-z]{2,16})/;
  if (emailInput.value.match(emailReg)) {
    console.log("Оk!", "Вы ввели свой e-mail!", "ok");
    return true;
  } else {
    console.log("Ошибка!", "Вы не ввели свой e-mail!", "error");
    message.style.visibility = "visible";
    setTimeout(function() {
      message.style.visibility = "hidden";
    }, 3000);
    return false;
  }
};

//отправка данных
//отправка данных формы на API
async function forder(formDataObj) {
  const rawResponse = await fetch("https://api.ilkato.ru", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ action: "forder", data: formDataObj })
  });
  const content = await rawResponse.json();
  return content;
}

//на почту
$(document).ready(function() {
  $("#form-contact_modal").submit(function(click) {
    var formID = $(this).attr("id");
    var formNm = $("#" + formID);
    var message = $(formNm).find(".form-message_modal");
    var formTitle = $(formNm).find(".form-title_modal");

    click.preventDefault();
    var form_data = $(this).serialize();
    if (document.querySelector("#input--name_modal")) {
      var name = document.querySelector("#input--name_modal").value;
    }
    if (document.querySelector("#input--phone_modal")) {
      var phone = document.querySelector("#input--phone_modal").value;
    }
    if (document.querySelector("#input--email_modal")) {
      var email = document.querySelector("#input--email_modal").value;
    }
    if (document.querySelector("#input--comment_modal")) {
      var comment = document.querySelector("#input--comment_modal").value;
    }
    const formDataObj = {
      Name: name,
      Phone: phone,
      Email: email,
      Comment: comment
    };
    console.log("serial");

    if (checkMail() && checkPhone()) {
      $.ajax({
        type: "POST",
        url: "../php/send.php",
        data: form_data,
        success: function(response) {
          if (response == true) {
            var apiResp = forder(formDataObj);
          }
          // Вывод сообщения об успешной отправке
          $("#closeBtn1").css("display", "block");
          $(".form-title_modal").css("display", "block");
          $(".form-message_modal").css("display", "block");
          $(".form-title_box").addClass("blackbox");
          console.log("Спасибо!");
          console.log(formDataObj);
          formTitle.html("Спасибо!");
          message.html("Ваша заявка успешно отправлена");
          $("input")
            .not(":input[type=submit], :input[type=hidden]")
            .val("");
          setTimeout(function() {
            $("#closeBtn1").css("display", "none");
            formTitle.css("display", "none");
            message.css("display", "none");
            const modal = document.querySelector("#modalWindow");
            modal.style.display = "none";
            $(".form-title_box").removeClass("blackbox");
            $(".form-title_modal").css("display", "none");
            $(".form-message_modal").css("display", "none");
          }, 3000);
        },
        error: function(response) {
          // Вывод сообщения об ошибке отправки
          $("#closeBtn1").css("display", "block");
          $(".form-title_modal").css("display", "block");
          $(".form-message_modal").css("display", "block");
          $(".form-title_box").addClass("blackbox");
          console.log("ошибка !");
          console.log(formDataObj);
          formTitle.html("Извините");
          message.html("Произошла ошибка");
          console.log("ошибка");
          $("input")
            .not(":input[type=submit], :input[type=hidden]")
            .val("");
          setTimeout(function() {
            $("#closeBtn1").css("display", "none");
            formTitle.css("display", "none");
            message.css("display", "none");
            const modal = document.querySelector("#modalWindow");
            modal.style.display = "none";
            $(".form-title_box").removeClass("blackbox");
            $(".form-title_modal").css("display", "none");
            $(".form-message_modal").css("display", "none");
          }, 3000);
        }
      });
    }
  });

  $("#form-contact").submit(function(click) {
    click.preventDefault();
    var form_data1 = $(this).serialize();
    var formID = $(this).attr("id");
    var formNm = $("#" + formID);
    var message = $(formNm).find(".form-message");
    var formTitle = $(formNm).find(".form-title");
    if (document.querySelector("#input--phone")) {
      var phone = document.querySelector("#input--phone").value;
    }
    if (document.querySelector("#input--comment")) {
      var comment = document.querySelector("#input--comment").value;
    }
    const formDataObj = {
      Phone: phone,
      Comment: comment
    };

    if (checkPhoneAdv()) {
      $.ajax({
        type: "POST",
        url: "../php/send-mail.php",
        data: form_data1,
        success: function(response) {
          if (response == true) {
            var apiResp = forder(formDataObj);
          }
          // Вывод сообщения об успешной отправке
          $(".form-title_box-full").addClass("yellowbox");
          $(".request__form").addClass("form--shrink");
          console.log("успех!");
          console.log(formDataObj);
          message.css("visibility", "visible");
          message.html("Ваша заявка отправлена");
          $("input")
            .not(":input[type=submit], :input[type=hidden]")
            .val("");
          setTimeout(function() {}, 3000);
        },
        error: function(response) {
          // Данные не отправлены
          // Вывод сообщения об ошибке отправки
          $(".form-title_box-full").addClass("yellowbox");
          $(".request__form").addClass("form--shrink");
          console.log("ошибка !");
          console.log(formDataObj);
          message.css("visibility", "visible");
          message.html("Произошла ошибка");
          $("input")
            .not(":input[type=submit], :input[type=hidden]")
            .val("");
          setTimeout(function() {}, 3000);
        }
      });
    }
  });
});




