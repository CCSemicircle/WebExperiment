const NUM = 10;
var curr = 0;

/**
 * 初始化图片列表
 */
function init() {
  let thumbnailNode = document.getElementById("thumbnail");
  for (let i = 1; i <= NUM; i++) {
    let imgNode = document.createElement("img");
    imgNode.setAttribute("class", "small-image");
    if (i == 1) {
      imgNode.setAttribute("id", "selected");
    }
    imgNode.setAttribute("src", "resources/images/" + i + ".jpg");
    imgNode.setAttribute("onclick", "setCurr(this)");
    thumbnailNode.appendChild(imgNode);
  }
  setImage();
}

/**
 * 设置当前显示图片
 */
function setImage() {
  // 改变缩略图选中
  let lastSelected = document.getElementById("selected");
  lastSelected.setAttribute("id", "");
  let smallImageNodes = document.getElementsByClassName("small-image");
  let currNode = smallImageNodes[curr];
  currNode.setAttribute("id", "selected");

  // 改变显示图片
  let imageNode = document.getElementById("image");
  imageNode.setAttribute("src", "resources/images/" + (curr + 1) + ".jpg");
  imageNode.className = "solid";
}

/**
 * 获取上一张图片
 */
function getPrevious() {
  if (curr == 0) {
    curr = 10;
  }
  curr = (curr - 1) % NUM;
  let imageNode = document.getElementById("image");
  imageNode.className = "transparent";
  setTimeout(function () {
    setImage();
  }, 1500);
}

/**
 * 获取下一张图片
 */
function getNext() {
  curr = (curr + 1) % NUM;
  let imageNode = document.getElementById("image");
  imageNode.className = "transparent";
  setTimeout(function () {
    setImage();
  }, 1500);
}

/**
 * 点击缩略图设置当前图
 */
function setCurr(obj) {
  let src = obj.src;
  let index = src.lastIndexOf("/");
  let currStr = src.slice(index + 1, -4);
  curr = parseInt(currStr) - 1;
  setImage();
}

init();
