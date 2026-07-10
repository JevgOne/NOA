import { type Locale, getT } from '@/lib/i18n';
import { menuSchema } from '@/lib/seo';
import MenuSections from '@/components/MenuSections';
import Footline from '@/components/Footline';
import LeafRule from '@/components/LeafRule';
import JsonLd from '@/components/JsonLd';

export default function MenuContent({ locale }: { locale: Locale }) {
  const t = getT(locale);
  return (
    <main id="main">
      <div className="container">
        <div className="page-head">
          <LeafRule marginBottom="1rem" />
          <h1>{t('menuH')}</h1>
        </div>
        <MenuSections locale={locale} />
        <Footline locale={locale} />
      </div>
      <JsonLd data={menuSchema(locale)} />
    </main>
  );
}
