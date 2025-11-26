import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  ShieldCheck, 
  FileSearch, 
  AlertTriangle, 
  CheckCircle2, 
  Users, 
  BrainCircuit, 
  Activity, 
  TrendingUp,
  Lock,
  Search,
  BookOpen,
  LayoutGrid,
  Briefcase,
  Building2,
  Cpu,
  Server,
  Printer,
  MonitorPlay
} from 'lucide-react';

// 強制列印樣式
const PrintStyles = () => (
  <style>{`
    @media print {
      @page {
        margin: 1cm;
        size: auto;
      }
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
        background-color: white !important;
      }
      /* 強制展開所有內容，防止瀏覽器裁切 */
      .print-force-visible {
        display: block !important;
        overflow: visible !important;
        height: auto !important;
        max-height: none !important;
        opacity: 1 !important;
        visibility: visible !important;
      }
      /* 防止分頁時內容被切斷 */
      .print-break-inside-avoid {
        break-inside: avoid;
        page-break-inside: avoid;
      }
      /* 強制分頁 */
      .print-page-break {
        break-after: page;
        page-break-after: always;
      }
      /* 隱藏列印時不需要的介面元素 */
      .no-print {
        display: none !important;
      }
    }
  `}</style>
);

const Slide = ({ title, subTitle, children, icon: Icon, currentStep, totalSteps, isPrintView }) => (
  <div className={`
    bg-slate-50 text-slate-800 p-8 rounded-xl border border-slate-200 relative selection:bg-blue-100
    ${isPrintView 
      ? 'block w-full h-auto mb-8 shadow-none border-2 print-force-visible' // 列印模式：強制顯示
      : 'flex flex-col h-full shadow-2xl overflow-hidden'                    // 簡報模式
    }
  `}>
    {/* Header */}
    <div className="flex items-center justify-between mb-6 border-b border-slate-200 pb-4 print-force-visible">
      <div className="flex items-center gap-3">
        {Icon && <Icon className="w-8 h-8 text-blue-600" />}
        <div>
          <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
          {subTitle && <p className="text-sm text-slate-500 font-medium">{subTitle}</p>}
        </div>
      </div>
      {!isPrintView && (
        <div className="text-slate-400 font-mono text-sm no-print">
          Slide {currentStep} / {totalSteps}
        </div>
      )}
    </div>

    {/* Content Area - 關鍵修正：移除所有可能導致隱藏的 class，並加上 print-force-visible */}
    <div className={`
      ${isPrintView ? 'print-force-visible' : 'flex-1 overflow-y-auto custom-scrollbar'}
    `}>
      {children}
    </div>

    {/* Footer Decoration */}
    {!isPrintView && (
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-slate-500 no-print"></div>
    )}
  </div>
);

const SectionBox = ({ title, children, type = "normal" }) => {
  const styles = {
    normal: "bg-white border-l-4 border-slate-400",
    audit: "bg-blue-50 border-l-4 border-blue-600",
    trap: "bg-amber-50 border-l-4 border-amber-500",
    evidence: "bg-emerald-50 border-l-4 border-emerald-500"
  };

  const titles = {
    normal: "text-slate-700",
    audit: "text-blue-800",
    trap: "text-amber-800",
    evidence: "text-emerald-800"
  };

  return (
    <div className={`p-4 rounded-r-lg shadow-sm mb-4 print-break-inside-avoid print-force-visible ${styles[type]}`}>
      <h3 className={`font-bold mb-2 flex items-center gap-2 ${titles[type]}`}>
        {type === 'audit' && <Search size={18} />}
        {type === 'trap' && <AlertTriangle size={18} />}
        {type === 'evidence' && <FileSearch size={18} />}
        {title}
      </h3>
      <div className="text-slate-700 text-sm leading-relaxed">
        {children}
      </div>
    </div>
  );
};

