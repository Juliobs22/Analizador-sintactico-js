class Sintaxis extends Deriv {
    constructor() {
        super();
        this.State = 0;
        this.Errores = "";
    }
    ClasificaID() {
        //var AuxVector = this.getTokenss;
        for (let i = 0; i < this.ListaValores.length; i++) {
            if (/Identificador/.test(this.ListaTokens[i])) {
                if (/(var|let)/.test(this.ListaValores[i]) || /float/.test(this.ListaValores[i])) {
                    this.ListaTokens[i] = "TdVarK";
                }
                /*} else if (/char/.test(this.ListaValores[i])) {
                                    this.ListaTokens[i] = "IDvarTipoC"
                                } else if (/bool/.test(this.ListaValores[i])) {
                                    this.ListaTokens[i] = "IDvarTipoC"
                                }*/
                else if (/for/.test(this.ListaValores[i])) {
                    this.ListaTokens[i] = "IDfor"
                } else if (/if/.test(this.ListaValores[i])) {
                    this.ListaTokens[i] = "IDif"
                } else if (/while/.test(this.ListaValores[i])) {
                    this.ListaTokens[i] = "IDwhile"
                } else {
                    this.ListaTokens[i] = "TkId"
                }
            }
        }
    }
    setState(State) {
        this.State = State;
    }
    FsTDerivacion(Regla) {
        switch (this.State) {
            case 0:
                if ("#0" == Regla) {
                    this.State = 0;
                } else if ("TdVarK" == Regla) {
                    this.State = 1;
                } else if ("TkId" == Regla) {
                    this.State = 6;
                } else if ("IDif" == Regla) {
                    this.State = 16;
                } else if ("IDwhile" == Regla) {
                    this.State = 17;
                } else if ("IDfor" == Regla) {
                    this.State = 18;
                } else if ("Inicio_parentesis" == Regla) {
                    this.State = 19;
                } else if ("Cierre_parentesis" == Regla) {
                    this.State = 20;
                } else if ("Inicio_Llave" == Regla) {
                    this.State = 21;
                } else if ("Fin_Llave" == Regla) {
                    this.State = 22;
                } else if ("Operador_Logico" == Regla) {
                    this.State = 23;
                } else {
                    this.State = -2;
                    this.Errores = "Valor no valido"
                }
                break;
            case 1:
                if ("TkId" == Regla) {
                    this.State = 2;
                } else {
                    this.State = -2;
                    this.Errores = "Se espera el nombre de la Variable";
                }
                break;
            case 2:
                if ("Asignacion" == Regla) {
                    this.State = 3;
                } else if ("Cierre" == Regla) {
                    this.State = 5;
                } else {
                    this.State = -2;
                    this.Errores = "Se espera un |;|";
                }
                break;
            case 3:
                if ("Numero" == Regla || "Cadena" == Regla) {
                    this.State = 4;
                } else {
                    this.State = -2;
                    this.Errores = "Se espera el valor a asignar";
                }
                break;
            case 4:
                if ("Cierre" == Regla) {
                    this.State = 5;
                }
                break;
            case 5:
                this.setValoresDer("Declaracion");
                this.State = -1;
                break;
            case 6:
                //this.setValoresDer("Declaracion");
                if ("Asignacion" == Regla) {
                    this.State = 7;
                } else if ("Operador_iteracion" == Regla) {
                    this.State = 11;
                } else if ("Comparador" == Regla) {
                    this.State = 13;
                } else {
                    this.State = 14;
                }
                break;
            case 7:
                //this.setValoresDer("Declaracion");
                if ("TkId" == Regla) {
                    this.State = 8;
                } else if ("Numero" == Regla || "Cadena" == Regla) {
                    this.State = 8;
                } else {
                    this.State = -2;
                }
                break;
            case 8:
                //this.setValoresDer("Declaracion");
                if ("Cierre" == Regla) {
                    this.State = 12;
                } else if ("Operador_iteracion" == Regla) {
                    this.State = 11;
                } else if ("Operador" == Regla) {
                    this.State = 10;
                } else {
                    this.State = -2;
                }
                break;
            case 9:
                this.setValoresDer("ExArit");
                this.State = -1;
                break;
            case 10:
                if ("Numero" == Regla || "TkId" == Regla) {
                    this.State = 11;
                } else { this.State = -2; }
                break;
            case 11:
                this.setValoresDer("IterFor");
                if ("Cierre" == Regla) {
                    this.State = 9;
                } else if ("Cierre_parentesis" == Regla) {
                    this.State = -1;
                } else { this.State = -2; }
                break;
            case 12:
                this.setValoresDer("ExAsig");
                this.State = -1;
                break;
            case 13:
                if ("Numero" == Regla || "TkId" == Regla || "Cadena" == Regla) {
                    this.State = 14;
                } else { this.State = -2; }
                break;
            case 14:
                this.setValoresDer("CondIfWhile");
                if ("Cierre" == Regla) {
                    this.State = 15;
                } else { this.State = -1; }
                break;
            case 15:
                this.setValoresDer("CondFor");
                this.State = -1;
                break;
            case 16:
                this.setValoresDer("IF");
                this.State = -1;
                break;
            case 17:
                this.setValoresDer("WHILE");
                this.State = -1;
                break;
            case 18:
                this.setValoresDer("FOR");
                this.State = -1;
                break;
            case 19:
                this.setValoresDer("AbreP");
                this.State = -1;
                break;
            case 20:
                this.setValoresDer("CierraP");
                this.State = -1;
                break;
            case 21:
                this.setValoresDer("InicioFlujo");
                this.State = -1;
                break;
            case 22:
                this.setValoresDer("FinFlujo");
                this.State = -1;
                break;
            case 23:
                this.setValoresDer("Logico");
                this.State = -1;
                break;
            case 24:
                this.setValoresDer("ExArit");
                this.State = -1;
                break;
            default:
                break;
        }
        return this.State;
    }
    Compiler() {
        var valor = true;
        var arreglo = this.getListaDerivacion();
        var aux;
        if (this.VerificaLlave() || this.VerificaParentesis()) {

        } else {
            this.setListaDeImpresion("Error de compilacion se espera un |}| ");
            valor = false;
        }
        if (valor) {
            for (let i = 0; i < arreglo.length; i++) {
                switch (arreglo[i]) {
                    case "Declaracion":
                        this.setListaDeImpresion("Se ha detectado una declaracion");
                        break;
                    case "ExArit":
                        this.setListaDeImpresion("Se ha detectado una expresion aritmetica");
                        break;
                    case "ExAsig":
                        this.setListaDeImpresion("Se ha detectado una expresion de asignación");
                        break;
                    case "FOR":
                        aux = this.verificaFor(i)
                        if (aux == -2) {
                            this.setListaDeImpresion("Error detectado en el for");
                            i = arreglo.length;
                        } else {
                            this.setListaDeImpresion("Ciclo for detectado y aceptado");
                            i = aux
                        }
                        break;
                    case "IF":
                        aux = this.verificaWhile(i);
                        //console.log(aux);
                        if (aux == -2) {
                            this.setListaDeImpresion("Error detectado en el if");
                            i = arreglo.length;
                        } else {
                            this.setListaDeImpresion("Flujo if detectado y aceptado");
                        }
                        break;
                        //Error
                    case "Error":
                        this.setListaDeImpresion("ErRor :/ [" + this.Errores + "]");
                        i = arreglo.length;
                        break;
                    default:
                        break;
                }
            }
        }
    }
    verificaFor(Posicion) {
        var arregloAuxiliar = this.getListaDerivacion();
        //var numeral = Posicion + 1;
        var valor2 = 0;
        var estado = 0;
        for (let i = Posicion; i < arregloAuxiliar.length; i++) {
            switch (estado) {
                case -2:
                    valor2 = -2;
                    break;
                case 0:
                    if (arregloAuxiliar[i] == "FOR") {
                        estado = 1;
                    } else {
                        estado = -2;
                    }
                    break;
                case 1:
                    if (arregloAuxiliar[i] == "AbreP") {
                        estado = 2;
                    } else {
                        estado = -2;
                    }
                    break;
                case 2:
                    if (arregloAuxiliar[i] == "Declaracion") {
                        estado = 3;
                    } else {
                        estado = -2;
                    }
                    break;

                case 3:
                    if (arregloAuxiliar[i] == "CondFor") {
                        estado = 4;
                    } else {
                        estado = -2;
                    }
                    break;
                case 4:
                    if (arregloAuxiliar[i] == "IterFor") {
                        estado = 5;
                    } else {
                        estado = -2;
                    }
                    break;
                case 5:
                    if (arregloAuxiliar[i] == "CierraP") {
                        estado = 6;
                        valor2 = i;
                    } else {
                        estado = -2;
                    }
                    break;
                default:
                    break;
            }
        }
        return valor2;
        /*if (arregloAuxiliar[numeral] == "AbreP") {
            numeral++;
        }
        if (arregloAuxiliar[numeral] == "Declaracion") {
            numeral++;
        }
        if (arregloAuxiliar[numeral] == "CondFor") {
            numeral++;
        }
        if (arregloAuxiliar[numeral] == "IterFor") {
            numeral++;
        }
        if (arregloAuxiliar[numeral] == "CierraP") {
            numeral++;
        }

        if (numeral == Posicion + 5) {
            return numeral;
        } else {
            return -2;
        }*/
    }
    verificaWhile(Pos) {
        var arregloAuxiliar = this.getListaDerivacion();
        var estado;
        var valor = 0;
        for (let i = Pos; i < arregloAuxiliar.length; i++) {
            valor = i;
            switch (estado) {
                case -2:
                    valor = -2;
                    i = arregloAuxiliar.length;
                    break;
                case 0:
                    if ("IF" == arregloAuxiliar[i] || "IDwhile" == arregloAuxiliar[i]) {
                        estado = 1;
                    } else {
                        estado = -2;
                    }
                    break;
                case 1:
                    if (arregloAuxiliar[i] == "AbreP") {
                        estado = 2;
                    } else {
                        estado = -2;
                    }
                    break;
                case 2:
                    if (arregloAuxiliar[i] == "CondIfWhile") {
                        estado = 3;
                    } else {
                        estado = -2;
                    }
                    break;
                case 3:
                    if (arregloAuxiliar[i] == "CierraP") {
                        estado = 4;
                    } else if (arregloAuxiliar[i] == "CierraP") {
                        estado = 5;
                    } else {
                        estado = -2;
                    }
                    break;
                case 4:
                    estado = -1;
                    break;
                case 5:
                    if (arregloAuxiliar[i] == "CondIfWhile") {
                        estado = 3;
                    } else {
                        estado = -2;
                    }
                    break;
                default:
                    break;
            }
        }
        return valor;
    }
}