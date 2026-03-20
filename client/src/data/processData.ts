export interface ProcessNode {
  id: string;
  title: string;
  description: string;
  type: 'preparacao' | 'boot' | 'instalacao' | 'auditoria' | 'finalizacao' | 'gargalo' | 'positivo';
  details?: string;
  children?: string[];
  parentId?: string;
}

export interface Gargalo {
  id: string;
  titulo: string;
  descricao: string;
  impacto: 'alto' | 'médio' | 'baixo';
  melhorias: string[];
}

export interface PontoPositivo {
  id: string;
  titulo: string;
  descricao: string;
  impacto: string;
}

export const processNodes: ProcessNode[] = [
  {
    id: 'inicio',
    title: 'Início do Processo',
    description: 'Montagem e preparação da máquina para instalação',
    type: 'preparacao',
    children: ['bios', 'pxe']
  },
  {
    id: 'bios',
    title: 'Ativação BIOS (MANUAL)',
    description: 'Enable LAN / PXE IPv4',
    type: 'preparacao',
    details: 'Necessário ativar manualmente em cada máquina',
    parentId: 'inicio'
  },
  {
    id: 'pxe',
    title: 'Boot PXE IPv4',
    description: 'Acesso Implantação do Windows',
    type: 'boot',
    details: 'Máquina faz boot pelo IPv4',
    children: ['boot-wim'],
    parentId: 'inicio'
  },
  {
    id: 'boot-wim',
    title: 'Interface BOOT.wim',
    description: 'Tela de seleção de SO',
    type: 'boot',
    details: 'Exibe opções: Windows 11 Pro, etc.',
    parentId: 'pxe'
  },
  {
    id: 'identificacao',
    title: 'Identificação do Hardware',
    description: 'Ex: PRO -> InstalPRO.cmd detecta Product ID do equipamento',
    type: 'instalacao',
    children: ['caminho-concordia', 'caminho-generico', 'autopro-cmd']
  },
  {
    id: 'autopro-cmd',
    title: 'AUTOPRO.cmd',
    description: 'Script para chamada de outros scripts essenciais',
    type: 'instalacao',
    details: 'Responsável por chamar Instalar.cmd, Script.cmd e DMI.cmd',
    children: ['instalar-cmd', 'script-cmd', 'oa3-cmd'],
    parentId: 'identificacao'
  },
  {
    id: 'caminho-concordia',
    title: 'Caminho "Concórdia"',
    description: 'Para equipamentos que receberão SKU, OP, NS',
    type: 'instalacao',
    details: 'Executa autopro.cmd com todas as personalizações',
    parentId: 'identificacao'
  },
  {
    id: 'caminho-generico',
    title: 'Caminho "Genérico"',
    description: 'Para equipamentos de outras marcas (Dell, Lenovo, Acer, HP...)',
    type: 'instalacao',
    details: 'Sem wallpaper, sem recovery, cria gen.dat',
    parentId: 'identificacao'
  },
  {
    id: 'instalar-cmd',
    title: 'Instalar.cmd',
    description: 'Preparação do armazenamento e aplicação do Windows',
    type: 'instalacao',
    details: 'Limpeza SSD, particionamento, DISM, Recovery, Wallpaper, Boot',
    children: ['limpeza-ssd', 'particionar', 'dism', 'recovery', 'wallpaper'],
    parentId: 'autopro-cmd'
  },
  {
    id: 'limpeza-ssd',
    title: 'Limpeza do SSD',
    description: 'Formatação completa do disco',
    type: 'instalacao',
    parentId: 'instalar-cmd'
  },
  {
    id: 'particionar',
    title: 'Particionamento',
    description: 'Criação de partições do Windows',
    type: 'instalacao',
    parentId: 'instalar-cmd'
  },
  {
    id: 'dism',
    title: 'Aplicação da imagem via DISM',
    description: 'Aplicação da imagem presente no servidor',
    type: 'instalacao',
    details: 'Transferência de dados via rede',
    parentId: 'instalar-cmd'
  },
  {
    id: 'recovery',
    title: 'Download Recovery',
    description: 'Arquivo de recuperação (quando disponível)',
    type: 'instalacao',
    parentId: 'instalar-cmd'
  },
  {
    id: 'wallpaper',
    title: 'Aplicação de Wallpaper',
    description: 'Wallpaper da Concórdia (Caminho "Concórdia" somente)',
    type: 'instalacao',
    parentId: 'instalar-cmd'
  },
  {
    id: 'script-cmd',
    title: 'Script.cmd',
    description: 'Cópia de atalhos e ferramentas',
    type: 'instalacao',
    details: 'Copia atalhos, BurnInTest, start.cmd',
    children: ['atalhos', 'burnin', 'start-copy'],
    parentId: 'autopro-cmd'
  },
  {
    id: 'atalhos',
    title: 'Cópia de Atalhos',
    description: 'Atalhos para área de trabalho',
    type: 'instalacao',
    parentId: 'script-cmd'
  },
  {
    id: 'burnin',
    title: 'Cópia BurnInTest',
    description: 'Ferramenta de teste de hardware',
    type: 'instalacao',
    parentId: 'script-cmd'
  },
  {
    id: 'start-copy',
    title: 'Cópia Start.cmd',
    description: 'Script de inicialização',
    type: 'instalacao',
    parentId: 'script-cmd'
  },
  {
    id: 'oa3-cmd',
    title: 'DMI.cmd',
    description: 'Cópia de arquivos da pasta OA3 e WriteSN',
    type: 'instalacao',
    details: 'Arquivos para uso posterior',
    parentId: 'autopro-cmd'
  },
  {
    id: 'bios-update',
    title: 'Atualização BIOS',
    description: 'Executado se o arquivo estiver disponível no servidor (determinado por script)',
    type: 'instalacao',
    details: 'Específico para cada modelo de máquina',
    parentId: 'autopro-cmd'
  },
  {
    id: 'comando-cmd',
    title: 'Comando.cmd',
    description: 'Script para chamada de outros scripts',
    type: 'auditoria',
    details: 'Executa instalação de drivers, testes e validações',
    children: ['drivers', 'burnin-test', 'validacao', 'oa3-manual', 'licenca'],
    parentId: 'auditoria-inicio'
  },
  {
    id: 'auditoria-inicio',
    title: 'Script de Inicialização',
    description: 'Pós-reboot: Start.cmd inicia com o sistema',
    type: 'auditoria',
    children: ['sysprep-close', 'comando-cmd']
  },
  {
    id: 'sysprep-close',
    title: 'Sysprep',
    description: 'Fechamento automático da janela do Sysprep',
    type: 'auditoria',
    parentId: 'auditoria-inicio'
  },
  {
    id: 'drivers',
    title: 'Instalação de Drivers',
    description: 'INST.driver detecta o hardware e instala os drivers',
    type: 'auditoria',
    details: 'Verifica Product ID, instala do servidor ou solicita captura manual',
    parentId: 'comando-cmd'
  },
  {
    id: 'burnin-test',
    title: 'BurnInTest - Teste de Estresse Máximo',
    description: 'Testes de som, imagem e hardware',
    type: 'auditoria',
    details: 'Validação completa do equipamento',
    parentId: 'comando-cmd'
  },
  {
    id: 'validacao',
    title: 'Validação Visual (MANUAL)',
    description: 'Vídeo de alta qualidade, Drivers de Dispositivos, Som/Microfone, Identificação correta de Armazenamento',
    type: 'auditoria',
    details: 'Verificação manual de funcionalidades',
    parentId: 'comando-cmd'
  },
  {
    id: 'oa3-manual',
    title: 'Gravação na BIOS (MANUAL)',
    description: 'Chamada do script OA3.cmd (Somente caminho "Concórdia")',
    type: 'auditoria',
    details: 'Apenas para equipamentos Concórdia',
    children: ['sku-op-ns'],
    parentId: 'comando-cmd'
  },
  {
    id: 'sku-op-ns',
    title: 'Digitação de Dados',
    description: 'SKU, OP e Número de Série',
    type: 'auditoria',
    parentId: 'oa3-manual'
  },
  {
    id: 'licenca',
    title: 'Validação de Licença',
    description: 'Chamada do Script Validar_etiqueta.cmd',
    type: 'auditoria',
    details: 'Retail ou Trial, gera unattend.xml',
    children: ['insercao-licenca', 'validacao-digitacao', 'confirmacao-ativacao'],
    parentId: 'comando-cmd'
  },
  {
    id: 'insercao-licenca',
    title: 'Inserção da Licença de Etiqueta',
    description: 'Leitura e inserção da licença',
    type: 'auditoria',
    parentId: 'licenca'
  },
  {
    id: 'validacao-digitacao',
    title: 'Validação da Digitação',
    description: 'Validação da licença digitada no Configurações/Ativação',
    type: 'auditoria',
    parentId: 'licenca'
  },
  {
    id: 'confirmacao-ativacao',
    title: 'Confirmação ou Ativação',
    description: 'Finalização do processo de licenciamento',
    type: 'auditoria',
    children: ['confirmar-licenca', 'ativar-script-microsoft', 'digitar-novamente'],
    parentId: 'licenca'
  },
  {
    id: 'confirmar-licenca',
    title: 'Confirmar Licença',
    description: 'Confirmação da validade da licença inserida',
    type: 'auditoria',
    details: 'Encaminha para persistência',
    parentId: 'confirmacao-ativacao'
  },
  {
    id: 'ativar-script-microsoft',
    title: 'Ativar via Script Microsoft',
    description: 'Em caso de erro no processo anterior',
    type: 'auditoria',
    details: 'Encaminha para persistência',
    parentId: 'confirmacao-ativacao'
  },
  {
    id: 'digitar-novamente',
    title: 'Digitar Novamente',
    description: 'Reentra com a licença',
    type: 'auditoria',
    parentId: 'confirmacao-ativacao'
  },
  {
    id: 'persistencia',
    title: 'Persistência',
    description: 'Gravação da Licença e da Edição do Windows',
    type: 'auditoria',
    details: 'Finaliza o processo de licenciamento'
  },
  {
    id: 'relatorio-cmd',
    title: 'Criação de Relatório',
    description: 'Script da Automação.cmd',
    type: 'auditoria',
    details: 'HWInfo manual, cópia de caminhos, edição HTML',
    children: ['hwinfo', 'html-edit']
  },
  {
    id: 'hwinfo',
    title: 'HWInfo para criação do relatório',
    description: 'Script extrai o NS do hardware e o fornece junto ao caminho (pasta mês/ano)',
    type: 'auditoria',
    parentId: 'relatorio-cmd'
  },
  {
    id: 'html-edit',
    title: 'Notepad',
    description: 'Validação e ajustes no relatório',
    type: 'auditoria',
    parentId: 'relatorio-cmd'
  },
  {
    id: 'sysprep-final',
    title: 'Sysprep Final',
    description: 'Limpeza e preparação para entrega',
    type: 'finalizacao',
    details: 'Remove atalhos, pastas, scripts. Carrega unattend.xml',
    children: ['limpeza-final', 'auto-delete']
  },
  {
    id: 'limpeza-final',
    title: 'Limpeza de Itens',
    description: 'Limpeza de arquivos de teste e scripts',
    type: 'finalizacao',
    parentId: 'sysprep-final'
  },
  {
    id: 'auto-delete',
    title: 'Auto-delete Start.cmd',
    description: 'Script de limpeza automática no primeiro boot (auto-delete após o uso)',
    type: 'finalizacao',
    parentId: 'sysprep-final'
  },
  {
    id: 'entrega',
    title: 'Instalação Finalizada',
    description: 'Equipamento finalizado para seguir o processo da produção.',
    type: 'finalizacao',
    details: 'Pronto para entrega ao cliente'
  }
];