const Bullet = ({ children }) => (
  <li className="flex items-start gap-2 mb-2 print-force-visible">
    <span className="mt-1.5 w-1.5 h-1.5 bg-slate-400 rounded-full flex-shrink-0"></span>
    <span>{children}</span>
  </li>
);

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPrintView, setIsPrintView] = useState(false);

  const slides = [
    {
      id: 'intro',
      title: 'ISO 27001:2022 稽核實務解析',
      subTitle: '顧問與稽核員視角：條文要求 vs. 客觀證據',
      icon: ShieldCheck,
      content: (
        <div className={`flex flex-col items-center justify-center space-y-8 text-center ${isPrintView ? 'py-8 print-force-visible' : 'h-full min-h-[300px]'}`}>
          <div className="p-8 bg-blue-100 rounded-full print:bg-transparent print:p-0">
            <ShieldCheck className="w-24 h-24 text-blue-600" />
          </div>
          <div className="space-y-4 max-w-2xl">
            <h1 className="text-4xl font-extrabold text-slate-800 tracking-tight">
              如何應對 ISO 27001 稽核？
            </h1>
            <p className="text-xl text-slate-600">
              不僅是「做了什麼」，更是「留下了什麼紀錄」。<br/>
              本簡報將帶您從 <span className="text-blue-600 font-bold">PDCA</span> 循環檢視稽核重點。
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mt-8">
            <div className="p-4 bg-white rounded-lg shadow-md border border-slate-100 print-break-inside-avoid">
              <span className="block text-2xl font-bold text-slate-800 mb-1">說寫做一致</span>
              <span className="text-xs text-slate-500">Say what you do, Do what you say</span>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md border border-slate-100 print-break-inside-avoid">
              <span className="block text-2xl font-bold text-slate-800 mb-1">可追溯性</span>
              <span className="text-xs text-slate-500">Traceability of Evidence</span>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md border border-slate-100 print-break-inside-avoid">
              <span className="block text-2xl font-bold text-slate-800 mb-1">風險導向</span>
              <span className="text-xs text-slate-500">Risk-Based Thinking</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'clause-4',
      title: 'Clause 4: 組織全景',
      subTitle: 'Context of the Organization - 範圍與利害關係人',
      icon: BookOpen,
      content: (
        <>
          <SectionBox title="條文精神" type="normal">
            確定 ISMS 的邊界（Scope）以及誰會影響資訊安全（利害關係人）。這是整個 ISMS 的地基。
          </SectionBox>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionBox title="稽核員在找什麼 (Audit Trail)" type="audit">
              <ul className="list-none text-sm">
                <Bullet>是否清晰定義了 ISMS 驗證範圍？（包含實體位置、部門、系統）</Bullet>
                <Bullet>是否有文件化的「內外部議題」清單？（SWOT 分析或 PEST 分析）</Bullet>
                <Bullet>利害關係人（客戶、主管機關、員工）的需求是否被識別並轉化為具體要求？</Bullet>
              </ul>
            </SectionBox>

            <SectionBox title="必備佐證 (Evidence)" type="evidence">
              <ul className="list-none text-sm">
                <Bullet><strong>ISMS 範圍說明書</strong> (Scope Statement)</Bullet>
                <Bullet><strong>利害關係人鑑別表</strong> (包含對應的資安要求)</Bullet>
                <Bullet><strong>組織全景分析報告</strong> (如年度 SWOT 分析會議紀錄)</Bullet>
              </ul>
            </SectionBox>
          </div>

          <SectionBox title="常見缺失陷阱" type="trap">
            範圍定義不清：例如雲端服務供應商未將「雲端平台管理」納入範圍，僅驗證「辦公室行政流程」。
            或者利害關係人需求過於籠統，未鑑別出具體的法律法規要求。
          </SectionBox>
        </>
      )
    },
    {
      id: 'clause-5',
      title: 'Clause 5: 領導統御',
      subTitle: 'Leadership - 政策與角色權責',
      icon: Users,
      content: (
        <>
          <SectionBox title="條文精神" type="normal">
            Top Management 不能只是掛名，必須展現承諾。資安政策必須由高層核准並傳達。
          </SectionBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionBox title="稽核員怎麼問" type="audit">
              <ul className="list-none text-sm">
                <Bullet>「請問資安政策是誰核准的？何時核准？」</Bullet>
                <Bullet>「資安長/資安主管的任命書在哪裡？」</Bullet>
                <Bullet>「管理階層如何確保資源（預算、人力）足夠？」</Bullet>
              </ul>
            </SectionBox>

             <SectionBox title="必備佐證 (Evidence)" type="evidence">
              <ul className="list-none text-sm">
                <Bullet><strong>資安政策文件</strong>（需有最高主管簽核日期）</Bullet>
                <Bullet><strong>組織架構圖</strong>與<strong>角色職責說明書</strong> (Job Description)</Bullet>
                <Bullet>管理階層參與會議的簽到表或郵件紀錄</Bullet>
              </ul>
            </SectionBox>
          </div>

          <SectionBox title="常見缺失陷阱" type="trap">
            政策發布日期久遠未經審查。
            資安推動小組成員不知道自己的具體職責（例如：不知道自己是緊急應變小組成員）。
          </SectionBox>
        </>
      )
    },
    {
      id: 'clause-6',
      title: 'Clause 6: 規劃 (風險管理)',
      subTitle: 'Planning - 風險評鑑與處置 (最核心章節)',
      icon: BrainCircuit,
      content: (
        <>
          <SectionBox title="條文精神" type="normal">
            ISMS 是基於風險的系統。必須有一套方法論來識別風險，並決定如何處理風險 (SoA)。
          </SectionBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <SectionBox title="稽核重點 (Audit Trail)" type="audit">
              <ul className="list-none text-sm">
                <Bullet>風險評鑑方法論是否包含「機密性、完整性、可用性 (CIA)」？</Bullet>
                <Bullet>是否定義了「風險接受準則」？(什麼等級的風險要處理？)</Bullet>
                <Bullet><strong>適用性聲明書 (SoA)</strong> 是否連結到 Annex A 控制項，並解釋排除理由？</Bullet>
              </ul>
            </SectionBox>

             <SectionBox title="必備佐證 (Evidence)" type="evidence">
              <ul className="list-none text-sm">
                <Bullet><strong>資產盤點表</strong> (Information Asset Inventory)</Bullet>
                <Bullet><strong>風險評鑑報告</strong> (Risk Assessment Report)</Bullet>
                <Bullet><strong>風險處置計畫</strong> (Risk Treatment Plan, RTP)</Bullet>
                <Bullet><strong>適用性聲明書</strong> (Statement of Applicability, SoA)</Bullet>
              </ul>
            </SectionBox>
          </div>

          <SectionBox title="常見缺失陷阱" type="trap">
            SoA 中標示「不適用」的控制項理由不充分（例如：宣稱無委外開發，但實際上有請廠商維護網站）。
            風險評鑑流於形式，每年都複製貼上，未反映實際威脅變化（如勒索軟體）。
          </SectionBox>
        </>
      )
    },
    {
      id: 'clause-7',
      title: 'Clause 7: 支援',
      subTitle: 'Support - 資源、能力、認知、溝通、文件化資訊',
      icon: Users,
      content: (
        <>
          <SectionBox title="條文精神" type="normal">
            確保人員有能力執行資安工作，且所有人都具備資安意識。同時規範文件的產生與控制。
          </SectionBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionBox title="稽核員怎麼查" type="audit">
              <ul className="list-none text-sm">
                <Bullet>隨機抽問員工：「你知道公司的資安政策嗎？電腦中毒怎麼辦？」</Bullet>
                <Bullet>檢查新進員工與在職員工的資安教育訓練紀錄。</Bullet>
                <Bullet>檢查過期文件是否被誤用？文件版本是否最新？</Bullet>
              </ul>
            </SectionBox>

             <SectionBox title="必備佐證 (Evidence)" type="evidence">
              <ul className="list-none text-sm">
                <Bullet><strong>教育訓練計畫與紀錄</strong>（簽到表、測驗卷、證書）</Bullet>
                <Bullet><strong>保密協議 (NDA)</strong> 簽署紀錄</Bullet>
                <Bullet>文件總覽表 (Master List) 與 DCC 文件管制作業</Bullet>
              </ul>
            </SectionBox>
          </div>

          <SectionBox title="常見缺失陷阱" type="trap">
            員工雖有簽到但考試不及格無補考紀錄。
            工程師使用舊版 SOP 操作系統。
            離職員工帳號未及時移除（這同時也是 Clause 9 & Annex A 的重點）。
          </SectionBox>
        </>
      )
    },
    {
      id: 'clause-8',
      title: 'Clause 8: 營運',
      subTitle: 'Operation - 執行風險評鑑與控制',
      icon: Activity,
      content: (
        <>
           <SectionBox title="條文精神" type="normal">
            做你所寫的 (Do what you say)。執行 Clause 6 規劃的計畫，並控制變更。
          </SectionBox>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionBox title="稽核重點 (Audit Trail)" type="audit">
              <ul className="list-none text-sm">
                <Bullet>風險評鑑是否定期執行？(Planned intervals)</Bullet>
                <Bullet>重大變更（如新系統上線、搬遷）時，是否重新評估風險？</Bullet>
                <Bullet>委外流程是否受控？</Bullet>
              </ul>
            </SectionBox>
            
             <SectionBox title="必備佐證 (Evidence)" type="evidence">
              <ul className="list-none text-sm">
                <Bullet>年度風險再評估紀錄</Bullet>
                <Bullet>變更管理單 (Change Request) 及其資安審核紀錄</Bullet>
                <Bullet>專案開發過程中的資安檢核點紀錄</Bullet>
              </ul>
            </SectionBox>
           </div>

           <SectionBox title="常見缺失陷阱" type="trap">
            變更管理程序有寫，但實際系統修改直接由工程師上線，無測試與核准紀錄。
            導入新技術（如 AI 輔助編碼）未進行風險評估。
          </SectionBox>
        </>
      )
    },
    {
      id: 'clause-9',
      title: 'Clause 9: 績效評估',
      subTitle: 'Performance Evaluation - 監控、內部稽核、管審會',
      icon: TrendingUp,
      content: (
        <>
          <SectionBox title="條文精神" type="normal">
            檢查 ISMS 有效性。透過監控數據、內部稽核與管理階層審查來確認。
          </SectionBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionBox title="稽核員的必查項目" type="audit">
              <ul className="list-none text-sm">
                <Bullet>如何量測資安目標達成率？(KPIs)</Bullet>
                <Bullet>內部稽核員是否具備資格？是否球員兼裁判？</Bullet>
                <Bullet>管理階層審查會議是否討論了「持續改善」與「資源需求」？</Bullet>
              </ul>
            </SectionBox>

             <SectionBox title="必備佐證 (Evidence)" type="evidence">
              <ul className="list-none text-sm">
                <Bullet><strong>資安目標達成狀況統計表</strong></Bullet>
                <Bullet><strong>內部稽核計畫、報告、缺失單</strong></Bullet>
                <Bullet><strong>管理階層審查會議紀錄</strong> (Management Review Minutes)</Bullet>
              </ul>
            </SectionBox>
          </div>

          <SectionBox title="常見缺失陷阱" type="trap">
            內部稽核發現 0 缺失（這通常不合理，稽核員會挑戰稽核深度）。
            管理審查會議紀錄流於形式，沒有高階主管的具體裁示或決策。
          </SectionBox>
        </>
      )
    },
    {
      id: 'clause-10',
      title: 'Clause 10: 改善',
      subTitle: 'Improvement - 持續改善與不符合事項矯正',
      icon: CheckCircle2,
      content: (
        <>
          <SectionBox title="條文精神" type="normal">
            發生問題不可怕，可怕的是沒有根因分析 (Root Cause Analysis) 與預防再發。
          </SectionBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <SectionBox title="稽核員怎麼看" type="audit">
              <ul className="list-none text-sm">
                <Bullet>看到資安事件或內稽缺失後，是否有開立矯正措施單 (CAR)？</Bullet>
                <Bullet>是否真的找到「根本原因」？還是只處理表面？</Bullet>
                <Bullet>改善措施執行後，是否有驗證其有效性？</Bullet>
              </ul>
            </SectionBox>

             <SectionBox title="必備佐證 (Evidence)" type="evidence">
              <ul className="list-none text-sm">
                <Bullet><strong>矯正預防措施單 (C/P Action List)</strong></Bullet>
                <Bullet>資安事件檢討報告</Bullet>
                <Bullet>持續改善計畫追蹤表</Bullet>
              </ul>
            </SectionBox>
          </div>

          <SectionBox title="常見缺失陷阱" type="trap">
            所有缺失的矯正措施都是「加強教育訓練」（這通常不是根本解決之道）。
            矯正措施單長期未結案（Open status），且無合理展延理由。
          </SectionBox>
        </>
      )
    },
    {
      id: 'annex-intro',
      title: '附錄 A (Annex A) 概覽',
      subTitle: '2022 年版架構：93 個控制項、4 大主題 (Themes)',
      icon: LayoutGrid,
      content: (
        <>
          <SectionBox title="結構變化 (2013 vs 2022)" type="normal">
            ISO 27001:2022 將原有的 14 個領域 (Domains) 整併為 <span className="text-blue-600 font-bold">4 大主題 (Themes)</span>，更加直觀且現代化。
          </SectionBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-blue-500" />
                1. 組織 (Organizational)
              </h4>
              <p className="text-sm text-slate-600">37 個控制項。涉及政策、管理面、雲端服務。</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Users className="w-5 h-5 text-indigo-500" />
                2. 人員 (People)
              </h4>
              <p className="text-sm text-slate-600">8 個控制項。涉及教育訓練、背景調查、遠距工作。</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Building2 className="w-5 h-5 text-emerald-500" />
                3. 實體 (Physical)
              </h4>
              <p className="text-sm text-slate-600">14 個控制項。涉及門禁監控、設備保護。</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
              <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                <Cpu className="w-5 h-5 text-amber-500" />
                4. 技術 (Technological)
              </h4>
              <p className="text-sm text-slate-600">34 個控制項。涉及網路安全、加密、備份、日誌。</p>
            </div>
          </div>

          <SectionBox title="稽核新焦點 (New Controls)" type="audit">
            <ul className="list-none text-sm">
              <Bullet><strong>威脅情資 (Threat Intelligence)</strong>：是否主動收集與分析？</Bullet>
              <Bullet><strong>雲端服務資安 (Information security for use of cloud services)</strong>：責任分界？</Bullet>
              <Bullet><strong>ICT 營運持續 (ICT readiness for business continuity)</strong>：RTO/RPO？</Bullet>
            </ul>
          </SectionBox>
        </>
      )
    },
    {
      id: 'annex-org',
      title: 'A.5 組織控制 (Organizational)',
      subTitle: '政策、雲端、情資、供應商管理',
      icon: Briefcase,
      content: (
        <>
          <SectionBox title="核心精神" type="normal">
            涵蓋管理層面的控制措施，確保資安政策的落實與外部關係的管理。
          </SectionBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionBox title="稽核員必問 (Audit Trail)" type="audit">
              <ul className="list-none text-sm">
                <Bullet><strong>雲端服務 (A.5.23)</strong>：如何管理 AWS/Azure/GCP 權限？是否有審查雲端供應商的合規性？</Bullet>
                <Bullet><strong>威脅情資 (A.5.7)</strong>：除了看新聞，公司如何系統性地收集與分析情資？</Bullet>
                <Bullet><strong>供應商管理 (A.5.19-22)</strong>：委外合約是否有包含 SLA 與資安條款？</Bullet>
              </ul>
            </SectionBox>

             <SectionBox title="必備佐證 (Evidence)" type="evidence">
              <ul className="list-none text-sm">
                <Bullet><strong>雲端服務使用規範與清冊</strong></Bullet>
                <Bullet><strong>供應商資安評估表/稽核報告</strong></Bullet>
                <Bullet><strong>資產清冊</strong> (需標註擁有者 Owner)</Bullet>
              </ul>
            </SectionBox>
          </div>

          <SectionBox title="常見缺失陷阱" type="trap">
            使用免費的雲端工具 (如 Google Drive, Dropbox) 傳輸公務資料，卻未列入納管範圍。
            資產清冊未定期更新，離職員工的筆電仍列在清冊中。
          </SectionBox>
        </>
      )
    },
    {
      id: 'annex-people',
      title: 'A.6 人員控制 (People)',
      subTitle: '教育訓練、背景調查、遠距工作',
      icon: Users,
      content: (
        <>
          <SectionBox title="核心精神" type="normal">
            人是資安最脆弱的一環。重點在於提升意識與管理「不在辦公室」時的風險。
          </SectionBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionBox title="稽核員必問 (Audit Trail)" type="audit">
              <ul className="list-none text-sm">
                <Bullet><strong>遠距工作 (A.6.7)</strong>：在家工作的 VPN 連線是否安全？是否有禁止家人使用公務電腦？</Bullet>
                <Bullet><strong>保密協議 (A.6.6)</strong>：合作廠商或短期人員是否簽署 NDA？</Bullet>
                <Bullet><strong>資安意識 (A.6.3)</strong>：是否有針對不同職位 (如開發者、HR) 進行差異化訓練？</Bullet>
              </ul>
            </SectionBox>

             <SectionBox title="必備佐證 (Evidence)" type="evidence">
              <ul className="list-none text-sm">
                <Bullet><strong>遠距辦公/居家上班管理辦法</strong></Bullet>
                <Bullet><strong>員工與外部人員保密協議 (NDA)</strong></Bullet>
                <Bullet><strong>社交工程演練報告</strong> (釣魚信測試)</Bullet>
              </ul>
            </SectionBox>
          </div>

          <SectionBox title="常見缺失陷阱" type="trap">
            雖然有遠距辦公規範，但稽核時發現員工在家使用未經核准的軟體 (如 TeamViewer)。
            社交工程演練點擊率高，但後續沒有針對點擊人員進行加強訓練。
          </SectionBox>
        </>
      )
    },
    {
      id: 'annex-physical',
      title: 'A.7 實體控制 (Physical)',
      subTitle: '安全區域、設備保護、桌面淨空',
      icon: Building2,
      content: (
        <>
          <SectionBox title="核心精神" type="normal">
            防止未經授權的實體存取、損害和干擾。包含辦公室與機房安全。
          </SectionBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionBox title="稽核員必問 (Audit Trail)" type="audit">
              <ul className="list-none text-sm">
                <Bullet><strong>實體安全監控 (A.7.4)</strong>：CCTV 保存時間是否符合規定？是否有死角？</Bullet>
                <Bullet><strong>桌面與螢幕淨空 (A.7.7)</strong>：(稽核員會現場走動) 離開座位是否鎖定螢幕？桌上是否有密碼便利貼？</Bullet>
                <Bullet><strong>設備維護 (A.7.13)</strong>：UPS、冷氣、發電機是否定期保養？</Bullet>
              </ul>
            </SectionBox>

             <SectionBox title="必備佐證 (Evidence)" type="evidence">
              <ul className="list-none text-sm">
                <Bullet><strong>機房進出管制紀錄</strong> (Access Logs)</Bullet>
                <Bullet><strong>CCTV 運作檢查紀錄</strong></Bullet>
                <Bullet><strong>設備定期維護保養單</strong></Bullet>
              </ul>
            </SectionBox>
          </div>

          <SectionBox title="常見缺失陷阱" type="trap">
            機房內堆放紙箱、易燃物 (違反 A.7.10 儲存媒體、A.7.2 實體進入)。
            白板上留有系統架構圖或帳號密碼未擦除。
          </SectionBox>
        </>
      )
    },
    {
      id: 'annex-tech',
      title: 'A.8 技術控制 (Technological)',
      subTitle: '網路、加密、備份、日誌、防惡意軟體',
      icon: Server,
      content: (
        <>
          <SectionBox title="核心精神" type="normal">
            技術層面的防禦措施。這是項目最多、技術含量最高的主題。
          </SectionBox>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SectionBox title="稽核員必問 (Audit Trail)" type="audit">
              <ul className="list-none text-sm">
                <Bullet><strong>備份 (A.8.24)</strong>：不僅看備份成功紀錄，更要看「還原測試」紀錄。</Bullet>
                <Bullet><strong>日誌 (A.8.15)</strong>：Log 是否有防篡改機制？是否有定期審閱 Log？</Bullet>
                <Bullet><strong>技術弱點管理 (A.8.8)</strong>：弱掃發現的高風險漏洞多久修補？</Bullet>
                <Bullet><strong>資料外洩防護 (A.8.12)</strong>：(New) 如何偵測敏感資料外流？</Bullet>
              </ul>
            </SectionBox>

             <SectionBox title="必備佐證 (Evidence)" type="evidence">
              <ul className="list-none text-sm">
                <Bullet><strong>備份還原測試報告</strong></Bullet>
                <Bullet><strong>弱點掃描與修補複測報告</strong></Bullet>
                <Bullet><strong>防火牆規則審查紀錄</strong></Bullet>
                <Bullet><strong>系統日誌 (Log) 審查紀錄</strong></Bullet>
              </ul>
            </SectionBox>
          </div>

          <SectionBox title="常見缺失陷阱" type="trap">
            測試環境使用真實個資進行測試 (違反 A.8.31 測試資料)。
            特權帳號 (Admin) 的操作行為沒有被獨立記錄或監控。
          </SectionBox>
        </>
      )
    },
    {
      id: 'conclusion',
      title: '總結：顧問的建議',
      subTitle: '準備稽核的心法',
      icon: Lock,
      content: (
        <div className={`flex flex-col items-center justify-center space-y-8 ${isPrintView ? 'py-8 print-force-visible' : 'h-full min-h-[300px]'}`}>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
             <div className="bg-white p-6 rounded-xl shadow border-t-4 border-blue-600 break-inside-avoid print-force-visible">
               <h3 className="text-xl font-bold text-slate-800 mb-4">給受稽方的建議</h3>
               <ul className="space-y-3 text-slate-600">
                 <Bullet><strong>誠實為上</strong>：不要試圖欺騙稽核員，誠實展現紀錄。</Bullet>
                 <Bullet><strong>不要過度解釋</strong>：問什麼答什麼，多餘的解釋常引發新的稽核路徑。</Bullet>
                 <Bullet><strong>展現PDCA</strong>：即使有缺失，若能展現已發現並正在改善中，通常能獲得認可。</Bullet>
               </ul>
             </div>
             <div className="bg-white p-6 rounded-xl shadow border-t-4 border-indigo-600 break-inside-avoid print-force-visible">
               <h3 className="text-xl font-bold text-slate-800 mb-4">文件準備口訣</h3>
               <ul className="space-y-3 text-slate-600">
                 <Bullet><strong>文</strong>：程序書 (Procedure) 是否最新？</Bullet>
                 <Bullet><strong>表</strong>：表單 (Form) 是否落實填寫？</Bullet>
                 <Bullet><strong>管</strong>：紀錄 (Record) 是否妥善保存？</Bullet>
                 <Bullet><strong>查</strong>：是否有定期檢查與覆核？</Bullet>
               </ul>
             </div>
           </div>
           
           <div className="text-center mt-8 print-force-visible">
             <p className="text-2xl font-bold text-slate-800">
               "Security is a process, not a product."
             </p>
             <p className="text-slate-500 mt-2">
               稽核的目的是協助組織持續強化體質，而非單純找碴。
             </p>
           </div>
        </div>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (isPrintView) return; // Disable keyboard nav in print view
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentSlide, isPrintView]);

  const CurrentSlideIcon = slides[currentSlide].icon;

  return (
    <div className={`min-h-screen bg-slate-200 flex flex-col items-center justify-center font-sans text-slate-900 ${isPrintView ? 'p-0 bg-white block h-auto overflow-visible' : 'p-4'}`}>
      <PrintStyles />
      
      {/* Top Bar with Mode Switch */}
      <div className={`w-full max-w-5xl flex justify-end mb-4 ${isPrintView ? 'hidden print:hidden' : ''}`}>
        <button
          onClick={() => setIsPrintView(!isPrintView)}
          className="flex items-center gap-2 px-4 py-2 bg-white text-slate-700 rounded-lg shadow hover:bg-slate-50 transition-colors border border-slate-200"
        >
          {isPrintView ? <MonitorPlay size={18} /> : <Printer size={18} />}
          {isPrintView ? "返回簡報模式 (Interactive)" : "全覽/列印模式 (Print View)"}
        </button>
      </div>

      {isPrintView ? (
        // Print View: Render All Slides
        <div className="w-full max-w-5xl p-8 bg-white print-force-visible">
          <div className="mb-8 text-center border-b pb-8 print:hidden">
            <h1 className="text-2xl font-bold text-blue-600 mb-2">準備列印</h1>
            <p className="text-slate-600">請按 Ctrl+P (或 Command+P) 另存為 PDF</p>
          </div>
          {slides.map((slide, idx) => (
            <div key={slide.id} className="mb-8 print-page-break print-break-inside-avoid print-force-visible">
               <Slide 
                title={slide.title}
                subTitle={slide.subTitle}
                icon={slide.icon}
                currentStep={idx + 1}
                totalSteps={slides.length}
                isPrintView={true}
              >
                {slide.content}
              </Slide>
            </div>
          ))}
        </div>
      ) : (
        // Interactive Presentation Mode
        <div className="w-full max-w-5xl aspect-video relative">
          <Slide 
            title={slides[currentSlide].title}
            subTitle={slides[currentSlide].subTitle}
            icon={CurrentSlideIcon}
            currentStep={currentSlide + 1}
            totalSteps={slides.length}
            isPrintView={false}
          >
            {slides[currentSlide].content}
          </Slide>

          {/* Navigation Controls */}
          <div className="absolute -bottom-16 left-0 right-0 flex items-center justify-between px-4">
            <button 
              onClick={prevSlide}
              disabled={currentSlide === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                currentSlide === 0 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                  : 'bg-white text-slate-800 shadow-lg hover:bg-blue-50 hover:text-blue-600 active:scale-95'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            {/* Progress Dots */}
            <div className="flex gap-2">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlide(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentSlide === idx 
                      ? 'bg-blue-600 w-8' 
                      : 'bg-slate-400 hover:bg-slate-500'
                  }`}
                />
              ))}
            </div>

            <button 
              onClick={nextSlide}
              disabled={currentSlide === slides.length - 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all ${
                currentSlide === slides.length - 1 
                  ? 'bg-slate-300 text-slate-500 cursor-not-allowed' 
                  : 'bg-blue-600 text-white shadow-lg hover:bg-blue-700 active:scale-95 shadow-blue-200'
              }`}
            >
              Next
              <ChevronRight size={20} />
            </button>
          </div>
          <div className="absolute -bottom-24 left-0 right-0 text-center text-slate-500 text-sm">
            提示：使用鍵盤 ← → 鍵切換，或點擊上方按鈕切換至列印模式
          </div>
        </div>
      )}
    </div>
  );
}