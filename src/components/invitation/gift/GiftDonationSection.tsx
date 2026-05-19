"use client";

import Image from "next/image";
import { m } from "framer-motion";
import type { BankDetails } from "@/types/invitation-content";
import { Container } from "@/components/layout/Container";
import { useMotionReduced } from "@/components/providers/MotionProvider";
import { bankDetailsToGift } from "@/lib/invitations/contentAdapter";
import { fadeUp, staggerContainer } from "@/lib/animations/variants";
import { cn } from "@/lib/utils/cn";
import { CopyAccountButton } from "./CopyAccountButton";
import type { GiftDonationSectionProps } from "./types";

function resolveGiftProps(props: GiftDonationSectionProps) {
  const { content, gift, bankDetails, message, title, qrCodeImage } = props;

  if (content) {
    const mapped = bankDetailsToGift(content.bankDetails);
    return {
      title: title ?? content.bankDetails?.title ?? mapped?.title ?? "Gifts & blessings",
      message:
        message ??
        content.bankDetails?.description ??
        mapped?.description,
      bank: content.bankDetails ?? mapped,
      qr: qrCodeImage ?? content.qrCodeImage,
      externalUrl: mapped?.externalUrl,
    };
  }

  if (gift) {
    return {
      title: title ?? gift.title,
      message: message ?? gift.description,
      bank: {
        bankName: gift.bankName,
        accountHolder: gift.accountHolder,
        accountNumber: gift.accountNumber,
        branchCode: gift.branchCode,
        reference: gift.reference,
      } satisfies BankDetails,
      qr: qrCodeImage,
      externalUrl: gift.externalUrl,
    };
  }

  return {
    title: title ?? bankDetails?.title ?? "Gifts & blessings",
    message: message ?? bankDetails?.description,
    bank: bankDetails,
    qr: qrCodeImage,
    externalUrl: undefined,
  };
}

function BankRow({
  label,
  value,
  mono,
  variant,
}: {
  label: string;
  value: string;
  mono?: boolean;
  variant: "dark" | "light";
}) {
  const isLight = variant === "light";

  return (
    <div className="flex flex-col gap-1 border-t border-gold/10 pt-4 first:border-0 first:pt-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
      <span
        className={cn(
          "text-[10px] font-medium uppercase tracking-[0.28em]",
          isLight ? "text-charcoal/45" : "text-ivory/45",
        )}
      >
        {label}
      </span>
      <span
        className={cn(
          "text-sm",
          mono && "font-mono tracking-wide",
          isLight ? "text-charcoal" : "text-ivory/90",
        )}
      >
        {value}
      </span>
    </div>
  );
}

export function GiftDonationSection({
  variant = "dark",
  className,
  qrCaption = "Scan to pay",
  ...props
}: GiftDonationSectionProps) {
  const reduced = useMotionReduced();
  const isLight = variant === "light";

  const resolved = resolveGiftProps(props);
  const { title, message, bank, qr, externalUrl } = resolved;

  const hasBank =
    bank?.accountNumber || bank?.bankName || bank?.accountHolder;
  const showQr = Boolean(qr);

  if (!hasBank && !showQr && !externalUrl) return null;

  return (
    <Container narrow className={className}>
      <m.div
        className="text-center"
        variants={staggerContainer}
        initial={reduced ? false : "hidden"}
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <m.p
          variants={fadeUp}
          className={cn(
            "text-xs uppercase tracking-[0.35em]",
            isLight ? "text-gold-muted" : "text-gold",
          )}
        >
          With gratitude
        </m.p>
        <m.h2
          variants={fadeUp}
          className={cn(
            "mt-3 font-display text-3xl font-light sm:text-4xl",
            isLight ? "text-charcoal" : "text-ivory",
          )}
        >
          {title}
        </m.h2>

        {message && (
          <m.p
            variants={fadeUp}
            className={cn(
              "mx-auto mt-4 max-w-md text-sm leading-relaxed",
              isLight ? "text-charcoal/65" : "text-ivory/60",
            )}
          >
            {message}
          </m.p>
        )}

        <m.div
          variants={fadeUp}
          className={cn(
            "mt-10",
            hasBank && showQr && "lg:grid lg:grid-cols-[1fr_auto] lg:items-start lg:gap-8 lg:text-left",
          )}
        >
          {hasBank && (
            <div
              className={cn(
                "rounded-2xl border p-6 text-left sm:p-8",
                isLight
                  ? "border-gold/20 bg-white/70 shadow-sm shadow-gold/5"
                  : "border-ivory/10 bg-ivory/[0.03] backdrop-blur-sm",
              )}
            >
              <div
                className="mb-6 h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent"
                aria-hidden
              />
              <div className="space-y-4">
                {bank?.bankName && (
                  <BankRow label="Bank" value={bank.bankName} variant={variant} />
                )}
                {bank?.accountHolder && (
                  <BankRow
                    label="Account holder"
                    value={bank.accountHolder}
                    variant={variant}
                  />
                )}
                {bank?.accountNumber && (
                  <BankRow
                    label="Account number"
                    value={bank.accountNumber}
                    mono
                    variant={variant}
                  />
                )}
                {bank?.branchCode && (
                  <BankRow
                    label="Branch code"
                    value={bank.branchCode}
                    mono
                    variant={variant}
                  />
                )}
                {bank?.reference && (
                  <BankRow label="Reference" value={bank.reference} variant={variant} />
                )}
              </div>

              {bank?.accountNumber && (
                <div className="mt-6">
                  <CopyAccountButton
                    accountNumber={bank.accountNumber}
                    variant={variant}
                  />
                </div>
              )}
            </div>
          )}

          {showQr && qr && (
            <m.div
              variants={fadeUp}
              className={cn(
                "mt-8 flex flex-col items-center lg:mt-0",
                !hasBank && "lg:col-span-2",
              )}
            >
              <p
                className={cn(
                  "mb-4 text-[10px] uppercase tracking-[0.3em]",
                  isLight ? "text-charcoal/50" : "text-ivory/45",
                )}
              >
                {qrCaption}
              </p>
              <div
                className={cn(
                  "relative h-36 w-36 overflow-hidden rounded-xl border p-3 sm:h-40 sm:w-40",
                  isLight
                    ? "border-gold/20 bg-white shadow-md shadow-gold/10"
                    : "border-gold/25 bg-ivory/95 shadow-lg shadow-black/20",
                )}
              >
                <Image
                  src={qr}
                  alt="Payment QR code"
                  fill
                  loading="lazy"
                  className="object-contain p-1"
                  sizes="(max-width: 640px) 144px, 160px"
                  quality={80}
                />
              </div>
            </m.div>
          )}
        </m.div>

        {externalUrl && (
          <m.div variants={fadeUp} className="mt-8">
            <a
              href={externalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "inline-flex min-h-12 items-center justify-center rounded-full border px-8 py-2.5 text-sm tracking-wide transition duration-300",
                isLight
                  ? "border-charcoal/20 text-charcoal hover:border-gold/40 hover:text-gold-muted"
                  : "border-ivory/25 text-ivory hover:border-gold/40 hover:text-gold",
              )}
            >
              View gift registry
            </a>
          </m.div>
        )}
      </m.div>
    </Container>
  );
}
