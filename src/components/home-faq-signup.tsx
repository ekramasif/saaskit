"use client";

import { type FormEvent, useState } from "react";
import { ArrowRight, Check, ChevronDown, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

type FaqItem = {
  question: string;
  answer: string;
};

type HomeFaqAndSignupProps = {
  faqs: FaqItem[];
};

const pageShell = "marketing-shell px-4 md:px-6 xl:px-8";

export function HomeFaqAndSignup({ faqs }: HomeFaqAndSignupProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [email, setEmail] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setEmail("");
  };

  return (
    <>
      <section className="py-20">
        <div className={pageShell}>
          <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[2rem] border border-[#2b2521] bg-[#1f1b18] p-7 text-[#f3eadf]">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#b7a995]">
                Included in the base
              </p>
              <h2 className="font-display mt-4 text-4xl leading-tight">
                The starter covers the commercial, operational, and content layers that most SaaS teams end up rebuilding.
              </h2>
              <div className="mt-8 space-y-4">
                {[
                  "Authentication, roles, and protected app routes",
                  "Stripe billing, credits, plans, and webhook handling",
                  "Prisma data access and production-friendly API routes",
                  "Marketing pages, pricing, docs, and blog structure",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-[1.4rem] border border-[#3b342e] bg-[#26211d] p-4"
                  >
                    <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#314337]">
                      <Check className="h-3 w-3" />
                    </div>
                    <span className="text-base leading-7 text-[#efe5da]">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-[2rem] border border-[#b9ab9d] bg-[#efe6dc] p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#6e6359]">
                FAQ
              </p>
              <h2 className="font-display mt-4 text-4xl">Common questions</h2>
              <div className="mt-8 space-y-4">
                {faqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <div
                      key={faq.question}
                      className="overflow-hidden rounded-[1.5rem] border border-[#c7b8aa] bg-[#f4ede5]"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : index)}
                        className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                      >
                        <span className="text-lg font-semibold text-[#1f1b18]">
                          {faq.question}
                        </span>
                        <ChevronDown
                          className={`h-5 w-5 flex-shrink-0 text-[#5f564d] transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="px-6 pb-6 text-base leading-7 text-[#5a524a]">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className={pageShell}>
          <div className="rounded-[2.2rem] border border-[#2b2521] bg-[#1f1b18] p-8 text-[#f3eadf] md:p-12">
            <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.34em] text-[#b7a995]">
                  Stay close to the updates
                </p>
                <h2 className="font-display mt-5 text-4xl leading-tight sm:text-5xl">
                  Product notes, launch updates, and implementation details without the usual template noise.
                </h2>
              </div>
              <form
                onSubmit={handleSubmit}
                className="space-y-4 rounded-[1.8rem] border border-[#3b342e] bg-[#26211d] p-6"
              >
                <label
                  htmlFor="email"
                  className="text-sm font-semibold uppercase tracking-[0.24em] text-[#b7a995]"
                >
                  Email address
                </label>
                <div className="flex flex-col gap-3 sm:flex-row">
                  <div className="relative flex-1">
                    <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9f9385]" />
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="Enter your email"
                      required
                      className="h-14 w-full rounded-full border border-[#4a4139] bg-[#1f1b18] pl-11 pr-5 text-base text-[#f3eadf] placeholder:text-[#8d8174] focus:border-[#d4c5b5] focus:outline-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="h-14 rounded-full bg-[#f3eadf] px-7 text-base font-semibold text-[#1f1b18] hover:bg-[#e1d6ca]"
                  >
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-sm leading-6 text-[#9f9385]">
                  No spam. Only product updates, release notes, launch advice, and technical walkthroughs.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
