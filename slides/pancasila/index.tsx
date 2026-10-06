import type { DesignSystem, Page, SlideMeta, SlideTransition } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';

const bg = '#faf6f0';
const text = '#1c1917';
const accent = '#c2410c';
const muted = '#78716c';
const line = '#e7e0d5';

export const design: DesignSystem = {
  palette: { bg, text, accent },
  fonts: {
    display: "system-ui, -apple-system, 'Segoe UI', sans-serif",
    body: "system-ui, -apple-system, 'Segoe UI', sans-serif",
  },
  typeScale: { hero: 160, body: 36 },
  radius: 0,
};

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const HOLD: Keyframe[] = [{ opacity: 1 }, { opacity: 1 }];

export const transition: SlideTransition = {
  duration: 240,
  exit: { duration: 240, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 240,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

const styles = `
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fade-up-eyebrow {
  animation: fadeUp 0.35s ease-out both;
}
.fade-up-title {
  animation: fadeUp 0.4s ease-out 0.06s both;
}
`;

const StyleInjector = () => <style>{styles}</style>;

const fill = {
  width: '100%',
  height: '100%',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative' as const,
  boxSizing: 'border-box' as const,
};

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div
    className="fade-up-eyebrow"
    style={{
      fontSize: 26,
      fontWeight: 600,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--osd-accent)',
      paddingBottom: 18,
      borderBottom: `2px solid ${line}`,
    }}
  >
    {children}
  </div>
);

const Title = ({ children, size = 160 }: { children: React.ReactNode; size?: number }) => (
  <h1
    className="fade-up-title"
    style={{
      fontFamily: 'var(--osd-font-display)',
      fontSize: size,
      fontWeight: 900,
      lineHeight: 1.06,
      letterSpacing: '-0.02em',
      margin: 0,
      maxWidth: 1550,
      color: 'var(--osd-text)',
    }}
  >
    {children}
  </h1>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 140,
        right: 140,
        bottom: 52,
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 22,
        letterSpacing: '0.08em',
        color: muted,
        borderTop: `1px solid ${line}`,
        paddingTop: 18,
      }}
    >
      <span>PANCASILA · DASAR NEGARA REPUBLIK INDONESIA</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const SilaCard = ({
  number,
  symbol,
  title,
  description,
}: {
  number: string;
  symbol: string;
  title: string;
  description: string;
}) => (
  <div
    style={{
      flex: 1,
      borderLeft: `2px solid ${line}`,
      paddingLeft: 36,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}
  >
    <div
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 12,
      }}
    >
      <span
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--osd-accent)',
          letterSpacing: '0.08em',
        }}
      >
        {number}
      </span>
      <span
        style={{
          fontSize: 20,
          color: muted,
          letterSpacing: '0.04em',
        }}
      >
        · {symbol}
      </span>
    </div>
    <div
      style={{
        fontSize: 32,
        fontWeight: 700,
        lineHeight: 1.25,
        color: 'var(--osd-text)',
      }}
    >
      {title}
    </div>
    <div
      style={{
        fontSize: 26,
        color: muted,
        lineHeight: 1.5,
      }}
    >
      {description}
    </div>
  </div>
);

const ReflectionCard = ({
  category,
  silaScope,
  principle,
}: {
  category: string;
  silaScope: string;
  principle: string;
}) => (
  <div
    style={{
      flex: 1,
      borderTop: `2px solid ${line}`,
      paddingTop: 28,
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}
  >
    <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--osd-accent)', letterSpacing: '0.1em' }}>
      {category}
    </div>
    <div style={{ fontSize: 20, color: muted }}>{silaScope}</div>
    <div style={{ fontSize: 26, color: 'var(--osd-text)', lineHeight: 1.5, fontWeight: 500 }}>
      {principle}
    </div>
  </div>
);

