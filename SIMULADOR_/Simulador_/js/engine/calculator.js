var Simulador = Simulador || {};

Simulador.Calculator = {

    encontrarFaixaEBDAS: function(anexo, rbt12, receitaMensal) {
        var faixa = Simulador.SIMPLES_NACIONAL.encontrarFaixa(anexo, rbt12);
        var aliqEfetiva = Simulador.SIMPLES_NACIONAL.calcAliqEfetiva(rbt12, faixa);
        var das = receitaMensal * aliqEfetiva;
        return {
            faixa: faixa,
            aliqNominal: faixa.aliqNominal,
            parcelaDeduzir: faixa.parcelaDeduzir,
            aliqEfetiva: aliqEfetiva,
            das: das,
            percPermanece: faixa.percPermanece,
            percPisCofins: faixa.percPisCofins,
            percIcmsIss: faixa.percIcmsIss
        };
    },

    calcReceitaSemConcentracao: function(receitaTotal, receitaST, receitaMono) {
        return receitaTotal - receitaST - receitaMono;
    },

    calcCreditoDespesa: function(valor, temCredito, percFornRegRegular, percRedFornecedor, aliqIBSCBSVigente) {
        if (temCredito !== "S") return 0;
        return valor * percFornRegRegular * (1 - percRedFornecedor) * aliqIBSCBSVigente;
    },

    calcAliqIBSCBSVigente: function(ano, aliqCBSRef, aliqIBSRef) {
        var fase = Simulador.TRANSICAO.getFase(ano);
        return aliqCBSRef * fase.faseCBS + aliqIBSRef * fase.faseIBS;
    }
};
