"use client";

import { useState } from "react";
import { channelUrl, chatEmbedUrl, playerEmbedUrl } from "@/lib/twitch/embed";

type Props = {
  login: string;
  displayName: string;
  onClose: () => void;
};

export function TwitchPlayer({ login, displayName, onClose }: Props) {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-3">
      <div className="flex flex-col gap-3 lg:flex-row">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-black lg:flex-1">
          <iframe
            key={login}
            src={playerEmbedUrl(login)}
            title={`${displayName} on Twitch`}
            allowFullScreen
            allow="autoplay; fullscreen; picture-in-picture"
            className="absolute inset-0 h-full w-full"
          />
        </div>

        {chatOpen ? (
          <iframe
            key={`${login}-chat`}
            src={chatEmbedUrl(login)}
            title={`${displayName} chat`}
            className="h-80 w-full rounded-lg border border-foreground/10 lg:h-auto lg:w-80"
          />
        ) : null}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
        <span className="font-semibold text-foreground">{displayName}</span>
        <button
          type="button"
          onClick={() => setChatOpen((open) => !open)}
          className="rounded-full border border-foreground/20 px-3 py-1 text-xs text-foreground hover:bg-foreground/10"
        >
          {chatOpen ? "Hide chat" : "Show chat"}
        </button>
        <a
          href={channelUrl(login)}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full border border-foreground/20 px-3 py-1 text-xs text-foreground hover:bg-foreground/10"
        >
          Open on Twitch
        </a>
        <button
          type="button"
          onClick={onClose}
          className="ml-auto rounded-full border border-foreground/20 px-3 py-1 text-xs text-foreground/70 hover:bg-foreground/10"
        >
          Close player
        </button>
      </div>
    </div>
  );
}
