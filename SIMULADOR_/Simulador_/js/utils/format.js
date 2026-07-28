var Simulador = Simulador || {};

Simulador.Format = {
    moeda: function(valor) {
        if (valor === null || valor === undefined || isNaN(valor)) return "R$ 0,00";
        return "R$ " + valor.toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    moedaNegativo: function(valor) {
        if (valor === null || valor === undefined || isNaN(valor)) return "R$ 0,00";
        if (valor < 0) return "- R$ " + Math.abs(valor).toFixed(2).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        return this.moeda(valor);
    },

    percentual: function(valor, casas) {
        casas = casas || 2;
        if (valor === null || valor === undefined || isNaN(valor)) return "0,00%";
        return (valor * 100).toFixed(casas).replace(".", ",") + "%";
    },

    percentual4: function(valor) {
        return this.percentual(valor, 2);
    },

    numero: function(valor, casas) {
        casas = casas || 2;
        if (valor === null || valor === undefined || isNaN(valor)) return "0";
        return valor.toFixed(casas).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },

    parseMoeda: function(str) {
        if (typeof str === "number") return str;
        if (!str) return 0;
        return parseFloat(str.replace(/\./g, "").replace(",", ".").replace(/[R$\s]/g, "")) || 0;
    },

    parsePercentual: function(str) {
        if (typeof str === "number") return str;
        if (!str) return 0;
        return parseFloat(str.replace("%", "").replace(",", ".").trim()) / 100 || 0;
    },

    parseNumero: function(str) {
        if (typeof str === "number") return str;
        if (!str) return 0;
        return parseFloat(str.replace(/\./g, "").replace(",", ".")) || 0;
    },

    corDiferenca: function(valor) {
        if (valor < -0.001) return "positivo";
        if (valor > 0.001) return "negativo";
        return "neutro";
    },

    sinal: function(valor) {
        if (valor > 0.001) return "+";
        return "";
    }
};
