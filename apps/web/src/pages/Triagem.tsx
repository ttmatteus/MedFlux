import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronRight, ChevronDown } from "lucide-react";
import Header from "../components/dashboard/Header";
import { PriorityResult, calculatePriority } from "../utils/triageLogic";
import { useTriageContext, TriageFormData } from "../contexts/TriageContext";

interface CustomCheckboxProps {
  name: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
}

const CustomCheckbox: React.FC<CustomCheckboxProps> = ({ name, checked, onChange, label }) => {
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      inputRef.current.checked = !checked;
      const syntheticEvent = {
        target: {
          name,
          checked: !checked,
          type: 'checkbox',
        },
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(syntheticEvent);
    }
  };

  return (
    <label className="flex items-center cursor-pointer">
      <input
        ref={inputRef}
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="hidden"
      />
      <div
        onClick={handleClick}
        style={{
          width: '20px',
          height: '20px',
          borderRadius: '4px',
          backgroundColor: checked ? '#186C79' : '#ffffff',
          border: '1px solid #d7d7d7',
          padding: '1px',
          cursor: 'pointer',
        }}
      />
      <span
        className="ml-3"
        style={{
          fontFamily: 'Inter',
          fontSize: '14px',
          color: '#000000',
        }}
      >
        {label}
      </span>
    </label>
  );
};

const initialFormState: TriageFormData = {
  nomeCompleto: "",
  dia: "",
  mes: "",
  ano: "",
  pressao: "",
  bpm: "",
  temperatura: "",
  queixaPrincipal: "",
  descricaoSintomas: "",
  sintomas: {
    dorIntensa: false,
    febreAlta: false,
    dorLeve: false,
    queixasLeves: false,
  },
};

