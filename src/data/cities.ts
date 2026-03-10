// Top 50 cities of São Paulo state for demo purposes
export const SP_CITIES = [
  "Adamantina", "Aguaí", "Americana", "Amparo", "Andradina",
  "Araçatuba", "Araraquara", "Araras", "Arujá", "Assis",
  "Atibaia", "Avaré", "Barretos", "Barueri", "Bauru",
  "Bebedouro", "Birigui", "Botucatu", "Bragança Paulista", "Caçapava",
  "Caieiras", "Cajamar", "Campinas", "Campo Limpo Paulista", "Caraguatatuba",
  "Carapicuíba", "Catanduva", "Cotia", "Cruzeiro", "Cubatão",
  "Diadema", "Embu das Artes", "Fernandópolis", "Ferraz de Vasconcelos", "Franca",
  "Francisco Morato", "Franco da Rocha", "Guaratinguetá", "Guarujá", "Guarulhos",
  "Hortolândia", "Indaiatuba", "Itanhaém", "Itapecerica da Serra", "Itapetininga",
  "Itapeva", "Itapevi", "Itapira", "Itaquaquecetuba", "Itu",
  "Jacareí", "Jandira", "Jaú", "Jundiaí", "Leme",
  "Lençóis Paulista", "Limeira", "Lins", "Lorena", "Mairinque",
  "Marília", "Matão", "Mauá", "Mirassol", "Mococa",
  "Mogi das Cruzes", "Mogi Guaçu", "Mogi Mirim", "Monte Mor", "Osasco",
  "Ourinhos", "Paulínia", "Penápolis", "Peruíbe", "Piedade",
  "Piracicaba", "Pirassununga", "Poá", "Praia Grande", "Presidente Prudente",
  "Registro", "Ribeirão Pires", "Ribeirão Preto", "Rio Claro", "Salto",
  "Santa Bárbara d'Oeste", "Santo André", "Santos", "São Bernardo do Campo", "São Caetano do Sul",
  "São Carlos", "São José do Rio Preto", "São José dos Campos", "São Paulo", "São Roque",
  "São Vicente", "Sertãozinho", "Sorocaba", "Sumaré", "Suzano",
  "Taboão da Serra", "Taquaritinga", "Tatui", "Taubaté", "Tupã",
  "Ubatuba", "Valinhos", "Vinhedo", "Várzea Paulista", "Votuporanga",
  "Águas de Lindóia", "Álvares Machado", "São Sebastião", "Itanhaém", "Bertioga",
  "Mongaguá", "Pereira Barreto", "Presidente Epitácio", "Presidente Venceslau", "Rancharia",
  "Regente Feijó", "Rosana", "Salto de Pirapora", "Santa Fé do Sul", "São Manuel",
  "Teodoro Sampaio", "Tupã", "Valparaíso", "Votorantim", "Ilha Solteira"
].sort();

export type NominataStatus = 'active' | 'warning' | 'expired' | 'empty';

export interface NominataMember {
  id: string;
  nome: string;
  dataNascimento: string;
  cpf: string;
  rg: string;
  tituloEleitoral: string;
  zonaEleitoral: string;
  secaoEleitoral: string;
  estadoCivil: string;
  profissao: string;
  endereco: string;
  numero: string;
  bairro: string;
  cidade: string;
  cep: string;
  email: string;
  telefone: string;
  cargo: string;
}

export interface Nominata {
  id: string;
  cidade: string;
  status: NominataStatus;
  dataCriacao: string;
  dataAprovacao?: string;
  dataVencimento?: string;
  sede: {
    endereco: string;
    numero: string;
    bairro: string;
    cidade: string;
    cep: string;
    telefone: string;
  };
  membros: NominataMember[];
  notas: string;
  documentoAssinado?: string;
}

// Mock data for demo
export const MOCK_NOMINATAS: Nominata[] = [
  {
    id: '1',
    cidade: 'Campinas',
    status: 'active',
    dataCriacao: '2025-01-15',
    dataAprovacao: '2025-02-01',
    dataVencimento: '2027-02-01',
    sede: {
      endereco: 'Rua Barão de Jaguara',
      numero: '1200',
      bairro: 'Centro',
      cidade: 'Campinas',
      cep: '13015-002',
      telefone: '(19) 3232-0001',
    },
    membros: [
      {
        id: 'm1', nome: 'Carlos Alberto Silva', dataNascimento: '1975-03-12', cpf: '123.456.789-00',
        rg: '12.345.678-9', tituloEleitoral: '0001234567', zonaEleitoral: '120', secaoEleitoral: '0045',
        estadoCivil: 'Casado', profissao: 'Advogado', endereco: 'Av. Brasil', numero: '500',
        bairro: 'Cambuí', cidade: 'Campinas', cep: '13025-085', email: 'carlos@email.com',
        telefone: '(19) 99999-0001', cargo: 'Presidente',
      },
      {
        id: 'm2', nome: 'Maria José Santos', dataNascimento: '1980-07-22', cpf: '987.654.321-00',
        rg: '98.765.432-1', tituloEleitoral: '0009876543', zonaEleitoral: '120', secaoEleitoral: '0046',
        estadoCivil: 'Solteira', profissao: 'Professora', endereco: 'Rua das Flores', numero: '150',
        bairro: 'Taquaral', cidade: 'Campinas', cep: '13076-000', email: 'maria@email.com',
        telefone: '(19) 99999-0002', cargo: 'Vice-presidente',
      },
    ],
    notas: 'Nominata aprovada sem pendências.',
  },
  {
    id: '2',
    cidade: 'Sorocaba',
    status: 'warning',
    dataCriacao: '2024-06-10',
    dataAprovacao: '2024-07-01',
    dataVencimento: '2026-04-01',
    sede: {
      endereco: 'Rua XV de Novembro',
      numero: '300',
      bairro: 'Centro',
      cidade: 'Sorocaba',
      cep: '18035-000',
      telefone: '(15) 3211-0001',
    },
    membros: [
      {
        id: 'm3', nome: 'José Roberto Oliveira', dataNascimento: '1968-11-05', cpf: '111.222.333-44',
        rg: '11.222.333-4', tituloEleitoral: '0001112223', zonaEleitoral: '250', secaoEleitoral: '0100',
        estadoCivil: 'Casado', profissao: 'Empresário', endereco: 'Av. Ipanema', numero: '800',
        bairro: 'Jardim Europa', cidade: 'Sorocaba', cep: '18045-000', email: 'jose@email.com',
        telefone: '(15) 99888-0001', cargo: 'Presidente',
      },
    ],
    notas: 'Vencimento próximo - contatar presidente.',
  },
  {
    id: '3',
    cidade: 'Ribeirão Preto',
    status: 'expired',
    dataCriacao: '2023-03-20',
    dataAprovacao: '2023-04-15',
    dataVencimento: '2025-04-15',
    sede: {
      endereco: 'Av. Presidente Vargas',
      numero: '1500',
      bairro: 'Centro',
      cidade: 'Ribeirão Preto',
      cep: '14010-000',
      telefone: '(16) 3610-0001',
    },
    membros: [],
    notas: 'Nominata vencida. Aguardando renovação.',
  },
];

export const CARGOS = [
  'Presidente',
  'Vice-presidente',
  '1º Tesoureiro',
  '2º Tesoureiro',
  'Secretário(a)',
  'Membro',
];
