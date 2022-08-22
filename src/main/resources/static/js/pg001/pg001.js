/**
 * 크롬 오프라인 공룡게임
 * クロームオフライン　恐竜ゲーム
 * 
 * @see https://www.youtube.com/watch?v=qkTtmgCjHhM
 */

var ctx;
var jumpFlag = false;
var dino;
var animation;
var treeImage = new Image(50, 50);
treeImage.src = "/images/green trees.png";

$(document).ready(function(){
    var canvas = document.getElementById("canvas");
    // 캔버스 객체
    // キャンバスのオブジェクト生成
    // https://developer.mozilla.org/ko/docs/Web/API/HTMLCanvasElement/getContext
    ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth - 100;
    canvas.height = window.innerHeight - 100;

    // 초기화
    // 初期化
    init();
    
    // 동작을 시작
    // 開始
    playAnimation();

});

/**
 * 장애물(선인장) 클래스
 */
class Cactus {
    constructor() {
        this.x = 500;
        this.y = 200;
        this.width = 50;
        this.height = 50;
    }
    draw() {
        //ctx.fillStyle = "red";
        //ctx.fillRect(this.x, this.y, this.width, this.height);
        //ctx.drawImage(treeImage, this.x, this.y);

        // 参考：https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeRect
        ctx.strokeStyle = "red";
        // Set line width
        ctx.lineWidth = 10;

        ctx.strokeRect(this.x + 5, this.y + 5, this.width - 10, this.height - 10);
        ctx.stroke();
       
    }
}


/**
 * 초기화처리
 * 初期化
 */
function init() {

    // 플레이어가 조종할 공룡 오브젝트 생성
    // プレイヤーが操縦する恐竜オブジェクトを生成する
    dino = {
        x : 10,
        y : 200,
        width : 50,
        height : 50,
        draw() {
            ctx.fillStyle = "green";
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
}

var timer = 0;
var cactusList = []; // 배열에 넣어두기
var jumpTimer = 0;
function playAnimation() {
    animation = requestAnimationFrame(playAnimation);
    timer++;

    // 캔버스 클리어
    // キャンバスのクリア
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 장애물관리
    // 障害物の制御
    controlObstacle();    

    // 공룡 관리
    controlDino();

}

/**
 * 점프(스페이스)
 */
document.addEventListener('keydown', function (e) {
    if (e.code === 'Space') {
        jumpFlag = true;
    }
});

/**
 * 장애물 관리
 */
function controlObstacle() {

    if(timer % 200 == 0) {
        // 장애물을 생성
        var cactus = new Cactus();
        cactusList.push(cactus);
    }

    // 장애물 그리기(사라진 장애물 삭제)
    cactusList.forEach((element, idx, arr)=> {
        if (element.x < -1) {
            arr.splice(idx, 1);
        }
        element.x--;

        // 충돌 확인
        collisionCheck(dino, element);
        
        element.draw();
    });

    // // 오브젝트 삭제 처리
    // for (let i = 0; i < cactusList.length; i++) {
    //     var element = cactusList[i];
    //     if (element.x + element.width < -1) {
    //         cactusList.splice(i, 1);
    //     }
    // }

}

/**
 * 공룡 관리
 */
function controlDino() {
    // 점프후 100프레임 이후에 점프종료
    if (jumpTimer > 100) {
        jumpFlag = false;
        jumpTimer = 0;
    }

    if (jumpFlag) {
        dino.y--;
        jumpTimer++;
    } else if (dino.y < 200) {
        dino.y++;
    }

    dino.draw();
}

/**
 * 충돌 체크
 * 衝突チェック
 * 
 * @param {Object} dino 
 * @param {Cactus} obstacle 
 */
function collisionCheck(dino, obstacle) {
    var xDiff = obstacle.x - (dino.x + dino.width);
    var yDiff = obstacle.y - (dino.y + dino.height);

    // 충돌여부 확인 후 동작을 멈춤
    // 衝突を確認し衝突した場合中止
    if(xDiff < 0 && yDiff < 0) {
        cancelAnimationFrame(animation);
    }

}