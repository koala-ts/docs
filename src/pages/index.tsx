import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Layout from '@theme/Layout';
import {Button} from '@site/src/components/landing/Button';
import {Card} from '@site/src/components/landing/Card';
import {CodeExampleTabs} from '@site/src/components/landing/CodeExampleTabs';
import {Container} from '@site/src/components/landing/Container';
import {Section} from '@site/src/components/landing/Section';
import {
  architectureCards,
  codeTabs,
  featureItems,
  gettingStartedSteps,
  ideaPoints,
  modelSteps,
  problemPoints,
  proofItems,
} from '@site/src/components/landing/content';
import styles from '@site/src/components/landing/landing.module.css';

export default function Home(): React.JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  const {docsIntroPath, docsQuickStartPath} = siteConfig.customFields as {
    docsIntroPath: string;
    docsQuickStartPath: string;
  };
  const docsUrl = useBaseUrl(docsIntroPath);
  const getStartedUrl = useBaseUrl(docsQuickStartPath);

  return (
    <Layout
      title={siteConfig.title}
      description="KoalaTs documentation for structured TypeScript backend teams."
    >
      <main className={styles.page}>
        <Container>
          <section className={styles.hero}>
            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <p className={styles.eyebrow}>KoalaTs for backend teams</p>
                <h1 className={styles.heroTitle}>
                  Function-first TypeScript backends with one readable shape
                </h1>
                <p className={styles.heroText}>
                  KoalaTs gives Node teams a consistent service model: configure
                  the application once, compose backend behavior from explicit
                  functions, and use framework utilities for the work that every
                  backend service usually needs.
                </p>
                <div className={styles.buttonRow}>
                  <Button to={getStartedUrl}>Build your first service</Button>
                  <Button to={docsUrl} variant="secondary">
                    Explore the docs
                  </Button>
                </div>
              </div>
              <div className={styles.architecturePanel}>
                <div className={styles.panelHeader}>
                  <div>
                    <p className={styles.panelEyebrow}>Function-first flow</p>
                    <h2 className={styles.panelTitle}>
                      One service shape from setup to response
                    </h2>
                  </div>
                  <span className={styles.panelBadge}>Function-first</span>
                </div>
                <div
                  className={styles.flowGrid}
                  aria-label="KoalaTs request flow"
                >
                  <div className={styles.flowStep}>
                    <span className={styles.flowIndex}>01</span>
                    <h3>Config</h3>
                    <p>Register routes, middleware, static files, and events.</p>
                  </div>
                  <div className={styles.flowStep}>
                    <span className={styles.flowIndex}>02</span>
                    <h3>Pipeline</h3>
                    <p>Apply validation, security, and request flow concerns.</p>
                  </div>
                  <div className={styles.flowStep}>
                    <span className={styles.flowIndex}>03</span>
                    <h3>Handler</h3>
                    <p>Run application behavior with explicit HTTP primitives.</p>
                  </div>
                  <div className={styles.flowStep}>
                    <span className={styles.flowIndex}>04</span>
                    <h3>Utilities</h3>
                    <p>
                      Use testing, serialization, passwords, and request scope
                      when needed.
                    </p>
                  </div>
                </div>
                <pre className={styles.panelCode}>
                  <code>{`const app = create({
  routes,
  globalMiddleware,
  staticFiles,
});`}</code>
                </pre>
              </div>
            </div>
            <div className={styles.proofStrip}>
              {proofItems.map((item) => (
                <div key={item.value} className={styles.proofItem}>
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </section>

          <Section
            id="problem"
            eyebrow="Team consistency"
            title="Give every service the same readable starting point"
            description="KoalaTs turns backend structure into a shared framework decision: application setup, request flow, validation, security, and supporting utilities follow the same model from service to service."
          >
            <div className={styles.splitGrid}>
              <Card className={styles.statementCard}>
                <h3 className={styles.statementTitle}>
                  Consistency works best when the code still reads plainly.
                </h3>
                <p className={styles.statementText}>
                  KoalaTs keeps the common path explicit: configure the
                  service, compose behavior from functions, and keep the request
                  and response model visible enough for the team to review.
                </p>
              </Card>
              <Card className={styles.listCard}>
                <ul className={styles.copyList}>
                  {problemPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </Card>
            </div>
          </Section>

          <Section
            id="idea"
            eyebrow="Framework model"
            title="Function-first pieces, composed in a predictable order"
          >
            <div className={styles.modelGrid}>
              <div className={styles.modelIntro}>
                <p className={styles.sectionDescription}>
                  The framework shape is deliberately simple: one application
                  configuration, function-first routes and middleware, explicit
                  HTTP primitives, and focused utilities that support the
                  service without hiding the flow.
                </p>
                <ul className={styles.copyList}>
                  {ideaPoints.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.modelSteps}>
                {modelSteps.map((step, index) => (
                  <Card key={step.title} className={styles.modelStepCard}>
                    <span className={styles.stepNumber}>{index + 1}</span>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepText}>{step.body}</p>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          <Section
            id="what-you-get"
            eyebrow="Capabilities"
            title="A practical framework surface around that model"
          >
            <div className={styles.featureGrid}>
              {featureItems.map((item) => (
                <Card key={item.title}>
                  <h3 className={styles.featureCardTitle}>{item.title}</h3>
                  <p className={styles.featureCardText}>{item.description}</p>
                </Card>
              ))}
            </div>
          </Section>

          <Section
            id="code-examples"
            eyebrow="Examples"
            title="Start from the application, then follow the functions"
            description="The examples move in the same order as the framework story: create the app, register a route, and compose validation as middleware."
          >
            <CodeExampleTabs tabs={codeTabs} />
          </Section>

          <Section
            id="architecture"
            eyebrow="Architecture"
            title="Architecture by explicit composition"
          >
            <div className={styles.architectureGrid}>
              <Card className={styles.statementCard}>
                <p className={styles.sectionDescription}>
                  KoalaTs keeps architecture close to the code: setup is
                  configuration, request flow is middleware, backend behavior is
                  composed from functions, and supporting utilities stay in
                  their lane. The result is a service shape the team can discuss
                  and change without decoding hidden framework state.
                </p>
                <ul className={styles.architectureList}>
                  <li>Application setup remains visible in configuration.</li>
                  <li>Routes, middleware, and validators compose as functions.</li>
                  <li>Security, testing, and serialization stay focused.</li>
                </ul>
              </Card>
              <div className={styles.architectureCardGrid}>
                {architectureCards.map((card) => (
                  <Card
                    key={card.title}
                    className={styles.architectureDetailCard}
                  >
                    <h3 className={styles.featureCardTitle}>{card.title}</h3>
                    <p className={styles.featureCardText}>{card.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </Section>

          <Section
            id="getting-started"
            eyebrow="Getting Started"
            title="Start small, keep the service shape"
          >
            <div className={styles.stepsGrid}>
              {gettingStartedSteps.map((step, index) => (
                <Card key={step.title}>
                  <span className={styles.stepNumber}>{index + 1}</span>
                  <h3 className={styles.stepTitle}>{step.title}</h3>
                  <p className={styles.stepText}>{step.body}</p>
                </Card>
              ))}
            </div>
          </Section>

          <Section className={styles.ctaSection}>
            <Card className={styles.ctaCard}>
              <h2 className={styles.ctaTitle}>
                Build the first function-first service your team can reuse
              </h2>
              <p className={styles.ctaText}>
                Use the quick start to create a running KoalaTs application, or
                read the framework guide to understand the application
                configuration, function-first routing, validation, request, and
                response model before you build.
              </p>
              <div className={styles.buttonRow}>
                <Button to={getStartedUrl}>Build your first service</Button>
                <Button to={docsUrl} variant="secondary">
                  Read the framework guide
                </Button>
              </div>
            </Card>
          </Section>
        </Container>
      </main>
    </Layout>
  );
}
