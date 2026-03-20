export interface OptimizationItem {
  id: string;
  etapa: string;
  pontoAtual: string;
  impacto: 'alto' | 'médio' | 'baixo';
  otimizacao: string;
  comoOtimizar: string;
  ferramentasSugeridas: string[];
  scriptsSugeridos: {
    nome: string;
    descricao: string;
    passoAPasso: string[];
  }[];
  tempoAtual: string;
  tempoOtimizado: string;
  reducaoPercentual: number;
  complexidade: 'baixa' | 'média' | 'alta';
}

// ORDEM: alto → médio → baixo
export const optimizationData: OptimizationItem[] = [
  // =========================
  // IMPACTO ALTO
  // =========================
  {
    id: 'otim-1',
    etapa: 'Boot Universal via WinPE/USB',
    pontoAtual:
      'O processo atual depende de habilitação manual de PXE na BIOS/UEFI, variando entre fabricantes, gerações e layouts de firmware. Isso cria um ponto de falha humano, aumenta o tempo por máquina e impede paralelização eficiente da bancada.',
    impacto: 'alto',
    otimizacao:
      'Implementar um ambiente de boot universal via WinPE capaz de inicializar qualquer hardware suportado por USB e iniciar automaticamente o fluxo de deploy.',
    comoOtimizar:
      'PROBLEMA TÉCNICO:\n' +
      'PXE depende de configuração de firmware específica por fabricante. Em ambientes multimarca, não existe padronização de nomenclatura nem localização das opções, tornando impossível automatizar esse processo.\n\n' +

      'SOLUÇÃO PROPOSTA:\n' +
      'Substituir o boot por rede por um ambiente WinPE pré-configurado contendo drivers de rede universais e scripts de inicialização automáticos.\n\n' +

      'IMPLEMENTAÇÃO:\n' +
      '1. Gerar imagem WinPE customizada com Windows ADK.\n' +
      '2. Integrar drivers de rede para chipsets Intel, Realtek e Broadcom.\n' +
      '3. Configurar startnet.cmd para inicializar rede e executar o instalador central.\n' +
      '4. Hospedar instaladores e imagens em compartilhamento SMB resiliente.\n' +
      '5. Testar boot em hardwares de diferentes gerações para validar compatibilidade.\n\n' +

      'RESULTADO ESPERADO:\n' +
      'Eliminação completa da necessidade de acesso à BIOS e padronização total do início do processo de deploy.',
    ferramentasSugeridas: [
      'Windows ADK',
      'WinPE Add-on',
      'Drivers de rede universais',
      'Compartilhamento SMB redundante'
    ],
    scriptsSugeridos: [
      {
        nome: 'Inicialização automática no WinPE',
        descricao:
          'Sequência de ações que o script de boot deve executar após carregamento do WinPE.',
        passoAPasso: [
          '1. Inicializar a pilha de rede do WinPE.',
          '2. Detectar interfaces de rede disponíveis e validar link físico.',
          '3. Solicitar endereço IP via DHCP e validar gateway.',
          '4. Testar conectividade com o servidor de deploy via ping ou tentativa de conexão SMB.',
          '5. Mapear o compartilhamento de instalação como unidade local.',
          '6. Verificar presença dos arquivos principais de instalação.',
          '7. Iniciar automaticamente o processo de instalação do sistema operacional.'
        ]
      }
    ],
    tempoAtual: '2-5 min',
    tempoOtimizado: '30 seg',
    reducaoPercentual: 90,
    complexidade: 'média'
  },

  {
    id: 'otim-6',
    etapa: 'Logging estruturado e telemetria de instalação',
    pontoAtual:
      'O processo atual não gera telemetria centralizada. Falhas em scripts ou etapas de instalação só são detectadas manualmente, exigindo inspeção física em cada máquina.',
    impacto: 'alto',
    otimizacao:
      'Adicionar um mecanismo de logging estruturado que permita rastrear o estado de cada máquina em tempo real a partir de um ponto central.',
    comoOtimizar:
      'PROBLEMA TÉCNICO:\n' +
      'Sem telemetria, o sistema não possui observabilidade. Isso impede diagnóstico rápido, dificulta auditoria e aumenta tempo médio de resolução de falhas.\n\n' +

      'SOLUÇÃO PROPOSTA:\n' +
      'Implementar geração de logs estruturados durante todas as etapas do processo e enviá-los para um diretório central acessível pelo site de monitoramento.\n\n' +

      'IMPLEMENTAÇÃO:\n' +
      '1. Definir formato padrão de log contendo timestamp, serial, etapa e status.\n' +
      '2. Inserir chamadas de registro de log antes e depois de cada etapa crítica.\n' +
      '3. Garantir que os logs sejam gravados em armazenamento persistente e sincronizados com o servidor.\n' +
      '4. Configurar o site para leitura periódica desses arquivos e atualização do dashboard.\n\n' +

      'RESULTADO ESPERADO:\n' +
      'Capacidade de identificar falhas instantaneamente e rastrear histórico completo de cada máquina processada.',
    ferramentasSugeridas: [
      'PowerShell logging',
      'Formato JSON',
      'Servidor de arquivos central',
      'Dashboard web'
    ],
    scriptsSugeridos: [
      {
        nome: 'Registro automático de eventos',
        descricao:
          'Etapas que devem ser executadas por scripts para registrar o progresso da instalação.',
        passoAPasso: [
          '1. Coletar identificadores únicos da máquina, como serial number e hostname.',
          '2. Criar ou abrir arquivo de log correspondente a essa máquina no servidor.',
          '3. Registrar início de cada etapa do processo de instalação.',
          '4. Capturar mensagens de erro retornadas por ferramentas de sistema.',
          '5. Atualizar o status final da etapa como sucesso ou falha.',
          '6. Encerrar o log com registro de conclusão do processo.'
        ]
      }
    ],
    tempoAtual: 'Diagnóstico manual',
    tempoOtimizado: 'Diagnóstico imediato',
    reducaoPercentual: 95,
    complexidade: 'alta'
  },

  {
    id: 'otim-5',
    etapa: 'Saturação de rede durante aplicação de imagens',
    pontoAtual:
      'Múltiplas máquinas iniciam transferência de imagens simultaneamente, excedendo a capacidade do switch e do uplink do servidor, resultando em throughput instável.',
    impacto: 'alto',
    otimizacao:
      'Controlar concorrência de transferência e, quando possível, atualizar a infraestrutura de rede para suportar a carga.',
    comoOtimizar:
      'PROBLEMA TÉCNICO:\n' +
      'A aplicação de imagens WIM/SWM é altamente dependente de throughput. Em redes saturadas, o tempo de deploy aumenta exponencialmente e pode causar falhas de leitura.\n\n' +

      'SOLUÇÃO PROPOSTA:\n' +
      'Implementar controle de concorrência na etapa de cópia e avaliar upgrade para rede gigabit dedicada.\n\n' +

      'IMPLEMENTAÇÃO:\n' +
      '1. Medir throughput médio de transferência entre servidor e clientes.\n' +
      '2. Definir limite máximo de máquinas aplicando imagem simultaneamente.\n' +
      '3. Inserir lógica de espera em scripts para respeitar esse limite.\n' +
      '4. Avaliar substituição de switch por modelo gigabit ou superior.\n\n' +

      'RESULTADO ESPERADO:\n' +
      'Redução de variação de velocidade e previsibilidade no tempo total de deploy.',
    ferramentasSugeridas: [
      'Switch gigabit gerenciável',
      'Ferramentas de teste de rede',
      'DISM'
    ],
    scriptsSugeridos: [
      {
        nome: 'Controle de concorrência de transferência',
        descricao:
          'Etapas que o sistema deve executar para evitar múltiplas transferências simultâneas.',
        passoAPasso: [
          '1. Consultar no servidor quantas máquinas estão em fase de aplicação de imagem.',
          '2. Comparar esse número com o limite configurado.',
          '3. Caso o limite tenha sido atingido, manter a máquina em estado de espera.',
          '4. Repetir a verificação periodicamente até que haja vaga disponível.',
          '5. Iniciar a transferência de imagem apenas quando o limite permitir.'
        ]
      }
    ],
    tempoAtual: '30-50 min',
    tempoOtimizado: '15 min',
    reducaoPercentual: 65,
    complexidade: 'baixa'
  },

  // =========================
  // IMPACTO MÉDIO
  // =========================
  {
    id: 'otim-4',
    etapa: 'Padronização de relatórios de hardware',
    pontoAtual:
      'Relatórios de hardware são gerados manualmente, com nomes inconsistentes e sem estrutura de armazenamento padronizada.',
    impacto: 'médio',
    otimizacao:
      'Automatizar geração, nomeação e armazenamento dos relatórios com base em metadados da máquina.',
    comoOtimizar:
      'PROBLEMA TÉCNICO:\n' +
      'A ausência de padronização impede rastreabilidade e dificulta auditoria de equipamentos após a entrega.\n\n' +

      'SOLUÇÃO PROPOSTA:\n' +
      'Implementar geração automática de relatórios com nomenclatura fixa e armazenamento em diretórios organizados por data e ordem de produção.\n\n' +

      'IMPLEMENTAÇÃO:\n' +
      '1. Capturar serial number e modelo do equipamento via WMI.\n' +
      '2. Gerar relatório em formato HTML ou texto estruturado.\n' +
      '3. Nomear o arquivo seguindo padrão predefinido.\n' +
      '4. Mover automaticamente o relatório para diretório correspondente no servidor.\n\n' +

      'RESULTADO ESPERADO:\n' +
      'Facilidade de localização de relatórios e histórico completo de cada equipamento processado.',
    ferramentasSugeridas: [
      'HWInfo64 CLI',
      'PowerShell WMI',
      'Servidor de arquivos'
    ],
    scriptsSugeridos: [
      {
        nome: 'Geração e arquivamento automático de relatório',
        descricao:
          'Sequência de ações para coleta de dados de hardware e armazenamento padronizado.',
        passoAPasso: [
          '1. Executar ferramenta de coleta de hardware em modo silencioso.',
          '2. Capturar serial number e modelo da máquina.',
          '3. Construir nome de arquivo com base nesses identificadores.',
          '4. Criar diretórios necessários no servidor caso não existam.',
          '5. Transferir o relatório para o diretório final e validar a cópia.'
        ]
      }
    ],
    tempoAtual: '5-10 min',
    tempoOtimizado: '1 min',
    reducaoPercentual: 85,
    complexidade: 'média'
  },

  {
    id: 'otim-7',
    etapa: 'Validação física após stress test',
    pontoAtual:
      'Resultados do stress test são aceitos como definitivos, mesmo em casos onde defeitos visuais ou de áudio não são detectados automaticamente.',
    impacto: 'médio',
    otimizacao:
      'Adicionar uma etapa de validação assistida que permita ao operador confirmar funcionamento real de vídeo e áudio.',
    comoOtimizar:
      'PROBLEMA TÉCNICO:\n' +
      'Ferramentas de stress test validam apenas respostas lógicas de hardware e não garantem qualidade perceptiva de vídeo e áudio.\n\n' +

      'SOLUÇÃO PROPOSTA:\n' +
      'Após a conclusão do stress test, executar automaticamente conteúdo multimídia de teste e registrar confirmação do operador.\n\n' +

      'IMPLEMENTAÇÃO:\n' +
      '1. Detectar finalização bem-sucedida do stress test.\n' +
      '2. Reproduzir vídeo de teste em tela cheia.\n' +
      '3. Reproduzir áudio de teste com canais distintos.\n' +
      '4. Solicitar confirmação do operador e registrar o resultado.',
    ferramentasSugeridas: [
      'BurnInTest',
      'Media player automatizável',
      'Interface de confirmação simples'
    ],
    scriptsSugeridos: [
      {
        nome: 'Validação assistida pós-teste',
        descricao:
          'Etapas que devem ser automatizadas para garantir validação humana padronizada.',
        passoAPasso: [
          '1. Verificar se o stress test foi concluído com status de aprovação.',
          '2. Abrir aplicativo de reprodução de vídeo em modo tela cheia.',
          '3. Executar arquivo de vídeo de teste localizado em diretório padrão.',
          '4. Reproduzir arquivo de áudio com teste de canais esquerdo e direito.',
          '5. Exibir mensagem solicitando confirmação do operador.',
          '6. Registrar resposta do operador no log final do equipamento.'
        ]
      }
    ],
    tempoAtual: '5-8 min',
    tempoOtimizado: '3 min',
    reducaoPercentual: 60,
    complexidade: 'baixa'
  },

  // =========================
  // IMPACTO BAIXO
  // =========================
  {
    id: 'otim-2',
    etapa: 'Captura automatizada de drivers para novos modelos',
    pontoAtual:
      'Novos modelos exigem coleta manual de drivers, interrompendo o fluxo de produção e dependendo de intervenção de engenharia.',
    impacto: 'baixo',
    otimizacao:
      'Criar um processo automatizado de captura e armazenamento de drivers após instalação inicial em máquina piloto.',
    comoOtimizar:
      'PROBLEMA TÉCNICO:\n' +
      'Drivers não disponíveis no repositório central impedem automação completa do deploy em novos modelos.\n\n' +

      'SOLUÇÃO PROPOSTA:\n' +
      'Após a primeira instalação manual, extrair automaticamente todos os drivers ativos e armazená-los no servidor para uso futuro.\n\n' +

      'IMPLEMENTAÇÃO:\n' +
      '1. Detectar modelo e fabricante da máquina via WMI.\n' +
      '2. Exportar drivers instalados no sistema operacional.\n' +
      '3. Compactar os arquivos exportados e enviá-los para o repositório de drivers.\n' +
      '4. Notificar equipe responsável para validação e integração no fluxo padrão.',
    ferramentasSugeridas: [
      'Export-WindowsDriver',
      'Ferramenta de compactação',
      'Repositório central de drivers'
    ],
    scriptsSugeridos: [
      {
        nome: 'Captura e envio de drivers',
        descricao:
          'Etapas automatizáveis para coleta e armazenamento de drivers de novos modelos.',
        passoAPasso: [
          '1. Identificar fabricante e modelo da máquina em execução.',
          '2. Verificar se já existe pacote de drivers correspondente no servidor.',
          '3. Caso não exista, iniciar processo de exportação de drivers instalados.',
          '4. Compactar o diretório exportado em arquivo único.',
          '5. Transferir o pacote para pasta de novos modelos no servidor.'
        ]
      }
    ],
    tempoAtual: '20-40 min',
    tempoOtimizado: '5 min',
    reducaoPercentual: 80,
    complexidade: 'baixa'
  },

  {
    id: 'otim-3',
    etapa: 'Manifesto automatizado de produção',
    pontoAtual:
      'Operadores digitam manualmente dados de OP, SKU e serial, introduzindo risco de erro humano e inconsistência de registros.',
    impacto: 'baixo',
    otimizacao:
      'Utilizar arquivo de manifesto contendo todos os dados necessários para cada posição de bancada.',
    comoOtimizar:
      'PROBLEMA TÉCNICO:\n' +
      'Entrada manual de dados em ambientes de produção é propensa a erro e dificulta rastreabilidade posterior.\n\n' +

      'SOLUÇÃO PROPOSTA:\n' +
      'Pré-gerar manifesto contendo todos os metadados das máquinas e fazer com que o processo de instalação consuma esse arquivo automaticamente.\n\n' +

      'IMPLEMENTAÇÃO:\n' +
      '1. Gerar arquivo JSON ou CSV com lista de máquinas e respectivos dados de produção.\n' +
      '2. Disponibilizar esse arquivo em local acessível por todas as máquinas da bancada.\n' +
      '3. Durante inicialização, o sistema deve ler o manifesto e associar a máquina atual à sua entrada correspondente.\n' +
      '4. Permitir fallback manual apenas quando a máquina não estiver presente no manifesto.',
    ferramentasSugeridas: [
      'Arquivos JSON/CSV',
      'Leitores de código de barras',
      'Planilhas de planejamento de produção'
    ],
    scriptsSugeridos: [
      {
        nome: 'Carregamento automático de manifesto',
        descricao:
          'Etapas que devem ser executadas para associar automaticamente a máquina aos dados de produção.',
        passoAPasso: [
          '1. Acessar o diretório de rede onde o manifesto da bancada está armazenado.',
          '2. Ler o arquivo de manifesto e carregar sua estrutura em memória.',
          '3. Capturar o serial number da máquina atual.',
          '4. Procurar no manifesto a entrada correspondente a esse serial.',
          '5. Carregar os dados de OP, SKU e demais campos para uso no restante do processo.'
        ]
      }
    ],
    tempoAtual: '60 seg',
    tempoOtimizado: '10 seg',
    reducaoPercentual: 80,
    complexidade: 'baixa'
  }
];

export const summaryMetrics = {
  tempoTotalAtual: '60-110 min',
  tempoTotalOtimizado: '25-40 min',
  reducaoPercentualTotal: 65,
  gargalosAltos: 3,
  gargalosMedios: 2,
  gargalosBaixos: 2,
  scriptsSugeridosTotal: 7,
  ferramentasSugeridosTotal: 23
};