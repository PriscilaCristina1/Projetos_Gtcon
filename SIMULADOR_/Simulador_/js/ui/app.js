var Simulador = Simulador || {};

Simulador.App = {
    dadosAtuais: null,
    despesasAtuais: [],
    cen1Resultado: null,
    cen2Resultado: null,
    comparativoResultado: null,

    init: function() {
        this.configurarTabs();
        this.configurarFormularios();
        this.configurarDespesas();
        this.configurarAcoes();
        this.preencherDefaults();
        this.calcular();
    },

    configurarTabs: function() {
        var botoes = document.querySelectorAll(".tab-btn");
        for (var i = 0; i < botoes.length; i++) {
            botoes[i].addEventListener("click", function(e) {
                var tabId = e.target.getAttribute("data-tab");
                Simulador.App.trocarTab(tabId);
            });
        }
    },

    trocarTab: function(tabId) {
        var botoes = document.querySelectorAll(".tab-btn");
        for (var i = 0; i < botoes.length; i++) {
            botoes[i].classList.remove("active");
            if (botoes[i].getAttribute("data-tab") === tabId) {
                botoes[i].classList.add("active");
            }
        }
        var conteudos = document.querySelectorAll(".tab-content");
        for (var j = 0; j < conteudos.length; j++) {
            conteudos[j].classList.remove("active");
            if (conteudos[j].id === "tab-" + tabId) {
                conteudos[j].classList.add("active");
            }
        }
    },

    configurarFormularios: function() {
        var inputs = document.querySelectorAll(".campo-amarelo, .calc-trigger");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("change", function() {
                Simulador.App.calcular();
            });
            inputs[i].addEventListener("input", function() {
                Simulador.App.calcular();
            });
        }

        var selects = document.querySelectorAll("select.calc-trigger");
        for (var j = 0; j < selects.length; j++) {
            selects[j].addEventListener("change", function() {
                Simulador.App.atualizarCClassTribDisplay();
                Simulador.App.calcular();
            });
        }
    },

    configurarDespesas: function() {
        var inputs = document.querySelectorAll("#tab-despesas input.calc-trigger");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("change", function() {
                Simulador.App.calcular();
            });
            inputs[i].addEventListener("input", function() {
                Simulador.App.calcular();
            });
        }
        var selects = document.querySelectorAll("#tab-despesas select.calc-trigger");
        for (var j = 0; j < selects.length; j++) {
            selects[j].addEventListener("change", function() {
                Simulador.App.calcular();
            });
        }
    },

    configurarAcoes: function() {
        var btnCalcular = document.getElementById("btn-calcular");
        if (btnCalcular) {
            btnCalcular.addEventListener("click", function() {
                Simulador.App.calcular();
            });
        }
        var btnExportar = document.getElementById("btn-exportar");
        if (btnExportar) {
            btnExportar.addEventListener("click", function() {
                Simulador.App.exportar();
            });
        }
    },

    preencherDefaults: function() {
        this.setValueIfEmpty("cliente", "PLANT FLOR");
        this.setValueIfEmpty("ano", "2027");
        this.setValueIfEmpty("rbt12", "822015.76");
        this.setValueIfEmpty("anexo1", "I");
        this.setValueIfEmpty("receita1", "96127");
        this.setValueIfEmpty("receitaST1", "190358.24");
        this.setValueIfEmpty("receitaMono1", "0");
        this.setValueIfEmpty("permConc1", "0");
        this.setValueIfEmpty("cClassTrib1", "RED-40-BAR-REST");
        this.setValueIfEmpty("receitaRed1", "60000");
        this.setValueIfEmpty("vendaCredito1", "S");
        this.setValueIfEmpty("exclusoes1", "0");
        this.setValueIfEmpty("anexo2", "III");
        this.setValueIfEmpty("receita2", "50000");
        this.setValueIfEmpty("receitaST2", "0");
        this.setValueIfEmpty("receitaMono2", "0");
        this.setValueIfEmpty("permConc2", "0");
        this.setValueIfEmpty("cClassTrib2", "000001");
        this.setValueIfEmpty("receitaRed2", "0");
        this.setValueIfEmpty("vendaCredito2", "S");
        this.setValueIfEmpty("exclusoes2", "0");
        this.setValueIfEmpty("percB2B", "0.6");

        this.setValueIfEmpty("despesa_1_1", "60000");
        this.setValueIfEmpty("despesa_cred_1_1", "S");
        this.setValueIfEmpty("despesa_forn_1_1", "0.85");
        this.setValueIfEmpty("despesa_red_forn_1_1", "0");
        this.setValueIfEmpty("despesa_1_2", "20000");
        this.setValueIfEmpty("despesa_cred_1_2", "S");
        this.setValueIfEmpty("despesa_forn_1_2", "0.8");
        this.setValueIfEmpty("despesa_red_forn_1_2", "0");
        this.setValueIfEmpty("despesa_1_3", "5000");
        this.setValueIfEmpty("despesa_cred_1_3", "S");
        this.setValueIfEmpty("despesa_forn_1_3", "0.8");
        this.setValueIfEmpty("despesa_red_forn_1_3", "0");
        this.setValueIfEmpty("despesa_1_4", "8000");
        this.setValueIfEmpty("despesa_cred_1_4", "S");
        this.setValueIfEmpty("despesa_forn_1_4", "0.7");
        this.setValueIfEmpty("despesa_red_forn_1_4", "0");

        this.setValueIfEmpty("despesa_2_1", "3000");
        this.setValueIfEmpty("despesa_cred_2_1", "S");
        this.setValueIfEmpty("despesa_forn_2_1", "0.8");
        this.setValueIfEmpty("despesa_red_forn_2_1", "0");
        this.setValueIfEmpty("despesa_2_2", "2000");
        this.setValueIfEmpty("despesa_cred_2_2", "S");
        this.setValueIfEmpty("despesa_forn_2_2", "0.7");
        this.setValueIfEmpty("despesa_red_forn_2_2", "0");

        this.setValueIfEmpty("despesa_3_1", "6000");
        this.setValueIfEmpty("despesa_cred_3_1", "S");
        this.setValueIfEmpty("despesa_forn_3_1", "1");
        this.setValueIfEmpty("despesa_red_forn_3_1", "0");
        this.setValueIfEmpty("despesa_3_2", "8000");
        this.setValueIfEmpty("despesa_cred_3_2", "S");
        this.setValueIfEmpty("despesa_forn_3_2", "1");
        this.setValueIfEmpty("despesa_red_forn_3_2", "0");
        this.setValueIfEmpty("despesa_3_3", "6000");
        this.setValueIfEmpty("despesa_cred_3_3", "S");
        this.setValueIfEmpty("despesa_forn_3_3", "0.7");
        this.setValueIfEmpty("despesa_red_forn_3_3", "0");
        this.setValueIfEmpty("despesa_3_4", "2000");
        this.setValueIfEmpty("despesa_cred_3_4", "S");
        this.setValueIfEmpty("despesa_forn_3_4", "1");
        this.setValueIfEmpty("despesa_red_forn_3_4", "0");
        this.setValueIfEmpty("despesa_3_5", "3000");
        this.setValueIfEmpty("despesa_cred_3_5", "S");
        this.setValueIfEmpty("despesa_forn_3_5", "1");
        this.setValueIfEmpty("despesa_red_forn_3_5", "0");
        this.setValueIfEmpty("despesa_3_6", "2000");
        this.setValueIfEmpty("despesa_cred_3_6", "S");
        this.setValueIfEmpty("despesa_forn_3_6", "1");
        this.setValueIfEmpty("despesa_red_forn_3_6", "0");
        this.setValueIfEmpty("despesa_3_7", "0");
        this.setValueIfEmpty("despesa_cred_3_7", "S");
        this.setValueIfEmpty("despesa_forn_3_7", "1");
        this.setValueIfEmpty("despesa_red_forn_3_7", "0");

        this.setValueIfEmpty("despesa_4_1", "3000");
        this.setValueIfEmpty("despesa_cred_4_1", "N");
        this.setValueIfEmpty("despesa_forn_4_1", "0");
        this.setValueIfEmpty("despesa_red_forn_4_1", "0");
        this.setValueIfEmpty("despesa_4_2", "25000");
        this.setValueIfEmpty("despesa_cred_4_2", "N");
        this.setValueIfEmpty("despesa_forn_4_2", "0");
        this.setValueIfEmpty("despesa_red_forn_4_2", "0");
        this.setValueIfEmpty("despesa_4_3", "0");
        this.setValueIfEmpty("despesa_cred_4_3", "N");
        this.setValueIfEmpty("despesa_forn_4_3", "0");
        this.setValueIfEmpty("despesa_red_forn_4_3", "0");
    },

    setValueIfEmpty: function(id, val) {
        var el = document.getElementById(id);
        if (el && (!el.value || el.value === "")) {
            el.value = val;
        }
    },

    v: function(id) {
        var el = document.getElementById(id);
        if (!el) return 0;
        var val = el.value;
        if (el.type === "number" || el.classList.contains("num-input")) {
            return Simulador.Format.parseNumero(val);
        }
        return val;
    },

    vn: function(id) {
        var el = document.getElementById(id);
        if (!el) return 0;
        return Simulador.Format.parseNumero(el.value);
    },

    atualizarCClassTribDisplay: function() {
        var campos = ["cClassTrib1", "cClassTrib2"];
        var destRedIBS = ["cClassTrib1_pRedIBS", "cClassTrib2_pRedIBS"];
        var destRedCBS = ["cClassTrib1_pRedCBS", "cClassTrib2_pRedCBS"];

        for (var i = 0; i < campos.length; i++) {
            var codigo = this.v(campos[i]);
            var cct = Simulador.buscarCClassTrib(codigo);
            var elRIBS = document.getElementById(destRedIBS[i]);
            var elRCBS = document.getElementById(destRedCBS[i]);
            if (elRIBS) elRIBS.textContent = Simulador.Format.percentual(cct.pRedIBS);
            if (elRCBS) elRCBS.textContent = Simulador.Format.percentual(cct.pRedCBS);
        }
    },

    coletarDados: function() {
        var rbt12 = this.vn("rbt12");
        var ano = parseInt(this.v("ano")) || 2027;

        var atividades = [];

        var rec1 = this.vn("receita1");
        var recST1 = this.vn("receitaST1");
        var recMono1 = this.vn("receitaMono1");
        if (rec1 > 0) {
            var cct1 = Simulador.buscarCClassTrib(this.v("cClassTrib1"));
            atividades.push({
                nome: "Atividade 1 - Comercio/Ind.",
                anexo: this.v("anexo1"),
                receitaTotal: rec1,
                receitaST: recST1,
                receitaMono: recMono1,
                percPermanece: this.vn("permConc1") / 100,
                cClassTrib: this.v("cClassTrib1"),
                pRedIBS: cct1.pRedIBS,
                pRedCBS: cct1.pRedCBS,
                receitaComReducao: this.vn("receitaRed1"),
                vendasCreditoAdquirente: this.v("vendaCredito1"),
                exclusoesBase: this.vn("exclusoes1")
            });
        }

        var rec2 = this.vn("receita2");
        var recST2 = this.vn("receitaST2");
        var recMono2 = this.vn("receitaMono2");
        if (rec2 > 0) {
            var cct2 = Simulador.buscarCClassTrib(this.v("cClassTrib2"));
            atividades.push({
                nome: "Atividade 2 - Servicos",
                anexo: this.v("anexo2"),
                receitaTotal: rec2,
                receitaST: recST2,
                receitaMono: recMono2,
                percPermanece: this.vn("permConc2") / 100,
                cClassTrib: this.v("cClassTrib2"),
                pRedIBS: cct2.pRedIBS,
                pRedCBS: cct2.pRedCBS,
                receitaComReducao: this.vn("receitaRed2"),
                vendasCreditoAdquirente: this.v("vendaCredito2"),
                exclusoesBase: this.vn("exclusoes2")
            });
        }

        return {
            cliente: this.v("cliente"),
            ano: ano,
            rbt12: rbt12,
            percB2B: this.vn("percB2B") / 100,
            atividades: atividades
        };
    },

    coletarDespesas: function() {
        var fase = Simulador.TRANSICAO.getFase(parseInt(this.v("ano")) || 2027);
        var aliqCBSRef = Simulador.ALICOTAS_REFERENCIA.cbs;
        var aliqIBSRef = Simulador.ALICOTAS_REFERENCIA.ibs;
        var aliqVigente = aliqCBSRef * fase.faseCBS + aliqIBSRef * fase.faseIBS;

        var grupos = [
            { nome: "Despesas vinculadas a Atividade 1", itens: [
                { id: "1_1", nome: "Mercadorias para revenda" },
                { id: "1_2", nome: "Materias-primas e insumos de producao" },
                { id: "1_3", nome: "Embalagens" },
                { id: "1_4", nome: "Fretes sobre compras e vendas" }
            ]},
            { nome: "Despesas vinculadas a Atividade 2", itens: [
                { id: "2_1", nome: "Materiais aplicados na prestacao de servicos" },
                { id: "2_2", nome: "Servicos subcontratados de PJ" }
            ]},
            { nome: "Despesas comuns/administrativas com credito", itens: [
                { id: "3_1", nome: "Energia eletrica" },
                { id: "3_2", nome: "Aluguel de imovel (locador PJ)" },
                { id: "3_3", nome: "Servicos tomados de PJ (TI, marketing...)" },
                { id: "3_4", nome: "Telecomunicacoes" },
                { id: "3_5", nome: "Combustiveis (regime monofasico)" },
                { id: "3_6", nome: "Bens do ativo imobilizado" },
                { id: "3_7", nome: "Outras despesas com credito" }
            ]},
            { nome: "Despesas sem direito a credito", itens: [
                { id: "4_1", nome: "Bens/servicos de USO E CONSUMO PESSOAL" },
                { id: "4_2", nome: "Folha de salarios e pro-labore" },
                { id: "4_3", nome: "Outras despesas sem credito" }
            ]}
        ];

        var despesas = [];
        var subtotais = [];
        var totalGeral = 0;
        var totalCreditavel = 0;

        for (var g = 0; g < grupos.length; g++) {
            var grupo = grupos[g];
            var subtotalGrupo = 0;
            var subtotalCredito = 0;
            var itensGrupo = [];

            for (var i = 0; i < grupo.itens.length; i++) {
                var item = grupo.itens[i];
                var valor = this.vn("despesa_" + item.id);
                var credito = this.v("despesa_cred_" + item.id);
                var fornReg = this.vn("despesa_forn_" + item.id) / 100;
                var redForn = this.vn("despesa_red_forn_" + item.id) / 100;

                var credEstimado = Simulador.Calculator.calcCreditoDespesa(
                    valor, credito, fornReg, redForn, aliqVigente
                );

                subtotalGrupo += valor;
                subtotalCredito += credEstimado;

                despesas.push({
                    grupo: g + 1,
                    nome: item.nome,
                    valor: valor,
                    temCredito: credito,
                    percFornRegRegular: fornReg,
                    percRedFornecedor: redForn,
                    creditoEstimado: credEstimado
                });

                itensGrupo.push(despesas[despesas.length - 1]);
            }

            subtotais.push({
                nome: grupo.nome,
                subtotalValor: subtotalGrupo,
                subtotalCredito: subtotalCredito,
                itens: itensGrupo
            });

            totalGeral += subtotalGrupo;
            totalCreditavel += subtotalCredito;
        }

        return {
            despesas: despesas,
            subtotais: subtotais,
            totalGeral: totalGeral,
            totalCreditavel: totalCreditavel
        };
    },

    calcular: function() {
        var dados = this.coletarDados();
        var despesasInfo = this.coletarDespesas();

        this.dadosAtuais = dados;
        this.despesasAtuais = despesasInfo;

        this.cen1Resultado = Simulador.Cenario1.calcular(dados, despesasInfo.despesas);
        this.cen2Resultado = Simulador.Cenario2.calcular(dados, despesasInfo.despesas);
        this.comparativoResultado = Simulador.Comparativo.calcular(this.cen1Resultado, this.cen2Resultado, dados);

        this.renderParametros();
        this.renderConfronto();
        this.renderDadosCalculados();
        this.renderCenario1();
        this.renderCenario2();
        this.renderDespesas();
        this.renderComparativo();
    },

    renderParametros: function() {
        var html = '<table><thead><tr><th>Anexo</th><th>Faixa</th><th>RBT12 De</th><th>RBT12 Ate</th><th>Alq. Nominal</th><th>Parcela Deduzir</th><th>% PIS/COFINS</th><th>% ICMS/ISS</th></tr></thead><tbody>';

        var anexos = ["I", "II", "III", "IV", "V"];
        for (var a = 0; a < anexos.length; a++) {
            var anexo = Simulador.SIMPLES_NACIONAL.anexos[anexos[a]];
            for (var f = 0; f < anexo.faixas.length; f++) {
                var fx = anexo.faixas[f];
                html += '<tr>';
                html += '<td>' + anexos[a] + '</td>';
                html += '<td>' + fx.faixa + '</td>';
                html += '<td class="num">' + Simulador.Format.moeda(fx.rbt12De) + '</td>';
                html += '<td class="num">' + Simulador.Format.moeda(fx.rbt12Ate) + '</td>';
                html += '<td class="num">' + Simulador.Format.percentual(fx.aliqNominal) + '</td>';
                html += '<td class="num">' + Simulador.Format.moeda(fx.parcelaDeduzir) + '</td>';
                html += '<td class="num">' + Simulador.Format.percentual(fx.percPisCofins) + '</td>';
                html += '<td class="num">' + Simulador.Format.percentual(fx.percIcmsIss) + '</td>';
                html += '</tr>';
            }
        }
        html += '</tbody></table>';
        document.getElementById("tabela-simples").innerHTML = html;

        var html2 = '<table><thead><tr><th>Ano</th><th>Fase CBS</th><th>Fase IBS</th></tr></thead><tbody>';
        for (var t = 0; t < Simulador.TRANSICAO.fases.length; t++) {
            var fase = Simulador.TRANSICAO.fases[t];
            html2 += '<tr>';
            html2 += '<td>' + fase.ano + '</td>';
            html2 += '<td class="num">' + Simulador.Format.percentual(fase.faseCBS) + '</td>';
            html2 += '<td class="num">' + Simulador.Format.percentual(fase.faseIBS) + '</td>';
            html2 += '</tr>';
        }
        html2 += '</tbody></table>';
        document.getElementById("tabela-transicao").innerHTML = html2;

        var html3 = '<table><thead><tr><th>Codigo</th><th>CST</th><th>Descricao</th><th>pRedIBS</th><th>pRedCBS</th><th>Base Legal</th></tr></thead><tbody>';
        for (var c = 0; c < Simulador.CCLASSTRIB.length; c++) {
            var ct = Simulador.CCLASSTRIB[c];
            html3 += '<tr>';
            html3 += '<td><code>' + ct.codigo + '</code></td>';
            html3 += '<td>' + ct.cst + '</td>';
            html3 += '<td>' + ct.desc + '</td>';
            html3 += '<td class="num">' + Simulador.Format.percentual(ct.pRedIBS) + '</td>';
            html3 += '<td class="num">' + Simulador.Format.percentual(ct.pRedCBS) + '</td>';
            html3 += '<td>' + ct.baseLegal + '</td>';
            html3 += '</tr>';
        }
        html3 += '</tbody></table>';
        document.getElementById("tabela-cclasstrib").innerHTML = html3;
    },

    renderConfronto: function() {
        var rbt12 = this.dadosAtuais.rbt12;
        var anexos = ["I", "II", "III", "IV", "V"];
        var html = "";

        for (var a = 0; a < anexos.length; a++) {
            var anexo = Simulador.SIMPLES_NACIONAL.anexos[anexos[a]];
            var faixaAplicada = Simulador.SIMPLES_NACIONAL.encontrarFaixa(anexos[a], rbt12);

            html += '<h4 style="margin:12px 0 6px;color:var(--primary)">ANEXO ' + anexos[a] + ' - ' + anexo.nome.toUpperCase() + '</h4>';
            html += '<table><thead><tr><th>Faixa</th><th>RBT12 De</th><th>RBT12 Ate</th><th>Alq. Nominal</th><th>Parcela Deduzir</th><th>Alq. Efetiva (teto)</th><th>Alq. Efetiva (RBT12)</th><th>Situacao</th></tr></thead><tbody>';

            for (var f = 0; f < anexo.faixas.length; f++) {
                var fx = anexo.faixas[f];
                var aliqEfTeto = Simulador.SIMPLES_NACIONAL.calcAliqEfetiva(fx.rbt12Ate, fx);
                var aliqEfRBT12 = (fx === faixaAplicada) ? Simulador.SIMPLES_NACIONAL.calcAliqEfetiva(rbt12, fx) : null;

                html += '<tr' + (fx === faixaAplicada ? ' style="background:#e8f8f0;font-weight:600"' : '') + '>';
                html += '<td>' + fx.faixa + '</td>';
                html += '<td class="num">' + Simulador.Format.moeda(fx.rbt12De) + '</td>';
                html += '<td class="num">' + Simulador.Format.moeda(fx.rbt12Ate) + '</td>';
                html += '<td class="num">' + Simulador.Format.percentual(fx.aliqNominal) + '</td>';
                html += '<td class="num">' + Simulador.Format.moeda(fx.parcelaDeduzir) + '</td>';
                html += '<td class="num">' + Simulador.Format.percentual4(aliqEfTeto) + '</td>';
                html += '<td class="num">' + (aliqEfRBT12 !== null ? Simulador.Format.percentual4(aliqEfRBT12) : '-') + '</td>';
                html += '<td>' + (fx === faixaAplicada ? '<strong>&#9664; FAIXA APLICADA</strong>' : '') + '</td>';
                html += '</tr>';
            }
            html += '</tbody></table>';
        }

        document.getElementById("confronto-content").innerHTML = html;
    },

    renderDadosCalculados: function() {
        var dados = this.dadosAtuais;
        var faixa1 = null, faixa2 = null;

        if (dados.atividades.length > 0) {
            faixa1 = Simulador.SIMPLES_NACIONAL.encontrarFaixa(dados.atividades[0].anexo, dados.rbt12);
        }
        if (dados.atividades.length > 1) {
            faixa2 = Simulador.SIMPLES_NACIONAL.encontrarFaixa(dados.atividades[1].anexo, dados.rbt12);
        }

        var rbt12Calc = 0;
        for (var i = 0; i < dados.atividades.length; i++) {
            rbt12Calc += dados.atividades[i].receitaTotal * 12;
        }

        var coerencia = Math.abs(rbt12Calc - dados.rbt12) < 1 ? "OK" : "ATENCAO: RBT12 difere de 12x a receita mensal";

        document.getElementById("calc-rbt12").textContent = Simulador.Format.moeda(dados.rbt12);
        document.getElementById("calc-coerencia").textContent = coerencia;

        if (faixa1) {
            document.getElementById("calc-faixa1").textContent = "Faixa " + faixa1.faixa + " - Alq. Efetiva: " + Simulador.Format.percentual4(Simulador.SIMPLES_NACIONAL.calcAliqEfetiva(dados.rbt12, faixa1));
        }

        if (faixa2) {
            document.getElementById("calc-faixa2").textContent = "Faixa " + faixa2.faixa + " - Alq. Efetiva: " + Simulador.Format.percentual4(Simulador.SIMPLES_NACIONAL.calcAliqEfetiva(dados.rbt12, faixa2));
        }

        // Atividade 1 - percentuais calculados
        var rec1 = this.vn("receita1");
        var recST1 = this.vn("receitaST1");
        var recMono1 = this.vn("receitaMono1");
        var recRed1 = this.vn("receitaRed1");

        var percST1 = rec1 > 0 ? recST1 / rec1 : 0;
        var percMono1 = rec1 > 0 ? recMono1 / rec1 : 0;
        var percRed1 = rec1 > 0 ? recRed1 / rec1 : 0;
        var percSemRed1 = 1 - percRed1;

        var elPercST1 = document.getElementById("calc-percST1");
        var elPercMono1 = document.getElementById("calc-percMono1");
        var elPercRed1 = document.getElementById("calc-percRed1");
        var elPercSemRed1 = document.getElementById("calc-percSemRed1");

        if (elPercST1) elPercST1.textContent = Simulador.Format.percentual(percST1);
        if (elPercMono1) elPercMono1.textContent = Simulador.Format.percentual(percMono1);
        if (elPercRed1) elPercRed1.textContent = Simulador.Format.percentual(percRed1);
        if (elPercSemRed1) elPercSemRed1.textContent = Simulador.Format.percentual(percSemRed1);

        // Atividade 2 - percentuais calculados
        var rec2 = this.vn("receita2");
        var recST2 = this.vn("receitaST2");
        var recMono2 = this.vn("receitaMono2");
        var recRed2 = this.vn("receitaRed2");

        var percST2 = rec2 > 0 ? recST2 / rec2 : 0;
        var percMono2 = rec2 > 0 ? recMono2 / rec2 : 0;
        var percRed2 = rec2 > 0 ? recRed2 / rec2 : 0;
        var percSemRed2 = 1 - percRed2;

        var elPercST2 = document.getElementById("calc-percST2");
        var elPercMono2 = document.getElementById("calc-percMono2");
        var elPercRed2 = document.getElementById("calc-percRed2");
        var elPercSemRed2 = document.getElementById("calc-percSemRed2");

        if (elPercST2) elPercST2.textContent = Simulador.Format.percentual(percST2);
        if (elPercMono2) elPercMono2.textContent = Simulador.Format.percentual(percMono2);
        if (elPercRed2) elPercRed2.textContent = Simulador.Format.percentual(percRed2);
        if (elPercSemRed2) elPercSemRed2.textContent = Simulador.Format.percentual(percSemRed2);

        this.atualizarCClassTribDisplay();
    },

    renderCenario1: function() {
        var res = this.cen1Resultado;
        var html = "";

        html += '<div class="alert alert-info">';
        html += '<strong>Cenario 1 - Simples Integral:</strong> IBS/CBS recolhidos por dentro do PGDAS-D.';
        html += ' As reducoes do cClassTrib NAO se aplicam por dentro do PGDAS - o DAS nao muda.';
        html += ' Credito do adquirente limitado ao IBS/CBS efetivamente pago no DAS.';
        html += '</div>';

        // Tabela principal
        html += '<div class="card">';
        html += '<div class="card-title">Apuracao por Atividade</div>';
        html += '<div style="overflow-x:auto">';
        html += '<table>';
        html += '<thead><tr>';
        html += '<th style="width:40%">Indicador</th>';
        html += '<th style="width:30%;text-align:right">Atividade 1 - Comercio/Ind.</th>';
        html += '<th style="width:30%;text-align:right">Atividade 2 - Servicos</th>';
        html += '</tr></thead>';
        html += '<tbody>';

        // Dados por atividade
        var at1 = res.atividades.length > 0 ? res.atividades[0] : null;
        var at2 = res.atividades.length > 1 ? res.atividades[1] : null;

        html += this.linhaTabela("Anexo", at1 ? at1.anexo : "-", at2 ? at2.anexo : "-");
        html += this.linhaTabela("Receita mensal (R$)", at1 ? Simulador.Format.moeda(at1.receitaTotal) : "-", at2 ? Simulador.Format.moeda(at2.receitaTotal) : "-");
        html += this.linhaTabela("Alquota NOMINAL da faixa", at1 ? Simulador.Format.percentual(at1.aliqNominal) : "-", at2 ? Simulador.Format.percentual(at2.aliqNominal) : "-");
        html += this.linhaTabela("Parcela a deduzir (R$)", at1 ? Simulador.Format.moeda(at1.parcelaDeduzir) : "-", at2 ? Simulador.Format.moeda(at2.parcelaDeduzir) : "-");
        html += this.linhaTabela("ALIQUOTA EFETIVA do Simples", at1 ? Simulador.Format.percentual(at1.aliqEfetiva) : "-", at2 ? Simulador.Format.percentual(at2.aliqEfetiva) : "-");
        html += this.linhaTabela("% da aliq. destinado a PIS/COFINS (->CBS)", at1 ? Simulador.Format.percentual(at1.percPisCofins) : "-", at2 ? Simulador.Format.percentual(at2.percPisCofins) : "-");
        html += this.linhaTabela("% da aliq. destinado a ICMS/ISS (->IBS)", at1 ? Simulador.Format.percentual(at1.percIcmsIss) : "-", at2 ? Simulador.Format.percentual(at2.percIcmsIss) : "-");

        html += '<tr class="subtotal"><td colspan="3"></td></tr>';

        html += this.linhaTabela("Receita sem concentracao (R$)", at1 ? Simulador.Format.moeda(at1.receitaSemConcentracao) : "-", at2 ? Simulador.Format.moeda(at2.receitaNormal) : "-");
        html += this.linhaTabela("Receita com ICMS-ST (R$)", at1 ? Simulador.Format.moeda(at1.receitaST) : "-", at2 ? Simulador.Format.moeda(at2.receitaST) : "-");
        html += this.linhaTabela("Receita monofasica (R$)", at1 ? Simulador.Format.moeda(at1.receitaMono) : "-", at2 ? Simulador.Format.moeda(at2.receitaMono) : "-");

        html += '<tr class="subtotal"><td colspan="3"></td></tr>';

        html += this.linhaTabela("Aliq. DAS s/ receita normal", at1 ? Simulador.Format.percentual(at1.aliqDasNormal) : "-", at2 ? Simulador.Format.percentual(at2.aliqDASNormalReduzida) : "-");
        html += this.linhaTabela("Aliq. DAS s/ receita ST", at1 ? Simulador.Format.percentual(at1.aliqDasST) : "-", at2 ? Simulador.Format.percentual(at2.aliqDASSTReducida) : "-");
        html += this.linhaTabela("Aliq. DAS s/ receita monofasica", at1 ? Simulador.Format.percentual(at1.aliqDasMono) : "-", at2 ? Simulador.Format.percentual(at2.aliqDASMonoReduzida) : "-");

        html += '<tr class="subtotal"><td colspan="3"></td></tr>';

        html += this.linhaTabelaDestaque("DAS MENSAL DA ATIVIDADE (R$)", at1 ? Simulador.Format.moeda(at1.dasTotal) : "-", at2 ? Simulador.Format.moeda(at2.dasReduzido) : "-");
        html += this.linhaTabela("Credito de IBS/CBS transferivel (total, R$)", at1 ? Simulador.Format.moeda(at1.creditoTotal) : "-", at2 ? Simulador.Format.moeda(at2.debitoIBSCBS) : "-");
        html += this.linhaTabela("Credito transferivel - so vendas B2B (R$)", at1 ? Simulador.Format.moeda(at1.creditoB2B) : "-", at2 ? Simulador.Format.moeda(at2.creditoB2B) : "-");
        html += this.linhaTabela("Faixa da tabela aplicada", at1 ? at1.faixa : "-", at2 ? at2.faixa : "-");

        html += '</tbody></table>';
        html += '</div></div>';

        // Totais
        html += '<div class="card" style="background:linear-gradient(135deg,#0a0a23,#0d3b66);color:white;text-align:center">';
        html += '<div class="grid-2">';
        html += '<div><div style="font-size:0.78rem;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.05em">DAS TOTAL MENSAL (R$)</div><div style="font-size:1.6rem;font-weight:700;margin-top:4px">' + Simulador.Format.moeda(res.dasTotalMensal) + '</div></div>';
        html += '<div><div style="font-size:0.78rem;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.05em">CREDITO IBS/CBS GERADO A CLIENTES B2B (R$/mes)</div><div style="font-size:1.6rem;font-weight:700;margin-top:4px">' + Simulador.Format.moeda(res.creditoTotalB2B) + '</div></div>';
        html += '</div></div>';

        document.getElementById("cen1-content").innerHTML = html;
    },

    renderCenario2: function() {
        var res = this.cen2Resultado;
        var html = "";

        html += '<div class="alert alert-info">';
        html += '<strong>Cenario 2 - Hibrido:</strong> DAS reduzido (sem parcela CBS/IBS) + debito IBS/CBS por fora com reducoes do cClassTrib';
        html += ' + creditos sobre despesas detalhadas.';
        html += '</div>';

        // Tabela principal
        html += '<div class="card">';
        html += '<div class="card-title">Apuracao por Atividade - DAS Reduzido e Debito por Fora</div>';
        html += '<div style="overflow-x:auto">';
        html += '<table>';
        html += '<thead><tr>';
        html += '<th style="width:40%">Indicador</th>';
        html += '<th style="width:30%;text-align:right">Atividade 1 - Comercio/Ind.</th>';
        html += '<th style="width:30%;text-align:right">Atividade 2 - Servicos</th>';
        html += '</tr></thead>';
        html += '<tbody>';

        var at1 = res.atividades.length > 0 ? res.atividades[0] : null;
        var at2 = res.atividades.length > 1 ? res.atividades[1] : null;

        html += this.linhaTabela("Receita mensal (R$)", at1 ? Simulador.Format.moeda(at1.receitaTotal) : "-", at2 ? Simulador.Format.moeda(at2.receitaTotal) : "-");
        html += this.linhaTabela("Receita sem concentracao (R$)", at1 ? Simulador.Format.moeda(at1.receitaNormal) : "-", at2 ? Simulador.Format.moeda(at2.receitaNormal) : "-");
        html += this.linhaTabela("Receita com ICMS-ST (R$)", at1 ? Simulador.Format.moeda(at1.receitaST) : "-", at2 ? Simulador.Format.moeda(at2.receitaST) : "-");
        html += this.linhaTabela("Receita monofasica (R$)", at1 ? Simulador.Format.moeda(at1.receitaMono) : "-", at2 ? Simulador.Format.moeda(at2.receitaMono) : "-");
        html += this.linhaTabela("Aliquota efetiva do Simples", at1 ? Simulador.Format.percentual(at1.aliqEfetiva) : "-", at2 ? Simulador.Format.percentual(at2.aliqEfetiva) : "-");
        html += this.linhaTabela("% parcela -> CBS", at1 ? Simulador.Format.percentual(at1.percPisCofins) : "-", at2 ? Simulador.Format.percentual(at2.percPisCofins) : "-");
        html += this.linhaTabela("% parcela -> IBS", at1 ? Simulador.Format.percentual(at1.percIcmsIss) : "-", at2 ? Simulador.Format.percentual(at2.percIcmsIss) : "-");

        html += '<tr class="subtotal"><td colspan="3"></td></tr>';

        html += this.linhaTabela("cClassTrib dos produtos com reducao", at1 ? at1.cClassTrib : "-", at2 ? at2.cClassTrib : "-");
        html += this.linhaTabela("% de produtos COM reducao (calculado)", at1 ? Simulador.Format.percentual(at1.pComReducao) : "-", at2 ? Simulador.Format.percentual(at2.pComReducao) : "-");
        html += this.linhaTabela("pRedIBS (reducao do IBS)", at1 ? Simulador.Format.percentual(at1.pRedIBS) : "-", at2 ? Simulador.Format.percentual(at2.pRedIBS) : "-");
        html += this.linhaTabela("pRedCBS (reducao da CBS)", at1 ? Simulador.Format.percentual(at1.pRedCBS) : "-", at2 ? Simulador.Format.percentual(at2.pRedCBS) : "-");
        html += this.linhaTabela("ALIQ. IBS/CBS DE VENDA (media c/ reducao)", at1 ? Simulador.Format.percentual(at1.aliqVenda) : "-", at2 ? Simulador.Format.percentual(at2.aliqVenda) : "-");

        html += '<tr class="subtotal"><td colspan="3"></td></tr>';

        html += this.linhaTabela("Aliq. DAS reduzida s/ receita normal", at1 ? Simulador.Format.percentual(at1.aliqDASNormalReduzida) : "-", at2 ? Simulador.Format.percentual(at2.aliqDASNormalReduzida) : "-");
        html += this.linhaTabela("Aliq. DAS reduzida s/ receita ST", at1 ? Simulador.Format.percentual(at1.aliqDASSTReducida) : "-", at2 ? Simulador.Format.percentual(at2.aliqDASSTReducida) : "-");
        html += this.linhaTabela("Aliq. DAS reduzida s/ receita monofasica", at1 ? Simulador.Format.percentual(at1.aliqDASMonoReduzida) : "-", at2 ? Simulador.Format.percentual(at2.aliqDASMonoReduzida) : "-");

        html += '<tr class="subtotal"><td colspan="3"></td></tr>';

        html += this.linhaTabelaDestaque("DAS MENSAL REDUZIDO (R$)", at1 ? Simulador.Format.moeda(at1.dasReduzido) : "-", at2 ? Simulador.Format.moeda(at2.dasReduzido) : "-");
        html += this.linhaTabela("Base do IBS/CBS por fora (R$)", at1 ? Simulador.Format.moeda(at1.basePorFora) : "-", at2 ? Simulador.Format.moeda(at2.basePorFora) : "-");
        html += this.linhaTabela("Debito de IBS/CBS por fora (R$)", at1 ? Simulador.Format.moeda(at1.debitoIBSCBS) : "-", at2 ? Simulador.Format.moeda(at2.debitoIBSCBS) : "-");

        html += '</tbody></table>';
        html += '</div></div>';

        // Apuracao global
        html += '<div class="card">';
        html += '<div class="card-title">Apuracao Global do IBS/CBS por Fora e Carga Total</div>';
        html += '<div style="overflow-x:auto">';
        html += '<table>';
        html += '<thead><tr>';
        html += '<th style="width:60%">Indicador</th>';
        html += '<th style="width:40%;text-align:right">Valor (R$)</th>';
        html += '</tr></thead>';
        html += '<tbody>';

        html += this.linhaTabelaGlobal("Debito total de IBS/CBS (R$)", Simulador.Format.moeda(res.debitoTotalIBSCBS));
        html += this.linhaTabelaGlobal("Credito s/ despesas detalhadas (R$)", Simulador.Format.moeda(res.creditoDespesas));
        html += this.linhaTabelaGlobalDestaque("IBS/CBS a recolher (R$)", Simulador.Format.moeda(res.ibsCBSRecolher));
        html += this.linhaTabelaGlobal("Saldo credor do periodo, se houver (R$)", Simulador.Format.moeda(res.saldoCredor));
        html += this.linhaTabelaGlobal("DAS total reduzido (R$)", Simulador.Format.moeda(res.dasTotalReduzido));

        html += '</tbody></table>';
        html += '</div></div>';

        // Totais
        html += '<div class="card" style="background:linear-gradient(135deg,#0a0a23,#0d3b66);color:white;text-align:center">';
        html += '<div class="grid-2">';
        html += '<div><div style="font-size:0.78rem;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.05em">CARGA TOTAL MENSAL - HIBRIDO (R$)</div><div style="font-size:1.6rem;font-weight:700;margin-top:4px">' + Simulador.Format.moeda(res.cargaTotalMensal) + '</div></div>';
        html += '<div><div style="font-size:0.78rem;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.05em">CREDITO IBS/CBS GERADO A CLIENTES B2B (R$/mes)</div><div style="font-size:1.6rem;font-weight:700;margin-top:4px">' + Simulador.Format.moeda(res.creditoTotalB2B) + '</div></div>';
        html += '</div></div>';

        document.getElementById("cen2-content").innerHTML = html;
    },

    renderDespesas: function() {
        var info = this.despesasAtuais;
        var html = "";

        for (var s = 0; s < info.subtotais.length; s++) {
            var st = info.subtotais[s];
            html += '<div class="card">';
            html += '<div class="card-title">' + st.nome + '</div>';
            html += '<table>';
            html += '<thead><tr>';
            html += '<th>Categoria de despesa</th>';
            html += '<th style="text-align:right">Valor mensal (R$)</th>';
            html += '<th style="text-align:center">Credito? (S/N)</th>';
            html += '<th style="text-align:right">% fornecedor reg. regular</th>';
            html += '<th style="text-align:right">% reducao cClassTrib fornecedor</th>';
            html += '<th style="text-align:right">Credito estimado (R$)</th>';
            html += '</tr></thead>';
            html += '<tbody>';

            for (var i = 0; i < st.itens.length; i++) {
                var it = st.itens[i];
                html += '<tr>';
                html += '<td>' + it.nome + '</td>';
                html += '<td class="num">' + Simulador.Format.moeda(it.valor) + '</td>';
                html += '<td style="text-align:center">' + it.temCredito + '</td>';
                html += '<td class="num">' + (it.temCredito === "S" ? Simulador.Format.percentual(it.percFornRegRegular) : "-") + '</td>';
                html += '<td class="num">' + (it.temCredito === "S" ? Simulador.Format.percentual(it.percRedFornecedor) : "-") + '</td>';
                html += '<td class="num">' + Simulador.Format.moeda(it.creditoEstimado) + '</td>';
                html += '</tr>';
            }

            html += '<tr class="subtotal">';
            html += '<td><strong>Subtotal</strong></td>';
            html += '<td class="num"><strong>' + Simulador.Format.moeda(st.subtotalValor) + '</strong></td>';
            html += '<td colspan="3"></td>';
            html += '<td class="num"><strong>' + Simulador.Format.moeda(st.subtotalCredito) + '</strong></td>';
            html += '</tr>';
            html += '</tbody></table>';
            html += '</div>';
        }

        html += '<div class="card" style="background:linear-gradient(135deg,#0a0a23,#0d3b66);color:white;text-align:center">';
        html += '<div class="grid-2">';
        html += '<div><div style="font-size:0.78rem;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.05em">TOTAL GERAL DAS DESPESAS</div><div style="font-size:1.4rem;font-weight:700;margin-top:4px">' + Simulador.Format.moeda(info.totalGeral) + '</div></div>';
        html += '<div><div style="font-size:0.78rem;color:rgba(255,255,255,0.7);text-transform:uppercase;letter-spacing:0.05em">TOTAL DE DESPESAS COM DIREITO A CREDITO</div><div style="font-size:1.4rem;font-weight:700;margin-top:4px">' + Simulador.Format.moeda(info.totalCreditavel) + '</div></div>';
        html += '</div></div>';

        document.getElementById("despesas-content").innerHTML = html;
    },

    renderComparativo: function() {
        var c = this.comparativoResultado;
        var F = Simulador.Format;

        document.getElementById("comp-rbt12").textContent = F.moeda(this.dadosAtuais.rbt12);
        document.getElementById("comp-ano").textContent = this.dadosAtuais.ano;
        document.getElementById("comp-cliente").textContent = this.dadosAtuais.cliente;

        document.getElementById("comp-carga-mensal-c1").textContent = F.moeda(c.cargaPropriaMensalC1);
        document.getElementById("comp-carga-mensal-c2").textContent = F.moeda(c.cargaPropriaMensalC2);
        document.getElementById("comp-diff-mensal").textContent = F.sinal(c.diffMensal) + F.moedaNegativo(c.diffMensal);
        document.getElementById("comp-diff-mensal").className = F.corDiferenca(c.diffMensal);

        document.getElementById("comp-carga-anual-c1").textContent = F.moeda(c.cargaPropriaAnualC1);
        document.getElementById("comp-carga-anual-c2").textContent = F.moeda(c.cargaPropriaAnualC2);
        document.getElementById("comp-diff-anual").textContent = F.sinal(c.diffAnual) + F.moedaNegativo(c.diffAnual);
        document.getElementById("comp-diff-anual").className = F.corDiferenca(c.diffAnual);

        document.getElementById("comp-perc-c1").textContent = F.percentual(c.percPropriaC1);
        document.getElementById("comp-perc-c2").textContent = F.percentual(c.percPropriaC2);
        document.getElementById("comp-diff-perc").textContent = F.sinal(c.diffPerc) + F.percentual(c.diffPerc);
        document.getElementById("comp-diff-perc").className = F.corDiferenca(c.diffPerc);

        document.getElementById("comp-cred-c1").textContent = F.moeda(c.creditoB2BC1);
        document.getElementById("comp-cred-c2").textContent = F.moeda(c.creditoB2BC2);
        document.getElementById("comp-diff-cred").textContent = F.sinal(c.diffCredito) + F.moedaNegativo(c.diffCredito);
        document.getElementById("comp-diff-cred").className = F.corDiferenca(-c.diffCredito);

        document.getElementById("comp-liq-c1").textContent = F.moeda(c.cargaLiquidaC1);
        document.getElementById("comp-liq-c2").textContent = F.moeda(c.cargaLiquidaC2);
        document.getElementById("comp-diff-liq").textContent = F.sinal(c.diffLiquida) + F.moedaNegativo(c.diffLiquida);
        document.getElementById("comp-diff-liq").className = F.corDiferenca(c.diffLiquida);

        document.getElementById("comp-aliq-nf-c2").textContent = F.percentual(c.aliqVendaAtiv1);
        var elAliqNfC2b = document.getElementById("comp-aliq-nf-c2b");
        if (elAliqNfC2b) elAliqNfC2b.textContent = F.percentual(c.aliqVendaAtiv2);
        document.getElementById("comp-saldo-credor").textContent = F.moeda(c.saldoCredor);

        // Leitura dos resultados
        var melhorEmpresa = c.cargaPropriaMensalC2 < c.cargaPropriaMensalC1 ? "HIBRIDO" : (c.cargaPropriaMensalC2 > c.cargaPropriaMensalC1 ? "PGDAS" : "EMPATE");
        var melhorCadeia = c.cargaLiquidaC2 < c.cargaLiquidaC1 ? "HIBRIDO" : (c.cargaLiquidaC2 > c.cargaLiquidaC1 ? "PGDAS" : "EMPATE");

        document.getElementById("comp-melhor-empresa").textContent = melhorEmpresa;
        document.getElementById("comp-melhor-cadeia").textContent = melhorCadeia;

        document.getElementById("comp-recomendacao").textContent = c.recomendar;
    },

    resultItem: function(label, valor, destaque) {
        return '<div class="result-item"><div style="font-size:0.72rem;color:var(--text-muted)">' + label + '</div><div style="font-size:0.9rem;font-weight:' + (destaque ? '700' : '500') + ';color:' + (destaque ? 'var(--primary-dark)' : 'var(--text)') + '">' + valor + '</div></div>';
    },

    linhaTabela: function(label, val1, val2) {
        return '<tr><td>' + label + '</td><td class="num">' + val1 + '</td><td class="num">' + val2 + '</td></tr>';
    },

    linhaTabelaDestaque: function(label, val1, val2) {
        return '<tr style="background:rgba(0,212,255,0.08);font-weight:700"><td><strong>' + label + '</strong></td><td class="num"><strong>' + val1 + '</strong></td><td class="num"><strong>' + val2 + '</strong></td></tr>';
    },

    linhaTabelaGlobal: function(label, val) {
        return '<tr><td>' + label + '</td><td class="num">' + val + '</td></tr>';
    },

    linhaTabelaGlobalDestaque: function(label, val) {
        return '<tr style="background:rgba(0,212,255,0.08);font-weight:700"><td><strong>' + label + '</strong></td><td class="num"><strong>' + val + '</strong></td></tr>';
    },

    exportar: function() {
        window.print();
    }
};

document.addEventListener("DOMContentLoaded", function() {
    Simulador.App.init();
});
