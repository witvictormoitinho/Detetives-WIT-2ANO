/**
 * Master educational data for Detetive WIT
 */

export const ASSETS = {
  office: '/src/assets/images/wit_agency_office_1790958806035.jpg',
  badge: '/src/assets/images/wit_detective_badge_1790958818944.jpg',
  suspects: '/src/assets/images/wit_suspects_team_1790958830439.jpg',
  secretRoom: '/src/assets/images/wit_secret_room_1790958839515.jpg',
  briefcase: '/src/assets/images/wit_detective_briefcase_1790959412618.jpg',
};

export const OPENING_SCRIPT = 
  "Atenção, novos detetives! Vocês acabam de entrar para a Agência WIT, uma equipe especializada em resolver mistérios tecnológicos. Hoje temos uma missão muito importante: o computador secreto da agência foi bloqueado e a senha desapareceu! Para recuperá-la, vocês precisarão encontrar pistas, organizar informações, resolver sequências e descobrir códigos. Mas atenção: uma pista pode esconder outra pista! Trabalhem juntos, observem com cuidado e, quando encontrarem um erro, tentem novamente. A missão começa agora. Boa sorte, Detetives WIT!";

export const VICTORY_SCRIPT = 
  "Excelente trabalho, Detetives WIT! Vocês observaram as pistas, organizaram as informações e resolveram o mistério. A Agência WIT está salva graças a vocês!";

export const DETECTIVE_QUOTES = {
  importantClue: "Hmm... essa pista parece importante!",
  payAttention: "Observe com atenção. Existe um detalhe escondido aqui.",
  tryAgainSupport: "Não funcionou? Tudo bem! Grandes detetives também precisam testar suas hipóteses.",
  gettingClose: "Estamos chegando perto da resposta! Continuem assim!",
  greatDiscovery: "Excelente! Vocês encontraram uma pista fundamental!",
  organizeThoughts: "Detetive e Analista, conversem antes de apertar o botão.",
};

export interface CaseMeta {
  id: number;
  code: string;
  title: string;
  icon: string;
  difficulty: number; // 1 to 5 stars
  summary: string;
  pedagogicalFocus: string;
  clueReward: {
    title: string;
    symbol?: string;
    value?: string | number;
    description: string;
  };
}

