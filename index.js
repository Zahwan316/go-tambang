const screen = document.getElementById("screen")
const ctx = screen.getContext('2d');

const main_screen_width = document.documentElement.clientWidth
const main_screen_height = 700

screen.width = main_screen_width
screen.height = main_screen_height

const player1img = new Image()
const player2img = new Image()
const ropeimg = new Image()
const backgroundimg = new Image()
player1img.src = "asset/player.png"
player2img.src = "asset/player-flipped.png"
ropeimg.src = "asset/thick-rope.png"
backgroundimg.src = "asset/background1.jpg"

//call dom element
const time = document.getElementById('time')
const score_player_1 = document.getElementById('score-player-1')
const score_player_2 = document.getElementById('score-player-2')
const ronde = document.getElementById('ronde')


class player {
    constructor(){
        this.width = 60
        this.height = 150
        this.pos = {
            x:280 + this.width,
            y:main_screen_height - this.height -5
        }
        this.speedx = 0;
        this.maxspeedx = 5

    }
    draw(ctx){
        ctx.drawImage(player1img,this.pos.x,this.pos.y,this.width,this.height)
    }

    keyclick(){
        this.speedx -= this.maxspeedx
        Player2.speedx -= this.maxspeedx
        Rope.speedx -= this.maxspeedx
    }

    stop(){
        this.speedx = 0
        Player2.speedx = 0
        Rope.speedx = 0
    }

    update(){
        this.pos.x += this.speedx
        if(this.pos.x + this.width / 2 > Middle.pos.x && this.pos.x - this.width < Middle.pos.x - Middle.width){
            Gamesetting.gamestate = gamestate.matching
            Gamesetting.player2_score++
        }
    }

}

class player2{
    constructor(){
        this.width = 60
        this.height = 150
        this.pos = {
            x:main_screen_width - this.width - 250,
            y:main_screen_height - this.height -5
        }
        this.speedx = 0;
        this.maxspeedx = 5
    }

    draw(ctx){
        ctx.drawImage(player2img,this.pos.x,this.pos.y,this.width,this.height)
        //ctx.fillRect(this.pos.x,this.pos.y,this.width,this.height)
    }

    keyclick(){
        this.speedx += this.maxspeedx
        Player.speedx += this.maxspeedx
        Rope.speedx += this.maxspeedx
    }

    stop(){
        this.speedx = 0
        Player.speedx =0
        Rope.speedx = 0
    }

    update(){
        this.pos.x += this.speedx

        if(this.pos.x  < Middle.pos.x   ){
            Gamesetting.gamestate = gamestate.matching
            Gamesetting.player1_score++
        }
    }
}

class rope{
    constructor(){
        this.width = 1000
        this.height = 50
        this.pos = {
            x:220,
            y:main_screen_height - 120
        }
        this.speedx = 0
    

    }

    draw(ctx){
        ctx.drawImage(ropeimg,this.pos.x,this.pos.y,this.width,this.height)
    }

    update(){
        this.pos.x += this.speedx
    }
}

class middle{
    constructor(){
        this.width = 10;
        this.height = 60
        this.pos = {
            x:main_screen_width / 2,
            y:main_screen_height - this.height
        }
    }
    draw(ctx){
        ctx.fillRect(this.pos.x,this.pos.y,this.width,this.height)
    }
}

let gamestate = {
    mainmenu:0,
    play:1,
    matching:2
}

class gamesetting{
    constructor(){
        this.round = 1
        this.player1_score = 0
        this.player2_score = 0
        this.gamestate = gamestate.play
        this.clock = 60
    }

    reset(){
        Player2.pos.x = main_screen_width - Player2.width - 250
        Player.pos.x = 280 + Player.width
        this.clock = 60
        Rope.pos.x = 220
    }

    update(){
        ronde.innerHTML = this.round
        score_player_1.innerHTML = this.player1_score
        score_player_2.innerHTML = this.player2_score

        if(this.clock < 1){
            this.clock = 0
        }

        if(this.gamestate === gamestate.matching){
            this.reset()
            setTimeout(() => {this.gamestate = gamestate.play},500)
        }
    }
}

const Player = new player();
const Player2 = new player2();
const Rope = new rope()
const Middle = new middle()
const Gamesetting = new gamesetting()

const init = window.onload = () => {
    setInterval(update,10)
}

const update = () => {
    ctx.clearRect(0, 0,main_screen_width, main_screen_height);
    ctx.drawImage(backgroundimg,0,0,main_screen_width,main_screen_height)
    Player.draw(ctx)
    Player2.draw(ctx)
    Rope.draw(ctx)
    Middle.draw(ctx)

    Player.update()
    Player2.update()
    Rope.update()
    Gamesetting.update()
}

//clock logic
const clock = () => {
    let decrease = () => {
        Gamesetting.clock--
        time.innerHTML = Gamesetting.clock
    }

    setInterval(decrease,200)
}

clock()

//movement logic
window.addEventListener('keydown',(e) => {
    switch(e.keyCode){
        case 82:
            Player.keyclick()
            break;
        case 73:
            Player2.keyclick()
            break;
    }
})

window.addEventListener("keyup",(e) => {
    switch(e.keyCode){
        case 82:
            Player.stop()
            break;
        case 73:
            Player2.stop()
            break;
    }
})


