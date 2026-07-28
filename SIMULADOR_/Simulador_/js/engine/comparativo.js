var Simulador = Simulador || {};

Simulador.Comparativo = {

    calcular: function(cen1, cen2, dados) {
        var receitaTotalMensal = 0;
        for (var i = 0; i < dados.atividades.length; i++) {
            receitaTotalMensal += dados.atividades[i].receitaTotal;
        }

        var cargaPropriaMensalC1 = cen1.dasTotalMensal;
        var cargaPropriaMensalC2 = cen2.cargaTotalMensal;
        var diffMensal = cargaPropriaMensalC2 - cargaPropriaMensalC1;

        var cargaPropriaAnualC1 = cargaPropriaMensalC1 * 12;
        var cargaPropriaAnualC2 = cargaPropriaMensalC2 * 12;
        var diffAnual = cargaPropriaAnualC2 - cargaPropriaAnualC1;

        var percPropriaC1 = receitaTotalMensal > 0 ? cargaPropriaMensalC1 / receitaTotalMensal : 0;
        var percPropriaC2 = receitaTotalMensal > 0 ? cargaPropriaMensalC2 / receitaTotalMensal : 0;
        var diffPerc = percPropriaC2 - percPropriaC1;

        var creditoB2BC1 = cen1.creditoTotalB2B;
        var creditoB2BC2 = cen2.creditoTotalB2B;
        var diffCredito = creditoB2BC2 - creditoB2BC1;

        var cargaLiquidaC1 = cargaPropriaMensalC1 - creditoB2BC1;
        var cargaLiquidaC2 = cargaPropriaMensalC2 - creditoB2BC2;
        var diffLiquida = cargaLiquidaC2 - cargaLiquidaC1;

        var melhorCargaPropria = diffMensal < -0.001 ? 2 : (diffMensal > 0.001 ? 1 : 0);
        var melhorCargaLiquida = diffLiquida < -0.001 ? 2 : (diffLiquida > 0.001 ? 1 : 0);

        var nomeMelhor;
        if (melhorCargaLiquida === 2) {
            nomeMelhor = "HIBRIDO";
        } else if (melhorCargaLiquida === 1) {
            nomeMelhor = "PGDAS";
        } else {
            nomeMelhor = "EQUIVALENTE";
        }

        var recomendar;
        if (nomeMelhor === "HIBRIDO") {
            recomendar = "HIBRIDO: menor carga propria E maior competitividade junto a clientes B2B.";
        } else if (nomeMelhor === "PGDAS") {
            recomendar = "PGDAS: menor carga propria e sem complexidade de apuracao por fora.";
        } else {
            recomendar = "CENARIOS EQUIVALENTES. Avalie a complexidade operacional.";
        }

        return {
            receitaTotalMensal: receitaTotalMensal,
            cargaPropriaMensalC1: cargaPropriaMensalC1,
            cargaPropriaMensalC2: cargaPropriaMensalC2,
            diffMensal: diffMensal,
            cargaPropriaAnualC1: cargaPropriaAnualC1,
            cargaPropriaAnualC2: cargaPropriaAnualC2,
            diffAnual: diffAnual,
            percPropriaC1: percPropriaC1,
            percPropriaC2: percPropriaC2,
            diffPerc: diffPerc,
            creditoB2BC1: creditoB2BC1,
            creditoB2BC2: creditoB2BC2,
            diffCredito: diffCredito,
            cargaLiquidaC1: cargaLiquidaC1,
            cargaLiquidaC2: cargaLiquidaC2,
            diffLiquida: diffLiquida,
            melhorCargaPropria: melhorCargaPropria,
            melhorCargaLiquida: melhorCargaLiquida,
            nomeMelhor: nomeMelhor,
            recomendar: recomendar,
            aliqIBSCBSNF_C1: "por dentro",
            aliqVendaAtiv1: cen2.atividades.length > 0 ? cen2.atividades[0].aliqVenda : 0,
            aliqVendaAtiv2: cen2.atividades.length > 1 ? cen2.atividades[1].aliqVenda : (cen2.atividades.length > 0 ? cen2.atividades[0].aliqVenda : 0),
            saldoCredor: cen2.saldoCredor
        };
    }
};