export const CASES_META: CaseMeta[] = [
  {
    id: 1,
    code: 'CASO 01',
    title: 'O Primeiro Caso',
    icon: '🔎',
    difficulty: 1,
    summary: 'Ordene a rotina de investigação e descubra as sequências elementares.',
    pedagogicalFocus: 'Identificar ordem temporal (início, meio, fim) e padrões de repetição simples.',
    clueReward: {
      title: 'Pista 1: A Pista da Cor Esmeralda',
      symbol: '🟢',
      description: 'A primeira posição da combinação secreta do computador é o símbolo verde esmeralda (🟢).'
    }
  },
  {
    id: 2,
    code: 'CASO 02',
    title: 'O Caminho Secreto',
    icon: '🗺️',
    difficulty: 2,
    summary: 'Use comandos de programação (⬆️ ⬇️ ⬅️ ➡️) para levar o agente até a pista.',
    pedagogicalFocus: 'Pensamento algorítmico, decomposição de movimentos e contorno de obstáculos.',
    clueReward: {
      title: 'Pista 2: Valor do Símbolo Esmeralda',
      symbol: '🟢 = 8',
      value: 8,
      description: 'Ao final do labirinto da agência, estava gravado: o valor numérico de 🟢 é 8.'
    }
  },
  {
    id: 3,
    code: 'CASO 03',
    title: 'O Arquivo Bagunçado',
    icon: '🧩',
    difficulty: 3,
    summary: 'Arrume os documentos da mesa em ordem crescente e identifique o intruso.',
    pedagogicalFocus: 'Organização de dados, comparação numérica e exclusão por categoria.',
    clueReward: {
      title: 'Pista 3: A Estrela Dourada',
      symbol: '⭐ = 3',
      value: 3,
      description: 'Sob a pilha de relatórios arquivados, encontramos: a segunda chave é ⭐ e vale 3.'
    }
  },
  {
    id: 4,
    code: 'CASO 04',
    title: 'O Código Secreto',
    icon: '🔐',
    difficulty: 3,
    summary: 'Substitua símbolos por números usando a tabela e filtre dados desnecessários.',
    pedagogicalFocus: 'Criptografia básica, substituição simbólica e filtro de ruído/distratores.',
    clueReward: {
      title: 'Pista 4: Tabela de Decodificação',
      description: 'Tabela oficial de conversão de dados: 🟢=8, ⭐=3, 🔵=5, 🟡=1.'
    }
  },
  {
    id: 5,
    code: 'CASO 05',
    title: 'O Arquivo Confidencial',
    icon: '👁️',
    difficulty: 4,
    summary: 'Observe a sala secreta da agência e responda às perguntas de memória.',
    pedagogicalFocus: 'Atenção aos detalhes, observação atenta e retenção visual de informações.',
    clueReward: {
      title: 'Pista 5: O Terceiro Símbolo',
      symbol: '🔵',
      value: 5,
      description: 'No cofre da sala confidencial: o 3º símbolo da sequência principal é 🔵 (vale 5).'
    }
  },
  {
    id: 6,
    code: 'CASO 06',
    title: 'Quem Pegou a Pista?',
    icon: '🕵️',
    difficulty: 4,
    summary: 'Cruze as pistas dos quatro agentes para deduzir quem guardou a chave.',
    pedagogicalFocus: 'Dedução lógica, eliminação de hipóteses e interpretação de texto investigativo.',
    clueReward: {
      title: 'Pista 6: O Quarto Símbolo',
      symbol: '🟡',
      value: 1,
      description: 'O agente identificado guardava a 4ª peça do código: o símbolo 🟡 (vale 1).'
    }
  },
  {
    id: 7,
    code: 'CASO 07',
    title: 'A Senha Perdida',
    icon: '💻',
    difficulty: 5,
    summary: 'Siga a rota no mapa para coletar os 4 símbolos e converta na senha de 4 dígitos.',
    pedagogicalFocus: 'Integração de habilidades: navegação espacial, ordenação e conversão simbólica.',
    clueReward: {
      title: 'Pista 7: Senha Mestra Confirmada',
      value: '8351',
      description: 'A ordem exata é 🟢 → ⭐ → 🔵 → 🟡, gerando os dígitos mestres: 8 3 5 1!'
    }
  },
  {
    id: 8,
    code: 'CASO 08',
    title: 'O Último Arquivo',
    icon: '🚨',
    difficulty: 5,
    summary: 'Abra o dossiê final, valide as pistas anteriores e libere o terminal do computador.',
    pedagogicalFocus: 'Revisão geral, verificação de consistência e síntese do raciocínio lógico.',
    clueReward: {
      title: 'Pista 8: Cartão de Liberação de Acesso',
      description: 'Chave de criptografia autenticada! O terminal do Computador Central está pronto para receber a senha.'
    }
  }
];

import { InventoryItem } from '../types';

