"use client";

import React, { useState, useEffect, useRef } from "react";

const RESUME_HREF = {
  cn: "/gejin1999.pdf",
  en: "/kertin.pdf",
} as const;

const typewriterData = {
  en: ["Frontend Architect", "AI Integration Expert", "Meituan Engineer"],
  cn: ["前端架构师", "AI 整合专家", "美团工程师"],
};

const i18nData = {
  en: {
    nav_brand: "admin",
    nav_exp: "Experience",
    nav_skills: "Skills",
    nav_contact: "Initialize",
    hero_boot: "System.boot()",
    hero_loaded: "Core modules loaded",
    hero_query: "Querying identity profile...",
    hero_hi: "Hi, I'm a",
    hero_desc:
      "Bridging the gap between cutting-edge AI models and exceptional user interfaces. Specializing in high-performance web applications and intelligent agent integrations.",
    hero_btn_repo: "View Git Graph",
    hero_btn_resume: "Resume.pdf",
    status_title: "Status",
    status_metrics: "System metrics nominal",
    skills_title: "Tech Stack & Capabilities",
    skill_frontend: "Frontend Core",
    skill_ai: "AI Integration",
    skill_arch: "Architecture",
    exp_title: "Experience Log",
    exp_view_all: "View Full Log",
    exp_job1_title: "Senior Frontend Engineer",
    exp_job1_desc:
      "Architected next-gen delivery tracking dashboard. Reduced initial load time by 40% using WASM and Rust integration.",
    exp_job2_title: "East China Normal University",
    exp_job2_period: "2017 - 2024",
    exp_job2_org: "@ Shanghai",
    exp_job2_desc:
      "Bachelor's and master's in computer-related majors. Strong CS fundamentals and engineering training.",
    footer_status: "System Status: ",
  },
  cn: {
    nav_brand: "管理员",
    nav_exp: "工作经历",
    nav_skills: "技能",
    nav_contact: "初始化",
    hero_boot: "系统.启动()",
    hero_loaded: "核心模块已加载",
    hero_query: "正在查询身份配置...",
    hero_hi: "你好，我是",
    hero_desc:
      "连接前沿AI模型与卓越用户界面的桥梁。专注于高性能Web应用和智能体（Agent）集成。",
    hero_btn_repo: "查看Git提交",
    hero_btn_resume: "个人简历.pdf",
    status_title: "状态",
    status_metrics: "系统指标正常",
    skills_title: "技术栈与能力",
    skill_frontend: "前端核心",
    skill_ai: "AI集成",
    skill_arch: "架构设计",
    exp_title: "经验日志",
    exp_view_all: "查看完整日志",
    exp_job1_title: "高级前端工程师",
    exp_job1_desc:
      "构建下一代外卖追踪仪表盘。通过WASM和Rust集成将初始加载时间缩短40%。",
    exp_job2_title: "华东师范大学",
    exp_job2_period: "2017 - 2024",
    exp_job2_org: "@ 上海",
    exp_job2_desc:
      "计算机相关专业本硕就读，具备扎实的专业基础与工程能力。",
    footer_status: "系统状态: ",
  },
};