const Triagem: React.FC = () => {
  const navigate = useNavigate();
  const { latestSnapshot, setLatestSnapshot } = useTriageContext();
  const [formData, setFormData] = useState<TriageFormData>(initialFormState);
  const [priorityResult, setPriorityResult] = useState<PriorityResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isHydratedFromSnapshot, setIsHydratedFromSnapshot] = useState(false);

  useEffect(() => {
    if (latestSnapshot && !isHydratedFromSnapshot) {
      setFormData(latestSnapshot.formData);
      setPriorityResult(latestSnapshot.priority);
      setIsHydratedFromSnapshot(true);
    }
  }, [latestSnapshot, isHydratedFromSnapshot]);

  const maskFieldValue = (name: string, value: string): string => {
    const trimmed = value.trim();
    if (!trimmed) return "";

    if (name === "pressao") {
      const digits = trimmed.replace(/\D/g, "").slice(0, 6);
      const parte1 = digits.slice(0, 3);
      const parte2 = digits.slice(3);
      return parte2 ? `${parte1}/${parte2}` : parte1;
    }

    if (name === "bpm") {
      const digits = trimmed.replace(/\D/g, "").slice(0, 3);
      return digits ? `${digits} bpm` : "";
    }

    if (name === "temperatura") {
      const digits = trimmed.replace(/\D/g, "").slice(0, 4);
      if (!digits) return "";
      if (digits.length === 1) {
        return `0.${digits} °C`;
      }
      const inteiro = digits.slice(0, -1);
      const decimal = digits.slice(-1);
      return `${Number(inteiro)}.${decimal} °C`;
    }

    return value;
  };

  const normalizeNomeCompleto = (value: string): string =>
    value
      .replace(/[^a-zA-ZÀ-ÿ\s']/g, " ")
      .replace(/\s+/g, " ")
      .replace(/^\s/, "");

  const stripUnitValue = (name: string, value: string): string => {
    if (name === "pressao") {
      return maskFieldValue(name, value);
    }
    if (name === "bpm") {
      return value.replace(/\D/g, "");
    }
    if (name === "temperatura") {
      return value.replace(/[^0-9.,]/g, "");
    }
    return value;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const inputType = (e.nativeEvent as InputEvent)?.inputType ?? "";
    const isDeletion = inputType.startsWith("delete");

    let nextValue = value;
    if (name === "nomeCompleto") {
      nextValue = normalizeNomeCompleto(value);
    } else if (["pressao", "bpm", "temperatura"].includes(name)) {
      nextValue = isDeletion ? stripUnitValue(name, value) : maskFieldValue(name, value);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: nextValue,
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      sintomas: {
        ...prev.sintomas,
        [name]: checked,
      },
    }));
  };

  const fieldErrors = useMemo(() => ({
    nomeCompleto: !formData.nomeCompleto.trim() ? "Informe o nome completo." : "",
    dataNascimento:
      !formData.dia || !formData.mes || !formData.ano ? "Informe a data de nascimento completa." : "",
    pressao: !formData.pressao.trim() ? "Informe a pressão arterial." : "",
    bpm: !formData.bpm.trim() ? "Informe os batimentos por minuto." : "",
    temperatura: !formData.temperatura.trim() ? "Informe a temperatura corporal." : "",
    queixaPrincipal: !formData.queixaPrincipal.trim() ? "Descreva a queixa principal." : "",
    descricaoSintomas: "",
  }), [formData]);

  const validationErrors = useMemo(
    () => Object.values(fieldErrors).filter(Boolean),
    [fieldErrors],
  );

  const showFieldError = (field: keyof typeof fieldErrors) =>
    touched[field] && Boolean(fieldErrors[field]);

  const handleReset = () => {
    setFormData(initialFormState);
    setPriorityResult(null);
    setErrors([]);
    setTouched({});
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(validationErrors);
    if (validationErrors.length > 0) {
      setTouched((prev) => ({
        ...prev,
        nomeCompleto: true,
        dataNascimento: true,
        pressao: true,
        bpm: true,
        temperatura: true,
        queixaPrincipal: true,
        descricaoSintomas: true,
      }));
      setPriorityResult(null);
      return;
    }
    const priority = calculatePriority(formData);
    setPriorityResult(priority);
    setErrors([]);
    const snapshotForm: TriageFormData = {
      ...formData,
      sintomas: { ...formData.sintomas },
    };
    const snapshot = {
      formData: snapshotForm,
      priority,
      timestamp: new Date(),
    };
    setLatestSnapshot(snapshot);
    navigate("/ficha-paciente");
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
              <ChevronRight size={20} style={{ color: '#000000', marginLeft: '8px', marginRight: '8px' }} />
              <span style={{ color: '#000000', fontWeight: 400 }}>Fluxo de Triagem</span>
            </nav>
          </div>

          {/* Título e Subtítulo */}
          <div className="text-center" style={{ margin: '0 auto', width: '654px', marginTop: 'calc(180px - 80px)' }}>
            <h1
              style={{
                fontFamily: 'Inter',
                fontWeight: 600,
                fontSize: '24px',
                lineHeight: '29px',
                color: '#000000',
                width: '654px',
                margin: '0 auto',
                marginBottom: '10px',
              }}
            >
              Fluxo de Triagem
            </h1>
            <p
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: '19px',
                color: '#888888',
                width: '654px',
                margin: '0 auto',
              }}
            >
              Formulário de Triagem para Pacientes
            </p>
          </div>

          {/* Formulário */}
          <form onSubmit={handleSubmit} style={{ margin: '0 auto', width: '654px', marginBottom: '165px' }}>
            <div className="flex flex-col" style={{ width: '654px', height: '1032px', padding: '0 32px 0 32px' }}>
              {/* Nome Completo */}
              <div className="mb-6" style={{ marginTop: '86px' }}>
                <label
                  htmlFor="nomeCompleto"
                  className="block mb-2"
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '20px',
                    color: '#000000',
                  }}
                >
                  Nome Completo
                </label>
                <input
                  type="text"
                  id="nomeCompleto"
                  name="nomeCompleto"
                  value={formData.nomeCompleto}
                  onChange={handleInputChange}
                  placeholder="Nome"
                  className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent ${
                    showFieldError('nomeCompleto') ? 'border-red-500' : 'border-gray-300'
                  }`}
                  style={{
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    width: '654px',
                    height: '40px',
                  }}
                  aria-invalid={showFieldError('nomeCompleto')}
                />
                {showFieldError('nomeCompleto') && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.nomeCompleto}</p>
                )}
              </div>

              {/* Data de Nascimento */}
              <div className="mb-6">
                <div className="flex" style={{ gap: '16px' }}>
                  <div className="flex-1">
                    <label
                      htmlFor="dia"
                      className="block mb-2"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: '#000000',
                      }}
                    >
                      Dia
                    </label>
                    <div className="relative">
                      <select
                        id="dia"
                        name="dia"
                        value={formData.dia}
                        onChange={handleSelectChange}
                        className={`px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent appearance-none cursor-pointer text-sm leading-5 font-normal ${
                          showFieldError('dataNascimento') ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          lineHeight: '20px',
                          fontWeight: 400,
                          color: formData.dia ? '#000000' : '#b3b3b3',
                          width: '207.33px',
                        }}
                      >
                        <option value="" style={{ color: '#b3b3b3' }}>DD</option>
                        {Array.from({ length: 31 }, (_, i) => i + 1).map((dia) => (
                          <option key={dia} value={dia.toString().padStart(2, '0')} style={{ color: '#000000' }}>
                            {dia.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <ChevronDown 
                        size={20} 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        style={{ color: '#b3b3b3' }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="mes"
                      className="block mb-2"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: '#000000',
                      }}
                    >
                      Mês
                    </label>
                    <div className="relative">
                      <select
                        id="mes"
                        name="mes"
                        value={formData.mes}
                        onChange={handleSelectChange}
                        className={`px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent appearance-none cursor-pointer text-sm leading-5 font-normal ${
                          showFieldError('dataNascimento') ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          lineHeight: '20px',
                          fontWeight: 400,
                          color: formData.mes ? '#000000' : '#b3b3b3',
                          width: '207.33px',
                        }}
                      >
                        <option value="" style={{ color: '#b3b3b3' }}>MM</option>
                        {Array.from({ length: 12 }, (_, i) => i + 1).map((mes) => (
                          <option key={mes} value={mes.toString().padStart(2, '0')} style={{ color: '#000000' }}>
                            {mes.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                      <ChevronDown 
                        size={20} 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        style={{ color: '#b3b3b3' }}
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label
                      htmlFor="ano"
                      className="block mb-2"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: '#000000',
                      }}
                    >
                      Ano
                    </label>
                    <div className="relative">
                      <select
                        id="ano"
                        name="ano"
                        value={formData.ano}
                        onChange={handleSelectChange}
                        className={`px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent appearance-none cursor-pointer text-sm leading-5 font-normal ${
                          showFieldError('dataNascimento') ? 'border-red-500' : 'border-gray-300'
                        }`}
                        style={{
                          fontFamily: 'Inter',
                          fontSize: '14px',
                          lineHeight: '20px',
                          fontWeight: 400,
                          color: formData.ano ? '#000000' : '#b3b3b3',
                          width: '207.33px',
                        }}
                      >
                        <option value="" style={{ color: '#b3b3b3' }}>AAAA</option>
                        {Array.from({ length: 75 }, (_, i) => new Date().getFullYear() - i).map((ano) => (
                          <option key={ano} value={ano.toString()} style={{ color: '#000000' }}>
                            {ano}
                          </option>
                        ))}
                      </select>
                      <ChevronDown 
                        size={20} 
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
                        style={{ color: '#b3b3b3' }}
                      />
                    </div>
                  </div>
                </div>
                {showFieldError('dataNascimento') && (
                  <p className="text-xs text-red-600 mt-1">{fieldErrors.dataNascimento}</p>
                )}
              </div>

              {/* sinais vitais */}
              <div className="mb-6">
                <div className="flex" style={{ gap: '16px'}}>
                  <div>
                    <label 
                      htmlFor="pressao"
                      className="block mb-2"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '14px', 
                        fontWeight: '500', 
                        lineHeight: '20px',
                        color: '#000000',
                      }}
                    >
                      Pressão
                    </label>
                    <input 
                      type="text" 
                      id="pressao"
                      name="pressao"
                      value={formData.pressao}
                    onChange={handleInputChange}
                      placeholder="000/000"
                      className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent ${
                        showFieldError('pressao') ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        width: '207.33px',
                      }}
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="bpm"
                      className="block mb-2"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: '#000000',
                      }}
                    >
                      BPM
                    </label>
                    <input 
                      type="text" 
                      id="bpm"
                      name="bpm"
                      value={formData.bpm}
                    onChange={handleInputChange}
                      placeholder="000 bpm"
                      className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent ${
                        showFieldError('bpm') ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        width: '207.33px',
                      }}
                    />
                  </div>
                  <div>
                    <label 
                      htmlFor="temperatura"
                      className="block mb-2"
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        fontWeight: 500,
                        lineHeight: '20px',
                        color: '#000000',
                      }}
                    >
                      Temperatura Corporal
                    </label>
                    <input 
                      type="text" 
                      id="temperatura"
                      name="temperatura"
                      value={formData.temperatura}
                    onChange={handleInputChange}
                      placeholder="000.0 C°"
                      className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent ${
                        showFieldError('temperatura') ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{
                        fontFamily: 'Inter',
                        fontSize: '14px',
                        width: '207.33px',
                      }}
                    />
                  </div>
                </div>
              </div>
              {(showFieldError('pressao') ||
                showFieldError('bpm') ||
                showFieldError('temperatura')) && (
                <p className="text-xs text-red-600 mt-1">
                  Revise sinais vitais: {[
                    showFieldError('pressao') ? fieldErrors.pressao : null,
                    showFieldError('bpm') ? fieldErrors.bpm : null,
                    showFieldError('temperatura') ? fieldErrors.temperatura : null,
                  ]
                    .filter(Boolean)
                    .join(" ")}
                </p>
              )}

              {/* Queixa Principal */}
              <div className="mb-6">
                <label 
                  htmlFor="queixaPrincipal"
                  className="block mb-2"
                  style={{
                    fontFamily: "Inter",
                    fontSize: '14px',
                    fontWeight: '500px',
                    lineHeight: '20px',
                    color: '#000000',
                  }}
                >
                  Queixa Principal
                </label>
                <div className="relative" style={{ width: '654px' }}>
                  <textarea 
                    name="queixaPrincipal" 
                    id="queixaPrincipal"
                    value={formData.queixaPrincipal}
                    onChange={handleInputChange}
                    placeholder="Digite as principais queixas do paciente..."
                    className={`px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent ${
                      showFieldError('queixaPrincipal') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      width: '654px',
                      height: '170px'
                    }}
                  />
                  {showFieldError('queixaPrincipal') && (
                    <p className="text-xs text-red-600 mt-1">{fieldErrors.queixaPrincipal}</p>
                  )}
                </div>
              </div>

              {/* descrição detalhada */}
              <div className="mb-6">
                <label 
                  htmlFor="queixaPrincipal"
                  className="block mb-2"
                  style={{
                    fontFamily: "Inter",
                    fontSize: '14px',
                    fontWeight: '500px',
                    lineHeight: '20px',
                    color: '#000000',
                  }}
                >
                  Descrição Detalhada do Tempo e Contexto de Início dos Sintomas:
                </label>
                <div className="relative" style={{ width: '654px' }}>
                  <textarea 
                    name="descricaoSintomas" 
                    id="descricaoSintomas"
                    value={formData.descricaoSintomas}
                    onChange={handleInputChange}
                    placeholder="Descreva os sintomas do paciente..."
                    className={`px-4 py-3 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-transparent ${
                      showFieldError('descricaoSintomas') ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{
                      fontFamily: 'Inter',
                      fontSize: '14px',
                      width: '654px',
                      height: '170px',
                    }}
                    aria-invalid={showFieldError('descricaoSintomas')}
                  />
                  {showFieldError('descricaoSintomas') && (
                    <p className="text-xs text-red-600 mt-1">{fieldErrors.descricaoSintomas}</p>
                  )}
                </div>
              </div>

              {/* checkboxes de sintomas */}
              <div className="mb-6">
                <div className="space-y-3">
                  <CustomCheckbox
                    name="dorIntensa"
                    checked={formData.sintomas.dorIntensa}
                    onChange={handleCheckboxChange}
                    label="Dor muito intensa / falta de ar moderada a intensa"
                  />
                  <CustomCheckbox
                    name="febreAlta"
                    checked={formData.sintomas.febreAlta}
                    onChange={handleCheckboxChange}
                    label="Febre alta, dor moderada, vômitos persistentes, ferida com risco"
                  />
                  <CustomCheckbox
                    name="dorLeve"
                    checked={formData.sintomas.dorLeve}
                    onChange={handleCheckboxChange}
                    label="Dor leve, ferimento simples, sintomas estáveis"
                  />
                  <CustomCheckbox
                    name="queixasLeves"
                    checked={formData.sintomas.queixasLeves}
                    onChange={handleCheckboxChange}
                    label="Queixas leves, sem risco aparente"
                  />
                </div>
              </div>

              {/* botões */}
              <div className="flex justify-end gap-4" style={{ marginTop: '86px', marginBottom: '0', paddingBottom: '0', width: '654px', marginLeft: '0'}}>
                <button
                  type="button"
                  className="hover:opacity-90 transition-opacity"
                  style={{
                    fontFamily: "Inter",
                    fontSize: '14px',
                    lineHeight: '24px',
                    fontWeight: 500,
                    width: '92px',
                    height: '40px',
                    backgroundColor: '#f6f6f6',
                    color: '#383838',
                    borderRadius: '6px',
                    border: '1px solid #d7d7d7'
                  }}
                  onClick={handleReset}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="text-white hover:opacity-90 transition-opacity"
                  style={{
                    fontFamily: "Inter",
                    fontSize: '14px',
                    lineHeight: '24px',
                    fontWeight: 600,
                    width: '100px',
                    height: '40px',
                    backgroundColor: '#20CAD5',
                    borderRadius: '6px',
                  }}
                >
                  Continuar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
};

export default Triagem;

