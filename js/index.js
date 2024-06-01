lpr_rate = 3.95;

$(function () {
  // initialization of go to
  //$.HSGoTo.init('.js-go-to');
  // init
  LprRateCalc();
   
  $("#ddlCalcMethod").change(function () {
    var area_HouseArea = $("#area_HouseArea");
    var area_HousePrice = $("#area_HousePrice");
    var area_HouseTotalPrice = $("#area_HouseTotalPrice");
    var area_PaymentRatio = $("#area_PaymentRatio");
	var area_PaymentAmount = $("#area_PaymentAmount");
    if (this.value == "2") {

      $('#txtHouseArea').val("");
      $('#txtHousePrice').val("");
      area_HouseArea.hide();
      area_HousePrice.hide();
      area_HouseTotalPrice.show();
      area_PaymentRatio.show();
	  area_PaymentAmount.show();

      $('#txtPaymentAmount').attr("disabled", true);
	  $('#txtLoanAmount').attr("disabled", true);
    }
    else if (this.value == "3") {
      $('#txtHouseArea').val("");
      $('#txtHousePrice').val("");
      $('#txtHouseTotalPrice').val("");
      area_HouseArea.show();
      area_HousePrice.show();
      area_HouseTotalPrice.show();
      area_PaymentRatio.show();
	  area_PaymentAmount.show();

	  $('#txtPaymentAmount').attr("disabled", true);
      $('#txtLoanAmount').attr("disabled", true);
    }
    else {
      area_HouseArea.hide();
      area_HousePrice.hide();
      area_HouseTotalPrice.hide();
      area_PaymentRatio.hide();
	  area_PaymentAmount.hide();

	  $('#txtPaymentAmount').attr("disabled", false);
      $('#txtLoanAmount').attr("disabled", false);
    }
  });

  $("#txtHouseArea,#txtHousePrice,#txtHouseTotalPrice").on("input propertychange", function () {
    HousePriceCalc();
  });
  $("#ddlPaymentRatio").change(function () {
    HousePriceCalc();
  });

  $("input:radio[name=rateType]").change(function () {
    // LPR利率/基准利率表单切换
    var isShow = false;
    if (this.value == "lpr") {
      isShow = true;
      $("#txtLprRate").val(lpr_rate);
      LprRateCalc();
    }
    else {
      isShow = false;
      $("#txtLoanRate").val("4.9");
    }
    $("[id^='area_Lpr']").each(function () {
      if (isShow) {
        $(this).show();
      }
      else {
        $(this).hide();
      }
    });
  });

  $("input[id^='txtLpr']").on("input propertychange", function () {
    LprRateCalc();
  });

  // 输入金额换算成万元提示
  $("#txtLoanAmount,#txtHouseTotalPrice").on("input propertychange", function () {
    //$(this).attr("title",$(this).val());
    $(this).attr("data-original-title", ($(this).val() / 10000).toFixed(4).replace(/[.]?0+$/, "") + "万元");
    $(this).tooltip('show');
  });
  $("#txtLoanAmount,#txtHouseTotalPrice").focus(function () {
    $(this).attr("data-original-title", ($(this).val() / 10000).toFixed(4).replace(/[.]?0+$/, "") + "万元");
    $(this).tooltip('show');
  });
  $("#txtLoanAmount,#txtHouseTotalPrice").blur(function () {
    $(this).tooltip('dispose');
  });

  $("#btnSubmit").click(function () {
    Calc();
  });

  $("#btnShowListBX").click(function () {
    //console.log($(this).text());
    var tab = $("#tabBenxi");
    if (tab.is(':hidden')) {
      tab.show();
      $(this).text("隐藏还款明细");
    }
    else {
      tab.hide();
      $(this).text("查看还款明细");
    }
  });
  $("#btnShowListBJ").click(function () {
    //console.log($(this).text());
    var tab = $("#tabBenjin");
    var btnText = $(this).text();
    if (tab.is(':hidden')) {
      tab.show();
      $(this).text("隐藏还款明细");
    }
    else {
      tab.hide();
      $(this).text("查看还款明细");
    }
  });


	// JS给select赋值
	$("#ddlCalcMethod").val("2");
	// 触发change事件
	$("#ddlCalcMethod").trigger("change");
});

