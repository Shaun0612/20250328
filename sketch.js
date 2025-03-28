let seaweeds = []; // 儲存所有海草的屬性
let numSeaweeds = 80; // 海草數量

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight); // 創建畫布
  canvas.style('z-index', '2'); // 設定畫布的 z-index
  canvas.style('background', 'transparent'); // 設定畫布背景為透明
  canvas.style('pointer-events', 'none'); // 讓畫布忽略滑鼠事件
  canvas.position(0, 0); // 確保畫布覆蓋整個視窗

  // 初始化每條海草的屬性
  for (let i = 0; i < numSeaweeds; i++) {
    let seaweed = {
      length: random(50, 150), // 海草的高度
      thickness: random(15, 30), // 海草的粗細
      color: color(random(0, 200), random(150, 255), random(0, 255), random(150, 200)), // 海草的顏色（增加透明度）
      frequency: random(0.01, 0.04), // 搖晃的頻率
      angleOffsets: Array.from({ length: 15 }, () => random(TWO_PI)), // 減少段數
      baseX: random(width), // 海草的基底位置
    };
    seaweeds.push(seaweed);
  }
}

function draw() {
  clear(); // 清除畫布，保留透明背景
  background(255, 208, 255, 100); // 設定半透明背景顏色 (R, G, B, Alpha)
  for (let seaweed of seaweeds) {
    let baseX = seaweed.baseX; // 海草的基底位置
    let baseY = height + 50; // 海草的底部位置
    let segmentLength = seaweed.length / seaweed.angleOffsets.length + 10; // 增加每段的長度

    stroke(seaweed.color); // 設定海草顏色
    strokeWeight(seaweed.thickness); // 設定海草粗細
    noFill();

    beginShape();
    let x = baseX;
    let y = baseY;

    // 使用 curveVertex 繪製平滑曲線
    curveVertex(x, y); // 起始點（需要重複一次以確保曲線從這裡開始）
    for (let i = 0; i < seaweed.angleOffsets.length; i++) {
      let sway = sin(seaweed.angleOffsets[i]) * (seaweed.angleOffsets.length - i) * 0.4; // 搖擺幅度
      x += sway; // 左右搖擺
      y -= segmentLength; // 向上延伸
      curveVertex(x, y); // 繪製平滑曲線的頂點
      seaweed.angleOffsets[i] += seaweed.frequency; // 更新角度偏移，控制搖擺速度
    }
    curveVertex(x, y); // 結束點（需要重複一次以確保曲線平滑）
    endShape();
  }
}

function windowResized() { // 視窗大小改變時
  resizeCanvas(windowWidth, windowHeight); // 調整畫布大小

  // 重新計算每條海草的基底位置
  for (let seaweed of seaweeds) {
    seaweed.baseX = random(width); // 根據新的畫布寬度重新設定基底位置
  }
}