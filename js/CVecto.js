class CVecto extends Tokenas {
    constructor() {
        super();
        this.Estado = 0;
    }
    setEstado(Estado) {
        this.Estado = Estado;
    }
    automata(tranD) {
        switch (this.Estado) {
            case 0:
                if (/\s/.test(tranD)) {
                    //return "Espacio en blanco";
                    this.Estado = 0;
                } else if (/\n/.test(tranD)) {
                    this.Estado = 29;
                } else if (/[;]/.test(tranD)) {
                    this.Estado = 8;
                } else if (/[aA-zZ]/.test(tranD)) {
                    this.Estado = 1;
                } else if (/[0-9]/.test(tranD)) {
                    this.Estado = 2
                } else if (/[\|]/.test(tranD)) {
                    //return "Palito";
                    this.Estado = 15;
                } else if (/[!]/.test(tranD)) {
                    this.Estado = 16;
                    //return "Signo de exclamacion";
                } else if (/[=]/.test(tranD)) {
                    this.Estado = 9;
                } else if (/[{]/.test(tranD)) {
                    this.Estado = 11;
                } else if (/[}]/.test(tranD)) {
                    this.Estado = 12;
                } else if (/[&]/.test(tranD)) {
                    this.Estado = 13;
                } else if (/[<|>]/.test(tranD)) {
                    this.Estado = 17;
                } else if (/[\+|\-]/.test(tranD)) {
                    this.Estado = 18;
                } else if (/[\"]/.test(tranD)) {
                    this.Estado = 20;
                } else if (/[\/]/.test(tranD)) {
                    this.Estado = 22;
                } else if (/[\(]/.test(tranD)) {
                    this.Estado = 27;
                } else if (/[\)]/.test(tranD)) {
                    this.Estado = 28;
                } else {
                    this.Estado = 3;
                }
                break;
            case 1:
                this.setClase("Identificador");
                if (/\w/.test(tranD)) {
                    this.Estado = 1;
                } else {
                    this.Estado = -1;
                }
                break;
            case 2:
                this.setClase("Numero");
                if (/[0-9]/.test(tranD))
                    this.Estado = 2;
                else if (/[\.]/.test(tranD))
                    this.Estado = 3;
                else
                    this.Estado = -1;
                break;
            case 3:
                this.setClase("Caracter");
                if (/[0-9]/.test(tranD)) {
                    this.Estado = 4;
                } else {
                    this.Estado = -1;
                }
                break;
            case 4:
                this.setClase("Numero")
                if (/[0-9]/.test(tranD))
                    this.Estado = 4;
                else if (/[E|e]/.test(tranD)) {
                    this.Estado = 5;
                } else {
                    this.Estado = -1;
                }
                break;
            case 5:
                this.setClase("Numero");
                if (/[\+|\-]/.test(tranD)) {
                    this.Estado = 6;
                } else if (/[0-9]/.test(tranD)) {
                    this.Estado = 7;
                } else {
                    this.Estado = -1;
                }
                break;
            case 6:
                this.setClase("Numero");
                if (/[0-9]/.test(tranD)) {
                    this.Estado = 7;
                } else {
                    this.Estado = -2;
                }
                break;
            case 7:
                this.setClase("Numero");
                if (/[0-9]/.test(tranD)) {
                    this.Estado = 7;
                } else {
                    this.Estado = -1;
                }
                break;
            case 8:
                this.setClase("Cierre");
                this.Estado = -1;
                break;
            case 9:
                this.setClase("Asignacion");
                if (/[=]/.test(tranD)) {
                    this.Estado = 10;
                } else {
                    this.Estado = -1;
                }
                break;
            case 10:
                this.setClase("Comparador");
                this.Estado = -1;
                break;
            case 11:
                this.setClase("Inicio_Llave");
                this.Estado = -1;
                break;
            case 12:
                this.setClase("Fin_Llave");
                this.Estado = -1;
                break;
            case 13:
                this.setClase("Caracter");
                if (/[&]/.test(tranD))
                    this.Estado = 14;
                else
                    this.Estado = -1;
                break;
            case 14:
                this.setClase("Operador_Logico");
                this.Estado = -1;
                break;
            case 15:
                this.setClase("Caracter");
                if (/[\|]/.test(tranD))
                    this.Estado = 14;
                else
                    this.Estado = -1;
                break;
            case 16:
                this.setClase("Caracter");
                if (/[=]/.test(tranD))
                    this.Estado = 10;
                else
                    this.Estado = -1;
                break;
            case 17:
                this.setClase("Comparador")
                if (/[=]/.test(tranD))
                    this.Estado = 10;
                else
                    this.Estado = -1;
                break;
            case 18:
                this.setClase("Operador")
                if (/[\-\+=]/.test(tranD))
                    this.Estado = 19;
                else
                    this.Estado = -1;
                break;
            case 19:
                this.setClase("Operador_iteracion");
                this.Estado = -1;
                break;
            case 20:
                this.setClase("Cadena")
                if (/[^\"]/.test(tranD))
                    this.Estado = 20;
                else if (/[\"]/.test(tranD)) {
                    this.Estado = 21;
                }
                break;
            case 21:
                this.setClase("Cadena")
                this.Estado = -1
                break;
            case 22:
                this.setClase("Operador")
                if (/[=]/.test(tranD)) {
                    this.Estado = 23;
                } else if (/\//.test(tranD)) {
                    this.Estado = 24;
                } else if (/\*/.test(tranD)) {
                    this.Estado = 25;
                }
                break;
            case 23:
                this.setClase("Operador_Factor")
                this.Estado = -1;
                break;
            case 24:
                if (/[^\n]/.test(tranD)) {
                    this.Estado = 24;
                } else {
                    this.Estado = 0;
                }
                break;
            case 25:
                if (/[^\*]/.test(tranD)) {
                    this.Estado = 25;
                } else {
                    this.Estado = 26;
                }
                break;
            case 26:
                if (/\//.test(tranD)) {
                    this.Estado = 0;
                } else {
                    this.Estado = -2;
                }
                break;
            case 27:
                this.setClase("Inicio_parentesis");
                this.Estado = -1;
                break;
            case 28:
                this.setClase("Cierre_parentesis");
                this.Estado = -1;
                break;
            case 29:
                this.setClase("Saltolinea");
                this.Estado = -1;
                break;
        }
        return this.Estado;
    }
}