import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { Step, Steps, useSlidePageNumber } from '@open-slide/core';

export const design: DesignSystem = {
  palette: { bg: '#f7f6e8', text: '#0d3b4a', accent: '#8fae3c' },
  fonts: {
    display: "Outfit, 'Segoe UI', system-ui, sans-serif",
    body: "Inter, 'Segoe UI', system-ui, sans-serif",
  },
  typeScale: { hero: 152, body: 34 },
  radius: 12,
};

// Theme extras (outside DesignSystem shape)
const surface = '#fdfdf4';
const primary = '#14664f';
const muted = '#8c8c8c';
const line = '#dedcc9';

// Webfont (theme declares Outfit + Inter) — load once, keyed by slide id
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700&family=Inter:wght@400;500&display=swap';
const FONT_LINK_ID = 'osd-webfont-zakat-fiqi-ibadah';
if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;
}

// Motion (theme: subtle — reveal only, 500 ms, 24 px rise)
const STYLE_ID = 'osd-style-zakat-fiqi-ibadah';
if (typeof document !== 'undefined') {
  let style = document.getElementById(STYLE_ID) as HTMLStyleElement | null;
  if (!style) {
    style = document.createElement('style');
    style.id = STYLE_ID;
    document.head.appendChild(style);
  }
  style.textContent = `@keyframes osdFadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }`;
}
const fade = (delay = 0): React.CSSProperties => ({
  animation: `osdFadeUp 500ms ease-out ${delay}ms both`,
});

const fill: React.CSSProperties = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  boxSizing: 'border-box',
  fontFamily: 'var(--osd-font-body)',
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      fontSize: 24,
      fontWeight: 500,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--osd-accent)',
      fontFamily: 'var(--osd-font-body)',
    }}
  >
    {children}
  </div>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 130,
        right: 130,
        bottom: 56,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 22,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: muted,
        fontFamily: 'var(--osd-font-body)',
      }}
    >
      <span>Fiqh Ibadah · Zakat</span>
      <span>
        {current} / {total}
      </span>
    </div>
  );
};

const StarMotif = ({ size = 360, color = primary, stroke = 6 }: { size?: number; color?: string; stroke?: number }) => {
  const d = `M${size / 2} 0 L${size * 0.62} ${size * 0.38} L${size} ${size / 2} L${size * 0.62} ${size * 0.62} L${size / 2} ${size} L${size * 0.38} ${size * 0.62} L0 ${size / 2} L${size * 0.38} ${size * 0.38} Z`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: 'block' }}>
      <path d={d} fill="none" stroke={color} strokeWidth={stroke} strokeLinejoin="round" />
      <circle cx={size / 2} cy={size / 2} r={size * 0.16} fill="none" stroke={color} strokeWidth={stroke} />
    </svg>
  );
};

// 1 — Cover
const Cover: Page = () => (
  <div style={{ ...fill, position: 'relative', padding: '120px 130px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <div style={{ position: 'absolute', right: 120, top: 110, opacity: 0.09 }}>
      <StarMotif size={460} />
    </div>
    <div style={fade()}>
      <Eyebrow>Fiqh Ibadah · Zakat</Eyebrow>
    </div>
    <h1
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 300,
        lineHeight: 1.04,
        letterSpacing: '-0.02em',
        margin: '32px 0 0',
        maxWidth: 1400,
      }}
    >
      Harta yang Wajib Dizakati
    </h1>
    <p style={fade(120)}>
      <span style={{ display: 'block', fontSize: 34, color: muted, maxWidth: 1000, marginTop: 40, lineHeight: 1.6 }}>
        Macam-macam harta, cara menghitung, dan posisinya di hadapan pajak.
      </span>
      <span style={{ display: 'block', fontSize: 28, color: primary, marginTop: 24, fontWeight: 500 }}>
        Majelis Tarjih Muhammadiyah · UU No. 23 Tahun 2011
      </span>
    </p>
    <Footer />
  </div>
);

// 2 — Indikator / peta materi
const Indikator: Page = () => (
  <div style={{ ...fill, padding: '110px 130px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <div style={fade()}>
      <Eyebrow>Peta Materi</Eyebrow>
    </div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 88,
        fontWeight: 600,
        margin: '24px 0 64px',
        lineHeight: 1.1,
      }}
    >
      Tiga hal yang akan kita kuasai
    </h2>
    <AgendaItem delay={100} n="01" t="Harta yang dizakati" d="Macam-macam harta wajib zakat + contoh perhitungannya." last={false} />
    <AgendaItem delay={220} n="02" t="Zakat vs Pajak" d="Bedanya di dasar hukum, sifat, dan tujuan. Plus UU Zakat." last={false} />
    <AgendaItem delay={340} n="03" t="Keputusan Majelis Tarjih" d="Dalil dan pilihan Tarjih atas persoalan zakat masa kini." last />
    <Footer />
  </div>
);

