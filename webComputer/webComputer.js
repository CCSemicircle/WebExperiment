// 初始化全局变量
var input = 0; // 当前输入运算串
var lastInput = ""; // 点击二目运算或等于产生上一个输入运算串
var pastInput = ""; // 之前所有的运算串
var operator = ""; // 当前点击的二目运算或等于
var lastOperator = ""; // 上一个二目运算或等于
var inputAnswer = 0; // 当前输入运算串的结果
var lastInputAnswer = 0; // 上一个输入运算串的结果串
var pastInputAnswer = []; // 之前所有的运算串的结果串
var count = 0;

function isPureNumber() {
  return /^\d+$/.test(input);
}

function appendElement(str) {
  pastInput = pastInput + str;
  pastInputAnswer[count++] = str;
}

/**
 * 重置输入框
 */
function reset() {
  let inputBar = document.getElementById("inputBar");
  let pastInputBar = document.getElementById("pastInputBar");

  inputBar.value = input;
  pastInputBar.textContent = pastInput;
}

/**
 * 获取上一个输入
 */
function getLastInput() {
  if (operator == "=") {
    return;
  }

  if (count < 2) return;

  // 去掉当前二目运算符
  pastInput = pastInput.slice(0, -1);
  pastInputAnswer = pastInputAnswer.slice(0, -1);
  count--;

  if (count > 2) {
    // 有上一个二目运算符
    lastOperator = pastInputAnswer[count - 2];

    // 获取上一个输入及其结果
    lastInputIndex = pastInput.lastIndexOf(lastOperator);
    lastInput = pastInput.slice(lastInputIndex + 1);
    lastInputAnswer = pastInputAnswer[count - 1];
  }

  // 更新过去字符串及其结果
  pastInput = pastInput.slice(0, lastInputIndex + 1);
  pastInputAnswer = pastInputAnswer.slice(0, count - 1);
  count--;

  input = lastInput;
  inputAnswer = lastInputAnswer;

  reset();
}

/**
 * 二目运算
 */
function twoFactorOperation(obj) {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }

  if (obj.value.length > 1) {
    operator = "^";
  } else {
    operator = obj.value;
  }

  lastOperator = operator;
  lastInput = input;
  lastInputAnswer = inputAnswer;

  // 如果pastInput最后一个字符为），则直接加上二目运算符
  if (pastInput[pastInput.length - 1] == ")") {
    appendElement(operator);
  } else {
    appendElement(input);
    appendElement(operator);
  }

  // 更新当前输入
  input = 0;
  inputAnswer = 0;

  reset();
}

/**
 * 输入π
 */
function getPai() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  input = Math.PI;
  inputAnswer = Math.PI;
  reset();
}

/**
 * 输入e
 */
function getE() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  input = Math.E;
  inputAnswer = Math.E;
  reset();
}

/**
 * 清空历史字符串
 */
function clearPastInput() {
  lastInput = "";
  pastInput = "";
  operator = "";
  lastOperator = "";
  lastInputAnswer = 0;
  pastInputAnswer = [];
  count = 0;
}

/**
 * 清除当前所有输入，当前输入为零时，清除之前所有输入
 * 注意：函数名不能为clear或者clearAll
 */
function clearInput() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  if (input == 0) {
    clearPastInput();
  } else {
    input = 0;
    inputAnswer = 0;
  }
  reset();
}

/**
 * 回退
 */
function back() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
    input = 0;
    inputAnswer = 0;
  }
  if (input == 0) {
    input = 0;
    inputAnswer = 0;
  } else if (input == Math.PI || input == Math.E) {
    input = 0;
    inputAnswer = 0;
  } else if (isPureNumber()) {
    input = input.slice(0, -1);
    inputAnswer = input;
  } else {
    // 不是输入数字的回退无效
  }
  reset();
}

/**
 * 求平方
 */
function square() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  if (isPureNumber()) {
    input = input + "^2";
  } else {
    input = "(" + input + ")" + "^2";
  }
  inputAnswer = inputAnswer * inputAnswer;
  reset();
}

/**
 * 求倒数
 */
function reciprocal() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  if (isPureNumber()) {
    input = "1/" + input;
  } else {
    input = "1/" + "(" + input + ")";
  }
  inputAnswer = 1 / inputAnswer;
  reset();
}

