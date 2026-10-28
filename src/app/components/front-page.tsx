"use client";
import { motion } from "motion/react";
import Cited from "./citation";
import Container from "./container";
import { SOURCES } from "../data/sources";

export type PondStats = {
    koi?: number;
    pellets?: number;
    sharks?: number;
    fish?: number;
};

export type FrontPageProps = {
    stats?: PondStats;
};

const SOCIALS = [
    { label: "github", href: "https://github.com/rocket-fuel86" },
];

const UNDERLINE =
    "underline decoration-[color-mix(in_srgb,var(--foreground-color)_35%,transparent)] decoration-1 underline-offset-[5px] outline-none transition-opacity duration-150 hover:decoration-foreground focus-visible:decoration-foreground";

const QuoteLines = () => (
    <>
        in an ocean of gluttony,
        <br />
        cast a fine net
        <span
            aria-hidden="true"
            className="ml-1 inline-block h-[1em] w-[0.55em] translate-y-[0.15em] animate-blink bg-foreground motion-reduce:animate-none"
        />
    </>
);

const Socials = ({ className }: { className?: string }) => (
    <p className={className}>
        {SOCIALS.map(({ label, href }, i) => (
            <span key={label}>
                {i > 0 && <span className="opacity-40"> / </span>}
                <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${UNDERLINE} opacity-60 hover:opacity-100 focus-visible:opacity-100`}
                >
                    {label}
                </a>
            </span>
        ))}
    </p>
);

const FrontPage = ({ stats }: FrontPageProps = {}) => (
    <>
        {mobilePage()}
        {desktopPage({ stats })}
    </>
);

const desktopPage = ({ stats }: FrontPageProps = {}) => {
    return (
        <Container
            as="header"
            className="relative flex h-full flex-col justify-end gap-10 max-lg:hidden bg-transparent pb-32 pt-32 text-foreground [@media(max-height:720px)]:gap-6 [@media(max-height:720px)]:pb-12 [@media(max-height:720px)]:pt-20"
        >
            {stats?.koi != null && stats.koi > 0 && (
                <div
                    data-koi-avoid
                    aria-hidden="true"
                    className="absolute right-6 top-8 font-geistMono text-[11px] leading-relaxed tabular-nums lg:right-[20vw]"
                >
                    <div className="opacity-[0.32]">{stats.koi}</div>
                    {/* The pellet count flashes each time it changes, tying a click or a bite to the number. */}
                    <motion.div
                        key={stats.pellets}
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 0.32 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                        {stats.pellets}
                    </motion.div>
                </div>
            )}
            <div className="w-fit max-w-[54rem] rounded-2xl p-6 sm:p-8 backdrop-blur-md bg-[color-mix(in_srgb,var(--background-color)_72%,transparent)] border border-[color-mix(in_srgb,var(--foreground-color)_8%,transparent)] shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex flex-col gap-8 [@media(max-height:720px)]:gap-5 [@media(max-height:720px)]:p-6 transition-colors duration-200">
                <motion.blockquote
                    data-koi-avoid
                    className="font-geistMono text-[14px] lowercase leading-relaxed tracking-[0.02em]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 0.4 }}
                >
                    <QuoteLines />
                </motion.blockquote>
                <motion.div
                    data-koi-avoid
                    className="cited-prose font-geistMono text-[15px] leading-[max(22px,3vh)]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <h1>Hey there! I&apos;m Vlad.</h1>
                    <p>
                        Software Engineer student at ITStep Academy, passionate about building the
                        future.
                    </p>
                    <p>
                        Currently, studying Machine Learning.
                    </p>
                    <Socials className="mt-[1.5vh]" />
                </motion.div>
            </div>
        </Container>
    );
};

// Hover cards need a pointer, so on touch the mentions link straight to each site.
const MobileLink = ({ source, children }: { source: string; children: React.ReactNode }) => (
    <a href={SOURCES[source].href} target="_blank" rel="noopener noreferrer" className={UNDERLINE}>
        {children}
    </a>
);

const mobilePage = () => {
    return (
        // Top padding clears the floating nav pill.
        <Container
            as="header"
            className="flex h-full flex-col justify-end gap-8 lg:hidden bg-transparent pb-12 pt-28 font-geistMono text-foreground [@media(max-height:640px)]:gap-5 [@media(max-height:640px)]:pb-8"
        >
            <div className="w-full rounded-2xl p-5 backdrop-blur-md bg-[color-mix(in_srgb,var(--background-color)_72%,transparent)] border border-[color-mix(in_srgb,var(--foreground-color)_8%,transparent)] shadow-[0_8px_32px_rgba(0,0,0,0.06)] flex flex-col gap-5 transition-colors duration-200">
                <motion.blockquote
                    data-koi-avoid
                    className="text-[13px] lowercase leading-relaxed tracking-[0.02em]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 0.4 }}
                >
                    <QuoteLines />
                </motion.blockquote>
                <motion.div
                    data-koi-avoid
                    className="flex flex-col gap-3 text-[14px] leading-[1.6]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                >
                    <h1>Hey there! I&apos;m Vlad.</h1>
                    <p>
                        Software Engineer student at ITStep Academy, passionate about building the
                        future.
                    </p>
                    <p>
                        Currently, studying Machine Learning.
                    </p>
                    <Socials className="mt-2" />
                </motion.div>
            </div>
        </Container>
    );
};

export default FrontPage;