export const gargalos: Gargalo[] = [
  {
    id: 'gargalo-1',
    titulo: 'Ativação Manual de PXE na BIOS',
    descricao: 'Necessidade de ativar manualmente "Enable LAN / PXE IPv4" em cada máquina antes do boot. Este é um passo manual que não pode ser automatizado em muitos equipamentos sem ferramentas específicas de fabricante.',
    impacto: 'alto',
    melhorias: [
      'Utilizar ferramentas de fabricantes: Dell Command | Configure, HP BIOS Config Utility, Lenovo BIOS Setup Tool para automatizar via script',
      'Implementar WOL (Wake-on-LAN) com configuração automática de PXE',
      'Documentar procedimento para operadores realizarem em lote'
    ]
  },
  {
    id: 'gargalo-2',
    titulo: 'Captura Manual de Drivers',
    descricao: 'Quando um driver não está disponível no repositório do servidor, o processo interrompe e exige intervenção manual do operador para capturar drivers do site do fabricante ou via Windows Update.',
    impacto: 'alto',
    melhorias: [
      'Implementar busca automatizada em repositórios de drivers (DriverPack, Snappy Driver Installer)',
      'Integrar com APIs de fabricantes para download automático de drivers',
      'Manter repositório centralizado e atualizado de drivers mais comuns',
      'Criar script para extrair drivers do Windows Update automaticamente'
    ]
  },
  {
    id: 'gargalo-3',
    titulo: 'Entrada Manual de Dados (SKU, OP, NS)',
    descricao: 'Digitação manual de SKU, OP e Número de Série na BIOS durante o modo auditoria. Processo propenso a erros e consome tempo significativo.',
    impacto: 'médio',
    melhorias: [
      'Ler dados de etiqueta de código de barras via scanner',
      'Integrar com banco de dados para buscar automaticamente baseado no Número de Série',
      'Implementar leitura de arquivo CSV com dados pré-carregados',
      'Usar OCR para ler informações da etiqueta do equipamento'
    ]
  },
  {
    id: 'gargalo-4',
    titulo: 'Criação Manual de Relatório HWInfo',
    descricao: 'Processo "bastante manual" de copiar caminhos, colar informações do HWInfo e editar arquivo HTML. Sem padronização exata nas informações, exigindo intervenção do operador.',
    impacto: 'médio',
    melhorias: [
      'Criar script PowerShell para extrair dados do HWInfo via CLI',
      'Gerar relatório HTML automaticamente sem intervenção',
      'Implementar template padronizado com campos obrigatórios',
      'Integrar com banco de dados para armazenar relatórios estruturados',
      'Criar API para enviar relatórios diretamente do servidor'
    ]
  },
  {
    id: 'gargalo-5',
    titulo: 'Dependência de Velocidade de Rede',
    descricao: 'A aplicação da imagem via DISM diretamente do servidor pode ser lenta dependendo da infraestrutura de rede. Transferências de múltiplas máquinas simultaneamente podem sobrecarregar a rede.',
    impacto: 'médio',
    melhorias: [
      'Implementar Multicast para instalações simultâneas',
      'Usar compressão de imagem (WIM) mais agressiva',
      'Implementar cache local em switches de rede',
      'Dividir instalações em horários específicos',
      'Usar tecnologia de delta sync para atualizações'
    ]
  },
  {
    id: 'gargalo-6',
    titulo: 'Falta de Logging Centralizado',
    descricao: 'Não há menção a um sistema centralizado de logs. Rastreamento de erros e status das instalações pode ser difícil em caso de falhas.',
    impacto: 'médio',
    melhorias: [
      'Implementar logging centralizado (ELK Stack, Splunk)',
      'Criar dashboard com status de instalações em tempo real',
      'Implementar alertas automáticos para falhas',
      'Armazenar logs estruturados em banco de dados'
    ]
  },
  {
    id: 'gargalo-7',
    titulo: 'Necessária Intervenção em caso de Erro',
    descricao: 'Quando ocorrem erros durante a instalação, o processo interrompe e exige intervenção manual do operador para diagnóstico e correção.',
    impacto: 'baixo',
    melhorias: [
      'Automatizar testes com scripts de validação',
      'Implementar verificação automática de dispositivos via WMI',
      'Criar script para testar som/microfone programaticamente',
      'Gerar relatório automático de validação'
    ]
  },
  {
    id: 'gargalo-8',
    titulo: 'Testes Manuais de Validação',
    descricao: 'Testes de vídeo 4K, drivers de dispositivos, som/microfone e armazenamento são realizados manualmente após a instalação, consumindo tempo e sendo propensos a erros humanos.',
    impacto: 'médio',
    melhorias: [
      'Criar script de teste automático de vídeo (resolução, taxa de atualização)',
      'Implementar teste automático de drivers via WMI',
      'Desenvolver teste de áudio (som e microfone) via PowerShell',
      'Automatizar teste de armazenamento (SMART, capacidade, velocidade)',
      'Gerar relatório consolidado de todos os testes',
      'Integrar com sistema de alertas para falhas'
    ]
  },
  {
    id: 'gargalo-9',
    titulo: 'Falta de Integração com Banco de Dados',
    descricao: 'Não há menção a integração com banco de dados para armazenar informações de equipamentos, histórico de instalações, drivers utilizados e status de máquinas.',
    impacto: 'médio',
    melhorias: [
      'Implementar banco de dados centralizado (SQL Server, PostgreSQL)',
      'Criar tabelas para equipamentos, instalações, drivers e logs',
      'Desenvolver API para consultar e atualizar dados do servidor',
      'Implementar rastreamento de histórico de cada equipamento',
      'Criar dashboard com estatísticas de instalações',
      'Integrar com sistema de inventário corporativo'
    ]
  }
];