function Calc() {
  var loanAmount = Number($("#txtLoanAmount").val());
  var years = Number($("#ddlYears").val());
  var loanRate = Number($("#txtLoanRate").val());

  if (loanAmount <= 0) {
    $("#txtLoanAmount").focus();
    return;
  }

  if (loanAmount == 0 || years == 0)
    return;

  var benxi = Loan_BenXi(loanAmount, years * 12, loanRate);
  var benjin = Loan_BenJin(loanAmount, years * 12, loanRate);

  $("#lblMonthRepayment-bx").text(formatCurrency(benxi.MonthRepayment.toFixed(2)));
  $("#lblLoanAmount-bx").text(formatCurrency(benxi.LoanAmount.toFixed(2)) + "元");
  $("#lblMonthDisplay-bx").text(benxi.MonthDisplay);
  $("#lblLoanRate-bx").text(benxi.Rate + "%");
  $("#lblTotalInterest-bx").text(formatCurrency(benxi.TotalInterest.toFixed(2)) + "元");
  $("#lblTotalRepayment-bx").text(formatCurrency(benxi.TotalRepayment.toFixed(2)) + "元");

  $("#lblMonthRepayment-bj").text(formatCurrency(benjin.MonthRepayment.toFixed(2)));
  $("#lblMonthReduce-bj").text(formatCurrency(benjin.MonthReduce.toFixed(2)) + "元");
  $("#lblLoanAmount-bj").text(formatCurrency(benjin.LoanAmount.toFixed(2)) + "元");
  $("#lblMonthDisplay-bj").text(benjin.MonthDisplay);
  $("#lblLoanRate-bj").text(benjin.Rate + "%");
  $("#lblTotalInterest-bj").text(formatCurrency(benjin.TotalInterest.toFixed(2)) + "元");
  $("#lblTotalRepayment-bj").text(formatCurrency(benjin.TotalRepayment.toFixed(2)) + "元");
  var tabTr = "";
  $.each(benxi.MonthItem, function (index, value) {
    tabTr += "<tr><td>" + value.Number + "</td><td>" + value.Repayment.toFixed(2) + "</td><td>" + value.Interest.toFixed(2) + "</td><td>" + value.Principal.toFixed(2) + "</td><td>" + value.Remainder.toFixed(2) + "</td></tr>";
  });
  $("#tabBenxi tbody").html(tabTr);
  $("#tabBenxi").hide();
  $("#btnShowListBX").text("查看还款明细");

  tabTr = "";
  $.each(benjin.MonthItem, function (index, value) {
    tabTr += "<tr><td>" + value.Number + "</td><td>" + value.Repayment.toFixed(2) + "</td><td>" + value.Interest.toFixed(2) + "</td><td>" + value.Principal.toFixed(2) + "</td><td>" + value.Remainder.toFixed(2) + "</td></tr>";
  });
  $("#tabBenjin tbody").html(tabTr);
  $("#tabBenjin").hide();
  $("#btnShowListBJ").text("查看还款明细");
  tabTr = null;

  $('html,body').animate({ scrollTop: $('#calc-results').offset().top - 45 }, 500);
}

function HousePriceCalc() {
  var houseArea = Number($("#txtHouseArea").val());
  var housePrice = Number($("#txtHousePrice").val());
  var paymentRatio = Number($("#ddlPaymentRatio").val());
  var houseTotalPrice = Number($("#txtHouseTotalPrice").val());

  var calcHouseTotalPrice = houseArea * housePrice;
  if (calcHouseTotalPrice > 0)
    houseTotalPrice = calcHouseTotalPrice;

  var LoanAmount = (100 - paymentRatio) / 100 * houseTotalPrice;

  //console.log("houseArea:" + houseArea);
  //console.log("housePrice:" + housePrice);
  //console.log("paymentRatio:" + paymentRatio);
  //console.log("houseTotalPrice:" + houseTotalPrice);
  //console.log(LoanAmount);

  var intLoanAmount = parseInt(LoanAmount / 10000);
  var decLoanAmount = (LoanAmount / 10000) - intLoanAmount;
  decLoanAmount = decLoanAmount >= 0.5 ? 0.5 : 0;
  LoanAmount = (intLoanAmount + decLoanAmount) * 10000;
  var paymentAmount = houseTotalPrice - LoanAmount;


  var FirstPayment = houseTotalPrice - LoanAmount;
  if ($("#ddlCalcMethod").val() == "3")
    $("#txtHouseTotalPrice").val(houseTotalPrice.toFixed(2));
  if (FirstPayment > 0)
    $("#lblFirstPayment").text(FirstPayment.toFixed(2) + "元");
  if (LoanAmount > 0)
    $("#txtLoanAmount").val(LoanAmount.toFixed(2));
  if (paymentAmount > 0)
    $("#txtPaymentAmount").val(paymentAmount.toFixed(2));
}


function LprRateCalc() {
  var lprRate = Number($("#txtLprRate").val());
  var lprBP = Number($("#txtLprBP").val());
  //console.log(lprRate + ',' + lprBP);
  // LPR+BP
  $("#area_LprMethodDesc").text(lprRate + "%+" + lprBP + "BP");
  var loanRate = (parseFloat(lprRate) + parseInt(lprBP) / 100).toFixed(2);
  $("#txtLoanRate").val(loanRate);
}


