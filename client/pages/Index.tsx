import { useState } from "react";
import {
  Activity,
  Archive as ArchiveIcon,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  CalendarDays,
  ChevronDown,
  ClipboardList,
  Download,
  FileHeart,
  FilePlus2,
  Filter,
  HeartPulse,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  PlayCircle,
  Plus,
  Search,
  Settings2,
  ShieldCheck,
  SlidersHorizontal,
  Stethoscope,
  UserRound,
  UsersRound,
  X,
} from "lucide-react";

type Tab = "overview" | "assessment" | "dynamics" | "archive";

const patients = [
  { id: "10410/2020", name: "Алексей Морозов", date: "13.03.2020", score: "2.61", status: "Высокая" },
  { id: "10413/2019", name: "Ирина Волкова", date: "23.04.2019", score: "2.29", status: "Средняя" },
  { id: "14951/2020", name: "Михаил Тауб", date: "15.07.2020", score: "1.57", status: "Низкая" },
];

const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Рабочий стол", icon: LayoutDashboard },
  { id: "assessment", label: "Экспертная оценка", icon: ShieldCheck },
  { id: "dynamics", label: "Динамика", icon: Activity },
  { id: "archive", label: "Архив пациентов", icon: ArchiveIcon },
];

function Metric({ label, value, unit, trend }: { label: string; value: string; unit?: string; trend?: "up" | "down" }) {
  return (
    <div className="metric-card">
      <span className="metric-label">{label}</span>
      <div className="metric-value">{value} <small>{unit}</small></div>
      {trend && <span className={trend === "up" ? "trend trend-up" : "trend trend-down"}>{trend === "up" ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />} {trend === "up" ? "12%" : "8%"} за неделю</span>}
    </div>
  );
}