/**
 * 求绝对值
 */
function absoluteInput() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  if (isPureNumber()) {
    input = "|" + input + "|";
  } else {
    input = "|" + "(" + input + ")" + "|";
  }
  inputAnswer = Math.abs(inputAnswer);
  reset();
}

/**
 * e的指数运算
 */
function multiplyExpByTen() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  if (isPureNumber()) {
    input = "e^" + input;
  } else {
    input = "e^" + "(" + input + ")";
  }
  inputAnswer = Math.pow(Math.E, inputAnswer);
  reset();
}

/**
 * 开根号
 */
function radical() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  if (isPureNumber()) {
    input = "√" + input;
  } else {
    input = "√" + "(" + input + ")";
  }
  inputAnswer = Math.pow(inputAnswer, 1 / 2);
  reset();
}

var leftBracketNum = 0;

/**
 * 获取左括号，如果只有左括号，自动加到最后
 */
function getLeftBracket() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  // 如果上一个字符为）,则不能添加左括号
  if (pastInput[pastInput.length - 1] == ")") return;
  appendElement("(");
  leftBracketNum++;
  reset();
}

/**
 * 获取右括号
 */
function getRightBracket() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  // 如果无多余左括号，则不能添加右括号
  if (leftBracketNum == 0) return;
  // 如果pastInput最后一个字符为二目运算或者(，必须加上当前的input
  if (
    pastInput[pastInput.length - 1] == "%" ||
    pastInput[pastInput.length - 1] == "/" ||
    pastInput[pastInput.length - 1] == "*" ||
    pastInput[pastInput.length - 1] == "-" ||
    pastInput[pastInput.length - 1] == "+" ||
    pastInput[pastInput.length - 1] == "^" ||
    pastInput[pastInput.length - 1] == "("
  ) {
    appendElement(input);
    appendElement(")");
    input = 0;
    inputAnswer = 0;
  } else {
    appendElement(")");
  }
  leftBracketNum--;
  reset();
}

/**
 * 阶乘
 */
function factorial() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  // 如果input是小数，不能计算阶乘
  if (input.lastIndexOf(".") != -1) return;
  if (isPureNumber()) {
    input = input + "!";
  } else {
    input = "(" + input + ")" + "!";
  }
  let n = inputAnswer;
  for (let i = n - 1; i > 0; i--) {
    inputAnswer = inputAnswer * i;
  }

  reset();
}

/**
 * 10的指数运算
 */
function expByTen() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  if (isPureNumber()) {
    input = "10^" + input;
  } else {
    input = "10^" + "(" + input + ")";
  }
  inputAnswer = Math.pow(10, inputAnswer);

  reset();
}

/**
 * 2为底对数运算
 */
function logarithm() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  if (isPureNumber()) {
    input = "log" + input;
  } else {
    input = "log" + "(" + input + ")";
  }
  inputAnswer = Math.log(inputAnswer) / Math.log(2);

  reset();
}

/**
 * e为底的对数运算
 */
function logarithmByE() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  if (isPureNumber()) {
    input = "ln" + input;
  } else {
    input = "ln" + "(" + input + ")";
  }
  inputAnswer = Math.log(inputAnswer) / Math.log(Math.E);

  reset();
}

/**
 * 取反
 */
function opposite() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  input = input.toString();
  if (input[0] == "-") {
    // 原来是负数
    input = input.slice(1);
    if (input.lastIndexOf(")") == input.length - 1) {
      input = input.slice(1, -1);
    }
  } else {
    // 原来是正数
    if (isPureNumber()) {
      input = -input;
    } else {
      input = "-" + "(" + input + ")";
    }
  }
  inputAnswer = -inputAnswer;

  reset();
}

/**
 * 赋小数点
 */
function getDot() {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
  }
  if (!isPureNumber || input[input.length - 1] == ".") return;
  input = input + ".";
  reset();
}

/**
 * 输入数字，设置清除常数
 */
function setNumber(obj) {
  if (pastInputAnswer[count - 1] == "=") {
    clearPastInput();
    input = 0;
    inputAnswer = 0;
  }

  // 如果上一个字符为)，则不能输入数字
  if (pastInput[pastInput.length - 1] == ")") return;
  if (input == 0 || input == Math.PI || input == Math.E) {
    input = obj.value;
    inputAnswer = obj.value;
  } else {
    input = input + obj.value;
    inputAnswer = input;
  }

  reset();
}

