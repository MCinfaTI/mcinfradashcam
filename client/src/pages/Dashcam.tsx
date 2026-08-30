// Direção Infra Pulse: neo-industrial digital, contraste profundo, verde de ação e narrativa assimétrica orientada à conversão.
import { useState } from "react";
import { ArrowDownRight, ArrowRight, Check, ChevronDown, CircleDot, Clock3, Cpu, Gauge, Menu, ShieldCheck, Sparkles, Wrench, X } from "lucide-react";

const heroImage = "/manus-storage/mcinfra-dashcam-hero_8a820a85.jpg";
const installImage = "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=1200&q=85";
const roadImage = "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=1400&q=85";
const logoImage = "/escudoico.png";

const waMessage = encodeURIComponent("Olá, quero receber uma recomendação de Dash Cam para o meu veículo.");
const contactHref = `https://wa.me/?text=${waMessage}`;

const benefits = [
  { icon: ShieldCheck, label: "Mais segurança", text: "Registre o que acontece à frente — no trânsito, no estacionamento e em cada trajeto." },
  { icon: CircleDot, label: "Evidência quando importa", text: "Imagens organizadas ajudam a esclarecer incidentes e proteger a sua versão dos fatos." },
  { icon: Cpu, label: "Tecnologia bem configurada", text: "A câmera é ajustada para o seu uso, com gravação, data, hora e recursos explicados sem complicação." },
  { icon: Wrench, label: "Acabamento profissional", text: "Instalação discreta, cabos protegidos e integração pensada para não comprometer o interior do carro." },
];

const useCases = [
  ["01", "Uso urbano", "Para quem passa horas no trânsito e quer dirigir com mais tranquilidade, todos os dias."],
  ["02", "Viagens e estrada", "Uma camada extra de proteção para registrar paisagens, imprevistos e longos percursos."],
  ["03", "Frotas e trabalho", "Mais visibilidade para veículos de serviço, entregas e operações que não podem parar."],
];

const steps = [
  ["01", "Entendemos o seu uso", "Você conta como dirige, qual é o veículo e o que deseja proteger."],
  ["02", "Indicamos a solução", "Recomendamos a câmera e os recursos adequados, sem empurrar tecnologia que você não precisa."],
  ["03", "Instalamos com cuidado", "A equipe faz a montagem discreta, organiza os cabos e preserva o acabamento do veículo."],
  ["04", "Configuramos com você", "Saia sabendo usar a câmera, acessar os arquivos e aproveitar os recursos instalados."],
];

