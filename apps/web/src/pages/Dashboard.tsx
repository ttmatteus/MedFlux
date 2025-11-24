import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Header, PasswordCard, CallsPanel, RoomStatusCard, CALLS_PAGE_SIZE } from "../components/dashboard";
import { ROOM_STATUS, sortTicketsByPriority } from "../constants/dashboard";
import { PRIORITY_ORDER } from "../constants/priority";
import { callNextTicket, getTicketHistory, listTickets } from "../services/ticketApi";
import type { PasswordCard as PasswordCardType } from "../types/dashboard";
import type { TicketDTO } from "../types/ticket";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [queue, setQueue] = useState<TicketDTO[]>([]);
  const [history, setHistory] = useState<TicketDTO[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notes, setNotes] = useState(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("dashboardNotes") ?? "";
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [callsPage, setCallsPage] = useState(1);
  const [highlightCode, setHighlightCode] = useState<string | null>(null);
  const handleNotesChange = (value: string) => {
    setNotes(value);
    if (typeof window !== "undefined") {
      localStorage.setItem("dashboardNotes", value);
    }
  };

  useEffect(() => {
    setCallsPage(1);
    setHighlightCode(null);
  }, [searchTerm]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value.toLowerCase());
  };

  const handleSuggestionSelect = (value: string) => {
    if (!value.trim()) {
      setSearchTerm("");
      setCallsPage(1);
      setHighlightCode(null);
      return;
    }
    const lower = value.toLowerCase();
    setSearchTerm(lower);
    const index = queue.findIndex(
      (ticket) => ticket.patientName.toLowerCase() === lower,
    );
    if (index >= 0) {
      const page = Math.floor(index / CALLS_PAGE_SIZE) + 1;
      setCallsPage(page);
      setHighlightCode(queue[index].code);
    }
  };

  const filteredQueue = useMemo(() => {
    if (!searchTerm.trim()) {
      return queue;
    }
    return queue.filter((ticket) =>
      ticket.patientName.toLowerCase().includes(searchTerm),
    );
  }, [queue, searchTerm]);

  useEffect(() => {
    const currentCodes = filteredQueue.map((ticket) => ticket.code);
    if (highlightCode && !currentCodes.includes(highlightCode)) {
      setHighlightCode(null);
    }
  }, [filteredQueue, highlightCode]);

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [queueData, historyData] = await Promise.all([
        listTickets(),
        getTicketHistory(6),
      ]);
      setQueue(sortTicketsByPriority(queueData));
      setHistory(historyData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao carregar dados.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleCallNext = useCallback(async () => {
    setIsCalling(true);
    setError(null);
    try {
      for (const priority of PRIORITY_ORDER) {
        if (!queue.some((ticket) => ticket.priority === priority)) {
          continue;
        }
        const ticket = await callNextTicket(priority);
        if (ticket) {
          await fetchData();
          break;
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Falha ao chamar próxima senha.");
    } finally {
      setIsCalling(false);
    }
  }, [queue, fetchData]);

  const passwordCards: PasswordCardType[] = useMemo(
    () => [
      {
        type: "próxima",
        password: queue[0]?.code ?? "---",
        patientName: queue[0]?.patientName ?? "---",
      },
      {
        type: "última",
        password: history[0]?.code ?? "---",
        patientName: history[0]?.patientName ?? "---",
      },
      {
        type: "próxima",
        password: queue[1]?.code ?? "---",
        patientName: queue[1]?.patientName ?? "---",
      },
    ],
    [queue, history],
  );

  return (
    <div className="min-h-screen bg-[#F4F5F5] overflow-x-hidden w-full">
      <Header
        showSearch={true}
        onSearchChange={handleSearchChange}
        suggestions={queue.map((ticket) => ticket.patientName)}
        onSuggestionSelect={handleSuggestionSelect}
      />

      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div
          className="w-full"
          style={{
            paddingLeft: "135px",
            paddingRight: "135px",
            paddingBottom: "181px",
          }}
        >
          <div className="flex justify-between items-center" style={{ marginTop: "112px", marginBottom: "12px" }}>
            <div>
              <h1
                style={{
                  fontFamily: "Inter",
                  fontWeight: 600,
                  fontSize: "24px",
                  color: "#000000",
                }}
              >
                Painel de Atendimento
              </h1>
              {error && (
                <p style={{ fontFamily: "Inter", fontSize: "14px", color: "#EF4444", marginTop: "4px" }}>
                  {error}
                </p>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCallNext}
                disabled={isCalling || queue.length === 0}
                className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
                style={{ backgroundColor: "#186C79", fontFamily: "Inter", fontSize: "14px" }}
              >
                {isCalling ? "Chamando..." : "Chamar Senha"}
              </button>
              <button
                onClick={() => navigate("/triagem")}
                className="px-4 py-2 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
                style={{ backgroundColor: "#20CAD5", fontFamily: "Inter", fontSize: "14px" }}
              >
                Fazer Triagem
              </button>
            </div>
          </div>

          <div className="flex gap-4" style={{ marginTop: "30px" }}>
            <div className="flex flex-col" style={{ gap: "15px" }}>
              <div className="flex" style={{ gap: "16px" }}>
                {passwordCards.map((card, index) => (
                  <PasswordCard key={index} card={card} />
                ))}
              </div>

              <CallsPanel
                calls={filteredQueue}
                currentPage={callsPage}
                onPageChange={setCallsPage}
                highlightCode={highlightCode ?? undefined}
              />
              <div className="flex justify-end">
                <button
                  onClick={fetchData}
                  disabled={isLoading}
                  className="px-4 py-2 rounded-lg border border-[#20CAD5] text-[#20CAD5] font-medium hover:bg-[#E0FBFD] transition-colors disabled:opacity-50"
                  style={{ fontFamily: "Inter", fontSize: "14px", marginTop: "16px" }}
                >
                  {isLoading ? "Atualizando..." : "Atualizar chamadas"}
                </button>
              </div>
            </div>

            <div className="flex flex-col" style={{ gap: "16px" }}>
              <RoomStatusCard roomStatus={ROOM_STATUS} />

              <div
                className="bg-white rounded-lg p-4 shadow-sm flex flex-col"
                style={{ width: "411px", height: "290px" }}
              >
                <h2
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 600,
                    fontSize: "16px",
                    color: "#000000",
                    marginBottom: "12px",
                  }}
                >
                  Notas
                </h2>
                <textarea
                  placeholder="Escreva suas ideias..."
                  className="flex-1 resize-none border-none outline-none focus:outline-none"
                  style={{
                    fontFamily: "Inter",
                    fontWeight: 400,
                    fontSize: "14px",
                    color: "#999999",
                    backgroundColor: "transparent",
                  }}
                  value={notes}
                  onChange={(event) => handleNotesChange(event.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