const TypeWriter = ({ lang }: { lang: "en" | "cn" }) => {
  const [displayText, setDisplayText] = useState("");
  const stateRef = useRef({ isDeleting: false, txtIndex: 0, charIndex: 0 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    stateRef.current = { isDeleting: false, txtIndex: 0, charIndex: 0 };
    const resetTimer = setTimeout(() => setDisplayText(""), 0);

    const tick = () => {
      const { isDeleting, txtIndex, charIndex } = stateRef.current;
      const words = typewriterData[lang];
      const currentWord = words[txtIndex % words.length];
      let nextCharIndex = charIndex;
      let nextIsDeleting = isDeleting;
      let nextTxtIndex = txtIndex;
      let speed = 80;

      if (isDeleting) {
        nextCharIndex = charIndex - 1;
        speed = 40;
        setDisplayText(currentWord.substring(0, nextCharIndex));
      } else {
        nextCharIndex = charIndex + 1;
        speed = 80;
        setDisplayText(currentWord.substring(0, nextCharIndex));
      }

      if (!isDeleting && nextCharIndex === currentWord.length) {
        speed = 2000;
        nextIsDeleting = true;
      } else if (isDeleting && nextCharIndex === 0) {
        nextIsDeleting = false;
        nextTxtIndex = txtIndex + 1;
        speed = 500;
      }

      stateRef.current = {
        isDeleting: nextIsDeleting,
        txtIndex: nextTxtIndex,
        charIndex: nextCharIndex,
      };
      timerRef.current = setTimeout(tick, speed);
    };

    timerRef.current = setTimeout(tick, 300);
    return () => {
      clearTimeout(resetTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [lang]);

  return (
    <span className="flex items-center text-[#00f5ff] h-[1.2em]">
      <span>{displayText}</span>
      <span
        style={{
          display: "inline-block",
          width: "0.75rem",
          height: "0.8em",
          marginLeft: "0.25rem",
          position: "relative",
          top: "0.1em",
          backgroundColor: "#00f5ff",
          animation: "blink 1s step-end infinite",
        }}
      />
    </span>
  );
};

const SkillTag = ({ children, hoverColor }: { children: React.ReactNode; hoverColor: "cyan" | "purple" | "blue" }) => {
  const [hovered, setHovered] = useState(false);
  const colorMap = {
    cyan: { border: "rgba(0,245,255,0.5)", color: "#00f5ff" },
    purple: { border: "rgba(168,85,247,0.5)", color: "#a855f7" },
    blue: { border: "rgba(59,130,246,0.5)", color: "#3b82f6" },
  };
  const c = colorMap[hoverColor] || colorMap.cyan;
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-block",
        padding: "0.25rem 0.75rem",
        fontSize: "0.75rem",
        fontWeight: 500,
        borderRadius: "0.375rem",
        background: "rgba(255,255,255,0.05)",
        border: hovered ? `1px solid ${c.border}` : "1px solid rgba(255,255,255,0.1)",
        color: hovered ? c.color : undefined,
        cursor: "default",
        transition: "all 0.2s",
      }}
    >
      {children}
    </span>
  );
};

