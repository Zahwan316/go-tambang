const screen = document.getElementById("screen")
const ctx = screen.getContext('2d');

const main_screen_width = 1366
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

const audio = new Audio
audio.src = "asset/audio-main.mp3"

//call dom element
const time = document.getElementById('time')
const score_player_1 = document.getElementById('score-player-1')
const score_player_2 = document.getElementById('score-player-2')
const ronde = document.getElementById('ronde')
const hud_notif = document.getElementById("hud-notif")
const hud_text = document.getElementById("text-notif")
const btn_restart = document.getElementById("btn-restart")
const btn_start = document.getElementById("btn-start")
const main_menu_hud = document.getElementById("mainmenuhud")

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
        this.keypressed = false


    }
    draw(ctx){
        ctx.drawImage(player1img,this.pos.x,this.pos.y,this.width,this.height)
    }

    keyclick(){
        if(!this.keypressed){
            this.speedx -= this.maxspeedx
            Player2.speedx -= this.maxspeedx
            Rope.speedx -= this.maxspeedx
            this.keypressed = true
        }
    }

    stop(){
        this.speedx = 0
        Player2.speedx = 0
        Rope.speedx = 0
        this.keypressed = false
    }

    update(){
        this.pos.x += this.speedx
        if(this.pos.x + this.width / 2 > Middle.pos.x && this.pos.x - this.width < Middle.pos.x - Middle.width){
            Gamesetting.gamestate = gamestate.matching
            Gamesetting.player2_score++
            hud_text.innerHTML = "Player 2 Menang"
            hud_notif.style.display = "flex"
            Gamesetting.clockadd = true
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
        this.keypressed = false
    }

    draw(ctx){
        ctx.drawImage(player2img,this.pos.x,this.pos.y,this.width,this.height)
        //ctx.fillRect(this.pos.x,this.pos.y,this.width,this.height)
    }

    keyclick(){
        if(!this.keypressed){
            this.speedx += this.maxspeedx
            Player.speedx += this.maxspeedx
            Rope.speedx += this.maxspeedx
            this.keypressed = true
        }
    }

    stop(){
        this.speedx = 0
        Player.speedx =0
        Rope.speedx = 0
        this.keypressed = false
    }

    update(){
        this.pos.x += this.speedx

        if(this.pos.x  < Middle.pos.x   ){
            Gamesetting.gamestate = gamestate.matching
            Gamesetting.player1_score++
            hud_notif.style.display = "flex"
            hud_text.innerHTML = "Player 1 Menang"
            Gamesetting.clockadd = true
        }
    }
}

class rope{
    constructor(){
        this.width = 1000
        this.height = 50
        this.pos = {
            x:0,
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
    matching:2,
    done:3
}

class gamesetting{
    constructor(){
        this.round = 1
        this.player1_score = 0
        this.player2_score = 0
        this.gamestate = gamestate.mainmenu
        this.clock = 60
        this.clockadd = true
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
            this.gamestate = gamestate.matching
            hud_notif.style.display = "flex"
            hud_text.innerHTML = "Seri"
            //this.round++
            this.clockadd = true

        }

        if(this.round >= 5){
            this.gamestate = gamestate.done
        }

        if(this.gamestate === gamestate.mainmenu){
            this.reset()
            
        }

        if(this.gamestate === gamestate.play){

        }

        if(this.gamestate === gamestate.matching){
            if(this.clockadd){
                this.round++
                this.clockadd = false
            }
            this.reset()
            setTimeout(() => {
                this.gamestate = gamestate.play
                hud_notif.style.display = "none"
            },1000)
        }


        if(this.gamestate === gamestate.done){
            this.reset()
            hud_notif.style.display = "flex"
            btn_restart.style.display = "flex"
            if(this.player1_score > this.player2_score){
                hud_text.innerHTML = "Selamat Player 1 Menang"
            }
            else if(this.player2_score > this.player1_score){
                hud_text.innerHTML = "Selamat Player 2 Menang"
            }
            else if(this.player2_score == this.player1_score){
                hud_text.innerHTML = "Yahh Game Seri"
            }
        }
    }
}

const Player = new player();
const Player2 = new player2();
const Rope = new rope()
const Middle = new middle()
const Gamesetting = new gamesetting()

const init = window.onload = () => {
    alert("Aturan Game : \n1.Game ini dimainkan oleh 2 orang tipe game ini lebih ke tap-tap \n2.Tap huruf R untuk menarik tambang Player 1 dan Tap huruf I untuk menarik tambang Player 2  \n3.Jangan Sampai Player Mengenai Garis Tengah Yang Berwarna Hitam \n4.Player Dengan Score Yang Paling Banyak Dialah Pemenangnya \n5.Waktu Hanya 60 Detik dan Hanya 5 Ronde \n \nMaaf kalau masih ada bug,game ini dibuat dalam waktu 2 hari \nDibuat oleh : Zahwan \nIndonesia Merdeka!!")
    audio.play()
    audio.volume = 0.6
    setInterval(update,50)
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
    audio.play()
}

//clock logic
const clock = () => {
    let decrease = () => {
        Gamesetting.clock--
        time.innerHTML = Gamesetting.clock
    }

    setInterval(decrease,1000)
}


    clock()



//btn logic
btn_start.addEventListener("click",() => {
    main_menu_hud.style.display = "none"
    Gamesetting.gamestate = gamestate.play
})

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


