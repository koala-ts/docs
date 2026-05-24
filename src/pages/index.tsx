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
                  TypeScript services your team can read the same way
                </h1>
                <p className={styles.heroText}>
                  KoalaTs gives Node teams a function-first backend framework
                  with visible service wiring, explicit request handling, and
                  framework utilities for the work every service has to repeat.
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
                      From application setup to HTTP response
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
                    <p>Declare the service entry points before requests run.</p>
                  </div>
                  <div className={styles.flowStep}>
                    <span className={styles.flowIndex}>02</span>
                    <h3>Pipeline</h3>
                    <p>Put validation and security where reviewers can see it.</p>
                  </div>
                  <div className={styles.flowStep}>
                    <span className={styles.flowIndex}>03</span>
                    <h3>Handler</h3>
                    <p>Handle request data and response data directly.</p>
                  </div>
                  <div className={styles.flowStep}>
                    <span className={styles.flowIndex}>04</span>
                    <h3>Utilities</h3>
                    <p>Reach for focused helpers without hiding the flow.</p>
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
            eyebrow="Team friction"
            title="Backend code gets harder to review when every service invents its own shape"
            description="Teams lose time when setup is scattered, middleware order is implicit, and contributors have to rediscover the local service pattern before they can make a safe change."
          >
            <div className={styles.splitGrid}>
              <Card className={styles.statementCard}>
                <h3 className={styles.statementTitle}>
                  The framework should make the common path visible.
                </h3>
                <p className={styles.statementText}>
                  KoalaTs is built for teams that want backend conventions to be
                  easy to inspect in code review, not hidden behind local
                  patterns that differ from project to project.
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
            title="A small set of explicit pieces, composed in order"
          >
            <div className={styles.modelGrid}>
              <div className={styles.modelIntro}>
                <p className={styles.sectionDescription}>
                  KoalaTs keeps the service model practical: application
                  configuration defines the entry points, routes and middleware
                  stay as functions, HTTP state stays visible at the boundary,
                  and utilities solve specific backend jobs.
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
            title="The framework surface teams usually need around HTTP work"
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
            description="The examples follow the same path a reviewer follows: application setup, route behavior, then validation middleware."
          >
            <CodeExampleTabs tabs={codeTabs} />
          </Section>

          <Section
            id="getting-started"
            eyebrow="Getting Started"
            title="Evaluate the model, then build from it"
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
                Try the service shape or read the model first
              </h2>
              <p className={styles.ctaText}>
                Use the quick start to create a running service, or read the
                framework guide before you bring the pattern to a team codebase.
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
