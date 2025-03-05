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
        this.velocidadex = -3;
        this.#velocidadey = 2;
        
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
            this.velocidadex = -3
        }else if(this.x <= 0){
            this.velocidadex = this.velocidadex * - 1
        }
    }

    teto(){
        if(this.y <= 0){
            this.#velocidadey = 2
        }
    }

    atualizar() {
        this.x += this.velocidadex;
        this.y += this.#velocidadey;
    }
}

class Bloco extends Entidade{
    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.removido = false
    }
    desenhar(ctx) {
        if (!this.removido){
            ctx.fillStyle = 'yellow';
            ctx.fillRect(this.x, this.y, this.largura, this.altura);
        }
    }
}

class Blocos{
    constructor(largura, altura, linhas, colunas) {
        this.blocos = [];
        for (let i = 0; i < linhas; i++) {
            for (let j = 0; j < colunas; j++) {
                const x = j * (largura + margem);
                const y = i * (altura + margem);
                this.blocos.push(new Bloco(x, y, largura, altura));
            }
        }
    }

    desenhar(ctx){
        this.blocos.forEach(bloco => bloco.desenhar(ctx));
    }

    verificarColisao(bola) {
        this.blocos.forEach(bloco => {
            if (!bloco.removido && bola.x < bloco.x + bloco.largura && bola.x + bola.largura > bloco.x && bola.y < bloco.y + bloco.altura && bola.y + bola.altura > bloco.y) {
                bloco.removido = true;
                bola.velocidadey =bola.velocidadey * -1;
            }
        });
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

const largura = 30;
const altura = 30;
const linhas = 3;
const colunas = 8;
const margem = 20
const blocos = new Blocos(largura, altura, linhas, colunas);

function loop(){    

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    blocos.desenhar(ctx);
    blocos.verificarColisao(bola);
    bola.teto();
    bola.paredeLaterais();
    bola.final();
    bola.colisaoRaquete();
    bola.atualizar();
    bola.desenhar(ctx, 'red');
    plano.parede();
    plano.atualizar();
    plano.desenhar(ctx, 'white');
    if (!gameover) {
        requestAnimationFrame(loop);
    } else {
        ctx.fillStyle = 'black';
        ctx.font = '30px Arial';
        ctx.fillText('Game Over', canvas.width / 2 - 70, canvas.height / 2);
    }
    
}

loop()
