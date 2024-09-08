import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Semplice e veloce',
    Svg: require('@site/static/img/undraw_online_transactions.svg').default,
    description: (
      <>
        Sagrest è pensato fin dalle basi per permettere un semplice utilizzo
        da parte di tutti, sia cassieri che organizzatori.
      </>
    ),
  },
  {
    title: 'Concentrati sul tuo evento',
    Svg: require('@site/static/img/undraw_cooking.svg').default,
    description: (
      <>
        Gestisci in modo semplice e veloce le ordinazioni del tuo evento,
        senza dover preoccuparti di tenere aggiornati inventario e statistiche.
      </>
    ),
  },
  {
    title: 'Ordini online',
    Svg: require('@site/static/img/undraw_online_groceries.svg').default,
    description: (
      <>
        Permette agli utenti del tuo evento di ordinare anche da telefono.
        In questo modo, riduci le code e aumenti la soddisfazione dei tuoi clienti.
      </>
    ),
  },
];

function Feature({title, Svg, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