// 等额本息
function Loan_BenXi(_Amount, _Month, _Rate) {
  var P = new Array();
  var jsonResult = { "LoanAmount": 0, "MonthDisplay": "", "Rate": 0, "TotalInterest": 0, "TotalRepayment": 0, "MonthRepayment": 0, MonthItem: [] };
  //P = parseInt(document.getElementById("Principal").value);
  //R = document.getElementById("Rate_in_year").value / 100 / 12;
  //N = document.getElementById("Number_of_year").value * 12;

  P = parseInt(_Amount);
  R = parseFloat(_Rate) / 100 / 12;
  N = parseInt(_Month);

  //console.log(P);
  //console.log(R);
  //console.log(N);

  valid_decimal = 2;
  for (var i = 1; i <= N; i++) {
    // 月供
    var m_repayment = (P * Math.pow((1 + R), N) * R / (Math.pow((1 + R), N) - 1));
    // 每月还本金
    var m_principal = (P * R * Math.pow((1 + R), (i - 1)) / (Math.pow((1 + R), N) - 1));
    // 每月还利息
    var m_interest = (R * (P * (Math.pow((1 + R), N) - Math.pow((1 + R), (i - 1))) / (Math.pow((1 + R), N) - 1)));
    // 剩余本金
    var m_remainder = (P * (Math.pow((1 + R), N) - Math.pow((1 + R), i)) / (Math.pow((1 + R), N) - 1));

    jsonResult.MonthItem.push({ "Number": i, "Repayment": m_repayment, "Principal": m_principal, "Interest": m_interest, "Remainder": m_remainder });
    // 还款总额(本+息)
    jsonResult.TotalRepayment += m_repayment;

  }
  jsonResult.LoanAmount = P;
  jsonResult.MonthDisplay = N % 12 == 0 ? parseInt(N / 12) + "年" : parseInt(N / 12) + "年" + N % 12 + "个月";
  jsonResult.Rate = _Rate;
  jsonResult.MonthRepayment = jsonResult.MonthItem[0].Repayment;
  // 利息总额
  jsonResult.TotalInterest = jsonResult.TotalRepayment - P;

  console.log("等额本息 月供：" + jsonResult.MonthRepayment.toFixed(valid_decimal));
  console.log("期限：" + jsonResult.MonthDisplay);
  console.log("总利息：" + jsonResult.TotalInterest.toFixed(valid_decimal));
  console.log("本息合计：" + jsonResult.TotalRepayment.toFixed(valid_decimal));
  console.log(jsonResult);

  return jsonResult;

}

// 等额本金
function Loan_BenJin(_Amount, _Month, _Rate) {
  var P = new Array();
  var jsonResult = { "LoanAmount": 0, "MonthDisplay": 0, "Rate": 0, "TotalInterest": 0, "TotalRepayment": 0, "MonthRepayment": 0, "MonthReduce": 0, MonthItem: [] };
  //P = parseInt(document.getElementById("Principal").value);
  //R = document.getElementById("Rate_in_year").value / 100 / 12;
  //N = document.getElementById("Number_of_year").value * 12;

  P = parseInt(_Amount);
  R = parseFloat(_Rate) / 100 / 12;
  N = parseInt(_Month);

  //console.log(P);
  //console.log(R);
  //console.log(N);

  valid_decimal = 2;
  for (var i = 1; i <= N; i++) {
    // 月供
    var m_repayment = (P / N + (P - (i - 1) * P / N) * R);
    // 每月还本金
    var m_principal = (P / N);
    // 每月还利息
    var m_interest = ((P - (i - 1) * P / N) * R);
    // 剩余本金
    var m_remainder = (P - i * P / N);

    jsonResult.MonthItem.push({ "Number": i, "Repayment": m_repayment, "Principal": m_principal, "Interest": m_interest, "Remainder": m_remainder });
    // 还款总额(本+息)
    jsonResult.TotalRepayment += m_repayment;

  }
  jsonResult.LoanAmount = P;
  jsonResult.MonthDisplay = N % 12 == 0 ? parseInt(N / 12) + "年" : parseInt(N / 12) + "年" + N % 12 + "个月";
  jsonResult.Rate = _Rate;
  jsonResult.MonthRepayment = jsonResult.MonthItem[0].Repayment;
  jsonResult.MonthReduce = jsonResult.MonthItem[jsonResult.MonthItem.length - 1].Interest;
  // 利息总额
  jsonResult.TotalInterest = jsonResult.TotalRepayment - P;

  console.log("等额本金 月供：" + jsonResult.MonthRepayment.toFixed(valid_decimal));
  console.log("每月递减：" + jsonResult.MonthReduce.toFixed(valid_decimal));
  console.log("期限：" + jsonResult.MonthDisplay);
  console.log("总利息：" + jsonResult.TotalInterest.toFixed(valid_decimal));
  console.log("本息合计：" + jsonResult.TotalRepayment.toFixed(valid_decimal));
  console.log(jsonResult);

  return jsonResult;
}

function formatCurrency2(num) {
  num = num.toString().replace(/\$|\,/g, '');
  if (isNaN(num))
    num = "0";
  sign = (num == (num = Math.abs(num)));
  num = Math.floor(num * 10 + 0.50000000001);
  //cents = num%10;
  num = Math.floor(num / 10).toString();
  for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
    num = num.substring(0, num.length - (4 * i + 3)) + ',' +
      num.substring(num.length - (4 * i + 3));
  return (((sign) ? '' : '-') + num);
}
function formatCurrency(s) {
  var n = 2;
  n = n > 0 && n <= 20 ? n : 2;
  s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
  var l = s.split(".")[0].split("").reverse(),
    r = s.split(".")[1];
  t = "";
  for (i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}