class Deriv {
    constructor() {
        //super();
        this.ListaTokens = new Array();
        this.ListaValores = new Array();
        this.ListaDerivacion = new Array();
        this.ListaDeImpresion = new Array();
        this.ValoresDer;
    }
    setTokenss(Casilla) {
        this.ListaTokens.push(Casilla);
    }
    getTokenss() {
        return this.ListaTokens;
    }
    setListaValores(elemT) {
        this.ListaValores.push(elemT);
    }
    getListaValores() {
        return this.ListaValores;
    }
    setListaDerivacion(Casila) {
        this.ListaDerivacion.push(Casila);
    }
    getListaDerivacion() {
        return this.ListaDerivacion;
    }
    setValoresDer(cadena) {
        this.ValoresDer = cadena;
    }
    getValoresDer() {
        return this.ValoresDer;
    }
    getListaDeImpresion() {
        return this.ListaDeImpresion;
    }
    setListaDeImpresion(Parametro) {
        this.ListaDeImpresion.push(Parametro)
    }
    VerificaLlave() {
        var auxiliar = this.getListaDerivacion();
        var contIn = 0;
        var contFn = 0;
        for (let i = 0; i < auxiliar.length; i++) {
            if (auxiliar[i] == "InicioFlujo") {
                contIn++;
            } else if (auxiliar[i] == "FinFlujo") {
                contFn++;
            }
        }
        if (contFn == contIn) {
            return true;
        } else {
            return false;
        }
    }
    VerificaParentesis() {
        var auxiliar = this.getListaDerivacion();
        var contIn = 0;
        var contFn = 0;
        for (let i = 0; i < auxiliar.length; i++) {
            if (auxiliar[i] == "AbreP") {
                contIn++;
            } else if (auxiliar[i] == "CierreP") {
                contFn++;
            }
        }
        if (contFn == contIn) {
            console.log(contFn + " " + contIn);
            return true;
        } else {
            return false;
        }
    }
}