export const INVENTORY_ITEMS: InventoryItem[] = [
  // Ferramentas e Equipamentos de Campo
  {
    id: 'tool_lupa',
    category: 'tool',
    title: 'Lupa Especial de Perícia',
    shortDesc: 'Aumenta pegadas, detalhes e símbolos ocultos.',
    fullDesc: 'Lupa de aumento óptico da Agência WIT com lente anti-reflexo. Essencial para observar detalhes sutis nas cenas de investigação.',
    icon: '🔍',
    source: 'Kit Oficial do Detetive',
    requiredCaseId: 0,
  },
  {
    id: 'tool_cracha',
    category: 'tool',
    title: 'Crachá Magnético WIT',
    shortDesc: 'Credencial que dá acesso às salas de investigação.',
    fullDesc: 'Crachá de agente júnior emitido pela Agência WIT. Permite a entrada no laboratório de informática e aos arquivos secretos.',
    icon: '🪪',
    source: 'Kit Oficial do Detetive',
    requiredCaseId: 0,
  },
  {
    id: 'tool_lanterna',
    category: 'tool',
    title: 'Lanterna Ultravioleta',
    shortDesc: 'Ilumina cantos escuros e revela marcas invisíveis.',
    fullDesc: 'Lanterna de led ultravioleta de alta precisão. Foi fundamental para o Agente Tom identificar o 4º símbolo.',
    icon: '🔦',
    source: 'Kit Oficial do Detetive',
    requiredCaseId: 0,
  },
  {
    id: 'tool_bloco',
    category: 'tool',
    title: 'Caderno de Anotações',
    shortDesc: 'Registra hipóteses e sequências da dupla.',
    fullDesc: 'Caderno de couro impermeável onde os detetives anotam tudo o que observam e formulam hipóteses de solução.',
    icon: '📓',
    source: 'Kit Oficial do Detetive',
    requiredCaseId: 0,
  },

  // Pistas e Códigos Coletados nos Casos 1 a 8
  {
    id: 'item_case_1',
    category: 'clue',
    title: 'Selo Esmeralda Secreto',
    shortDesc: 'Indica que o 1º símbolo da senha é a cor verde.',
    fullDesc: 'Selo coletado após ordenar a rotina de investigação e as sequências de pegadas. Indica que a primeira peça da senha do computador é 🟢.',
    icon: '🟢',
    symbolBadge: 'Posição 1º',
    source: 'Caso 01: O Primeiro Caso',
    requiredCaseId: 1,
    revealedValue: '🟢'
  },
  {
    id: 'item_case_2',
    category: 'code',
    title: 'Cartão Perfurado de Rota',
    shortDesc: 'Comandos de programação que revelam o valor: 🟢 = 8.',
    fullDesc: 'Cartão com a sequência algorítmica executada no labirinto. No verso, está gravado o valor numérico da esmeralda: 🟢 = 8.',
    icon: '🗺️',
    symbolBadge: '🟢 = 8',
    source: 'Caso 02: O Caminho Secreto',
    requiredCaseId: 2,
    revealedValue: '8'
  },
  {
    id: 'item_case_3',
    category: 'clue',
    title: 'Chapa da Estrela Dourada',
    shortDesc: 'Revela que o 2º símbolo é ⭐ e seu valor é 3.',
    fullDesc: 'Encontrada sob a pilha de relatórios organizados na mesa do detetive. Mostra que o segundo símbolo da senha é a estrela dourada ⭐, com valor numérico 3.',
    icon: '⭐',
    symbolBadge: '⭐ = 3',
    source: 'Caso 03: O Arquivo Bagunçado',
    requiredCaseId: 3,
    revealedValue: '3'
  },
  {
    id: 'item_case_4',
    category: 'code',
    title: 'Tabela Criptográfica Oficial',
    shortDesc: 'Conversor oficial de símbolos para números.',
    fullDesc: 'Documento confidencial da agência que estabelece o código oficial: 🟢=8, ⭐=3, 🔵=5, 🟡=1. Também ensina a ignorar distratores!',
    icon: '🔐',
    symbolBadge: 'Tabela Cifra',
    source: 'Caso 04: O Código Secreto',
    requiredCaseId: 4,
    revealedValue: '🟢8 ⭐3 🔵5 🟡1'
  },
  {
    id: 'item_case_5',
    category: 'clue',
    title: 'Chave da Sala Confidencial',
    shortDesc: 'Abre o cofre e revela o 3º símbolo: 🔵 = 5.',
    fullDesc: 'Chave dourada avistada no painel à esquerda da sala secreta. Guardava a informação de que o 3º símbolo é a esfera azul 🔵, com valor 5.',
    icon: '🔑',
    symbolBadge: '🔵 = 5',
    source: 'Caso 05: O Arquivo Confidencial',
    requiredCaseId: 5,
    revealedValue: '5'
  },
  {
    id: 'item_case_6',
    category: 'clue',
    title: 'Distintivo do Agente Tom',
    shortDesc: 'Revela o 4º símbolo da senha: 🟡 = 1.',
    fullDesc: 'Obtido após cruzar as pistas e deduzir os álibis dos 4 agentes. Guarda o último símbolo da sequência mestre: o topázio amarelo 🟡, que vale 1.',
    icon: '🦺',
    symbolBadge: '🟡 = 1',
    source: 'Caso 06: Quem Pegou a Pista?',
    requiredCaseId: 6,
    revealedValue: '1'
  },
  {
    id: 'item_case_7',
    category: 'code',
    title: 'Token da Senha Mestra',
    shortDesc: 'Sequência numérica mestre autenticada: 8 3 5 1.',
    fullDesc: 'Dispositivo eletrônico que une os 4 símbolos na rota da agência: 🟢(8) ➔ ⭐(3) ➔ 🔵(5) ➔ 🟡(1), formando a senha mestra 8351!',
    icon: '📟',
    symbolBadge: '8 3 5 1',
    source: 'Caso 07: A Senha Perdida',
    requiredCaseId: 7,
    revealedValue: '8351'
  },
  {
    id: 'item_case_8',
    category: 'code',
    title: 'Cartão de Acesso ao Terminal',
    shortDesc: 'Chave criptográfica que libera o teclado do computador.',
    fullDesc: 'Cartão com chip de alta segurança emitido após a validação dos 3 checkpoints do dossiê final. Permite digitar a senha no Computador Central.',
    icon: '💳',
    symbolBadge: 'Terminal OK',
    source: 'Caso 08: O Último Arquivo',
    requiredCaseId: 8,
    revealedValue: 'LIBERADO'
  }
];

