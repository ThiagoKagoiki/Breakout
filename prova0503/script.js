const canvas = document.getElementById('breakout');
const ctx = canvas.getContext('2d');
var gameover = false

class Entidade {

    constructor(x, y, largura, altura, velocidadex) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
        this.velocidadex = velocidadex;
    }

    desenhar(ctx, cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }

    atualizar(){

    }
}

class Plano extends Entidade {

    constructor(x, y, largura, altura, velocidadex) {
        super(x, y, largura, altura, velocidadex);
        this.velocidadex = 0;
    }

    movimentacaoEsq() {
        this.velocidadex = -5;
    }

    movimentacaoDir() {
        this.velocidadex = 5;
    }

    parede() {
        if(this.x <= 0 && this.velocidadex < 0) {
            this.velocidadex = 0;
        }else if((this.x + this.largura) >= canvas.width && this.velocidadex > 0) {
            this.velocidadex = 0;
        }
    }
    
    atualizar() {
        this.x += this.velocidadex;
    }
}

class Bola extends Entidade{

    #velocidadey;

    constructor(x, y, largura, altura, velocidadex) {
        super(x, y, largura, altura, velocidadex);
        this.velocidadex = -5;
        this.#velocidadey = 5;
        
    }

    final(){
        if(this.y + this.altura >= canvas.height) {
            this.#velocidadey = 0
            this.velocidadex = 0
            gameover = true
        }
    }

    colisaoRaquete(){
        if(this.y + this.altura >= plano.altura + plano.y && this.x + this.largura >= plano.x && this.x <= plano.largura + plano.x && gameover == false){
            this.#velocidadey = this.#velocidadey * -1
            this.velocidadex = this.velocidadex * - 1
        }
    }
    
    paredeLaterais(){
        if(this.x >= canvas.width){
            this.velocidadex = -5
        }else if(this.x <= 0){
            this.velocidadex = 5
        }
    }

    teto(){
        if(this.y <= 0){
            this.#velocidadey = 5
        }
    }

    atualizar() {
        this.x += this.velocidadex;
        this.y += this.#velocidadey;
    }
}

document.addEventListener('keypress', (e) => {
    if(e.code === 'KeyA') {
        plano.movimentacaoEsq();
    }else if(e.code === 'KeyD') {
        plano.movimentacaoDir();
    }
});

const plano = new Plano(canvas.width/2.4, 360, 60, 7)
const bola = new Bola(190, 337, 10, 10)

function loop(){

    bola.teto()
    bola.paredeLaterais()
    bola.final()
    bola.colisaoRaquete()
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    bola.desenhar(ctx, 'red')
    bola.atualizar()
    plano.parede()
    plano.atualizar();
    plano.desenhar(ctx, 'white')
    requestAnimationFrame(loop);
    
}

loop()
