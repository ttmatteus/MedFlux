import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, Calendar, Clock, FileText } from "lucide-react";
import Header from "../components/dashboard/Header";
import { useTriageContext } from "../contexts/TriageContext";
import { PRIORITY_BADGE_STYLES, PriorityLevel } from "../constants/priority";
import { createTicket } from "../services/ticketApi";

const FALLBACK_PRIORITY: PriorityLevel = "Emergência";
const FALLBACK_PRIORITY_COLOR = PRIORITY_BADGE_STYLES[FALLBACK_PRIORITY].hex;

const FichaPaciente: React.FC = () => {
  const navigate = useNavigate();
  const { latestSnapshot, setLatestSnapshot } = useTriageContext();
  const [isGenerating, setIsGenerating] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!latestSnapshot) {
    return (
      <div className="min-h-screen bg-[#F4F5F5] overflow-x-hidden w-full">
        <Header showSearch={true} />

        <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
          <div
            className="w-full"
            style={{ paddingLeft: "135px", paddingRight: "135px", paddingBottom: "50px" }}
          >
            <div className="mb-8" style={{ marginTop: "calc(150px - 80px)" }}>
              <nav
                className="flex items-center"
                style={{ fontFamily: "Inter", fontSize: "14px", lineHeight: "24px" }}
              >
                <Link
                  to="/dashboard"
                  className="hover:underline cursor-pointer"
                  style={{ color: "#848484", fontWeight: 400 }}
                >
                  Dashboard
                </Link>
                <ChevronRight
                  size={20}
                  style={{ color: "#848484", marginLeft: "8px", marginRight: "8px" }}
                />
                <Link
                  to="/triagem"
                  className="hover:underline cursor-pointer"
                  style={{ color: "#848484", fontWeight: 400 }}
                >
                  Fluxo de Triagem
                </Link>
                <ChevronRight
                  size={20}
                  style={{ color: "#000000", marginLeft: "8px", marginRight: "8px" }}
                />
                <span style={{ color: "#000000", fontWeight: 400 }}>Ficha do Paciente</span>
              </nav>
            </div>

            <div
              className="text-center"
              style={{ margin: "0 auto", width: "654px", marginTop: "calc(180px - 80px)" }}
            >
              <h1
                style={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: "24px",
                  color: "#000000",
                  width: "654px",
                  margin: "0 auto",
                  marginBottom: "4px",
                }}
              >
                Ficha do Paciente
              </h1>
              <p
                style={{
                  fontFamily: "Inter",
                  fontWeight: 400,
                  fontSize: "16px",
                  lineHeight: "24px",
                  color: "#888888",
                  width: "654px",
                  margin: "0 auto",
                }}
              >
                Execute o fluxo de triagem para gerar os dados clínicos aqui.
              </p>
            </div>

            <div
              style={{ margin: "0 auto", width: "654px", marginTop: "86px", marginBottom: "165px" }}
            >
              <div
                className="flex flex-col items-center justify-center text-center border border-dashed border-gray-300 bg-white p-12 rounded-lg"
                style={{ gap: "16px" }}
              >
                <h2 style={{ fontFamily: "Inter", fontWeight: 600, fontSize: "20px" }}>
                  Nenhuma ficha disponível
                </h2>
                <p style={{ fontFamily: "Inter", fontSize: "14px", color: "#6B6B6B" }}>
                  Realize uma triagem para visualizar a ficha do paciente.
                </p>
                <button
                  type="button"
                  className="text-white font-medium hover:opacity-90 transition-opacity"
                  style={{
                    fontFamily: "Inter",
                    fontSize: "14px",
                    lineHeight: "24px",
                    fontWeight: 600,
                    width: "160px",
                    height: "40px",
                    backgroundColor: "#20CAD5",
                    borderRadius: "6px",
                  }}
                  onClick={() => navigate("/triagem")}
                >
                  Ir para triagem
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const priorityLevel = latestSnapshot.priority.level;
  const handleGenerateTicket = async () => {
    if (!latestSnapshot || isGenerating) {
      return;
    }
    setIsGenerating(true);
    setErrorMessage(null);
    try {
      await createTicket({
        patientName: latestSnapshot.formData.nomeCompleto,
        priority: priorityLevel,
        notes: latestSnapshot.formData.queixaPrincipal || latestSnapshot.formData.descricaoSintomas || undefined,
      });
      setLatestSnapshot(null);
      navigate("/dashboard");
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Não foi possível gerar a senha. Tente novamente.",
      );
    } finally {
      setIsGenerating(false);
    }
  };
  const paciente = {
    senha: latestSnapshot.ticket?.code ?? "--",
    nome: latestSnapshot.formData.nomeCompleto || "Paciente",
    data: new Intl.DateTimeFormat("pt-BR", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    }).format(latestSnapshot.timestamp),
    hora: new Intl.DateTimeFormat("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(latestSnapshot.timestamp),
    motivo: latestSnapshot.formData.queixaPrincipal || "Triagem recente",
    prioridade: priorityLevel,
    priorityColor: PRIORITY_BADGE_STYLES[priorityLevel]?.hex ?? FALLBACK_PRIORITY_COLOR,
    nomeCompleto: latestSnapshot.formData.nomeCompleto || "Paciente",
    dataNascimento:
      latestSnapshot.formData.dia &&
      latestSnapshot.formData.mes &&
      latestSnapshot.formData.ano
        ? `${latestSnapshot.formData.dia}/${latestSnapshot.formData.mes}/${latestSnapshot.formData.ano}`
        : "--/--/----",
    pressao: latestSnapshot.formData.pressao || "--",
    bpm: latestSnapshot.formData.bpm || "--",
    temperatura: latestSnapshot.formData.temperatura || "--",
    queixaPrincipal: latestSnapshot.formData.queixaPrincipal || "Não informado.",
    descricaoDetalhada:
      latestSnapshot.formData.descricaoSintomas || "Sem descrição detalhada registrada.",
    sintomaSeveridade:
      latestSnapshot.priority.reasons.join(", ") || "Sem fatores críticos listados.",
    fatores: latestSnapshot.priority.reasons,
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
                    style={{
                      backgroundColor: paciente.priorityColor ?? FALLBACK_PRIORITY_COLOR,
                    }}
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
                  onClick={() => navigate("/triagem")}
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
                    onClick={() => {
                      setLatestSnapshot(null);
                      navigate("/triagem");
                    }}
                  >
                    Cancelar
                  </button>
                  <button
                    type="button"
                    className="text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
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
                    onClick={handleGenerateTicket}
                    disabled={isGenerating}
                  >
                    {isGenerating ? 'Gerando...' : 'Gerar Senha'}
                  </button>
                </div>
                {errorMessage && (
                  <p
                    className="text-sm text-red-500 mt-3"
                    style={{ fontFamily: 'Inter' }}
                  >
                    {errorMessage}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FichaPaciente;
