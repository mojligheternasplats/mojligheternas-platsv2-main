"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

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

    const res = await fetch(`http://localhost:3000/api/eventAttendance/${eventId}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMsg(data.error || "Something went wrong.");
    } else {
      setMsg("You are successfully registered!");
      setName("");
      setEmail("");
    }

    setLoading(false);
  };

  return (
    <div className="mt-10 text-center space-y-6">
      {/* STEP 1 — BUTTON TO REVEAL FORM */}
      {!showForm && (
        <Button size="lg" onClick={() => setShowForm(true)}>
          Register for this Event
        </Button>
      )}

      {/* STEP 2 — FORM */}
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