export default function Dashcam() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [sent, setSent] = useState(false);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main className="site-shell">
      <header className="topbar">
        <div className="nav-wrap">
          <button className="brand" onClick={() => scrollTo("top")} aria-label="MC Infra TI, voltar ao topo">
            <img src={logoImage} alt="" />
            <span><strong>MC infra</strong><em>TI</em></span>
          </button>
          <nav className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Navegação principal">
            <button onClick={() => scrollTo("beneficios")}>Benefícios</button>
            <button onClick={() => scrollTo("solucoes")}>Soluções</button>
            <button onClick={() => scrollTo("processo")}>Como funciona</button>
            <button onClick={() => scrollTo("duvidas")}>Dúvidas</button>
            <button className="nav-cta" onClick={() => scrollTo("orcamento")}>Quero minha Dash Cam <ArrowRight size={15} /></button>
          </nav>
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <section id="top" className="hero" style={{ backgroundImage: `linear-gradient(90deg, rgba(2,5,5,.98) 0%, rgba(2,5,5,.87) 35%, rgba(2,5,5,.18) 72%, rgba(2,5,5,.48) 100%), url(${heroImage})` }}>
        <div className="hero-grid">
          <div className="hero-copy">
            <div className="eyebrow"><span className="rec-dot" /> SERVIÇO MC INFRA TI <span className="eyebrow-line" /> DASH CAM</div>
            <h1>Sua direção merece <span>uma testemunha.</span></h1>
            <p className="hero-lead">Venda, instalação e configuração de Dash Cam para você dirigir com mais segurança, clareza e tranquilidade — sem fios aparentes e sem complicação.</p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => scrollTo("orcamento")}>Encontrar a câmera ideal <ArrowRight size={18} /></button>
              <button className="btn btn-quiet" onClick={() => scrollTo("processo")}>Ver como funciona <ArrowDownRight size={18} /></button>
            </div>
            <div className="hero-proof"><span><Check size={14} /> Atendimento personalizado</span><span><Check size={14} /> Instalação discreta</span><span><Check size={14} /> Configuração completa</span></div>
          </div>
          <div className="hero-data" aria-label="Destaques do serviço">
            <div className="data-card"><span>STATUS DO SERVIÇO</span><strong><i /> PRONTO PARA PROTEGER</strong><small>Da escolha ao primeiro trajeto.</small></div>
            <div className="data-card data-card-offset"><span>CONFIGURAÇÃO MC INFRA</span><strong>FEITA PARA VOCÊ</strong><small>Recursos explicados em linguagem simples.</small></div>
          </div>
        </div>
        <div className="hero-scroll">DESÇA PARA VER <ArrowDownRight size={16} /></div>
      </section>

      <section id="beneficios" className="section benefits-section">
        <div className="section-kicker">01 / POR QUE INSTALAR <span className="tech-marker">GPS / REC / 24H</span></div>
        <div className="section-intro"><h2>Não é só uma câmera.<br /><span>É mais controle</span> sobre o caminho.</h2><p>Uma Dash Cam registra o que os seus olhos nem sempre conseguem guardar. A MC Infra transforma esse equipamento em uma solução pronta para a sua rotina, com escolha técnica e instalação feita do jeito certo.</p></div>
        <div className="benefit-grid">{benefits.map(({ icon: Icon, label, text }, index) => <article className="benefit-card" key={label}><div className="benefit-number">0{index + 1}</div><Icon className="benefit-icon" size={25} strokeWidth={1.6} /><h3>{label}</h3><p>{text}</p></article>)}</div>
      </section>

      <section className="split-feature">
        <div className="feature-image" style={{ backgroundImage: `linear-gradient(180deg, transparent 35%, rgba(2,5,5,.72)), url(${installImage})` }}><span className="image-tag">INSTALAÇÃO / 001</span><div className="image-caption">O detalhe que você não vê<br /><strong>é o que mostra nosso cuidado.</strong></div></div>
        <div className="feature-copy"><div className="section-kicker">PRECISÃO NO ACABAMENTO <span className="tech-marker blue">INSTALL / SECURE</span></div><h2>Instalada para parecer parte do seu carro.</h2><p>Uma boa Dash Cam não deve chamar atenção pelo fio pendurado. A equipe MC Infra trabalha com montagem discreta, passagem protegida e posicionamento que respeita a visibilidade do motorista.</p><ul className="check-list"><li><Check size={17} /> Cabos organizados e escondidos</li><li><Check size={17} /> Posicionamento seguro no para-brisa</li><li><Check size={17} /> Orientação sobre uso e arquivos</li></ul><div className="service-seal"><ShieldCheck size={18} /><span><strong>INSTALAÇÃO MC INFRA</strong><small>ACABAMENTO DISCRETO · CONFIGURAÇÃO INCLUSA</small></span></div><button className="text-link" onClick={() => scrollTo("orcamento")}>Quero instalar com a MC Infra <ArrowRight size={17} /></button></div>
      </section>

      <section id="solucoes" className="section solutions-section"><div className="section-kicker">02 / FEITA PARA SUA ROTINA <span className="tech-marker blue">ROUTE / 002</span></div><div className="section-intro"><h2>Proteção que acompanha<br /><span>o seu jeito de dirigir.</span></h2><p>Conte para a gente como você usa o veículo. A recomendação parte da sua realidade — e não de uma lista genérica de especificações.</p></div><div className="use-case-list">{useCases.map(([num, title, text]) => <article className="use-case" key={num}><span>{num}</span><div><h3>{title}</h3><p>{text}</p></div><ArrowUpRightIcon /></article>)}</div></section>

      <section id="processo" className="process-section"><div className="process-inner"><div className="section-kicker">03 / DO PRIMEIRO CONTATO À ESTRADA <span className="tech-marker">SERVICE FLOW / 04</span></div><div className="process-head"><h2>Sem adivinhação.<br /><span>Sem improviso.</span></h2><p>Você recebe uma solução clara, instalada com cuidado e explicada de um jeito que faz sentido.</p></div><div className="steps-grid">{steps.map(([num, title, text]) => <article className="step" key={num}><span className="step-num">{num}</span><div className="step-line" /><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>

      <section className="road-feature"><div className="road-image" style={{ backgroundImage: `linear-gradient(90deg, rgba(2,5,5,.22), rgba(2,5,5,.08)), url(${roadImage})` }} /><div className="road-copy"><div className="section-kicker">CONFIGURAÇÃO MC INFRA <span className="tech-marker blue">GPS / SUPPORT</span></div><h2>Você não precisa ser especialista em tecnologia.</h2><p>Depois da instalação, mostramos como acessar as gravações, entender os recursos e tirar o melhor proveito do equipamento. Tecnologia boa é a que fica simples depois que alguém explica.</p><div className="mini-specs"><span><Clock3 size={18} /> Orientação no final</span><span><Gauge size={18} /> Ajuste ao seu uso</span></div></div></section>

      <section id="duvidas" className="section faq-section"><div className="faq-intro"><div className="section-kicker">04 / AINDA COM DÚVIDAS?</div><h2>Vamos deixar a decisão <span>mais simples.</span></h2><p>Se você não sabe qual modelo escolher, tudo bem. O primeiro passo é conversar sobre o seu carro e a sua rotina.</p><a href={contactHref} target="_blank" rel="noreferrer" className="text-link">Falar com um especialista <ArrowRight size={17} /></a></div><div className="faq-list">{["Qual Dash Cam é indicada para o meu carro?", "A instalação deixa fios aparentes?", "Vocês explicam como usar depois da instalação?", "Posso instalar em veículo de trabalho ou frota?"].map((question, index) => <div className={openFaq === index ? "faq-item is-open" : "faq-item"} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)}><span>{question}</span><ChevronDown size={18} /></button>{openFaq === index && <p>{index === 0 ? "A indicação depende do seu uso, do veículo e dos recursos que fazem sentido para você. A MC Infra orienta a escolha antes da instalação." : index === 1 ? "A proposta é justamente manter o acabamento limpo: os cabos são organizados e direcionados de forma discreta." : index === 2 ? "Sim. A configuração faz parte do serviço e você recebe uma explicação prática sobre os principais recursos e arquivos." : "Sim. A solução pode ser pensada para veículos de trabalho, entregas e pequenas frotas, conforme a necessidade da operação."}</p>}</div>)}</div></section>

      <section id="orcamento" className="quote-section"><div className="quote-glow" /><div className="quote-content"><div className="section-kicker">05 / PRÓXIMO TRAJETO <span className="tech-marker">CHECKPOINT / READY</span></div><h2>Escolha a câmera.<br /><span>A MC Infra cuida do resto.</span></h2><p>Conte o modelo do seu veículo e como você pretende usar a Dash Cam. A gente retorna com uma recomendação objetiva e o próximo passo para instalar.</p><div className="checkpoint-label"><span className="rec-dot" /> CHECKPOINT DE ATENDIMENTO <span>MC INFRA TI</span></div><form onSubmit={handleSubmit} className="quote-form"><input required aria-label="Seu nome" placeholder="Seu nome" /><input required type="text" aria-label="Seu veículo" placeholder="Modelo do veículo" /><button type="submit" className="btn btn-primary">Quero receber uma recomendação <ArrowRight size={18} /></button></form>{sent && <div className="form-success"><Check size={17} /> Solicitação registrada nesta demonstração. Para atendimento real, use o botão de WhatsApp.</div>}<a className="whatsapp-link" href={contactHref} target="_blank" rel="noreferrer">Ou chame pelo WhatsApp <ArrowUpRightIcon /></a></div></section>

      <footer className="footer"><div><div className="footer-brand"><img src={logoImage} alt="" /><span><strong>MC infra</strong><em>TI</em></span></div><p>Infraestrutura, tecnologia e proteção para o seu próximo trajeto.</p></div><div className="footer-meta"><span>MC INFRA TI / DASH CAM</span><span>© 2026 MC Infra TI</span></div></footer>
    </main>
  );
}

function ArrowUpRightIcon() { return <ArrowRight size={19} className="arrow-up" />; }
