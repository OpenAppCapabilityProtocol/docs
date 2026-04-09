import {
  OacpCardMark,
  SdkCardMarks,
} from "@/components/brand/landing-card-icons";
import { OacpWordmark } from "@/components/brand/oacp-wordmark";
import Image from "next/image";
import Link from "next/link";
import type React from "react";

export default function LandingPage() {
  return (
    <main className="w-full">
      {/* Header */}
      <header className="w-full border-b border-[var(--neutral-border-subtle)]">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link href="/" className="flex items-center gap-3">
            <div className="relative h-10 w-[150px] sm:w-[170px]">
              <OacpWordmark
                priority={true}
                sizes="(max-width: 640px) 150px, 170px"
              />
            </div>
            <span className="hidden text-sm text-[var(--neutral-text-secondary)] sm:inline">
              Open App Capability Protocol
            </span>
          </Link>
          <nav className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/docs"
              className="rounded-md px-3 py-2 text-sm font-medium text-[var(--neutral-text)] hover:bg-[var(--neutral-surface)]"
            >
              Docs
            </Link>
            <Link
              href="/docs/roadmap"
              className="hidden rounded-md px-3 py-2 text-sm font-medium text-[var(--neutral-text)] hover:bg-[var(--neutral-surface)] sm:inline-block"
            >
              Roadmap
            </Link>
            <a
              href="https://github.com/OpenAppCapabilityProtocol"
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-[var(--neutral-border)] px-3 py-2 text-sm font-medium text-[var(--neutral-text)] hover:bg-[var(--neutral-surface)]"
            >
              GitHub
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pt-16 pb-12 sm:pt-24 sm:pb-16">
        <div className="relative mb-6 h-[52px] w-[210px] sm:h-[72px] sm:w-[290px]">
          <OacpWordmark
            className="object-contain object-left"
            priority={true}
            sizes="(max-width: 640px) 210px, 290px"
          />
        </div>
        <h1 className="mb-6 max-w-3xl text-4xl font-bold tracking-tight text-[var(--neutral-text)] sm:text-5xl">
          Extend any Android app's capabilities to any on-device AI assistant.
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-[var(--neutral-text-secondary)]">
          OACP gives apps a simple way to describe what they can do, and gives
          assistants a standard way to discover and invoke those actions on
          device.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/docs"
            className="rounded-md bg-[var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[var(--brand-primary-hover)]"
          >
            Read the docs
          </Link>
          <Link
            href="/docs/oacp/getting-started"
            className="rounded-md border border-[var(--neutral-border)] px-5 py-3 text-sm font-semibold text-[var(--neutral-text)] hover:bg-[var(--neutral-surface)]"
          >
            Integrate your app
          </Link>
          <a
            href="https://github.com/OpenAppCapabilityProtocol"
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-[var(--neutral-border)] px-5 py-3 text-sm font-semibold text-[var(--neutral-text)] hover:bg-[var(--neutral-surface)]"
          >
            View on GitHub
          </a>
        </div>
      </section>

      {/* Three-card grid */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-8 text-2xl font-bold text-[var(--neutral-text)]">
          Start in the right place
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <ProjectCard
            eyebrow="Protocol"
            title="OACP"
            description="The open standard. oacp.json declares capabilities, ContentProviders expose them, Intents invoke them."
            href="/docs/oacp/what-is-oacp"
            cta="Read the protocol"
            badge={
              <OacpCardMark className="h-10 w-10 text-[var(--brand-primary)]" />
            }
          />
          <ProjectCard
            eyebrow="Open-source assistant"
            title="Hark"
            description="Voice assistant built on OACP. Two-stage on-device AI pipeline: EmbeddingGemma for intent, Qwen3 for slot filling."
            href="/docs/hark/overview"
            cta="Meet Hark"
            mascot="/oacp-hark-logo.png"
          />
          <ProjectCard
            eyebrow="SDKs"
            title="SDKs"
            description="Kotlin ships today. Flutter and React Native are under development and visible in the docs so contributors can follow along."
            href="/docs/sdks/kotlin/quick-start"
            cta="Get the SDK"
            badge={
              <SdkCardMarks className="flex items-center gap-1 text-[var(--brand-primary)]" />
            }
          />
        </div>
      </section>

      {/* How it works */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="mb-6 text-2xl font-bold text-[var(--neutral-text)]">
          How it works
        </h2>
        <div className="grid gap-8 lg:grid-cols-2">
          <div>
            <ol className="space-y-4 text-[var(--neutral-text)]">
              <Step
                n={1}
                title="Describe the app"
                body="The app ships oacp.json and OACP.md so an assistant can understand the actions, parameters, and vocabulary."
              />
              <Step
                n={2}
                title="Discover capabilities"
                body="An OACP-compatible assistant scans the device for .oacp ContentProviders and reads each manifest at runtime."
              />
              <Step
                n={3}
                title="Match the request"
                body="The assistant uses its on-device pipeline to match the user's request to the best capability and extract any parameters."
              />
              <Step
                n={4}
                title="Invoke the app"
                body="The assistant dispatches an Android intent. Background tasks use broadcasts and UI flows use activities."
              />
              <Step
                n={5}
                title="Return the result"
                body="If the action is async, the app sends a structured result back and the assistant can speak or display it."
              />
            </ol>
          </div>
          <pre className="overflow-x-auto rounded-lg border border-[var(--neutral-border-subtle)] bg-[var(--neutral-surface)] p-5 text-xs text-[var(--neutral-text)] sm:text-sm">
            {` ┌──────────────────────────┐        ┌──────────────────────────┐
 │  Any Android app         │        │  Hark (voice assistant)  │
 │  + OACP Kotlin SDK       │◀──────▶│  on-device AI pipeline   │
 │  + oacp.json / OACP.md   │  OACP  │  discovers + dispatches  │
 └──────────────────────────┘        └──────────────────────────┘
              ▲                                    ▲
              └──────── OACP Protocol ─────────────┘
                   (content providers + intents)`}
          </pre>
        </div>
      </section>

      {/* Roadmap teaser */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-xl border border-[var(--neutral-border-subtle)] bg-[var(--neutral-surface)] p-8">
          <h2 className="mb-3 text-2xl font-bold text-[var(--neutral-text)]">
            What Is Being Cooked
          </h2>
          <p className="mb-6 max-w-2xl text-[var(--neutral-text-secondary)]">
            A fuller open-source AI assistant with on-device AI, a stronger
            protocol, more SDKs, and more real apps using OACP. The current docs
            stay a little unfinished on purpose so the next contributors can see
            where help is needed.
          </p>
          <Link
            href="/docs/roadmap"
            className="inline-block rounded-md border border-[var(--brand-primary)] px-5 py-2 text-sm font-semibold text-[var(--brand-primary-text)] hover:bg-[var(--brand-primary-light)]"
          >
            See the full roadmap
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-12 border-t border-[var(--neutral-border-subtle)]">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-4 px-6 py-8 sm:flex-row sm:items-center">
          <div className="text-sm text-[var(--neutral-text-secondary)]">
            Apache 2.0 licensed. Built in the open at{" "}
            <a
              href="https://github.com/OpenAppCapabilityProtocol"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--brand-primary-text)] hover:underline"
            >
              github.com/OpenAppCapabilityProtocol
            </a>
            .
          </div>
          <div className="flex gap-4 text-sm">
            <Link
              href="/docs"
              className="text-[var(--neutral-text-secondary)] hover:text-[var(--neutral-text)]"
            >
              Docs
            </Link>
            <Link
              href="/docs/roadmap"
              className="text-[var(--neutral-text-secondary)] hover:text-[var(--neutral-text)]"
            >
              Roadmap
            </Link>
            <a
              href="https://github.com/OpenAppCapabilityProtocol"
              target="_blank"
              rel="noreferrer"
              className="text-[var(--neutral-text-secondary)] hover:text-[var(--neutral-text)]"
            >
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}

function ProjectCard({
  eyebrow,
  title,
  description,
  href,
  cta,
  badge,
  mascot,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  badge?: React.ReactNode;
  mascot?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col rounded-xl border border-[var(--neutral-border-subtle)] bg-[var(--neutral-surface)] p-6 transition-colors hover:border-[var(--brand-primary)]"
    >
      <div className="mb-3 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[var(--brand-primary-text)]">
          {eyebrow}
        </span>
        {badge}
        {mascot && (
          <Image
            src={mascot}
            alt=""
            width={40}
            height={40}
            className="rounded-md"
          />
        )}
      </div>
      <h3 className="mb-2 text-xl font-bold text-[var(--neutral-text)]">
        {title}
      </h3>
      <p className="mb-4 flex-1 text-sm text-[var(--neutral-text-secondary)]">
        {description}
      </p>
      <span className="text-sm font-semibold text-[var(--brand-primary-text)] group-hover:underline">
        {cta} →
      </span>
    </Link>
  );
}

function Step({
  n,
  title,
  body,
}: {
  n: number;
  title: string;
  body: string;
}) {
  return (
    <li className="flex gap-4">
      <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[var(--brand-primary)] text-sm font-bold text-white">
        {n}
      </div>
      <div>
        <div className="font-semibold text-[var(--neutral-text)]">{title}</div>
        <div className="text-sm text-[var(--neutral-text-secondary)]">
          {body}
        </div>
      </div>
    </li>
  );
}
