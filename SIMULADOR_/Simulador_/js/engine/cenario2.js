var Simulador = Simulador || {};

Simulador.Cenario2 = {

    calcular: function(dados, despesas) {
        var fase = Simulador.TRANSICAO.getFase(dados.ano);
        var aliqCBSRef = Simulador.ALICOTAS_REFERENCIA.cbs;
        var aliqIBSRef = Simulador.ALICOTAS_REFERENCIA.ibs;
        var aliqCheiaIBS = aliqIBSRef * fase.faseIBS;
        var aliqCheiaCBS = aliqCBSRef * fase.faseCBS;
        var aliqCheia = aliqCheiaCBS + aliqCheiaIBS;

        var resultado = {};
        resultado.ano = dados.ano;
        resultado.faseCBS = fase.faseCBS;
        resultado.faseIBS = fase.faseIBS;
        resultado.aliqCheia = aliqCheia;
        resultado.aliqCheiaIBS = aliqCheiaIBS;
        resultado.aliqCheiaCBS = aliqCheiaCBS;
        resultado.atividades = [];

        var dasTotalGeral = 0;
        var debitoTotalGeral = 0;

        for (var a = 0; a < dados.atividades.length; a++) {
            var ativ = dados.atividades[a];
            var res = this.calcularAtividade(ativ, dados.rbt12, fase, aliqCheiaIBS, aliqCheiaCBS, aliqCheia);
            resultado.atividades.push(res);
            dasTotalGeral += res.dasReduzido;
            debitoTotalGeral += res.debitoIBSCBS;
        }

        resultado.dasTotalReduzido = dasTotalGeral;

        var totalCreditosDespesas = 0;
        for (var d = 0; d < despesas.length; d++) {
            totalCreditosDespesas += despesas[d].creditoEstimado;
        }
        resultado.creditoDespesas = totalCreditosDespesas;
        resultado.debitoTotalIBSCBS = debitoTotalGeral;

        var ibsCBSRecolher = debitoTotalGeral - totalCreditosDespesas;
        resultado.ibsCBSRecolher = Math.max(ibsCBSRecolher, 0);
        resultado.saldoCredor = ibsCBSRecolher < 0 ? Math.abs(ibsCBSRecolher) : 0;
        resultado.cargaTotalMensal = resultado.dasTotalReduzido + resultado.ibsCBSRecolher;

        var creditoTotalB2B = 0;
        for (var b = 0; b < resultado.atividades.length; b++) {
            creditoTotalB2B += resultado.atividades[b].creditoB2B;
        }
        resultado.creditoTotalB2B = creditoTotalB2B;
        return resultado;
    },

    calcularAtividade: function(ativ, rbt12, fase, aliqCheiaIBS, aliqCheiaCBS, aliqCheia) {
        var info = Simulador.Calculator.encontrarFaixaEBDAS(ativ.anexo, rbt12, 0);
        var aliqEf = info.aliqEfetiva;
        var percPis = info.percPisCofins;
        var percIcms = info.percIcmsIss;

        var aliqDASNormal = aliqEf * (1 - percPis * fase.faseCBS - percIcms * fase.faseIBS);

        var aliqDASST;
        if (fase.faseIBS >= 1) {
            aliqDASST = aliqDASNormal;
        } else {
            aliqDASST = aliqEf * (1 - percPis * fase.faseCBS - percIcms * (1 - fase.faseIBS));
        }

        var aliqDASMono = aliqEf * (1 - percPis * fase.faseCBS - percIcms * fase.faseIBS);

        var receitaNormal = ativ.receitaTotal - ativ.receitaST - ativ.receitaMono;
        var dasNormal = receitaNormal * aliqDASNormal;
        var dasST = ativ.receitaST * aliqDASST;
        var dasMono = ativ.receitaMono * aliqDASMono;
        var dasReduzido = dasNormal + dasST + dasMono;

        var cClassTrib = Simulador.buscarCClassTrib(ativ.cClassTrib);
        var pRedIBS = cClassTrib.pRedIBS;
        var pRedCBS = cClassTrib.pRedCBS;

        var pComReducao = 0;
        var pSemReducao = 1;
        if (ativ.receitaTotal > 0 && ativ.receitaComReducao > 0) {
            pComReducao = ativ.receitaComReducao / ativ.receitaTotal;
            pSemReducao = 1 - pComReducao;
        }

        var aliqComReducao = aliqCheiaIBS * (1 - pRedIBS) + aliqCheiaCBS * (1 - pRedCBS);
        var aliqSemReducao = aliqCheia;

        var aliqVenda;
        if (aliqCheia === 0) {
            aliqVenda = 0;
        } else {
            aliqVenda = aliqSemReducao * pSemReducao + aliqComReducao * pComReducao;
        }

        var basePorFora = Math.max(0, ativ.receitaTotal);
        basePorFora = basePorFora - ativ.exclusoesBase;
        basePorFora = Math.max(0, basePorFora);

        var debitoIBSCBS = basePorFora * aliqVenda;
        var creditoB2B = debitoIBSCBS;

        return {
            anexo: ativ.anexo,
            nome: ativ.nome,
            receitaTotal: ativ.receitaTotal,
            receitaST: ativ.receitaST,
            receitaMono: ativ.receitaMono,
            receitaNormal: receitaNormal,
            aliqEfetiva: aliqEf,
            percPisCofins: percPis,
            percIcmsIss: percIcms,
            cClassTrib: ativ.cClassTrib,
            pRedIBS: pRedIBS,
            pRedCBS: pRedCBS,
            pComReducao: pComReducao,
            pSemReducao: pSemReducao,
            aliqVenda: aliqVenda,
            aliqDASNormalReduzida: aliqDASNormal,
            aliqDASSTReducida: aliqDASST,
            aliqDASMonoReduzida: aliqDASMono,
            dasReduzido: dasReduzido,
            basePorFora: basePorFora,
            debitoIBSCBS: debitoIBSCBS,
            creditoB2B: creditoB2B,
            faixa: info.faixa.faixa
        };
    }
};
