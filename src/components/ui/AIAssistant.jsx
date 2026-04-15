import { useState, useRef, useEffect } from "react";
import { aiAssistantQA, bio } from "../../data/portfolio";

const GREETING = `Hello! I'm an AI assistant for ${bio.name.split(" ")[0]}'s portfolio. Ask me anything! 👋`;

export default function AIAssistant() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "ai", text: GREETING }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const findAnswer = (query) => {
    const q = query.toLowerCase();
    for (const qa of aiAssistantQA) {
      const keywords = qa.q.toLowerCase().split(" ");
      if (keywords.some((kw) => kw.length > 3 && q.includes(kw))) {
        return qa.a;
      }
    }
    return "I'm not sure about that — but feel free to reach out directly via the Contact section! 🚀";
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((m) => [...m, { from: "user", text: userMsg }]);
    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { from: "ai", text: findAnswer(userMsg) }]);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* Floating trigger button */}
      <button
        id="ai-assistant-btn"
        onClick={() => setOpen((o) => !o)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-2xl transition-all duration-300"
        style={{
          background: "linear-gradient(135deg, #7b2fff, #00f5ff)",
          boxShadow: open
            ? "0 0 0 3px rgba(0,245,255,0.3), 0 0 30px rgba(0,245,255,0.4)"
            : "0 0 20px rgba(123,47,255,0.5)",
          transform: open ? "rotate(10deg) scale(1.05)" : "scale(1)",
        }}
        aria-label="Open AI Assistant"
      >
        {open ? "✕" : "🤖"}
      </button>

      {/* Chat panel */}
      {open && (
        <div
          id="ai-assistant-panel"
          className="fixed bottom-24 left-6 z-50 w-80 glass-panel flex flex-col overflow-hidden"
          style={{
            borderColor: "rgba(123,47,255,0.5)",
            boxShadow: "0 0 30px rgba(123,47,255,0.3)",
            height: "400px",
            animation: "fade-in-up 0.3s ease",
          }}
        >
          {/* Header */}
          <div
            className="p-4 flex items-center gap-3 border-b"
            style={{ borderColor: "rgba(123,47,255,0.3)" }}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm"
              style={{
                background: "linear-gradient(135deg, #7b2fff, #00f5ff)",
                boxShadow: "0 0 10px rgba(123,47,255,0.5)",
              }}
            >
              🤖
            </div>
            <div>
              <div className="font-orbitron text-xs font-bold" style={{ color: "var(--neon-violet)" }}>
                AI Assistant
              </div>
              <div className="text-xs" style={{ color: "var(--text-secondary)" }}>
                Ask about Devi Prasad
              </div>
            </div>
            <div
              className="ml-auto w-2 h-2 rounded-full"
              style={{ background: "var(--neon-green)", boxShadow: "0 0 6px var(--neon-green)" }}
            />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className="max-w-[80%] text-xs leading-5 px-3 py-2 rounded-2xl"
                  style={{
                    background:
                      msg.from === "user"
                        ? "linear-gradient(135deg, rgba(123,47,255,0.5), rgba(0,245,255,0.3))"
                        : "rgba(255,255,255,0.06)",
                    color: "var(--text-primary)",
                    borderRadius:
                      msg.from === "user"
                        ? "18px 18px 4px 18px"
                        : "18px 18px 18px 4px",
                    border: msg.from === "ai" ? "1px solid rgba(123,47,255,0.2)" : "none",
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div
                  className="px-3 py-2 rounded-2xl text-xs"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(123,47,255,0.2)",
                    borderRadius: "18px 18px 18px 4px",
                    color: "var(--neon-violet)",
                  }}
                >
                  ···
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Suggested Qs */}
          <div className="px-3 pb-1 flex flex-wrap gap-1">
            {aiAssistantQA.slice(0, 3).map((qa) => (
              <button
                key={qa.q}
                onClick={() => {
                  setInput(qa.q);
                  setTimeout(() => handleSend(), 50);
                }}
                className="text-xs px-2 py-1 rounded-full transition-colors"
                style={{
                  border: "1px solid rgba(123,47,255,0.3)",
                  color: "var(--neon-violet)",
                  background: "rgba(123,47,255,0.1)",
                  fontSize: "0.6rem",
                }}
              >
                {qa.q}
              </button>
            ))}
          </div>

          {/* Input */}
          <div
            className="p-3 border-t flex gap-2"
            style={{ borderColor: "rgba(123,47,255,0.3)" }}
          >
            <input
              id="ai-assistant-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Ask something..."
              className="flex-1 bg-transparent text-xs outline-none"
              style={{ color: "var(--text-primary)" }}
            />
            <button
              onClick={handleSend}
              id="ai-assistant-send"
              className="text-xs px-3 py-1 rounded"
              style={{
                background: "linear-gradient(135deg, #7b2fff, #00f5ff)",
                color: "#000",
                fontFamily: "var(--font-heading)",
                fontWeight: "700",
              }}
            >
              ▶
            </button>
          </div>
        </div>
      )}
    </>
  );
}
