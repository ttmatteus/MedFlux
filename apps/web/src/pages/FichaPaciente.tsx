import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Calendar, Clock, FileText } from "lucide-react";
import Header from "../components/dashboard/Header";

const FichaPaciente: React.FC = () => {
  const paciente = {
    senha: "XC23",
    nome: "José Costa Araújo",
    data: "Sex, 20 Ago",
    hora: "03:09 manhã",
    motivo: "Convulção",
    prioridade: "Emergência",
    nomeCompleto: "José Costa Araújo",
    dataNascimento: "23/04/1932",
    pressao: "123/84",
    bpm: "340 bpm",
    temperatura: "39.8 C°",
    queixaPrincipal:
      "Paciente apresenta episódios de convulsões, relatados recentemente.",
    descricaoDetalhada:
      "O paciente começou a apresentar episódios convulsivos há pouco tempo. As convulsões ocorreram de forma súbita, sem aviso prévio, e envolveram perda momentânea de consciência e movimentos involuntários. Não há confirmação de gatilhos específicos, mas os episódios foram observados em estado de vigília. Após as crises, o paciente apresentou confusão mental temporária e cansaço.",
    sintomaSeveridade:
      "Dor muito intensa / falta de ar moderada a intensa",
  };

  return (
    <div className="min-h-screen bg-[#F4F5F5] overflow-x-hidden w-full">
      <Header showSearch={true} />

      {/* Conteúdo principal */}
      <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
        <div className="w-full" style={{ paddingLeft: '135px', paddingRight: '135px', paddingBottom: '50px' }}>
          {/* Breadcrumbs */}
          <div className="mb-8" style={{ marginTop: 'calc(150px - 80px)' }}>
            <nav className="flex items-center" style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '24px' }}>
              <Link 
                to="/dashboard" 
                className="hover:underline cursor-pointer"
                style={{ color: '#848484', fontWeight: 400 }}
              >
                Dashboard
              </Link>
              <ChevronRight size={20} style={{ color: '#848484', marginLeft: '8px', marginRight: '8px' }} />
              <Link 
                to="/triagem" 
                className="hover:underline cursor-pointer"
                style={{ color: '#848484', fontWeight: 400 }}
              >
                Fluxo de Triagem
              </Link>
              <ChevronRight size={20} style={{ color: '#000000', marginLeft: '8px', marginRight: '8px' }} />
              <span style={{ color: '#000000', fontWeight: 400 }}>Ficha do Paciente</span>
            </nav>
          </div>

          {/* Título e Subtítulo */}
          <div className="text-center" style={{ margin: '0 auto', width: '654px', marginTop: 'calc(180px - 80px)' }}>
            <h1
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '24px',
                color: '#000000',
                width: '654px',
                margin: '0 auto',
                marginBottom: '4px',
              }}
            >
              Ficha do Paciente
            </h1>
            <p
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '24px',
                color: '#888888',
                width: '654px',
                margin: '0 auto',
              }}
            >
              Registro clínico detalhado
            </p>
          </div>

          {/* Card Principal */}
          <div style={{ margin: '0 auto', width: '654px', marginTop: '86px', marginBottom: '165px' }}>
            <div className="flex flex-col" style={{ width: '654px', padding: '0 32px 0 32px' }}>
              {/* Resumo do Paciente */}
              <div style={{ marginBottom: '32px' }}>
                <div style={{ marginBottom: '24px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: '#000000' }}>
                    Senha
                  </span>
                  <span style={{ fontFamily: 'Inter', fontSize: '20px', lineHeight: '24px', fontWeight: 600, color: '#000000', marginLeft: '8px' }}>
                    {paciente.senha}
                  </span>
                </div>
                <h2 style={{ fontFamily: 'Inter', fontSize: '20px', lineHeight: '24px', fontWeight: 600, color: '#000000', marginBottom: '24px' }}>
                  {paciente.nome}
                </h2>
                
                {/* Cards de Data, Hora e Motivo */}
                <div className="flex" style={{ gap: '109px', marginBottom: '18px' }}>
                  <div className="flex items-center gap-2" style={{ width: '152px', height: '50px' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '8px',
                        backgroundColor: '#DBDBDB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Calendar size={24} color="#000000" />
                    </div>
                    <div className="flex flex-col">
                      <span style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: '#000000' }}>
                        Data
                      </span>
                      <span style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: '#000000', whiteSpace: 'nowrap' }}>
                        {paciente.data}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2" style={{ width: '152px', height: '50px' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '8px',
                        backgroundColor: '#DBDBDB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Clock size={24} color="#000000" />
                    </div>
                    <div className="flex flex-col">
                      <span style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: '#000000' }}>
                        Hora
                      </span>
                      <span style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: '#000000', whiteSpace: 'nowrap' }}>
                        {paciente.hora}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2" style={{ width: '152px', height: '50px' }}>
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '8px',
                        backgroundColor: '#DBDBDB',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <FileText size={24} color="#000000" />
                    </div>
                    <div className="flex flex-col">
                      <span style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: '#000000' }}>
                        Motivo
                      </span>
                      <span style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '24px', fontWeight: 500, color: '#000000', whiteSpace: 'nowrap' }}>
                        {paciente.motivo}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Separador */}
                <div style={{ width: '662px', height: '1px', backgroundColor: '#e5e5e5', marginBottom: '24px' }} />

                {/* Nível de Prioridade */}
                <div className="flex items-center" style={{ marginBottom: '18px', gap: '420px', width: '662px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, color: '#000000' }}>
                    Nível de Prioridade
                  </span>
                  <span
                    className="inline-block px-3 py-1 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: '#EF4444' }}
                  >
                    {paciente.prioridade}
                  </span>
                </div>

                {/* Separador */}
                <div style={{ width: '662px', height: '1px', backgroundColor: '#e5e5e5', marginBottom: '0' }} />
              </div>

              {/* Informações Gerais */}
              <div style={{ marginTop: '-8px', marginBottom: '32px' }}>
                <h3 style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 500, lineHeight: '14px', color: '#000000', marginBottom: '24px' }}>
                  Informações Gerais
                </h3>
                <div>
                  <div className="flex" style={{ marginBottom: '24px', gap: '150px' }}>
                    <div>
                      <label style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, lineHeight: '24px', color: '#4D4D4D', display: 'block', marginBottom: '8px' }}>
                        Nome Completo
                      </label>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, lineHeight: '24px', color: '#000000' }}>
                        {paciente.nomeCompleto}
                      </div>
                    </div>
                    <div>
                      <label style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, lineHeight: '24px', color: '#4D4D4D', display: 'block', marginBottom: '8px' }}>
                        Data de Nascimento
                      </label>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, lineHeight: '24px', color: '#000000' }}>
                        {paciente.dataNascimento}
                      </div>
                    </div>
                  </div>
                  <div className="flex" style={{ gap: '100px' }}>
                    <div>
                      <label style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, lineHeight: '24px', color: '#4D4D4D', display: 'block', marginBottom: '8px' }}>
                        Pressão
                      </label>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, lineHeight: '24px', color: '#000000' }}>
                        {paciente.pressao}
                      </div>
                    </div>
                    <div style={{ marginLeft: '128px' }}>
                      <label style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, lineHeight: '24px', color: '#4D4D4D', display: 'block', marginBottom: '8px', whiteSpace: 'nowrap' }}>
                        BPM
                      </label>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, lineHeight: '24px', color: '#000000', whiteSpace: 'nowrap' }}>
                        {paciente.bpm}
                      </div>
                    </div>
                    <div style={{ marginLeft: '100px' }}>
                      <label style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, lineHeight: '24px', color: '#4D4D4D', display: 'block', marginBottom: '8px', whiteSpace: 'nowrap' }}>
                        Temperatura Corporal
                      </label>
                      <div style={{ fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, lineHeight: '24px', color: '#000000', whiteSpace: 'nowrap' }}>
                        {paciente.temperatura}
                      </div>
                    </div>
                  </div>
                  {/* Separador */}
                  <div style={{ width: '662px', height: '1px', backgroundColor: '#e5e5e5', marginTop: '24px' }} />
                </div>
              </div>

              {/* Queixa Principal */}
              <div style={{ marginTop: '-8px', marginBottom: '34px' }}>
                <label style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, lineHeight: '20px', color: '#4D4D4D', display: 'block', marginBottom: '6px' }}>
                  Queixa Principal
                </label>
                <div
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    color: '#000000',
                  }}
                >
                  {paciente.queixaPrincipal}
                </div>
              </div>

              {/* Descrição Detalhada */}
              <div style={{ marginBottom: '32px', width: '662px' }}>
                <label style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, lineHeight: '20px', color: '#4D4D4D', display: 'block', marginBottom: '8px' }}>
                  Descrição Detalhada do Tempo e Contexto de Início dos Sintomas
                </label>
                <p
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 600,
                    lineHeight: '24px',
                    color: '#000000',
                  }}
                >
                  {paciente.descricaoDetalhada}
                </p>
              </div>

              {/* Indicador de Severidade */}
              <div className="flex items-center gap-2" style={{ marginBottom: '86px' }}>
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    backgroundColor: '#186C79',
                    borderRadius: '2px',
                  }}
                />
                <span style={{ fontFamily: 'Inter', fontSize: '14px', color: '#000000' }}>
                  {paciente.sintomaSeveridade}
                </span>
              </div>

              {/* Botões */}
              <div className="flex justify-between items-center" style={{ marginTop: '0', marginBottom: '0', paddingBottom: '0', width: '662px', marginLeft: '0px' }}>
                <button
                  type="button"
                  className="font-medium transition-all"
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    lineHeight: '24px',
                    fontWeight: 500,
                    width: '72px',
                    height: '40px',
                    backgroundColor: '#f6f6f6',
                    color: '#383838',
                    borderRadius: '6px',
                    border: '1px solid #d7d7d7',
                    marginLeft: '-4px',
                    cursor: 'pointer',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#e8e8e8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#f6f6f6';
                  }}
                >
                  Voltar
                </button>
                <div className="flex" style={{ gap: '8px' }}>
                  <button
                    type="button"
                    className="font-medium transition-all"
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      lineHeight: '24px',
                      fontWeight: 500,
                      width: '92px',
                      height: '40px',
                      backgroundColor: '#f6f6f6',
                      color: '#383838',
                      borderRadius: '6px',
                      border: '1px solid #d7d7d7',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#e8e8e8';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = '#f6f6f6';
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="text-white font-medium hover:opacity-90 transition-opacity"
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      lineHeight: '24px',
                      fontWeight: 600,
                      width: '120px',
                      height: '40px',
                      backgroundColor: '#20CAD5',
                      borderRadius: '6px',
                    }}
                  >
                    Gerar Senha
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FichaPaciente;
