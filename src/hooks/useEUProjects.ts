// src/hooks/useEUProjects.ts
'use client';

import { useEffect, useState } from 'react';
import type { Project } from '@/lib/definitions';
import { getEUProjectsClient } from '@/lib/api/projects';

export function useEUProjects() {
  const [items, setItems] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        const data = await getEUProjectsClient();
        if (alive) setItems(data);
      } finally {
        if (alive) setLoading(false);
      }
    })();
    return () => { alive = false; };
  }, []);

  return { items, loading };
}