const AgendaItem = ({ delay, n, t, d, last }: { delay: number; n: string; t: string; d: string; last: boolean }) => (
  <div
    style={{
      ...fade(delay),
      display: 'flex',
      alignItems: 'center',
      gap: 40,
      padding: '28px 40px',
      marginBottom: 28,
      background: surface,
      borderLeft: `6px solid ${last ? primary : 'var(--osd-accent)'}`,
      borderRadius: 'var(--osd-radius)',
    }}
  >
    <span style={{ fontSize: 44, fontWeight: 700, color: 'var(--osd-accent)', fontFamily: 'var(--osd-font-display)', letterSpacing: '0.02em' }}>
      {n}
    </span>
    <span style={{ fontSize: 36, fontWeight: 600, color: 'var(--osd-text)' }}>{t}</span>
    <span style={{ fontSize: 28, color: muted, marginLeft: 'auto', maxWidth: 640 }}>{d}</span>
  </div>
);

// 3 — Macam-macam harta wajib zakat
const Harta: Page = () => (
  <div style={{ ...fill, padding: '110px 130px' }}>
    <div style={fade()}>
      <Eyebrow>Sub-CPMK 1</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 88,
          fontWeight: 600,
          margin: '24px 0 48px',
          lineHeight: 1.1,
        }}
      >
        Harta apa saja yang wajib dizakati?
      </h2>
    </div>
    <Steps>
      <Step duration={300}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <Card n="1" t="Emas & perak" d="Tabungan emas, perhiasan simpanan" />
          <Card n="2" t="Uang & tabungan" d="Simpanan, deposito, surat berharga" />
        </div>
      </Step>
      <Step duration={300}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <Card n="3" t="Hasil pertanian" d="Panen tanaman, kadar 5% atau 10%" />
          <Card n="4" t="Perdagangan" d="Barang dagangan yang diperjualbelikan" />
        </div>
      </Step>
      <Step duration={300}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 24 }}>
          <Card n="5" t="Peternakan" d="Ternak yang digembalakan, nisabnya bertahap" />
          <Card n="6" t="Rikaz & barang temuan" d="Harta terpendam, langsung 20%" />
        </div>
      </Step>
      <Step duration={300}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          <Card n="7" t="Penghasilan & profesi" d="Gaji, honor, upah — keputusan Tarjih, wajib" accent />
          <Card n="8" t="Hasil tambang" d="Kekayaan bumi yang digali" />
        </div>
      </Step>
    </Steps>
    <Footer />
  </div>
);

const Card = ({ n, t, d, accent = false }: { n: string; t: string; d: string; accent?: boolean }) => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 28,
      padding: '22px 32px',
      background: surface,
      borderRadius: 'var(--osd-radius)',
      border: accent ? `2px solid ${primary}` : `1px solid ${line}`,
    }}
  >
    <span
      style={{
        fontSize: 30,
        fontWeight: 700,
        color: accent ? surface : 'var(--osd-text)',
        background: accent ? primary : 'transparent',
        width: 48,
        height: 48,
        borderRadius: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      {n}
    </span>
    <span>
      <span style={{ display: 'block', fontSize: 32, fontWeight: 600 }}>{t}</span>
      <span style={{ display: 'block', fontSize: 24, color: muted }}>{d}</span>
    </span>
  </div>
);

// 4 — Zakat profesi: ketentuan + keputusan Tarjih
const Profesi: Page = () => (
  <div style={{ ...fill, padding: '110px 130px' }}>
    <div style={fade()}>
      <Eyebrow>Sub-CPMK 3 · Majelis Tarjih</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 88,
          fontWeight: 600,
          margin: '24px 0 48px',
          lineHeight: 1.1,
        }}
      >
        Zakat profesi: wajib
      </h2>
      <p style={{ fontSize: 32, color: muted, maxWidth: 1300, lineHeight: 1.6, margin: '0 0 56px' }}>
        Munas Tarjih XXV tahun 2000 menetapkan zakat profesi <b style={{ color: primary }}>wajib</b>, diqiyaskan kepada zakat mal.
        Perhitungannya mengikuti ketentuan zakat harta.
      </p>
    </div>
    <div style={{ display: 'flex', gap: 32, marginBottom: 48 }}>
      <StatCard delay={120} v="85 gr" l="Nisab — setara harga emas 24 karat" />
      <StatCard delay={240} v="2,5%" l="Kadar zakat dari penghasilan bersih" />
      <StatCard delay={360} v="1 tahun" l="Haul — dihitung dari penghasilan 12 bulan" />
    </div>
    <div style={{ ...fade(480), borderTop: `1px solid ${line}`, paddingTop: 32 }}>
      <div style={{ fontSize: 26, color: muted, letterSpacing: '0.14em', textTransform: 'uppercase', marginBottom: 16 }}>Dalil</div>
      <div style={{ fontSize: 30, lineHeight: 1.6, maxWidth: 1400 }}>
        QS. At-Taubah: 103 — "Ambillah zakat dari harta mereka…" · Hadis HR. Muslim — dahulukan dirimu sendiri, lalu keluargamu.
      </div>
    </div>
    <Footer />
  </div>
);