export const pontosPositivos: PontoPositivo[] = [
  {
    id: 'positivo-1',
    titulo: 'Centralização do Processo de Instalação via Servidor',
    descricao: 'Uso de imagens SWM e scripts centralizados no servidor facilita a manutenção, atualização e controle de versão de todas as máquinas.',
    impacto: 'Reduz inconsistências entre equipamentos e simplifica atualizações em massa'
  },
  {
    id: 'positivo-2',
    titulo: 'Automação da Sequência do Processo via Scripts',
    descricao: 'Divisão em scripts específicos (Instalar.cmd, script.cmd, OA3.cmd) permite ajustes isolados sem afetar todo o processo.',
    impacto: 'Facilita manutenção, testes e correção de bugs específicos'
  },
  {
    id: 'positivo-3',
    titulo: 'Identificação Automática de Hardware',
    descricao: 'Uso do Product ID para direcionar automaticamente a imagem correta reduz erros humanos na seleção de imagem.',
    impacto: 'Garante consistência e reduz tempo de instalação'
  },
  {
    id: 'positivo-4',
    titulo: 'Ambiente de Teste Integrado',
    descricao: 'Inclusão de BurnInTest em modo extremo e vídeo 4K garante que a qualidade do hardware seja validada antes da entrega.',
    impacto: 'Reduz devoluções por defeito de hardware e garante satisfação do cliente'
  },
  {
    id: 'positivo-5',
    titulo: 'Suporte a Múltiplos Fabricantes',
    descricao: 'Dois caminhos de instalação (Concórdia e Genérico) permitem suportar equipamentos de diferentes fabricantes com personalizações específicas.',
    impacto: 'Flexibilidade para trabalhar com diversos fornecedores'
  },
  {
    id: 'positivo-6',
    titulo: 'Limpeza Automática antes do Sysprep',
    descricao: 'Script de finalização remove automaticamente vestígios de ferramentas de fábrica, garantindo máquina limpa para o cliente.',
    impacto: 'Garante entrega profissional sem arquivos desnecessários'
  },
  {
    id: 'positivo-7',
    titulo: 'Licenciamento Flexível a Erros',
    descricao: 'Suporte a licenças Retail e Trial com gravação automática via unattend.xml, permitindo diferentes modelos de negócio.',
    impacto: 'Facilita venda com ou sem licença incluída'
  },
  {
    id: 'positivo-8',
    titulo: 'Recuperação Automática de Falhas',
    descricao: 'Sistema de marcadores e checkpoints permite retomar instalação interrompida sem reiniciar do zero, economizando tempo em caso de falhas de rede ou energia.',
    impacto: 'Reduz tempo de reprocessamento e aumenta eficiência operacional'
  }
];
