var Simulador = Simulador || {};

Simulador.SIMPLES_NACIONAL = {
    anexos: {
        I: {
            nome: "Comercio",
            faixas: [
                { faixa: 1, rbt12De: 0,         rbt12Ate: 180000,     aliqNominal: 0.04,  parcelaDeduzir: 0,      percPermanece: 0.505, percPisCofins: 0.155, percIcmsIss: 0.34  },
                { faixa: 2, rbt12De: 180000.01,  rbt12Ate: 360000,     aliqNominal: 0.073, parcelaDeduzir: 5940,   percPermanece: 0.505, percPisCofins: 0.155, percIcmsIss: 0.34  },
                { faixa: 3, rbt12De: 360000.01,  rbt12Ate: 720000,     aliqNominal: 0.095, parcelaDeduzir: 13860,  percPermanece: 0.51,  percPisCofins: 0.155, percIcmsIss: 0.335 },
                { faixa: 4, rbt12De: 720000.01,  rbt12Ate: 1800000,    aliqNominal: 0.107, parcelaDeduzir: 22500,  percPermanece: 0.51,  percPisCofins: 0.155, percIcmsIss: 0.335 },
                { faixa: 5, rbt12De: 1800000.01, rbt12Ate: 3600000,    aliqNominal: 0.143, parcelaDeduzir: 87300,  percPermanece: 0.51,  percPisCofins: 0.155, percIcmsIss: 0.335 },
                { faixa: 6, rbt12De: 3600000.01, rbt12Ate: 4800000,    aliqNominal: 0.19,  parcelaDeduzir: 378000, percPermanece: 0.656, percPisCofins: 0.344, percIcmsIss: 0     }
            ]
        },
        II: {
            nome: "Industria",
            faixas: [
                { faixa: 1, rbt12De: 0,         rbt12Ate: 180000,     aliqNominal: 0.045, parcelaDeduzir: 0,      percPermanece: 0.54, percPisCofins: 0.14, percIcmsIss: 0.32 },
                { faixa: 2, rbt12De: 180000.01,  rbt12Ate: 360000,     aliqNominal: 0.078, parcelaDeduzir: 5940,   percPermanece: 0.54, percPisCofins: 0.14, percIcmsIss: 0.32 },
                { faixa: 3, rbt12De: 360000.01,  rbt12Ate: 720000,     aliqNominal: 0.1,   parcelaDeduzir: 13860,  percPermanece: 0.54, percPisCofins: 0.14, percIcmsIss: 0.32 },
                { faixa: 4, rbt12De: 720000.01,  rbt12Ate: 1800000,    aliqNominal: 0.112, parcelaDeduzir: 22500,  percPermanece: 0.54, percPisCofins: 0.14, percIcmsIss: 0.32 },
                { faixa: 5, rbt12De: 1800000.01, rbt12Ate: 3600000,    aliqNominal: 0.147, parcelaDeduzir: 85500,  percPermanece: 0.54, percPisCofins: 0.14, percIcmsIss: 0.32 },
                { faixa: 6, rbt12De: 3600000.01, rbt12Ate: 4800000,    aliqNominal: 0.3,   parcelaDeduzir: 720000, percPermanece: 0.745, percPisCofins: 0.255, percIcmsIss: 0    }
            ]
        },
        III: {
            nome: "Servicos",
            faixas: [
                { faixa: 1, rbt12De: 0,         rbt12Ate: 180000,     aliqNominal: 0.06,  parcelaDeduzir: 0,      percPermanece: 0.509, percPisCofins: 0.156, percIcmsIss: 0.335 },
                { faixa: 2, rbt12De: 180000.01,  rbt12Ate: 360000,     aliqNominal: 0.112, parcelaDeduzir: 9360,   percPermanece: 0.509, percPisCofins: 0.171, percIcmsIss: 0.32  },
                { faixa: 3, rbt12De: 360000.01,  rbt12Ate: 720000,     aliqNominal: 0.135, parcelaDeduzir: 17640,  percPermanece: 0.509, percPisCofins: 0.166, percIcmsIss: 0.325 },
                { faixa: 4, rbt12De: 720000.01,  rbt12Ate: 1800000,    aliqNominal: 0.16,  parcelaDeduzir: 35640,  percPermanece: 0.509, percPisCofins: 0.166, percIcmsIss: 0.325 },
                { faixa: 5, rbt12De: 1800000.01, rbt12Ate: 3600000,    aliqNominal: 0.21,  parcelaDeduzir: 125640, percPermanece: 0.494, percPisCofins: 0.156, percIcmsIss: 0.35  },
                { faixa: 6, rbt12De: 3600000.01, rbt12Ate: 4800000,    aliqNominal: 0.33,  parcelaDeduzir: 648000, percPermanece: 0.805, percPisCofins: 0.195, percIcmsIss: 0     }
            ]
        },
        IV: {
            nome: "Servicos",
            faixas: [
                { faixa: 1, rbt12De: 0,         rbt12Ate: 180000,     aliqNominal: 0.045, parcelaDeduzir: 0,      percPermanece: 0.34,  percPisCofins: 0.215, percIcmsIss: 0.445 },
                { faixa: 2, rbt12De: 180000.01,  rbt12Ate: 360000,     aliqNominal: 0.09,  parcelaDeduzir: 8100,   percPermanece: 0.35,  percPisCofins: 0.25,  percIcmsIss: 0.4   },
                { faixa: 3, rbt12De: 360000.01,  rbt12Ate: 720000,     aliqNominal: 0.102, parcelaDeduzir: 12420,  percPermanece: 0.36,  percPisCofins: 0.24,  percIcmsIss: 0.4   },
                { faixa: 4, rbt12De: 720000.01,  rbt12Ate: 1800000,    aliqNominal: 0.14,  parcelaDeduzir: 39780,  percPermanece: 0.37,  percPisCofins: 0.23,  percIcmsIss: 0.4   },
                { faixa: 5, rbt12De: 1800000.01, rbt12Ate: 3600000,    aliqNominal: 0.22,  parcelaDeduzir: 183780, percPermanece: 0.38,  percPisCofins: 0.22,  percIcmsIss: 0.4   },
                { faixa: 6, rbt12De: 3600000.01, rbt12Ate: 4800000,    aliqNominal: 0.33,  parcelaDeduzir: 828000, percPermanece: 0.75,  percPisCofins: 0.25,  percIcmsIss: 0     }
            ]
        },
        V: {
            nome: "Servicos",
            faixas: [
                { faixa: 1, rbt12De: 0,         rbt12Ate: 180000,     aliqNominal: 0.155, parcelaDeduzir: 0,      percPermanece: 0.6885, percPisCofins: 0.1715, percIcmsIss: 0.14  },
                { faixa: 2, rbt12De: 180000.01,  rbt12Ate: 360000,     aliqNominal: 0.18,  parcelaDeduzir: 4500,   percPermanece: 0.6585, percPisCofins: 0.1715, percIcmsIss: 0.17  },
                { faixa: 3, rbt12De: 360000.01,  rbt12Ate: 720000,     aliqNominal: 0.195, parcelaDeduzir: 9900,   percPermanece: 0.6285, percPisCofins: 0.1815, percIcmsIss: 0.19  },
                { faixa: 4, rbt12De: 720000.01,  rbt12Ate: 1800000,    aliqNominal: 0.205, parcelaDeduzir: 17100,  percPermanece: 0.5985, percPisCofins: 0.1915, percIcmsIss: 0.21  },
                { faixa: 5, rbt12De: 1800000.01, rbt12Ate: 3600000,    aliqNominal: 0.23,  parcelaDeduzir: 62100,  percPermanece: 0.5935, percPisCofins: 0.1715, percIcmsIss: 0.235 },
                { faixa: 6, rbt12De: 3600000.01, rbt12Ate: 4800000,    aliqNominal: 0.305, parcelaDeduzir: 540000, percPermanece: 0.8,   percPisCofins: 0.2,   percIcmsIss: 0     }
            ]
        }
    },

    encontrarFaixa: function(anexo, rbt12) {
        var faixas = this.anexos[anexo].faixas;
        for (var i = 0; i < faixas.length; i++) {
            if (rbt12 >= faixas[i].rbt12De && rbt12 <= faixas[i].rbt12Ate) {
                return faixas[i];
            }
        }
        return faixas[faixas.length - 1];
    },

    calcAliqEfetiva: function(rbt12, faixa) {
        if (rbt12 <= 0) return 0;
        return ((rbt12 * faixa.aliqNominal) - faixa.parcelaDeduzir) / rbt12;
    }
};
