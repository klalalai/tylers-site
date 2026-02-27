"use client";

import { useMemo, useState } from "react";

// Your Formspree endpoint (keep this as-is if you're using Formspree)
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mykdlpvy";

const VEHICLE_TYPES = [
  "Mountain Bike",
  "Dirt Bike",
  "Snowmobile",
  "Snowbike",
  "SxS",
] as const;

const SERVICES = ["Graphics", "Paint Protection", "Not Sure"] as const;

type VehicleType = (typeof VEHICLE_TYPES)[number];
type Service = (typeof SERVICES)[number];

const fieldClass =
  "w-full rounded-xl bg-black/30 px-4 py-3 text-base text-white placeholder:text-white/40 ring-1 ring-white/10 focus:outline-none focus:ring-2 focus:ring-white/20";

export default function QuoteForm() {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [vehicleType, setVehicleType] = useState<VehicleType | "">("");
  const [services, setServices] = useState<Service[]>([]);
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const charsLeft = 400 - description.length;

  const canSubmit = useMemo(() => {
    return (
      firstName.trim().length > 0 &&
      email.trim().length > 0 &&
      vehicleType !== "" &&
      services.length > 0 &&
      description.length <= 400
    );
  }, [firstName, email, vehicleType, services, description]);

  function toggleService(s: Service) {
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      formData.delete("_redirect");

      // Ensure services are sent as multiple values
      formData.delete("services");
      for (const s of services) formData.append("services", s);

      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { errors?: Array<{ message?: string }> }
          | null;
        const msg =
          data?.errors?.[0]?.message ||
          "Could not send your request. Please try again.";
        throw new Error(msg);
      }

      setStatus("sent");
      setFirstName("");
      setEmail("");
      setVehicleType("");
      setServices([]);
      setDescription("");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Submission failed.");
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      {/* Formspree helpers */}
      <input type="hidden" name="_subject" value="New Quote Request" />
      <input type="hidden" name="_replyto" value={email} />
      {/* Honeypot for bots */}
      <input type="text" name="_gotcha" className="hidden" tabIndex={-1} />

      <input
        className={fieldClass}
        name="firstName"
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        required
      />

      <input
        className={fieldClass}
        name="email"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <div className="relative">
        <select
          className={`${fieldClass} appearance-none pr-10`}
          name="vehicleType"
          required
          value={vehicleType}
          onChange={(e) => setVehicleType(e.target.value as VehicleType)}
        >
          <option value="" disabled>
            Vehicle Type
          </option>
          {VEHICLE_TYPES.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
          ▾
        </span>
      </div>

      <fieldset className="rounded-xl bg-black/30 px-4 py-3 ring-1 ring-white/10">
        <legend className="px-1 text-sm text-white/60">Service (select all that apply)</legend>
        <div className="mt-2 grid gap-3">
          {SERVICES.map((s) => (
            <label key={s} className="flex items-center gap-3 text-white/90">
              <input
                type="checkbox"
                name="services"
                value={s}
                checked={services.includes(s)}
                onChange={() => toggleService(s)}
                className="h-4 w-4 accent-white"
              />
              <span>{s}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <textarea
          className={fieldClass}
          name="comments"
          placeholder="Describe what you're looking for (max 400 characters)"
          value={description}
          onChange={(e) => setDescription(e.target.value.slice(0, 400))}
          maxLength={400}
          rows={5}
        />
        <div className="mt-1 text-right text-xs text-white/50">
          {Math.max(0, 400 - description.length)}/400
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit || status === "sending"}
        className="w-full rounded-xl bg-sky-300 px-4 py-3 text-base font-semibold text-neutral-950 shadow-[0_18px_60px_rgba(0,0,0,0.45)] transition hover:bg-sky-200 focus:outline-none focus:ring-2 focus:ring-sky-200/40 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "sending" ? "Sending…" : "Request a Quote"}
      </button>

      {status === "sent" && (
        <p className="text-sm text-white/80">✅ Sent! We will get back to you soon.</p>
      )}
      {status === "error" && (
        <p className="text-sm text-red-300">{errorMsg}</p>
      )}
    </form>
  );
}