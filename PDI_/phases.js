const PHASES = [
    {
        title: "Fase 1: Coleta de Dados e Boas-Vindas",
        intro: "Vamos começar conhecendo um pouco sobre você e sua rotina de trabalho.",
        welcome: "Esta é uma ferramenta segura de diagnóstico e desenvolvimento contínuo. Suas respostas são confidenciais e ajudarão a identificar oportunidades de crescimento pessoal e organizacional.",
        questions: [
            { id: "q1", label: "1. Apresente-se brevemente: quem é você, o que faz na empresa e o que mais gosta no seu trabalho?" },
            { id: "q2", label: "2. Como você descreveria seu dia típico de trabalho? Quais são as atividades que mais consomem seu tempo?" },
            { id: "q3", label: "3. O que você mais valoriza no ambiente de trabalho atual?" }
        ]
    },
    {
        title: "Fase 2: Avaliação de Tempo e Demandas",
        intro: "Vamos mapear como você organiza seu tempo e quais são suas principais entregas.",
        questions: [
            { id: "q1", label: "1. Quais são suas principais entregas hoje? Descreva as atividades que mais geram valor no seu dia a dia." },
            { id: "q2", label: "2. Sente que seu tempo é bem distribuído ou falta tempo para tarefas estratégicas? Há gargalos ou sobrecarga?" },
            { id: "q3", label: "3. Você utiliza todo o seu potencial técnico? Sente que domina as ferramentas e metodologias atuais do seu trabalho?" },
            { id: "q4", label: "4. Faltam recursos ou treinamentos para executar melhor suas tarefas? Quais?" }
        ]
    },
    {
        title: "Fase 3: Ambiente, Relações e Liderança",
        intro: "Vamos entender as dinâmicas de trabalho no escritório.",
        questions: [
            { id: "q1", label: "1. Ambiente & Estrutura: O ambiente físico e digital apoia sua produtividade? Como está a cultura interna?" },
            { id: "q2", label: "2. Relacionamento com Colegas: Como é a troca, cooperação e clima de trabalho com sua equipe direta e com outros departamentos?" },
            { id: "q3", label: "3. Direção e Liderança: Você se sente alinhado(a) com as diretrizes da liderança? Recebe feedbacks claros e direcionamento adequado?" },
            { id: "q4", label: "4. Quais são os maiores desafios no seu dia a dia relacionados ao ambiente e às relações de trabalho?" }
        ]
    },
    {
        title: "Fase 4: Aprendizado, Didática e Desenvolvimento",
        intro: "Vamos explorar seu processo de evolução e aprendizado.",
        questions: [
            { id: "q1", label: "1. Didática e Troca de Conhecimento: Como funciona a passagem de conhecimento no escritório? O aprendizado é fluido ou descentralizado?" },
            { id: "q2", label: "2. Você ensina ou aprende com facilidade aqui? Como descreveria o processo de mentoria ou onboarding?" },
            { id: "q3", label: "3. Pontos de Melhoria Pessoais: Olhando para sua trajetória recente, quais competências técnicas você precisa e quer desenvolver?" },
            { id: "q4", label: "4. Quais soft skills (competências comportamentais) você gostaria de aprimorar?" },
            { id: "q5", label: "5. Quais treinamentos, cursos ou certificações seriam mais relevantes para sua atuação atual e futura?" }
        ]
    },
    {
        title: "Fase 5: Visão de Futuro",
        intro: "Vamos mapear suas expectativas de curto, médio e longo prazo.",
        questions: [
            { id: "q1", label: "1. Futuro Individual (Carreira): O que você espera para a sua carreira dentro da empresa nos próximos 1 a 3 anos? Onde quer chegar?" },
            { id: "q2", label: "2. Quais ações você acredita que precisa tomar para alcançar esses objetivos de carreira?" },
            { id: "q3", label: "3. Futuro do Escritório (Empresa): O que você espera para o crescimento do escritório como um todo em todas as áreas?" },
            { id: "q4", label: "4. Quais oportunidades você enxerga para a empresa? O que poderia ser melhorado ou implementado?" },
            { id: "q5", label: "5. Como você se vê contribuindo para o futuro da empresa?" }
        ]
    },
    {
        title: "Fase 6: Encerramento e Síntese",
        intro: "Última etapa: vamos consolidar as reflexões e gerar seu resumo executivo.",
        questions: [
            { id: "q1", label: "1. Com base em tudo que refletiu, quais são os 3 principais pontos fortes que você identificou em si mesmo?" },
            { id: "q2", label: "2. Quais são os 3 principais pontos de melhoria que você gostaria de desenvolver?" },
            { id: "q3", label: "3. Defina 3 ações concretas que você vai tomar nos próximos 6 meses para se desenvolver profissionalmente:" },
            { id: "q4", label: "4. Que tipo de suporte ou recursos você precisa da empresa para alcançar seus objetivos?" },
            { id: "q5", label: "5. Alguma mensagem ou observação final que gostaria de deixar registrado?" }
        ]
    }
];

const PHASE_NAMES = {
    1: "Coleta de Dados",
    2: "Tempo e Demandas",
    3: "Ambiente e Relações",
    4: "Aprendizado",
    5: "Visão de Futuro",
    6: "Encerramento"
};