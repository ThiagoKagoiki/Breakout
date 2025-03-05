const canvas = document.getElementById('breakout');
const ctx = canvas.getContext('2d');

class Entidade {

    constructor(x, y, largura, altura) {
        this.x = x;
        this.y = y;
        this.largura = largura;
        this.altura = altura;
    }

    desenhar(ctx, cor) {
        ctx.fillStyle = cor;
        ctx.fillRect(this.x, this.y, this.largura, this.altura);
    }

    atualizar(){

    }
}

class Plano extends Entidade {

    #velocidadex;

    constructor(x, y, largura, altura) {
        super(x, y, largura, altura);
        this.#velocidadex = 0;
    }

    movimentacaoEsq() {
        this.#velocidadex = -5;
    }

    movimentacaoDir() {
        this.#velocidadex = 5;
    }

    parede() {
        if(this.x <= 0 && this.#velocidadex < 0) {
            this.#velocidadex = 0;
        }else if((this.x + this.largura) >= canvas.width && this.#velocidadex > 0) {
            this.#velocidadex = 0;
        }
    }
    
    atualizar() {
        this.x += this.#velocidadex;
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

function loop(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    plano.parede()
    plano.atualizar();
    plano.desenhar(ctx, 'white')
    requestAnimationFrame(loop);
}

loop()