function Field({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className="field"><span>{label}</span><div className={accent ? "field-value accent" : "field-value"}>{value}<ChevronDown size={14} /></div></div>;
}

function Overview({ onAssessment }: { onAssessment: () => void }) {
  const [openSection, setOpenSection] = useState("Клинический анализ крови");
  const toggle = (name: string) => setOpenSection(openSection === name ? "" : name);
  return (
    <div className="workspace-grid">
      <section className="content-column">
        <div className="section-heading">
          <div><p className="eyebrow">Активная история</p><h1>Данные пациента</h1><p className="muted">Заполните показатели для актуальной оценки состояния</p></div>
          <button className="icon-button" aria-label="Настройки"><Settings2 size={18} /></button>
        </div>
        <div className="patient-summary card">
          <div className="patient-avatar">АМ</div><div className="patient-copy"><span className="patient-name">Алексей Морозов</span><span className="muted">Идентификатор 10410/2020 · 82 года</span></div>
          <span className="status-pill status-amber"><span className="status-dot" /> Требует внимания</span><button className="more-button"><MoreHorizontal size={19} /></button>
        </div>
        <div className="card form-card">
          <div className="card-title-row"><div><h2>Основные сведения</h2><p className="muted">Данные осмотра от 13 марта 2020</p></div><span className="saved-label"><span className="saved-dot" /> Автосохранение</span></div>
          <div className="fields-grid"><Field label="Дата анализа" value="13.03.2020" /><Field label="Возраст" value="82 года" /><Field label="Температура" value="38.8 °C" accent /><Field label="Пол" value="Мужской" /><Field label="Период до ППУ" value="Нет" /><Field label="Внутри живота" value="Нет" /></div>
        </div>
        <div className="card accordion-card">
          {[
            { name: "Клинический анализ крови", desc: "9 показателей", values: ["Эритроциты|2.12", "Тромбоциты|312", "Гемоглобин|74", "Лейкоциты|35.63"] },
            { name: "Показатели биохимии крови", desc: "10 показателей", values: ["Амилаза|110", "АСТ|45.1", "Билирубин общий|130", "Глюкоза|3.9"] },
            { name: "Показатели УЗИ", desc: "6 показателей", values: ["Размер головки|3.3 см", "Размер тела|2.5 см", "Размер хвоста|3.2 см"] },
          ].map((section) => <div className="accordion-section" key={section.name}><button className="accordion-trigger" onClick={() => toggle(section.name)}><span><span className="section-icon"><ClipboardList size={15} /></span>{section.name}<small>{section.desc}</small></span><ChevronDown className={openSection === section.name ? "rotate" : ""} size={17} /></button>{openSection === section.name && <div className="accordion-content">{section.values.map((item) => { const [label, value] = item.split("|"); return <div className="mini-field" key={label}><span>{label}</span><strong>{value}</strong></div>; })}</div>}</div>)}
        </div>
        <div className="action-row"><button className="button secondary"><FilePlus2 size={16} /> Сохранить черновик</button><button className="button primary" onClick={onAssessment}>Рассчитать тяжесть <ArrowUpRight size={16} /></button></div>
      </section>
      <aside className="insight-column">
        <div className="insight-header"><div><p className="eyebrow">Результат модели</p><h2>Прогноз тяжести</h2></div><span className="live-badge"><span /> LIVE</span></div>
        <div className="score-card"><div className="score-ring"><strong>2.61</strong><span>из 3.0</span></div><div><span className="muted">Итоговая оценка</span><h3>Тяжёлое течение</h3><p>Нужен контроль показателей в динамике</p></div></div>
        <div className="model-list"><div className="list-label"><span>РЕГРЕССИОННАЯ ОЦЕНКА</span><span>БАЛЛ</span></div>{["Модель 1", "Модель 2", "Модель 3"].map((model, i) => <div className="model-row" key={model}><span>{model}</span><b>{["2.29", "2.61", "2.48"][i]}</b><div className="bar"><i style={{ width: `${[72, 88, 80][i]}%` }} /></div></div>)}</div>
        <div className="recommendations"><h3>Рекомендации</h3>{[["Маршрут", "ОРИТ"], ["Операция", "Не требуется"], ["Протокол лечения", "Интенсивный"], ["Частота мониторинга", "Каждые 4 ч"]].map(([label, value]) => <div className="recommendation" key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
        <button className="text-button" onClick={onAssessment}>Открыть экспертную оценку <ArrowUpRight size={15} /></button>
      </aside>
    </div>
  );
}

function Assessment() {
  return <div className="assessment-page"><div className="section-heading"><div><p className="eyebrow">Экспертная система</p><h1>Оценка тяжести состояния</h1><p className="muted">Проверьте ключевые факторы и сформируйте заключение</p></div><button className="button primary"><Download size={16} /> Экспорт отчёта</button></div><div className="assessment-layout"><div className="card checklist"><div className="card-title-row"><div><h2>Критерии оценки</h2><p className="muted">На основании данных пациента 10410/2020</p></div><span className="complete-label">3 из 4 заполнено</span></div>{[["Температура тела", "38.8 °C", true], ["Системная воспалительная реакция", "Выраженная", true], ["Полиорганная недостаточность", "Не выявлена", false], ["Результаты УЗИ", "Есть изменения", true]].map(([label, value, selected]) => <div className="check-item" key={label as string}><div className={selected ? "check-icon checked" : "check-icon"}>{selected ? "✓" : "–"}</div><div><strong>{label}</strong><span>{value}</span></div><ChevronDown size={15} /></div>)}</div><div className="card conclusion"><p className="eyebrow">Заключение модели</p><div className="large-score">2.61 <span>/ 3.0</span></div><div className="severity-band"><div className="severity-marker" style={{ left: "83%" }} /><span>Низкая</span><span>Средняя</span><span>Высокая</span></div><h2>Высокая степень тяжести</h2><p className="muted">Рекомендуется наблюдение в палате интенсивной терапии и повторная оценка через 4 часа.</p><button className="button primary full">Подтвердить оценку</button></div></div></div>;
}

function Dynamics() {
  return <div className="dynamics-page"><div className="section-heading"><div><p className="eyebrow">История пациента</p><h1>Динамика состояния</h1><p className="muted">Сравнение показателей по датам наблюдения</p></div><div className="patient-select"><Search size={16} /><span>10410/2020 — Алексей Морозов</span><ChevronDown size={15} /></div></div><div className="card chart-card"><div className="card-title-row"><div><h2>Индекс тяжести</h2><p className="muted">Последние 30 дней</p></div><div className="legend"><span className="legend-dot teal" /> Итоговая оценка <span className="legend-dot coral" /> Модель 1</div></div><div className="chart"><div className="y-axis"><span>3.0</span><span>2.5</span><span>2.0</span><span>1.5</span><span>1.0</span></div><div className="chart-area"><div className="chart-band high" /><div className="chart-band medium" /><div className="chart-band low" /><svg viewBox="0 0 760 270" preserveAspectRatio="none"><polyline points="0,155 180,120 360,92 540,112 740,70" fill="none" stroke="#089e91" strokeWidth="4" /><polyline points="0,172 180,130 360,142 540,124 740,145" fill="none" stroke="#f07d72" strokeWidth="3" strokeDasharray="7 5" />{["0,155", "180,120", "360,92", "540,112", "740,70"].map((point) => { const [cx, cy] = point.split(","); return <circle key={point} cx={cx} cy={cy} r="6" fill="white" stroke="#089e91" strokeWidth="3" />; })}</svg><div className="x-axis"><span>13 марта</span><span>20 марта</span><span>27 марта</span><span>03 апр.</span><span>10 апр.</span></div></div></div><div className="chart-footer"><span><CalendarDays size={15} /> Обновлено сегодня, 09:42</span><button className="text-button"><Download size={15} /> Сохранить в файл</button></div></div></div>;
}

function Archive() {
  return <div className="archive-page"><div className="section-heading"><div><p className="eyebrow">Медицинский архив</p><h1>Пациенты</h1><p className="muted">24 активные медицинские истории</p></div><button className="button primary"><Plus size={17} /> Новая история</button></div><div className="toolbar"><div className="search-box"><Search size={17} /><input placeholder="Поиск по ФИО или идентификатору" /></div><button className="filter-button"><Filter size={16} /> Фильтры <span className="filter-count">2</span></button><button className="filter-button"><SlidersHorizontal size={16} /> Настроить вид</button></div><div className="card table-card"><div className="table-wrap"><table><thead><tr><th>Пациент</th><th>Идентификатор</th><th>Дата анализа</th><th>Тяжесть</th><th>Врач</th><th>Статус</th><th /></tr></thead><tbody>{patients.map((patient) => <tr key={patient.id}><td><div className="table-patient"><span>{patient.name.split(" ").map((word) => word[0]).join("")}</span><strong>{patient.name}</strong></div></td><td className="mono">{patient.id}</td><td>{patient.date}</td><td><b className={patient.status === "Высокая" ? "score high-score" : "score"}>{patient.score}</b></td><td>Е. Мангальова</td><td><span className={patient.status === "Высокая" ? "status-pill status-amber" : "status-pill status-green"}><span className="status-dot" />{patient.status}</span></td><td><MoreHorizontal size={18} /></td></tr>)}</tbody></table></div><div className="table-footer"><span>Показано 3 из 24</span><button className="text-button">Загрузить ещё</button></div></div></div>;
}

export default function Index() {
  const [activeTab, setActiveTab] = useState<Tab>("overview");
  const [mobileNav, setMobileNav] = useState(false);
  const activeLabel = navItems.find((item) => item.id === activeTab)?.label;
  return <div className="app-shell"><header className="topbar"><div className="brand"><div className="brand-mark"><HeartPulse size={21} /></div><div><strong>SAPIA</strong><span>CLINICAL INTELLIGENCE</span></div></div><div className="topbar-title">Оценка тяжести острого панкреатита</div><div className="topbar-actions"><button className="round-icon"><Bell size={18} /><i /></button><span className="language">RU <ChevronDown size={13} /></span><div className="user"><span className="user-avatar">ЕМ</span><span>Елена Мангальова</span><ChevronDown size={14} /></div><button className="mobile-menu" onClick={() => setMobileNav(!mobileNav)}>{mobileNav ? <X size={20} /> : <Menu size={20} />}</button></div></header><div className="app-body"><aside className={mobileNav ? "sidebar open" : "sidebar"}><div className="sidebar-intro"><span className="eyebrow">МЕДИЦИНСКАЯ СИСТЕМА</span><p>Рабочее пространство</p></div><nav>{navItems.map(({ id, label, icon: Icon }) => <button className={activeTab === id ? "nav-item active" : "nav-item"} key={id} onClick={() => { setActiveTab(id); setMobileNav(false); }}><Icon size={18} /><span>{label}</span>{id === "archive" && <b>24</b>}</button>)}</nav><div className="sidebar-bottom"><div className="support-card"><div className="support-icon"><Stethoscope size={17} /></div><div><strong>Нужна помощь?</strong><span>Открыть справочник</span></div></div><div className="sidebar-user"><span className="user-avatar">ЕМ</span><div><strong>Елена Мангальова</strong><span>Врач-реаниматолог</span></div><MoreHorizontal size={17} /></div></div></aside><main className="main-content"><div className="breadcrumb"><span>Панкреатит</span><span>/</span><strong>{activeLabel}</strong></div>{activeTab === "overview" && <Overview onAssessment={() => setActiveTab("assessment")} />}{activeTab === "assessment" && <Assessment />}{activeTab === "dynamics" && <Dynamics />}{activeTab === "archive" && <Archive />}</main></div></div>;
}