const App = () => {
  const [isDark, setIsDark] = useState(true);
  const [lang, setLang] = useState<"en" | "cn">("en");
  const t = i18nData[lang];

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500;600&family=Inter:wght@300;400;500;600;700&display=swap');
      @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
      @keyframes pulse-slow { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
      @keyframes float { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
      ::-webkit-scrollbar { width: 8px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: rgba(168, 85, 247, 0.2); border-radius: 4px; }
      ::-webkit-scrollbar-thumb:hover { background: rgba(168, 85, 247, 0.5); }
      .animate-blink { animation: blink 1s step-end infinite; }
      .animate-pulse-slow { animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      .animate-float { animation: float 6s ease-in-out infinite; }
      .text-gradient-cyber {
        background: linear-gradient(to right, #00f5ff, #3b82f6, #a855f7);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
      }
      .font-mono { font-family: 'Fira Code', 'JetBrains Mono', monospace; }
      .font-sans { font-family: 'Inter', system-ui, sans-serif; }
    `;
    document.head.appendChild(style);
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const bgStyle = isDark
    ? {
        backgroundColor: "#0a0a0f",
        color: "#e2e8f0",
        backgroundImage:
          "linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }
    : {
        backgroundColor: "#f8fafc",
        color: "#0f172a",
        backgroundImage:
          "linear-gradient(to right, rgba(0,0,0,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      };

  const navStyle = isDark
    ? {
        backgroundColor: "rgba(10,10,15,0.7)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }
    : {
        backgroundColor: "rgba(255,255,255,0.7)",
        borderBottom: "1px solid rgba(0,0,0,0.1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      };

  const cardBase = isDark
    ? {
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      }
    : {
        background: "rgba(0,0,0,0.03)",
        border: "1px solid rgba(0,0,0,0.1)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        transition: "all 0.3s cubic-bezier(0.4,0,0.2,1)",
      };

  const textMuted = isDark ? "#94a3b8" : "#64748b";
  const textMain = isDark ? "#ffffff" : "#0f172a";

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div
      style={{
        ...bgStyle,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "hidden",
        fontFamily: "Inter, system-ui, sans-serif",
      }}
    >
      <div
        style={{
          position: "fixed",
          borderRadius: "50%",
          filter: "blur(100px)",
          zIndex: 0,
          opacity: isDark ? 0.15 : 0.05,
          pointerEvents: "none",
          backgroundColor: "#00f5ff",
          width: 500,
          height: 500,
          top: -200,
          left: -100,
        }}
      ></div>
      <div
        style={{
          position: "fixed",
          borderRadius: "50%",
          filter: "blur(100px)",
          zIndex: 0,
          opacity: isDark ? 0.15 : 0.05,
          pointerEvents: "none",
          backgroundColor: "#a855f7",
          width: 600,
          height: 600,
          bottom: -200,
          right: -200,
        }}
      ></div>

      <nav
        style={{
          ...navStyle,
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 50,
          padding: "1rem 1.5rem",
        }}
      >
        <div
          style={{
            maxWidth: "80rem",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", cursor: "pointer" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                background: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#00f5ff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="4 7 4 4 20 4 20 7"></polyline>
                <line x1="9" y1="20" x2="15" y2="20"></line>
                <line x1="12" y1="4" x2="12" y2="20"></line>
              </svg>
            </div>
            <span
              style={{
                fontFamily: "Fira Code, monospace",
                fontWeight: 700,
                fontSize: "0.875rem",
                letterSpacing: "0.05em",
              }}
            >
              <span style={{ color: "#00f5ff" }}>sys</span>.{t.nav_brand}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "2rem", fontSize: "0.875rem", fontWeight: 500 }}>
            <button
              onClick={() => scrollTo("experience")}
              style={{ background: "none", border: "none", cursor: "pointer", color: textMuted, transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.color = "#00f5ff")}
              onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.color = textMuted)}
            >
              {t.nav_exp}
            </button>
            <button
              onClick={() => scrollTo("skills")}
              style={{ background: "none", border: "none", cursor: "pointer", color: textMuted, transition: "color 0.2s" }}
              onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.color = "#3b82f6")}
              onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.color = textMuted)}
            >
              {t.nav_skills}
            </button>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setLang((l) => (l === "en" ? "cn" : "en"))}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.75rem",
                fontFamily: "Fira Code, monospace",
                fontWeight: 700,
                padding: "0.375rem 0.75rem",
                borderRadius: "9999px",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                background: "none",
                cursor: "pointer",
                color: isDark ? "#e2e8f0" : "#0f172a",
                transition: "all 0.2s",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="2" y1="12" x2="22" y2="12"></line>
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
              </svg>
              {lang === "en" ? "EN" : "CN"}
            </button>

            <button
              onClick={() => setIsDark((d) => !d)}
              style={{
                padding: "0.5rem",
                borderRadius: "9999px",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                background: "none",
                cursor: "pointer",
                color: isDark ? "#e2e8f0" : "#0f172a",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 36,
                height: 36,
              }}
            >
              {isDark ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="5"></circle>
                  <line x1="12" y1="1" x2="12" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="23"></line>
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                  <line x1="1" y1="12" x2="3" y2="12"></line>
                  <line x1="21" y1="12" x2="23" y2="12"></line>
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                </svg>
              )}
            </button>

            <button
              onClick={() => scrollTo("contact")}
              style={{
                background: isDark ? "#ffffff" : "#0f172a",
                color: isDark ? "#000000" : "#ffffff",
                padding: "0.375rem 1rem",
                borderRadius: "9999px",
                fontSize: "0.875rem",
                fontWeight: 500,
                border: "none",
                cursor: "pointer",
                transition: "opacity 0.2s",
              }}
            >
              {t.nav_contact}
            </button>
          </div>
        </div>
      </nav>

      <main
        style={{
          flexGrow: 1,
          paddingTop: "7rem",
          paddingBottom: "5rem",
          paddingLeft: "1.5rem",
          paddingRight: "1.5rem",
          maxWidth: "80rem",
          margin: "0 auto",
          width: "100%",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "1.5rem",
        }}
      >
        <section style={{ ...cardBase, borderRadius: "1rem", overflow: "hidden" }}>
          <div
            style={{
              padding: "0.75rem 1rem",
              borderBottom: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
              background: isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(239,68,68,0.8)", border: "1px solid rgba(239,68,68,0.5)" }}></div>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(234,179,8,0.8)", border: "1px solid rgba(234,179,8,0.5)" }}></div>
              <div style={{ width: 12, height: 12, borderRadius: "50%", background: "rgba(34,197,94,0.8)", border: "1px solid rgba(34,197,94,0.5)" }}></div>
            </div>
            <div style={{ fontSize: "0.75rem", fontFamily: "Fira Code, monospace", color: textMuted, display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="4 17 10 11 4 5"></polyline>
                <line x1="12" y1="19" x2="20" y2="19"></line>
              </svg>
              bash - guest@portfolio:~
            </div>
            <div style={{ width: 48 }}></div>
          </div>

          <div style={{ padding: "2.5rem", fontFamily: "Fira Code, monospace", fontSize: "1rem", lineHeight: 1.75 }}>
            <p style={{ color: textMuted, marginBottom: "0.5rem" }}>&gt; {t.hero_boot}</p>
            <p style={{ color: isDark ? "#4ade80" : "#16a34a", marginBottom: "0.5rem" }}>&gt; [OK] {t.hero_loaded}</p>
            <p style={{ color: textMuted, marginBottom: "1.5rem" }}>&gt; {t.hero_query}</p>

            <h1
              style={{
                fontSize: "3rem",
                fontWeight: 700,
                fontFamily: "Inter, system-ui, sans-serif",
                letterSpacing: "-0.02em",
                marginBottom: "1rem",
                color: textMain,
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span>{t.hero_hi}</span>
              <TypeWriter lang={lang} />
            </h1>

            <p style={{ marginTop: "1.5rem", color: textMuted, maxWidth: "42rem", fontFamily: "Inter, system-ui, sans-serif", fontSize: "1.125rem" }}>
              {t.hero_desc}
            </p>

            <div style={{ marginTop: "2rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <button
                style={{
                  background: isDark ? "#ffffff" : "#0f172a",
                  color: isDark ? "#000000" : "#ffffff",
                  padding: "0.625rem 1.5rem",
                  borderRadius: "0.5rem",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontWeight: 500,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#00f5ff";
                  e.currentTarget.style.color = "#000";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = isDark ? "#ffffff" : "#0f172a";
                  e.currentTarget.style.color = isDark ? "#000" : "#fff";
                }}
              >
                {t.hero_btn_repo}
              </button>
              <a
                href={RESUME_HREF[lang]}
                download
                style={{
                  padding: "0.625rem 1.5rem",
                  borderRadius: "0.5rem",
                  fontFamily: "Inter, system-ui, sans-serif",
                  fontWeight: 500,
                  border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                  background: "none",
                  cursor: "pointer",
                  color: isDark ? "#e2e8f0" : "#0f172a",
                  transition: "all 0.2s",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  textDecoration: "none",
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                  <polyline points="7 10 12 15 17 10"></polyline>
                  <line x1="12" y1="15" x2="12" y2="3"></line>
                </svg>
                {t.hero_btn_resume}
              </a>
            </div>
          </div>
        </section>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1.5rem" }}>
          <div
            style={{
              ...cardBase,
              borderRadius: "1rem",
              padding: "1.5rem",
              gridColumn: "span 1",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
                <h3
                  style={{
                    fontSize: "0.75rem",
                    fontFamily: "Fira Code, monospace",
                    fontWeight: 700,
                    letterSpacing: "0.1em",
                    color: "#a855f7",
                    textTransform: "uppercase",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}
                >
                  <span
                    className="animate-pulse-slow"
                    style={{ width: 8, height: 8, borderRadius: "50%", background: "#a855f7", display: "inline-block" }}
                  ></span>
                  {t.status_title}
                </h3>
              </div>
              <div
                style={{
                  background: isDark ? "rgba(0,0,0,0.3)" : "rgba(0,0,0,0.05)",
                  borderRadius: "0.5rem",
                  padding: "0.75rem",
                  border: isDark ? "1px solid rgba(255,255,255,0.05)" : "1px solid rgba(0,0,0,0.1)",
                  fontFamily: "Fira Code, monospace",
                  fontSize: "0.75rem",
                }}
              >
                <p style={{ color: textMuted, marginBottom: "0.25rem" }}>Last commit:</p>
                <p style={{ color: textMain, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  feat: integrate local LLM inference engine
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.75rem" }}>
                  <span style={{ color: "#94a3b8" }}>2 hrs ago</span>
                  <span
                    style={{
                      color: "#00f5ff",
                      background: "rgba(0,245,255,0.1)",
                      padding: "0.125rem 0.5rem",
                      borderRadius: "0.25rem",
                      fontSize: "0.625rem",
                    }}
                  >
                    hash: a9f8b4c
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                marginTop: "1rem",
                paddingTop: "1rem",
                borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: textMuted }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20v-6M6 20V10M18 20V4"></path>
                </svg>
                {t.status_metrics}
              </div>
            </div>
          </div>

          <div id="skills" style={{ ...cardBase, borderRadius: "1rem", padding: "1.5rem", gridColumn: "span 3" }}>
            <h3 style={{ fontSize: "0.75rem", fontFamily: "Fira Code, monospace", fontWeight: 700, letterSpacing: "0.1em", color: "#00f5ff", textTransform: "uppercase", marginBottom: "1.5rem" }}>
              {t.skills_title}
            </h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1.5rem" }}>
              <div>
                <h4 style={{ fontSize: "0.875rem", fontWeight: 500, color: isDark ? "#cbd5e1" : "#374151", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#00f5ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6"></polyline>
                    <polyline points="8 6 2 12 8 18"></polyline>
                  </svg>
                  {t.skill_frontend}
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["React/Next.js", "Vue 3/Nuxt", "TypeScript", "Tailwind CSS", "WebGL/Three.js"].map((s) => (
                    <SkillTag key={s} hoverColor="cyan">
                      {s}
                    </SkillTag>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: "0.875rem", fontWeight: 500, color: isDark ? "#cbd5e1" : "#374151", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a855f7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2v20"></path>
                    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
                  </svg>
                  {t.skill_ai}
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["OpenAI API", "LangChain.js", "Hugging Face", "Vector DBs (Pinecone)"].map((s) => (
                    <SkillTag key={s} hoverColor="purple">
                      {s}
                    </SkillTag>
                  ))}
                </div>
              </div>
              <div>
                <h4 style={{ fontSize: "0.875rem", fontWeight: 500, color: isDark ? "#cbd5e1" : "#374151", marginBottom: "0.75rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                  </svg>
                  {t.skill_arch}
                </h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["Micro-frontends", "CI/CD Pipelines", "Performance Tuning", "System Design"].map((s) => (
                    <SkillTag key={s} hoverColor="blue">
                      {s}
                    </SkillTag>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div id="experience" style={{ ...cardBase, borderRadius: "1rem", padding: "1.5rem", gridColumn: "span 4" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
              <h3 style={{ fontSize: "0.75rem", fontFamily: "Fira Code, monospace", fontWeight: 700, letterSpacing: "0.1em", color: "#3b82f6", textTransform: "uppercase" }}>
                {t.exp_title}
              </h3>
              <a
                href="#"
                style={{ fontSize: "0.75rem", color: textMuted, display: "flex", alignItems: "center", gap: "0.25rem", textDecoration: "none", transition: "color 0.2s" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
                onMouseLeave={(e) => (e.currentTarget.style.color = textMuted)}
              >
                {t.exp_view_all}
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>

            <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              <div style={{ position: "absolute", left: 5, top: 0, bottom: 0, width: 2, background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.1), transparent)" }}></div>

              <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "1.5rem", paddingLeft: "1.5rem" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 4,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    border: "1px solid #3b82f6",
                    background: isDark ? "#0a0a0f" : "#f8fafc",
                    boxShadow: "0 0 10px rgba(59,130,246,0.8)",
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                ></div>
                <div
                  style={{
                    flex: 1,
                    padding: "1rem",
                    borderRadius: "0.75rem",
                    border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
                    background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                    <h4 style={{ fontWeight: 700, color: textMain, fontSize: "0.875rem" }}>{t.exp_job1_title}</h4>
                    <span style={{ fontSize: "0.625rem", fontFamily: "Fira Code, monospace", color: "#3b82f6", background: "rgba(59,130,246,0.1)", padding: "0.125rem 0.375rem", borderRadius: "0.25rem" }}>2024 - Present</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: textMuted, marginBottom: "0.5rem", fontFamily: "Fira Code, monospace" }}>@ Meituan</p>
                  <p style={{ fontSize: "0.75rem", color: textMuted, lineHeight: 1.6 }}>{t.exp_job1_desc}</p>
                </div>
              </div>

              <div style={{ position: "relative", display: "flex", alignItems: "flex-start", gap: "1.5rem", paddingLeft: "1.5rem" }}>
                <div
                  style={{
                    position: "absolute",
                    left: 0,
                    top: 4,
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    border: "1px solid #64748b",
                    background: isDark ? "#0a0a0f" : "#f8fafc",
                    flexShrink: 0,
                    zIndex: 1,
                    transition: "border-color 0.2s",
                  }}
                ></div>
                <div
                  style={{ flex: 1, padding: "1rem", borderRadius: "0.75rem", border: "1px solid transparent", transition: "border-color 0.2s" }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)")}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = "transparent")}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.25rem" }}>
                    <h4 style={{ fontWeight: 700, color: isDark ? "#cbd5e1" : "#374151", fontSize: "0.875rem" }}>{t.exp_job2_title}</h4>
                    <span style={{ fontSize: "0.625rem", fontFamily: "Fira Code, monospace", color: textMuted }}>{t.exp_job2_period}</span>
                  </div>
                  <p style={{ fontSize: "0.75rem", color: textMuted, marginBottom: "0.5rem", fontFamily: "Fira Code, monospace" }}>{t.exp_job2_org}</p>
                  <p style={{ fontSize: "0.75rem", color: textMuted, lineHeight: 1.6 }}>{t.exp_job2_desc}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer
        style={{
          borderTop: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.1)",
          background: isDark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          padding: "2rem 0",
          zIndex: 10,
        }}
      >
        <div style={{ maxWidth: "80rem", margin: "0 auto", padding: "0 1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", color: textMuted, fontFamily: "Fira Code, monospace" }}>
            <span style={{ color: "#00f5ff" }}>sys</span>.admin © 2026
          </div>
          <div style={{ fontSize: "0.75rem", color: textMuted, fontFamily: "Fira Code, monospace" }}>
            {t.footer_status}
            <span style={{ color: "#22c55e" }}>Online</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
