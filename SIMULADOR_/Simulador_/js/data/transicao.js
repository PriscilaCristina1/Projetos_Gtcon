var Simulador = Simulador || {};

Simulador.TRANSICAO = {
    fases: [
        { ano: 2027, faseCBS: 1,   faseIBS: 0   },
        { ano: 2028, faseCBS: 1,   faseIBS: 0   },
        { ano: 2029, faseCBS: 1,   faseIBS: 0.1 },
        { ano: 2030, faseCBS: 1,   faseIBS: 0.2 },
        { ano: 2031, faseCBS: 1,   faseIBS: 0.3 },
        { ano: 2032, faseCBS: 1,   faseIBS: 0.4 },
        { ano: 2033, faseCBS: 1,   faseIBS: 1   }
    ],

    getFase: function(ano) {
        for (var i = 0; i < this.fases.length; i++) {
            if (this.fases[i].ano === ano) return this.fases[i];
        }
        return this.fases[0];
    }
};

Simulador.ALICOTAS_REFERENCIA = {
    cbs: 0.088,
    ibs: 0.177,
    total: 0.265
};

Simulador.CCLASSTRIB = [
    { codigo: "000001",         cst: "200", desc: "Tributacao integral - regra geral",                              pRedIBS: 0,   pRedCBS: 0,   baseLegal: "art. 10"           },
    { codigo: "200003",         cst: "200", desc: "Produtos destinados a alimentacao humana (red. 60%)",             pRedIBS: 0.6, pRedCBS: 0.6, baseLegal: "art. 137 / Anexo"   },
    { codigo: "200004",         cst: "200", desc: "Dispositivos medicos (red. 60%)",                                pRedIBS: 0.6, pRedCBS: 0.6, baseLegal: "art. 137 / Anexo"   },
    { codigo: "200039",         cst: "200", desc: "Producoes artisticas, culturais e eventos - Anexo X (red. 60%)", pRedIBS: 0.6, pRedCBS: 0.6, baseLegal: "art. 137 / Anexo X" },
    { codigo: "RED-60",         cst: "200", desc: "Generico - alquota reduzida em 60% (saude, educacao, agro etc.)", pRedIBS: 0.6, pRedCBS: 0.6, baseLegal: "arts. 128-145"     },
    { codigo: "RED-30",         cst: "200", desc: "Generico - profissoes intelectuais regulamentadas (red. 30%)",   pRedIBS: 0.3, pRedCBS: 0.3, baseLegal: "art. 127"          },
    { codigo: "ALIQ-ZERO",      cst: "200", desc: "Generico - alquota zero (cesta basica nacional etc.)",           pRedIBS: 1,   pRedCBS: 1,   baseLegal: "arts. 125-126"      },
    { codigo: "RED-40-BAR-REST",cst: "200", desc: "Bares, restaurantes e lanchonetes - regime especifico (red. 40%)", pRedIBS: 0.4, pRedCBS: 0.4, baseLegal: "arts. 273-276"   },
    { codigo: "RED-40-HOTEL",   cst: "200", desc: "Hotelaria, parques de diversao e tematicos (red. 40%)",          pRedIBS: 0.4, pRedCBS: 0.4, baseLegal: "regime especifico" }
];

Simulador.buscarCClassTrib = function(codigo) {
    for (var i = 0; i < Simulador.CCLASSTRIB.length; i++) {
        if (Simulador.CCLASSTRIB[i].codigo === codigo) return Simulador.CCLASSTRIB[i];
    }
    return { codigo: codigo, pRedIBS: 0, pRedCBS: 0 };
};
