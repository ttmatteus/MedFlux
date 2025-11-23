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
    queixaPrincipal: "Paciente apresenta episódios de convulsões, relatados recentemente.",
    descricaoDetalhada: "O paciente começou a apresentar episódios convulsivos há pouco tempo. As convulsões ocorreram de forma súbita, sem aviso prévio, e envolveram perda momentânea de consciência e movimentos involuntários. Não há confirmação de gatilhos específicos, mas os episódios foram observados em estado de vigília. Após as crises, o paciente apresentou confusão mental temporária e cansaço.",
    sintomaSeveridade: "Dor muito intensa / falta de ar moderada a intensa",
  };

  
};

export default FichaPaciente;