function computeTwoFactorialOperation(index, temp) {
  pastInputAnswer[index - 1] = temp;
  pastInputAnswer[index] = temp;
  pastInputAnswer[index + 1] = temp;
}

/**
 * 计算，按照运算优先级计算所有的二目运算，先乘方，再除乘模，最后加减
 */
function compute(left, right) {
  let index;

  // 存在括号
  for (let index = left; index <= right; index++) {
    if (pastInputAnswer[index] == "(") {
      for (let rightIndex = right; rightIndex >= left; rightIndex--) {
        if (pastInputAnswer[rightIndex] == ")") {
          compute(index + 1, rightIndex - 1);
          let temp = parseFloat(pastInputAnswer[rightIndex - 1]);
          // 同化括号内的所有元素
          for (; index <= rightIndex; index++) {
            pastInputAnswer[index] = temp;
          }
        }
      }
    }
  }

  // ^
  while (
    (index = pastInputAnswer.indexOf("^")) != -1 &&
    left < index &&
    index < right
  ) {
    let temp = Math.pow(
      parseFloat(pastInputAnswer[index - 1]),
      parseFloat(pastInputAnswer[index + 1])
    );

    computeTwoFactorialOperation(index, temp);
  }

  // /
  while (
    (index = pastInputAnswer.indexOf("/")) != -1 &&
    left < index &&
    index < right
  ) {
    let temp =
      parseFloat(pastInputAnswer[index - 1]) /
      parseFloat(pastInputAnswer[index + 1]);

    computeTwoFactorialOperation(index, temp);
  }

  // *
  while (
    (index = pastInputAnswer.indexOf("*")) != -1 &&
    left < index &&
    index < right
  ) {
    let temp =
      parseFloat(pastInputAnswer[index - 1]) *
      parseFloat(pastInputAnswer[index + 1]);

    computeTwoFactorialOperation(index, temp);
  }

  // %
  while (
    (index = pastInputAnswer.indexOf("%")) != -1 &&
    left < index &&
    index < right
  ) {
    let temp =
      parseFloat(pastInputAnswer[index - 1]) %
      parseFloat(pastInputAnswer[index + 1]);

    computeTwoFactorialOperation(index, temp);
  }

  // +/-
  index = left;
  while (index < right) {
    let temp;
    if (pastInputAnswer[index] == "+") {
      temp =
        parseFloat(pastInputAnswer[index - 1]) +
        parseFloat(pastInputAnswer[index + 1]);
      computeTwoFactorialOperation(index, temp);
    }
    if (pastInputAnswer[index] == "-") {
      temp =
        parseFloat(pastInputAnswer[index - 1]) -
        parseFloat(pastInputAnswer[index + 1]);
      computeTwoFactorialOperation(index, temp);
    }

    index++;
  }
}

/**
 * 获取结果，并清除所有数据
 */
function getAnswer() {
  if (pastInputAnswer[count - 1] == "=") return;

  // 保存本次输入
  lastOperator = operator;
  lastInput = input;
  lastInputAnswer = inputAnswer;

  // 如果pastInput最后一个字符为），则直接加上"="
  if (pastInput[pastInput.length - 1] == ")") {
    console.log("leftBracketNum:" + leftBracketNum);
    // 补充括号
    while (leftBracketNum > 0) {
      pastInput = pastInput + ")";
      pastInputAnswer[count++] = ")";
      leftBracketNum--;
    }
    pastInput = pastInput + "=";
    pastInputAnswer[count++] = "=";
  } else {
    pastInput = pastInput + input;
    pastInputAnswer[count++] = inputAnswer;
    // 补充括号
    while (leftBracketNum > 0) {
      pastInput = pastInput + ")";
      pastInputAnswer[count++] = ")";
      leftBracketNum--;
    }
    pastInput = pastInput + "=";
    pastInputAnswer[count++] = "=";
  }

  console.log(pastInputAnswer);

  compute(0, count - 1);

  // 更新当前全局变量
  input = pastInputAnswer[count - 2];
  inputAnswer = input;
  operator = "=";

  reset();
}