const Cover: Page = () => (
  <div
    style={{
      ...fill,
      padding: '0 140px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    }}
  >
    <StyleInjector />
    <div style={{ maxWidth: 1400, display: 'flex', flexDirection: 'column', gap: 32 }}>
      <Eyebrow>DASAR NEGARA REPUBLIK INDONESIA</Eyebrow>
      <Title size={160}>Pancasila</Title>
      <p
        style={{
          fontSize: 36,
          color: muted,
          lineHeight: 1.5,
          margin: 0,
          maxWidth: 1200,
        }}
      >
        Lima fondasi moral, ideologi bangsa, dan pedoman luhur dalam merawat persatuan serta keadilan seluruh rakyat Indonesia.
      </p>
    </div>
    <Footer />
  </div>
);

const Sila1: Page = () => (
  <div
    style={{
      ...fill,
      padding: '130px 140px 100px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <StyleInjector />
    <Eyebrow>SILA PERTAMA · SIMBOL BINTANG</Eyebrow>
    <div style={{ marginTop: 40 }}>
      <Title size={84}>Ketuhanan Yang Maha Esa</Title>
      <p style={{ fontSize: 32, color: muted, lineHeight: 1.5, marginTop: 24, marginBottom: 0, maxWidth: 1350 }}>
        Fondasi spiritual bangsa yang mengakui eksistensi Tuhan serta menjamin kemerdekaan tiap warga negara untuk beribadah menurut agamanya.
      </p>
    </div>
    <div style={{ display: 'flex', gap: 48, marginTop: 64, maxWidth: 1500 }}>
      <SilaCard
        number="BUTIR 01"
        symbol="Toleransi Beragama"
        title="Kerukunan Antarumat"
        description="Membina saling menghormati dan bekerja sama antarumat beragama tanpa diskriminasi."
      />
      <SilaCard
        number="BUTIR 02"
        symbol="Kebebasan Berkeyakinan"
        title="Ketiadaan Paksaan"
        description="Menghargai pilihan keyakinan setiap insan dan menjamin ruang ibadah yang aman serta damai."
      />
    </div>
    <Footer />
  </div>
);

const Sila2: Page = () => (
  <div
    style={{
      ...fill,
      padding: '130px 140px 100px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <StyleInjector />
    <Eyebrow>SILA KEDUA · SIMBOL RANTAI EMAS</Eyebrow>
    <div style={{ marginTop: 40 }}>
      <Title size={80}>Kemanusiaan yang Adil dan Beradab</Title>
      <p style={{ fontSize: 32, color: muted, lineHeight: 1.5, marginTop: 24, marginBottom: 0, maxWidth: 1350 }}>
        Komitmen moral untuk memperlakukan setiap insan setara martabatnya, menegakkan hak asasi, dan menjunjung peradaban budi pekerti.
      </p>
    </div>
    <div style={{ display: 'flex', gap: 48, marginTop: 64, maxWidth: 1500 }}>
      <SilaCard
        number="BUTIR 01"
        symbol="Persamaan Derajat"
        title="Kesetaraan di Hadapan Hukum"
        description="Mengakui hak dan kewajiban asasi setiap manusia tanpa membedakan suku, keturunan, atau status."
      />
      <SilaCard
        number="BUTIR 02"
        symbol="Solidaritas Sosial"
        title="Tenggang Rasa & Kasih Sayang"
        description="Menumbuhkan kepedulian antarsesama, membela kebenaran, dan berani menyuarakan keadilan."
      />
    </div>
    <Footer />
  </div>
);

const Sila3: Page = () => (
  <div
    style={{
      ...fill,
      padding: '130px 140px 100px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <StyleInjector />
    <Eyebrow>SILA KETIGA · SIMBOL POHON BERINGIN</Eyebrow>
    <div style={{ marginTop: 40 }}>
      <Title size={84}>Persatuan Indonesia</Title>
      <p style={{ fontSize: 32, color: muted, lineHeight: 1.5, marginTop: 24, marginBottom: 0, maxWidth: 1350 }}>
        Mengutamakan keutuhan bangsa di atas kepentingan pribadi maupun golongan, bersatu dalam wadah Bhinneka Tunggal Ika.
      </p>
    </div>
    <div style={{ display: 'flex', gap: 48, marginTop: 64, maxWidth: 1500 }}>
      <SilaCard
        number="BUTIR 01"
        symbol="Cinta Tanah Air"
        title="Kebanggaan Kebangsaan"
        description="Menjaga kedaulatan, martabat wilayah, dan warisan budaya nusantara dengan rasa bangga."
      />
      <SilaCard
        number="BUTIR 02"
        symbol="Bhinneka Tunggal Ika"
        title="Harmoni Keragaman"
        description="Merajut persaudaraan di tengah perbedaan ribuan suku, bahasa, dan kebiasaan adat lokal."
      />
    </div>
    <Footer />
  </div>
);

const Sila4: Page = () => (
  <div
    style={{
      ...fill,
      padding: '120px 140px 100px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <StyleInjector />
    <Eyebrow>SILA KEEMPAT · SIMBOL KEPALA BANTENG</Eyebrow>
    <div style={{ marginTop: 32 }}>
      <Title size={62}>
        Kerakyatan yang Dipimpin oleh Hikmat Kebijaksanaan dalam Permusyawaratan/Perwakilan
      </Title>
      <p style={{ fontSize: 30, color: muted, lineHeight: 1.5, marginTop: 20, marginBottom: 0, maxWidth: 1400 }}>
        Kedaulatan di tangan rakyat yang dijalankan melalui musyawarah mufakat, akal sehat, dan kejujuran nurani demi kemaslahatan bersama.
      </p>
    </div>
    <div style={{ display: 'flex', gap: 48, marginTop: 52, maxWidth: 1500 }}>
      <SilaCard
        number="BUTIR 01"
        symbol="Musyawarah Mufakat"
        title="Dialog di Atas Pemaksaan"
        description="Mengutamakan diskusi terbuka untuk mencari titik temu tanpa mengorbankan suara minoritas."
      />
      <SilaCard
        number="BUTIR 02"
        symbol="Tanggung Jawab Moral"
        title="Amanah Keputusan"
        description="Menerima dan menjalankan hasil kesepakatan bersama dengan integritas dan kejujuran penuh."
      />
    </div>
    <Footer />
  </div>
);

const Sila5: Page = () => (
  <div
    style={{
      ...fill,
      padding: '130px 140px 100px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <StyleInjector />
    <Eyebrow>SILA KELIMA · SIMBOL PADI DAN KAPAS</Eyebrow>
    <div style={{ marginTop: 40 }}>
      <Title size={78}>Keadilan Sosial bagi Seluruh Rakyat Indonesia</Title>
      <p style={{ fontSize: 32, color: muted, lineHeight: 1.5, marginTop: 24, marginBottom: 0, maxWidth: 1350 }}>
        Cita-cita kemakmuran yang merata, perlindungan bagi kaum lemah, dan keseimbangan antara hak pribadi dengan tanggung jawab sosial.
      </p>
    </div>
    <div style={{ display: 'flex', gap: 48, marginTop: 64, maxWidth: 1500 }}>
      <SilaCard
        number="BUTIR 01"
        symbol="Pemerataan Kesejahteraan"
        title="Keadilan Ekonomi & Sosial"
        description="Memastikan akses pendidikan, kesehatan, dan penghidupan layak bagi seluruh warga negara."
      />
      <SilaCard
        number="BUTIR 02"
        symbol="Keseimbangan Hidup"
        title="Gotong Royong & Kerja Keras"
        description="Menjauhi gaya hidup boros, menghormati hak milik orang lain, serta saling membantu dalam kesulitan."
      />
    </div>
    <Footer />
  </div>
);

const Closing: Page = () => (
  <div
    style={{
      ...fill,
      padding: '130px 140px 100px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <StyleInjector />
    <Eyebrow>REFLEKSI & PENGAMALAN</Eyebrow>
    <div style={{ marginTop: 40 }}>
      <Title size={92}>Menghidupkan Pancasila</Title>
      <p style={{ fontSize: 32, color: muted, lineHeight: 1.5, marginTop: 24, marginBottom: 0, maxWidth: 1350 }}>
        Pancasila bukan sekadar teks sejarah untuk dihafal, melainkan kompas moral hidup yang menuntun laku kita setiap hari.
      </p>
    </div>
    <div style={{ display: 'flex', gap: 48, marginTop: 64, maxWidth: 1500 }}>
      <ReflectionCard
        category="PILAR MORAL"
        silaScope="Sila 1 & Sila 2"
        principle="Integritas spiritual dan pemuliaan martabat kemanusiaan sebagai fondasi nurani bangsa."
      />
      <ReflectionCard
        category="PILAR KEBANGSAAN"
        silaScope="Sila 3"
        principle="Persatuan dalam keragaman nusantara untuk menjaga keutuhan dan kedaulatan bersama."
      />
      <ReflectionCard
        category="PILAR KEADILAN"
        silaScope="Sila 4 & Sila 5"
        principle="Demokrasi musyawarah yang bermuara pada pemerataan kemakmuran dan keadilan sosial."
      />
    </div>
    <Footer />
  </div>
);

export const notes: (string | undefined)[] = [
  `Selamat datang. Pada presentasi hari ini, kita akan meninjau Pancasila bukan hanya sebagai rumusan formal kenegaraan, melainkan sebagai etika peradaban dan jati diri bangsa Indonesia.

Tegaskan bahwa lima sila ini adalah satu kesatuan organik yang saling menopang dari sila pertama hingga kelima.`,

  `Masuk ke Sila Pertama. Tekankan bahwa Indonesia bukan negara sekuler mutlak dan bukan negara teokrasi satu agama, melainkan negara yang berketuhanan.

Fokus bicara:
- Kemerdekaan memeluk keyakinan adalah hak konstitusional mutlak.
- Saling menghormati antarpemeluk iman adalah syarat mutlak stabilitas bangsa.`,

  `Pada Sila Kedua, angkat nilai kemanusiaan universal. Di tengah arus globalisasi, perlakuan adil dan beradab menjadi tolok ukur kemajuan bangsa.

Fokus bicara:
- Kesetaraan di hadapan hukum tanpa memandang kasta atau kekayaan.
- Menumbuhkan empati dan keberanian membela pihak yang tertindas.`,

  `Sila Ketiga adalah benteng keutuhan republik. Ingatkan audiens pada luasnya kepulauan Indonesia dengan lebih dari 700 bahasa daerah.

Fokus bicara:
- Keberagaman bukan ancaman, melainkan kekayaan strategis.
- Rela mendahulukan kepentingan bangsa ketika terjadi gesekan primordial.`,

  `Sila Keempat menggarisbawahi model demokrasi khas Indonesia: musyawarah mufakat, bukan sekadar voting mayoritas versus minoritas.

Fokus bicara:
- Pengambilan keputusan harus berlandaskan akal sehat dan hikmat kebijaksanaan.
- Menghormati hasil keputusan bersama dan melaksanakannya dengan itikad baik.`,

  `Sila Kelima adalah muara dari seluruh sila sebelumnya. Kemerdekaan tidak bermakna tanpa pemerataan keadilan bagi seluruh rakyat.

Fokus bicara:
- Tidak boleh ada warga yang tertinggal dalam akses pendidikan dan kesehatan.
- Gotong royong dan kepedulian sosial adalah manifestasi nyata keadilan sosial.`,

  `Sebagai penutup, ajak seluruh audiens merefleksikan peran masing-masing.

Pancasila hidup bukan di atas kertas undang-undang, tetapi di dalam kejujuran kita bekerja, toleransi kita bertetangga, dan kepedulian kita terhadap sesama anak bangsa.`,
];

export const meta: SlideMeta = {
  title: 'Pancasila',
  createdAt: '2026-10-06T02:11:17.464Z',
  theme: 'warm-editorial',
};

export default [Cover, Sila1, Sila2, Sila3, Sila4, Sila5, Closing] satisfies Page[];