const StatCard = ({ delay, v, l }: { delay: number; v: string; l: string }) => (
  <div style={{ ...fade(delay), flex: 1, background: surface, borderRadius: 'var(--osd-radius)', border: `1px solid ${line}`, padding: '40px 36px' }}>
    <div style={{ fontSize: 72, fontWeight: 300, color: primary, fontFamily: 'var(--osd-font-display)' }}>{v}</div>
    <div style={{ fontSize: 26, color: muted, marginTop: 12 }}>{l}</div>
  </div>
);

// 5 — Contoh perhitungan
const Contoh: Page = () => (
  <div style={{ ...fill, padding: '110px 130px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <div style={fade()}>
      <Eyebrow>Sub-CPMK 1 · Contoh Hitung</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 88,
          fontWeight: 600,
          margin: '24px 0 48px',
          lineHeight: 1.1,
        }}
      >
        Contoh: gaji bersih Rp 10 jt / bulan
      </h2>
    </div>
    <div style={{ display: 'flex', gap: 32 }}>
      <div style={{ flex: 1.2, display: 'flex', flexDirection: 'column', gap: 20 }}>
        <CalcRow delay={100} l="Penghasilan bersih / tahun" v="Rp 120.000.000" />
        <CalcRow delay={220} l="Nisab (85 gr × Rp 1.300.000)" v="Rp 110.500.000" />
        <div style={{ ...fade(340), display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 36px', background: 'var(--osd-accent)', borderRadius: 'var(--osd-radius)' }}>
          <span style={{ fontSize: 30, fontWeight: 600 }}>Penghasilan ≥ nisab → wajib zakat</span>
          <span style={{ fontSize: 36, fontWeight: 700 }}>✓</span>
        </div>
      </div>
      <div style={{ ...fade(420), flex: 1, background: primary, color: surface, borderRadius: 'var(--osd-radius)', padding: '40px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 26, letterSpacing: '0.14em', textTransform: 'uppercase', opacity: 0.85 }}>Zakat terutang</div>
        <div style={{ fontSize: 72, fontWeight: 300, fontFamily: 'var(--osd-font-display)', margin: '20px 0 8px' }}>Rp 3.000.000</div>
        <div style={{ fontSize: 26, opacity: 0.9 }}>per tahun · = 2,5% × Rp 120 jt</div>
        <div style={{ fontSize: 26, marginTop: 16, opacity: 0.9 }}>≈ Rp 250.000 / bulan</div>
      </div>
    </div>
    <Footer />
  </div>
);

const CalcRow = ({ delay, l, v }: { delay: number; l: string; v: string }) => (
  <div style={{ ...fade(delay), display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 36px', background: surface, borderRadius: 'var(--osd-radius)', border: `1px solid ${line}` }}>
    <span style={{ fontSize: 30, color: muted }}>{l}</span>
    <span style={{ fontSize: 36, fontWeight: 600 }}>{v}</span>
  </div>
);

// 6 — Zakat vs Pajak
const Banding: Page = () => (
  <div style={{ ...fill, padding: '110px 130px' }}>
    <div style={fade()}>
      <Eyebrow>Sub-CPMK 2</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 88,
          fontWeight: 600,
          margin: '24px 0 48px',
          lineHeight: 1.1,
        }}
      >
        Zakat bukan pajak
      </h2>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24, fontSize: 30 }}>
      <div style={{ fontWeight: 700, paddingBottom: 12, borderBottom: `2px solid ${line}` }}>Aspek</div>
      <div style={{ fontWeight: 700, color: primary, paddingBottom: 12, borderBottom: `2px solid ${primary}` }}>Zakat</div>
      <div style={{ fontWeight: 700, paddingBottom: 12, borderBottom: `2px solid ${line}` }}>Pajak</div>
      <CmpCell a="Dasar" z="Syariat — dalil Al-Qur'an & hadis" p="Undang-undang negara" />
      <CmpCell a="Sifat" z="Ibadah, rukun Islam" p="Kewajiban warga negara" />
      <CmpCell a="Tujuan" z="Membersihkan harta & jiwa" p="Pembiayaan negara" />
      <CmpCell a="Pengelola" z="BAZNAS / LAZ" p="Pemerintah (DJP)" />
    </div>
    <div style={{ ...fade(420), marginTop: 40, fontSize: 28, color: muted, maxWidth: 1300 }}>
      Zakat tidak menggugurkan pajak, dan sebaliknya. Keduanya berjalan sendiri-sendiri.
    </div>
    <Footer />
  </div>
);

const CmpCell = ({ a, z, p }: { a: string; z: string; p: string }) => (
  <>
    <div style={{ padding: '20px 0', borderBottom: `1px solid ${line}`, color: muted }}>{a}</div>
    <div style={{ padding: '20px 0', borderBottom: `1px solid ${line}` }}>{z}</div>
    <div style={{ padding: '20px 0', borderBottom: `1px solid ${line}` }}>{p}</div>
  </>
);

// 7 — UU Zakat
const UU: Page = () => (
  <div style={{ ...fill, padding: '110px 130px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <div style={fade()}>
      <Eyebrow>Sub-CPMK 2 · Regulasi</Eyebrow>
      <h2
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 88,
          fontWeight: 600,
          margin: '24px 0 48px',
          lineHeight: 1.1,
        }}
      >
        UU No. 23 Tahun 2011
      </h2>
      <p style={{ fontSize: 32, color: muted, maxWidth: 1300, lineHeight: 1.6, margin: '0 0 48px' }}>
        Tentang Pengelolaan Zakat — menggantikan UU No. 38 Tahun 1999.
      </p>
    </div>
    <Steps>
      <Step duration={300}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', padding: '30px 40px', background: surface, borderRadius: 'var(--osd-radius)', border: `1px solid ${line}`, marginBottom: 24, fontSize: 32 }}>
          <span style={{ fontSize: 40, color: 'var(--osd-accent)', fontWeight: 700 }}>22</span>
          <span style={{ lineHeight: 1.5 }}>
            Zakat yang dibayar muzaki kepada <b style={{ color: primary }}>BAZNAS atau LAZ</b> dikurangkan dari penghasilan kena pajak.
          </span>
        </div>
      </Step>
      <Step duration={300}>
        <div style={{ display: 'flex', gap: 28, alignItems: 'flex-start', padding: '30px 40px', background: surface, borderRadius: 'var(--osd-radius)', border: `1px solid ${line}`, fontSize: 32 }}>
          <span style={{ fontSize: 40, color: 'var(--osd-accent)', fontWeight: 700 }}>✓</span>
          <span style={{ lineHeight: 1.5 }}>
            Syaratnya: bayar lewat lembaga resmi, bukan langsung ke mustahik. Nanti pengurangnya diakui saat lapor pajak.
          </span>
        </div>
      </Step>
    </Steps>
    <div style={{ ...fade(420), marginTop: 40, fontSize: 28, color: muted, maxWidth: 1300 }}>
      Ikhlas tetap hitungan akhirat — pengurang pajak hanyalah bonus dari negara.
    </div>
    <Footer />
  </div>
);

// 8 — Penutup
const Penutup: Page = () => (
  <div style={{ ...fill, position: 'relative', padding: '120px 130px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
    <div style={{ position: 'absolute', right: 140, bottom: 120, opacity: 0.09 }}>
      <StarMotif size={400} />
    </div>
    <div style={fade()}>
      <Eyebrow>Kesimpulan</Eyebrow>
    </div>
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 104,
        fontWeight: 300,
        lineHeight: 1.08,
        letterSpacing: '-0.02em',
        margin: '32px 0',
        maxWidth: 1500,
      }}
    >
      Zakat bukan beban.
      <br />
      Ia <span style={{ color: primary, fontWeight: 400 }}>membersihkan harta</span>.
    </h2>
    <p style={{ ...fade(160), fontSize: 32, color: muted, maxWidth: 1100, lineHeight: 1.6 }}>
      Kenali harta wajib zakat, hitung dengan benar, tunaikan lewat BAZNAS/LAZ.
    </p>
    <div style={{ ...fade(280), marginTop: 48, fontSize: 28, color: primary, fontWeight: 500 }}>
      Diskusi & tanya jawab.
    </div>
    <Footer />
  </div>
);

export const meta: SlideMeta = {
  title: 'Zakat: Harta yang Wajib Dizakati',
  createdAt: '2026-10-19T08:16:08Z',
  theme: 'zellige-green',
};

export default [Cover, Indikator, Harta, Profesi, Contoh, Banding, UU, Penutup] satisfies Page[];
