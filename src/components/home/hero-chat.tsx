"use client";

import { useRef } from "react";
import type { Chat } from "@/brands/types";
import { gsap, MOTION_OK, useGSAP } from "@/lib/gsap";

/**
 * A customer chat that plays itself: each reply shows a typing indicator first, then the message. It replays after a
 * pause. With reduced motion the whole conversation simply shows.
 */
export function HeroChat({ chat }: { chat: Chat }) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        const msgs = gsap.utils.toArray<HTMLElement>("[data-msg]");
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2, delay: 1 });
        tl.set(msgs, { display: "none", opacity: 0, y: 14, scale: 0.96 });
        msgs.forEach((m) => {
          // A reply is "typed" first, right where it will appear
          const typing = m.previousElementSibling;
          if (typing instanceof HTMLElement && typing.dataset.typing !== undefined) {
            tl.set(typing, { display: "flex" }, "+=0.3").set(typing, { display: "none" }, "+=1");
          }
          tl.set(m, { display: "block" }, "+=0.3").to(m, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.45,
            ease: "back.out(1.6)",
          });
        });
        tl.to(msgs, { opacity: 0, duration: 0.5 }, "+=3.5");
        gsap.to("[data-dot]", { y: -3, repeat: -1, yoyo: true, duration: 0.35, stagger: 0.12, ease: "sine.inOut" });
      });
      return () => mm.revert();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className="mx-auto w-full max-w-[380px]">
      <div className="rounded-[2.2rem] border border-white/15 bg-white/5 p-2 shadow-[0_40px_80px_-30px_rgb(0_0_0/0.6)] backdrop-blur">
        <div className="overflow-hidden rounded-[1.8rem] bg-[#f4f7f6] text-ink">
          <div className="flex items-center gap-3 bg-brand px-4 py-3 text-white">
            <span className="grid size-9 place-items-center rounded-full bg-white/20 text-sm font-bold">AI</span>
            <div>
              <p className="text-[15px] leading-tight font-semibold">{chat.business}</p>
              <p className="text-xs text-white/75">{chat.status}</p>
            </div>
          </div>
          <div className="grid min-h-[430px] content-start gap-2 p-3 text-[14.5px] leading-snug">
            {chat.messages.map((m, i) => [
              m.from === "us" && (
                <div
                  key={`t${i}`}
                  data-typing
                  className="hidden w-14 gap-1 justify-self-end rounded-2xl bg-[#d6f2e8] px-3 py-3"
                  aria-hidden
                >
                  {[0, 1, 2].map((d) => (
                    <span key={d} data-dot className="size-1.5 rounded-full bg-brand" />
                  ))}
                </div>
              ),
              <div
                key={i}
                data-msg={m.from}
                className={`max-w-[84%] rounded-2xl px-3 py-2 shadow-sm ${
                  m.from === "us" ? "justify-self-end rounded-br-md bg-[#d6f2e8]" : "rounded-bl-md bg-white"
                }`}
              >
                {m.text}
                {m.options && (
                  <span className="mt-2 flex flex-wrap gap-1.5">
                    {m.options.map((o) => (
                      <span
                        key={o}
                        className="rounded-lg border border-brand px-2 py-0.5 text-[13px] font-semibold text-brand"
                      >
                        {o}
                      </span>
                    ))}
                  </span>
                )}
                <span className="mt-1 block text-right text-[11px] text-muted">{m.time}</span>
              </div>,
            ])}
          </div>
        </div>
      </div>
      <p className="mt-4 text-center text-sm text-mist">{chat.caption}</p>
    </div>
  );
}
