"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { registerForEvent } from "@/lib/api/events";

export default function EventRegister({ eventId }: { eventId: string }) {
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
     

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMsg(null);

    const result = await registerForEvent(eventId, { name, email });

    if (!result.success) {
      setMsg(result.error || "Registreringen misslyckades. Vänligen försök igen.");
      setLoading(false);
      return;
    }

    setMsg(result.message || "Du är nu registrerad!");
    setName("");
    setEmail("");
    setLoading(false);
  };

  return (
    <div className="mt-10 text-center space-y-6">
      {!showForm && (
        <Button size="lg" onClick={() => setShowForm(true)}>
          Register for this Event
        </Button>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="max-w-md mx-auto space-y-4 p-6 border rounded-xl"
        >
          <Input
            required
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <Input
            required
            type="email"
            placeholder="Your Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Button type="submit" disabled={loading} className="w-full" size="lg">
            {loading ? "Submitting..." : "Submit Registration"}
          </Button>

          {msg && (
            <p className="text-center text-green-600 dark:text-green-400">
              {msg}
            </p>
          )}
        </form>
      )}
    </div>
  );
}
